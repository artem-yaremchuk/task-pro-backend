import express from 'express'
import { postAddBoard, getOneBoard } from '../controllers/boardsController.js'
import { validateBody } from '../middlewares/validateBody.js'
import { isValidId } from '../middlewares/isValidId.js'
import { addBoardSchema } from '../schemas/addBoardSchema.js'
import { authorization } from '../middlewares/authMiddleware.js'
const boardsRouter = express.Router()

boardsRouter.post(
  '/',
  authorization,
  validateBody(addBoardSchema, `missing fields`),
  postAddBoard
)

boardsRouter.get('/:id', isValidId, authorization, getOneBoard)

export default boardsRouter
