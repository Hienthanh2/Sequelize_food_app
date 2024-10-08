import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  BAD_REQUEST_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../common/constants.js";

const model = initModels(sequelize);

export const handleLikeRestaurant = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    // Check if user is exist
    const user = await model.users.findOne({ where: { user_id } });
    if (!user) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "User not found!",
      });
    }

    // Check if restaurant is exist
    const restaurant = await model.restaurants.findOne({ where: { res_id } });
    if (!restaurant) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "Restaurant not found!",
      });
    }

    // Check if the user has already liked the restaurant
    const existingLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });
    if (existingLike) {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "This user has already liked this restaurant!",
      });
    }

    // Handle like restaurant
    const like = await model.like_res.create({
      user_id,
      res_id,
      date_like: new Date(),
    });

    return res.status(OK_STATUS).json({
      message: "Like restaurant successfully!",
      data: like,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};

export const handleUnlikeRestaurant = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    const deleteInfo = await model.like_res.destroy({
      where: { user_id, res_id },
    });

    if (deleteInfo) {
      return res.status(OK_STATUS).json({
        message: "Unlike successfully!",
        data: deleteInfo,
      });
    } else {
      return res.status(BAD_REQUEST_ERROR_STATUS).json({
        message: "There's nothing to unlike!",
        data: deleteInfo,
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};

export const getRestaurantLikeList = async (req, res) => {
  try {
    const { res_id } = req.body;

    const likeList = await model.like_res.findAll({
      where: {
        res_id,
      },
    });

    return res.status(OK_STATUS).json({
      data: likeList,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};

export const getUserLikeList = async (req, res) => {
  try {
    const { user_id } = req.body;

    const likeList = await model.like_res.findAll({
      where: {
        user_id,
      },
    });

    return res.status(OK_STATUS).json({
      data: likeList,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      error: error.message,
    });
  }
};
