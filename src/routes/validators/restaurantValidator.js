import Joi from 'joi';

const createRestaurantSchema = Joi.object({
  ownerId: Joi.number().integer().required(),
  restaurantName: Joi.string().required(),
  restaurantPhoneNumber: Joi.string().pattern(/^\d{3}-\d{3,4}-\d{4}$/).required(),
  restaurantCity: Joi.string().required(),
  restaurantAddress: Joi.string().required(),
  restaurantStreetAddress: Joi.string().required(),
  restaurantDetailAddress: Joi.string().required(),
  mainFoodType: Joi.string().required(),
  deliveryAvailableArea: Joi.string().required(),
});

const updateRestaurantSchema = Joi.object({
  restaurantName: Joi.string().required(),
  restaurantPhoneNumber: Joi.string().pattern(/^\d{3}-\d{3,4}-\d{4}$/).required(),
  restaurantCity: Joi.string().required(),
  restaurantAddress: Joi.string().required(),
  restaurantStreetAddress: Joi.string().required(),
  restaurantDetailAddress: Joi.string().required(),
  mainFoodType: Joi.string().required(),
  deliveryAvailableArea: Joi.string().required(),
});

const searchRestaurantSchema = Joi.object({
  name: Joi.string(),
  mainMenuType: Joi.string(),
});

const deleteRestaurantSchema = Joi.object({
  restaurantId: Joi.number().integer().required(),
});

const getRestaurantSchema = Joi.object({
  restaurantId: Joi.number().integer().required(),
});

export {
  createRestaurantSchema,
  updateRestaurantSchema,
  searchRestaurantSchema,
  deleteRestaurantSchema,
  getRestaurantSchema,
};
