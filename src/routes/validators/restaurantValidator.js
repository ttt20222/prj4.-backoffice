import Joi from 'joi';

// 업장 생성 시 필요한 데이터의 유효성을 검사하는 스키마
const createRestaurantSchema = Joi.object({
  ownerId: Joi.number().integer().required(), // 주인 ID, 정수, 필수
  restaurantName: Joi.string().required(), // 업장 이름, 문자열, 필수
  restaurantPhoneNumber: Joi.string().pattern(/^\d{3}-\d{3,4}-\d{4}$/).required(), // 업장 전화번호, 정규식 패턴, 필수
  restaurantCity: Joi.string().required(), // 업장 도시, 문자열, 필수
  restaurantAddress: Joi.string().required(), // 업장 주소, 문자열, 필수
  restaurantStreetAddress: Joi.string().required(), // 업장 도로명 주소, 문자열, 필수
  restaurantDetailAddress: Joi.string().required(), // 업장 상세 주소, 문자열, 필수
  mainFoodType: Joi.string().required(), // 업장 메인 메뉴 종류, 문자열, 필수
  deliveryAvailableArea: Joi.string().required(), // 배달 가능 지역, 문자열, 필수
});

// 업장 수정 시 필요한 데이터의 유효성을 검사하는 스키마
const updateRestaurantSchema = Joi.object({
  restaurantName: Joi.string().required(), // 업장 이름, 문자열, 필수
  restaurantPhoneNumber: Joi.string().pattern(/^\d{3}-\d{3,4}-\d{4}$/).required(), // 업장 전화번호, 정규식 패턴, 필수
  restaurantCity: Joi.string().required(), // 업장 도시, 문자열, 필수
  restaurantAddress: Joi.string().required(), // 업장 주소, 문자열, 필수
  restaurantStreetAddress: Joi.string().required(), // 업장 도로명 주소, 문자열, 필수
  restaurantDetailAddress: Joi.string().required(), // 업장 상세 주소, 문자열, 필수
  mainFoodType: Joi.string().required(), // 업장 메인 메뉴 종류, 문자열, 필수
  deliveryAvailableArea: Joi.string().required(), // 배달 가능 지역, 문자열, 필수
});

// 업장 검색 시 필요한 데이터의 유효성을 검사하는 스키마
const searchRestaurantSchema = Joi.object({
  name: Joi.string(), // 업장 이름, 문자열
  mainMenuType: Joi.string(), // 업장 메인 메뉴 종류, 문자열
});

// 업장 삭제 시 필요한 데이터의 유효성을 검사하는 스키마
const deleteRestaurantSchema = Joi.object({
  restaurantId: Joi.number().integer().required(), // 업장 ID, 정수, 필수
});

// 특정 업장 조회 시 필요한 데이터의 유효성을 검사하는 스키마
const getRestaurantSchema = Joi.object({
  restaurantId: Joi.number().integer().required(), // 업장 ID, 정수, 필수
});

export {
  createRestaurantSchema,
  updateRestaurantSchema,
  searchRestaurantSchema,
  deleteRestaurantSchema,
  getRestaurantSchema,
};
