import User from "../models/User.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Api route is working",
  });
};

export const updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) 
  return next(errorHandler(401, "you can only update your own access"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateuser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteuser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return next(errorHandler(401,"you can only deleted your owen account"))
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token')
    res.status(200).json('user has been deleted!')
  } catch (error) {
    next(error)
  }
}
