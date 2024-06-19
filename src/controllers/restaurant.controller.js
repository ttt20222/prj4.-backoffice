import { validationResult } from 'express-validator';
import { RestaurantService } from '../services/restaurant.service.js';

const restaurantService = new RestaurantService();

export class RestaurantController {
  async searchRestaurants(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: '업장이름 또는 음식종류를 입력해주세요.', errors: errors.array() });
      }

      const { name, mainMenuType } = req.query;
      const restaurants = await restaurantService.searchRestaurants(name, mainMenuType);
      
      if (restaurants.length === 0) {
        return res.status(404).json({ status: 404, errorMessage: '업장을 찾을 수 없습니다.' });
      }
      
      res.status(200).json({ status: 200, data: restaurants });
    } catch (error) {
      next(error);
    }
  }

  async getRestaurantById(req, res, next) {
    try {
      const restaurantId = parseInt(req.params.restaurantId);

      if (isNaN(restaurantId)) {
        return res.status(400).json({ status: 400, errorMessage: '유효한 업장 ID를 입력해주세요.' });
      }

      const restaurant = await restaurantService.getRestaurantById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ status: 404, errorMessage: '업장을 찾을 수 없습니다.' });
      }

      res.status(200).json({
        status: 200,
        data: {
          restaurantId: restaurant.restaurantId,
          ownerId: restaurant.ownerId,
          restaurantName: restaurant.name,
          restaurantPhoneNumber: restaurant.phoneNumber,
          restaurantCity: restaurant.cityAddress,
          restaurantStreetAddress: restaurant.streetAddress,
          restaurantDetailAddress: restaurant.detailAddress,
          mainFoodType: restaurant.mainMenuType,
          deliveryAvailableArea: restaurant.deliveryAvailableArea,
          createdAt: restaurant.createdAt,
          updatedAt: restaurant.updatedAt,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async createRestaurant(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: '입력값이 올바르지 않습니다.',
          errors: errors.array().map(err => {
            switch (err.param) {
              case 'ownerId':
                return { msg: '주인 ID 형식이 올바르지 않습니다.' };
              case 'restaurantName':
                return { msg: '업장 이름 형식이 올바르지 않습니다.' };
              case 'restaurantPhoneNumber':
                return { msg: '전화번호 형식이 올바르지 않습니다.' };
              case 'restaurantCity':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'restaurantStreetAddress':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'restaurantDetailAddress':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'mainFoodType':
                return { msg: '음식 종류 형식이 올바르지 않습니다.' };
              case 'deliveryAvailableArea':
                return { msg: '배달 가능 지역 형식이 올바르지 않습니다.' };
              default:
                return { msg: err.msg };
            }
          }),
        });
      }
  
      const {
        ownerId,
        restaurantName,
        restaurantPhoneNumber,
        restaurantCity,
        restaurantStreetAddress,
        restaurantDetailAddress,
        mainFoodType,
        deliveryAvailableArea
      } = req.body;
  
      const newRestaurant = await restaurantService.createRestaurant(
        ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea
      );
  
      res.status(201).json({
        status: 201,
        message: '업장 생성 성공',
        data: {
          ownerId: newRestaurant.ownerId,
          restaurantId: newRestaurant.restaurantId,
          restaurantName: newRestaurant.name,
          restaurantPhoneNumber: newRestaurant.phoneNumber,
          restaurantCity: newRestaurant.cityAddress,
          restaurantStreetAddress: newRestaurant.streetAddress,
          restaurantDetailAddress: newRestaurant.detailAddress,
          mainFoodType: newRestaurant.mainMenuType,
          deliveryAvailableArea: newRestaurant.deliveryAvailableArea,
          createdAt: newRestaurant.createdAt,
          updatedAt: newRestaurant.updatedAt,
        }
      });
    } catch (error) {
      next(error);
    }
  }
    

  async updateRestaurant(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: '입력값이 올바르지 않습니다.',
          errors: errors.array().map(err => {
            switch (err.param) {
              case 'restaurantName':
                return { msg: '업장 이름 형식이 올바르지 않습니다.' };
              case 'restaurantPhoneNumber':
                return { msg: '전화번호 형식이 올바르지 않습니다.' };
              case 'restaurantCity':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'restaurantAddress':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'restaurantStreetAddress':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'restaurantDetailAddress':
                return { msg: '주소 형식이 올바르지 않습니다.' };
              case 'mainFoodType':
                return { msg: '음식 종류 형식이 올바르지 않습니다.' };
              case 'deliveryAvailableArea':
                return { msg: '배달 가능 지역 형식이 올바르지 않습니다.' };
              default:
                return { msg: err.msg };
            }
          }),
        });
      }
  
      const restaurantId = req.params.restaurantId;
      const { restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea } = req.body;
      
      const updatedRestaurant = await restaurantService.updateRestaurant(
        restaurantId,
        restaurantName,
        restaurantPhoneNumber,
        restaurantCity,
        restaurantAddress,
        restaurantStreetAddress,
        restaurantDetailAddress,
        mainFoodType,
        deliveryAvailableArea
      );
      
      res.status(200).json({
        status: 200,
        message: '업장 수정 성공',
        data: {
          restaurantId: updatedRestaurant.restaurantId,
          restaurantName: updatedRestaurant.name,
          restaurantPhoneNumber: updatedRestaurant.phoneNumber,
          restaurantCity: updatedRestaurant.cityAddress,
          restaurantStreetAddress: updatedRestaurant.streetAddress,
          restaurantDetailAddress: updatedRestaurant.detailAddress,
          mainFoodType: updatedRestaurant.mainMenuType,
          deliveryAvailableArea: updatedRestaurant.deliveryAvailableArea,
          createdAt: updatedRestaurant.createdAt,
          updatedAt: updatedRestaurant.updatedAt,
        }
      });
    } catch (error) {
      next(error);
    }
  }  

  async deleteRestaurant(req, res, next) {
    try {
      const restaurantId = req.params.restaurantId;
      const deleted = await restaurantService.deleteRestaurant(restaurantId);
      
      if (deleted) {
        res.status(200).json({
          status: 200,
          message: '업장 삭제 성공'
        });
      } else {
        res.status(404).json({
          status: 404,
          errorMessage: '업장을 찾을 수 없습니다.'
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
