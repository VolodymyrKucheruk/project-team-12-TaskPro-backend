import Column from "../models/columnModel.js";  

import { createColumnSchema } from "../schemas/columnSchema.js";

// Логіка пов'язана з контроллерами колонок:

// createColumn: Створює нову колонку для дошки та повертає її у відповіді.
// 1. Отримує ідентифікатор дошки з параметрів запиту.
// 2. Викликає сервіс для додавання нової колонки з даними з тіла запиту та ідентифікатором дошки.
// 3. Відповідає з статусом 201 та новоствореною колонкою.  

export const createColumn = async (req, res, next) => {   
  // console.log(req.params); 
  const column = {
    title: req.body.title,
    // ідентифікатор дошки в якій створюєтся column, при wmjve беремо id дошки ????? з jwt- токена
    ownerBoard: req.params.boardId,
  };

  try {
    const result = await Column.create(column);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }   
};

// getAllColumns: Отримує всіколонки дошки, створені поточним користувачем, та повертає їх у відповіді.
// 1. Отримує ідентифікатор користувача з запиту.
// 2. Викликає сервіс для отримання списку всіх дошок користувача.
// 3. Відповідає з статусом 200 та списком дошок.  

export const getAllColumns = async (req, res, next) => {   
  try {
    // запит всіх Boards в колекції
    const result = await Column.find({ ownerBoard: req.params.boardId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// getById: Отримує колонку за ідентифікатором, а також всі задачі, пов'язані з цією колонкою, та повертає їх у відповіді.
// 1. Отримує ідентифікатор колонки з параметрів запиту.
// 2. Викликає сервіс для отримання колонки за ідентифікатором.
// 3. Шукає всі задачі, пов'язані з колонкою.
// 4. Відповідає з статусом 200 та знайденою колонкою і задачами.

export const getOneColumn = async (req, res, next) => {    
  // отримуємо ідентифікатор Column з id
  const { boardId, columnId } = req.params; 
  // потрібно додати Joi валідацію значень полів щодо id на тип ObjectId !!!!!!!!

  try {
    //  пошук з ідентифікатором   - якшо немає такого id - findById повертає null
    const result = await Column.findById({
      ownerBoard: boardId,
      _id: columnId,
    });        
    //  обробка помилки - якщо контакт не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// deleteColumn: Видаляє колонку за ідентифікатором разом з усіма пов'язаними задачами та повертає видалені об'єкти у відповіді.
// 1. Отримує ідентифікатор колонки з параметрів запиту.
// 2. Викликає сервіс для видалення колонки за ідентифікатором.
// 3. Шукає всі задачі, пов'язані з колонкою.!!!!!!!!!!!!!!!!
// 4. Якщо задач немає, відповідає з видаленою колонкою. !!!!!!!!!!!!!!!
// 5. Видаляє всі задачі, пов'язані з колонкою. !!!!!!!!!!
// 6. Відповідає з видаленою колонкою та задачами. !!!!!!!!

export const deleteColumn = async (req, res, next) => { 
  const { boardId, columnId } = req.params; 
  // console.log(req.params);
  try {
    // якщо треба видалити не за id - метод findOneAndDelete({name: "Iv"} ) та зазначити по якому полю
    const result = await Column.findByIdAndDelete({
      ownerBoard: boardId,
      _id: columnId,
    });    
    // перевірка - обробка помилки - якщо картку не знайдено
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// updateColumn: Оновлює поточну колонку за ідентифікатором та повертає оновлену колонку у відповіді.
// 1. Отримує ідентифікатор колонки з параметрів запиту.
// 2. Викликає сервіс для оновлення колонки за ідентифікатором та даними з тіла запиту.
// 3. Відповідає з статусом 200 та оновленою колонкою.

export const updateColumn = async (req, res, next) => {   
const { boardId, columnId } = req.params; 

  const column = {
    title: req.body.title,     
    ownerBoard: req.params.boardId,
  };

 try {
   // щоб findByIdAndUpdate ПОВЕРНУВ актуальну(нову а не стару) версію документа треба додати { new: true} -
   const result = await Column.findByIdAndUpdate(
     {
       ownerBoard: boardId,
       _id: columnId,
     },
     column,
     {
       new: true,
     }
   );
   // перевірка - обробка помилки - якщо board не знайдено
   if (result === null) {
     return res.status(404).json({ message: "Not found" }); 
   } 
   res.status(200).json(result);
 } catch (error) {
   next(error);
 } 
};


  