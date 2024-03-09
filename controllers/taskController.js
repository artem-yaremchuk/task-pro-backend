import catchAsync from '../helpers/catchAsync.js'
import HttpError from '../helpers/HttpError.js'
import { addTask, delTask } from '../services/taskService.js'

export const postTask = catchAsync(async (req, res) => {
  const result = await addTask(req)
  if (!result) {
    throw HttpError(404)
  }

  const { _id, title, description, priority, deadline, updatedAt } = result
  res
    .status(201)
    .json({ _id, title, description, priority, deadline, updatedAt })
})

export const deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await delTask(req)
  if (!result) {
    throw HttpError(404)
  }

  res.status(200).json({ _id: id, message: 'Task deleted' })
})
