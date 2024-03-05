import catchAsync from '../helpers/catchAsync.js'
import { addColumn } from '../services/columnService.js'
import HttpError from '../helpers/HttpError.js'
import { isDuplicateCreate } from '../helpers/isDuplicateCreate.js'
import { Board } from '../models/boardModel.js'


export const postColumn = catchAsync(async (req, res) => {
  const { board: boardId } = req.body;
  const isColumnExist = await isDuplicateCreate('columns', Board, boardId, req)
  
  if (isColumnExist) {
    throw HttpError(409, `Board ${req.body.title} already exist`)
  }
  const result = await addColumn(req)
  if (!result) {
    throw HttpError(404)
  }

  const { _id, title, updatedAt, board, tasks } = result
  res.status(201).json({ _id, title, updatedAt, board, tasks })
})
