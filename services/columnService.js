import { Column } from '../models/columnModel.js'
import { Board } from '../models/boardModel.js'

async function addColumn(req) {
  const { _id: user } = req.user;
  const { board: boardId } = req.body;
  const result = await Column.create({ ...req.body, user  })


  await Board.findByIdAndUpdate(
    boardId,
    {
      $push: { columns: result._id },
    },
    { new: true }
  );

  return result
}

export { addColumn }
