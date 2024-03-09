import { Column } from '../models/columnModel.js'
import { Task } from '../models/taskModel.js'

async function addTask(req) {
  const { _id: user } = req.user
  const { column } = req.body
  const existingColumn = await Column.findById(column)
  if (!existingColumn) {
    return existingColumn
  }

  const result = await Task.create({ ...req.body, user })

  await Column.findByIdAndUpdate(
    column,
    {
      $push: { tasks: result._id },
    },
    { new: true }
  )

  return result
}

async function delTask(req) {
  const { _id: user } = req.user
  const { id } = req.params

  const task = await Task.findById(id)

  if (!task || task.user.toString() !== user.toString()) {
    return null
  }

  await Column.updateOne({ _id: task.column }, { $pull: { tasks: id } })

  const result = await Task.findByIdAndDelete(id)

  return result
}

async function upTask(req) {
  const { _id: user } = req.user
  const { id } = req.params

  const task = await Task.findById(id)

  if (!task || task.user.toString() !== user.toString()) {
    return null
  }

  const result = await Task.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    return null
  }

  return result
}

export { addTask, delTask, upTask }
