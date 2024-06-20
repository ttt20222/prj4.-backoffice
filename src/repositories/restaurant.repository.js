import prisma from '../utils/prisma/index.js';

class RestaurantRepository {
  // 새 업장 생성 메서드
  async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    try {
      const newRestaurant = await prisma.restaurant.create({
        data: {
          name: restaurantName, // 업장 이름
          phoneNumber: restaurantPhoneNumber, // 업장 전화번호
          cityAddress: restaurantCity, // 업장 도시
          streetAddress: restaurantStreetAddress, // 업장 도로명 주소
          detailAddress: restaurantDetailAddress, // 업장 상세 주소
          mainMenuType: mainFoodType, // 업장 메인 메뉴 종류
          deliveryAvailableArea: deliveryAvailableArea, // 배달 가능 지역
          User: {
            connect: { userId: parseInt(ownerId) } // 사용자와 연결
          }
        },
      });
      return newRestaurant; // 생성된 업장 반환
    } catch (error) {
      throw error; // 에러 발생 시 예외 처리
    }
  }

  // 업장 수정 메서드
  async updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    try {
      const updatedRestaurant = await prisma.restaurant.update({
        where: { restaurantId: restaurantId }, // 수정할 업장 ID
        data: {
          name: restaurantName, // 업장 이름
          phoneNumber: restaurantPhoneNumber, // 업장 전화번호
          cityAddress: restaurantCity, // 업장 도시
          streetAddress: restaurantStreetAddress, // 업장 도로명 주소
          detailAddress: restaurantDetailAddress, // 업장 상세 주소
          mainMenuType: mainFoodType, // 업장 메인 메뉴 종류
          deliveryAvailableArea: deliveryAvailableArea, // 배달 가능 지역
          updatedAt: new Date(), // 수정 시간
        },
      });
      return updatedRestaurant; // 수정된 업장 반환
    } catch (error) {
      throw error; // 에러 발생 시 예외 처리
    }
  }

  // 업장 삭제 메서드
  async deleteRestaurant(restaurantId) {
    try {
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { restaurantId: parseInt(restaurantId) } // 삭제할 업장 ID
      });

      if (!existingRestaurant) {
        throw new Error(`Restaurant with id ${restaurantId} does not exist.`); // 업장이 존재하지 않을 경우 예외 발생
      }

      await prisma.restaurant.delete({
        where: { restaurantId: parseInt(restaurantId) } // 업장 삭제
      });

      return true; // 삭제 성공 반환
    } catch (error) {
      throw error; // 에러 발생 시 예외 처리
    }
  }

  // 업장 검색 메서드
  async searchRestaurants(name, mainMenuType) {
    try {
      let whereCondition = {};
      if (name) {
        whereCondition.name = { contains: name };
      }
      if (mainMenuType) {
        whereCondition.mainMenuType = { contains: mainMenuType };
      }
  
      const restaurants = await prisma.restaurant.findMany({
        where: Object.keys(whereCondition).length > 0 ? {
          OR: [
            { name: whereCondition.name || {} },
            { mainMenuType: whereCondition.mainMenuType || {} }
          ]
        } : {}
      });
  
      if (!restaurants || restaurants.length === 0) {
        throw { status: 404, errorMessage: "업장을 찾을 수 없습니다." };
      }
  
      return restaurants;
    } catch (error) {
      throw error;
    }
  }        

  // 업장 ID로 업장 조회 메서드
  async getRestaurantById(restaurantId) {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: { restaurantId: restaurantId }, // 조회할 업장 ID
      });
      return restaurant; // 조회된 업장 반환
    } catch (error) {
      throw error; // 에러 발생 시 예외 처리
    }
  }
}

export {
  RestaurantRepository,
};
