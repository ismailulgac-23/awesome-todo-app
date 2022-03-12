import { Request, Response } from "express";
import { uuid } from "uuidv4";
import { GET_ERROR_BODY } from "../../constants/helpers";
import Database from "../../db";


export const createTodo = async (req: Request, res: Response) => {
  try {
    const createdTodo = await Database.todo.create({
      data: {
        ...req.body,
        todoID: uuid(),
        todoCreatedAt: Math.floor(Date.now() / 1000)
      },
      include: {
        todoCreator: true,
      }
    });
    return res.status(200).json({ createdTodo });
  } catch (e) {
    console.log("e => ", e)
    return res.status(400).json(GET_ERROR_BODY);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoID = req.params.todoID;
  const todo = req.body.todo;
  if (todoID && todoID != '' && todo && todo != null || todo != undefined) {

    try {
      const updatedTodo = await Database.todo.update({
        data: {
          ...todo
        },
        where: {
          todoID: todoID
        }
      });
      return res.status(200).json({
        updatedTodo
      });
    } catch {
      return res.status(400).json(GET_ERROR_BODY);
    }

  } else {
    return res.status(400).json(GET_ERROR_BODY);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoID = req.params.todoID;
  if (todoID && todoID != '') {

    try {
      await Database.todo.delete({
        where: {
          todoID: todoID
        }
      });
      return res.status(200).json({
        message: "Deleted"
      });
    } catch {
      return res.status(400).json(GET_ERROR_BODY);
    }

  } else {
    return res.status(400).json(GET_ERROR_BODY);
  }
};