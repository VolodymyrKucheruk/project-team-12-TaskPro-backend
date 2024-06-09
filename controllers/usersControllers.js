import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { v2 as cloudinary } from "cloudinary";
import {listBoards} from "../services/dashboardServices.js"



const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) throw HttpError(409, "Email already in use");

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { protocol: "https" });

    let cloudinaryAvatarURL;
    const cloudinaryResponse = await cloudinary.uploader.upload(avatarURL);
    cloudinaryAvatarURL = cloudinaryResponse.secure_url;

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL: cloudinaryAvatarURL,
    });

    const payload = {
      id: newUser._id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "10d",
    });

    await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      avatarURL: cloudinaryAvatarURL,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "10d",
    });

    await User.findOneAndUpdate(user._id, { accessToken, refreshToken });

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatarURL,
      theme: user.theme,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOneAndUpdate(_id, {
      accessToken: "",
      refreshToken: "",
    });
    if (!user) throw HttpError(401);

    res.status(204).json({
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const { id } = decodedRefreshToken;
    const user = await User.findOne({ _id: id });

    if (!user || user.refreshToken !== refreshToken) {
      throw HttpError(403, "Token invalid");
    }
    const payload = { id };
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "7d",
    });
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "10d",
    });
    user.accessToken = accessToken;
    user.refreshToken = newRefreshToken;
    await user.save();
    res.json({ accessToken, newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId);

    const dashboards = await listBoards({ owner: userId });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        theme: user.theme,
      },
      boards: dashboards.map((dashboard) => ({
        id: dashboard._id,
        title: dashboard.title,
        background: dashboard.backgroundURL,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.user) {
      throw HttpError(401, "Not authorized");
    }
    const { _id } = req.user;
    const result = await cloudinary.uploader.upload(req.file.path);
    const avatarURL = result.secure_url;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const {} = req.body;
    let avatarURL = req.user.avatarURL;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarURL = result.secure_url;
    }
    const updatedFields = {
      name: name || req.user.name,
      email: email || req.user.email,

      avatarURL,
    };
    if (gender !== undefined && gender !== "") {
      updatedFields.gender = gender;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      {
        new: true,
      }
    ).select(
      "_id name dailyWaterNorma avatarURL gender weight activeSportTime email"
    );
    if (!updatedUser) {
      return next(new HttpError(404, "User not found"));
    }
    res.json(updatedUser);
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

export const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "7d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "10d",
  });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  res.redirect(
    `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};
