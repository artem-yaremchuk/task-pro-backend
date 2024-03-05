import catchAsync from '../helpers/catchAsync.js'
import { addBoard, getBoard } from '../services/boardService.js'
import HttpError from '../helpers/HttpError.js'
import {isDuplicateCreate} from "../helpers/isDuplicateCreate.js"
import  {User}  from "../models/userModel.js";

export const postAddBoard = catchAsync(async (req, res) => {
  
  const { _id: user } = req.user;
  const isBoardExist = await isDuplicateCreate('boards', User, user, req)
  if (isBoardExist) {
    throw HttpError(409, `Board ${req.body.title} already exist`)
  }

  const result = await addBoard(req, user)

  if (!result) {
    throw HttpError(404)
  }

  const { _id, title, icon, background, columns, updatedAt } = result
  res.status(201).json({ _id, title, icon, background, updatedAt, columns })
})

export const getOneBoard = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await getBoard(id)
  if (!result) {
    throw HttpError(404)
  }
  const { _id, title, icon, background, columns, updatedAt } = result
  res.status(200).json({ _id, title, icon, background, updatedAt, columns })
})
