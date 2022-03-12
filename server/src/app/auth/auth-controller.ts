import { Request, response, Response } from "express";
import databaseService from "../../services/database";
import { sign, verify } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';
import { User } from "../../@core/models";
import Database from "../../db";
import { GET_ERROR_BODY } from "../../constants/helpers";

import { v4 as uuid } from 'uuid';

interface IDecodedProps {
  user: User;
}

export const isAuth = async (req: Request, res: Response) => {
  const token = String(req.headers.token);
  if (token && token != '') {

    try {
      const decoded = await verify(token, process.env.SECRET_KEY_FOR_USER!);
      const newDecoded = decoded as IDecodedProps;
      if (newDecoded?.user) {
        return res.status(200).json({
          user: newDecoded.user,
          token: sign({ user: newDecoded.user }, process.env.SECRET_KEY_FOR_USER!)
        });
      } else {
        return res.status(401).json({
          error: "Unauthorized"
        });
      }
    } catch {
      return res.status(401).json({
        error: "Unauthorized or Server error"
      });
    }

  } else {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }
};

export const onRegister = async (req: Request, res: Response) => {

  try {
    const response = await Database.user.create({
      data: {
        ...req.body,
        password: hashSync(req.body.password, 12),
        userID: uuid()
      }
    });
    let token = sign({ user: response }, process.env.SECRET_KEY_FOR_USER!);
    return res.status(200).json({
      message: "Registered",
      user: response,
      token,
    });
  } catch (err) {
    console.log("err => ", err)
    return res.status(400).json(GET_ERROR_BODY);
  }


};

export const onLogin = async (req: Request, res: Response) => {

  const response = await Database.user.findFirst({
    where: {
      username: req.body.username
    }
  });
  if (response != null) {
    if (!compareSync(req.body.password, response.password)) {
      return res.status(400).json({
        error: "Username or password wrong!"
      });
    } else {
      let token = sign({ user: response }, process.env.SECRET_KEY_FOR_USER!);
      return res.status(200).json({
        message: "Logged in.",
        user: {
          userID: response.userID,
          username: response.username,
          profileURL: response.profileURL
        },
        token,
      });
    }

  } else {
    return res.status(400).json({
      error: "Username or password wrong!"
    });
  }

};