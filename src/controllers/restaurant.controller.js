
import { validationResult } from 'express-validator';
import { RestaurantService } from '../services/restaurant.service.js';

// RestaurantService 인스턴스 생성
const restaurantService = new RestaurantService();

export class RestaurantController {
  // 업장 검색 메서드
  async searchRestaurants(req, res, next) {
    try {
      // 요청 유효성 검사
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, message: '업장이름 또는 음식종류를 입력해주세요.', errors: errors.array() });
      }

      const { name, mainMenuType } = req.query; // 쿼리 파라미터에서 이름과 음식 종류 가져오기
      const restaurants = await restaurantService.searchRestaurants(name, mainMenuType); // 업장 검색
      
      if (restaurants.length === 0) {
        return res.status(404).json({ status: 404, errorMessage: '업장을 찾을 수 없습니다.' }); // 검색 결과가 없을 경우
      }
      
      res.status(200).json({ status: 200, data: restaurants }); // 검색 결과 반환
    } catch (error) {
      next(error); // 에러 처리
    }
  }

  // 업장 ID로 업장 조회 메서드
  async getRestaurantById(req, res, next) {
    try {
      const restaurantId = parseInt(req.params.restaurantId); // 요청 파라미터에서 업장 ID 가져오기

      if (isNaN(restaurantId)) {
        return res.status(400).json({ status: 400, errorMessage: '유효한 업장 ID를 입력해주세요.' }); // 유효하지 않은 ID 처리
      }

      const restaurant = await restaurantService.getRestaurantById(restaurantId); // 업장 조회
      if (!restaurant) {
        return res.status(404).json({ status: 404, errorMessage: '업장을 찾을 수 없습니다.' }); // 업장을 찾지 못한 경우
      }

      // 업장 정보 반환
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
      next(error); // 에러 처리
    }
  }

  // 업장 생성 메서드
  async createRestaurant(req, res, next) {
    try {
      // 요청 유효성 검사
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
      } = req.body; // 요청 본문에서 데이터 가져오기
  
      const newRestaurant = await restaurantService.createRestaurant(
        ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea
      ); // 업장 생성
  
      // 생성된 업장 정보 반환
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
      next(error); // 에러 처리
    }
  }

  // 업장 수정 메서드
  async updateRestaurant(req, res, next) {
    try {
      // 요청 유효성 검사
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: '입력값이 올바르지 않습니다.',
          errors: errors.array().map(err => {
            switch (err.param) {
              case 'restaurantId':
                return { msg: '업장 ID 형식이 올바르지 않습니다.' };
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
  
      const restaurantId = parseInt(req.params.restaurantId); // 요청 파라미터에서 업장 ID 가져오기
  
      if (isNaN(restaurantId)) {
        return res.status(400).json({ status: 400, errorMessage: '유효한 업장 ID를 입력해주세요.' }); // 유효하지 않은 ID 처리
      }
  
      const { restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea } = req.body; // 요청 본문에서 데이터 가져오기
  
      const updatedRestaurant = await restaurantService.updateRestaurant(
        restaurantId,
        restaurantName,
        restaurantPhoneNumber,
        restaurantCity,
        restaurantStreetAddress,
        restaurantDetailAddress,
        mainFoodType,
        deliveryAvailableArea
      ); // 업장 수정
  
      if (!updatedRestaurant) {
        return res.status(404).json({ status: 404, errorMessage: '업장을 찾을 수 없습니다.' }); // 업장을 찾지 못한 경우
      }
  
      // 수정된 업장 정보 반환
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
      next(error); // 에러 처리
    }
  }

  // 업장 삭제 메서드
  async deleteRestaurant(req, res, next) {
    try {
      const restaurantId = parseInt(req.params.restaurantId); // 요청 파라미터에서 업장 ID 가져오기
  
      if (isNaN(restaurantId)) {
        return res.status(400).json({ status: 400, errorMessage: '유효한 업장 ID를 입력해주세요.' }); // 유효하지 않은 ID 처리
      }
  
      const deleted = await restaurantService.deleteRestaurant(restaurantId); // 업장 삭제
      
      if (deleted) {
        res.status(200).json({ status: 200, message: '업장 삭제 성공' }); // 삭제 성공
      } else {
        res.status(404).json({
          status: 404,
          errorMessage: '업장을 찾을 수 없습니다.'
        }); // 업장을 찾지 못한 경우
      }
    } catch (error) {
      next(error); // 에러 처리
    }
  }
}

import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { RestaurantService } from '../services/restaurant.service.js';

const restaurantService = new RestaurantService();

export class RestaurantController {

    readOrder = async (req, res, next) => {
        try {
        //const { userId , role } = req.user;
        const userId = 9;
        const role = 'USER';   //테스트 변경필요함

        const order = await restaurantService.readOrder(userId, role);

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: "레스토랑의 주문 내역입니다.",
            data: order,
        });

        }catch(error){
            next(error);
        }
    };
};

