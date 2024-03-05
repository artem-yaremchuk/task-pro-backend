import { Board } from '../models/boardModel.js'
import  {User}  from "../models/userModel.js";

async function addBoard(req,user) {
  const result = await Board.create({ ...req.body,user})
  await User.findByIdAndUpdate(
    user._id,
    {
      // $push: { boards: result._id},
      $push: { boards: {_id: result._id,  title: result.title, icon: result.icon  }, },
    },
    { new: true}
  );
  return result
}


async function getBoard(id) {
    // const result = await Board.findById(id)
   const result = await Board.findById(id).populate({
        path: "columns",
        select: {
          _id: 1,
          updatedAt: 1,
          title: 1,
         //tasks: 1,
        },
        // populate: {
        //   path: "tasks",
        //   select: {
        //     _id: 1,
        //     updatedAt: 1,
        //     title: 1,
        //     description: 1,
        //     priority: 1,
        //     deadline: 1,
        //   },
        // },
     });
    return result
  }



export { addBoard, getBoard }
