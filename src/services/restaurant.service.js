
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const restaurantRepository = new RestaurantRepository(); // RestaurantRepository 인스턴스 생성

class RestaurantService {
  // 업장 검색 서비스 메소드
  async searchRestaurants(name, mainMenuType) {
    const restaurants = await restaurantRepository.searchRestaurants(name, mainMenuType); // 레스토랑 검색
    return restaurants;
  }

  // 특정 업장 조회 서비스 메소드
  async getRestaurantById(restaurantId) {
    const restaurant = await restaurantRepository.getRestaurantById(restaurantId); // 레스토랑 ID로 조회
    return restaurant;
  }

  // 업장 생성 서비스 메소드
  async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const newRestaurant = await restaurantRepository.createRestaurant(
      ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea
    ); // 새로운 레스토랑 생성
    return newRestaurant;
  }

  // 업장 수정 서비스 메소드
  async updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const updatedRestaurant = await restaurantRepository.updateRestaurant(
      restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea
    ); // 레스토랑 정보 수정
    return updatedRestaurant;
  }

  // 업장 삭제 서비스 메소드
  async deleteRestaurant(restaurantId) {
    const deleted = await restaurantRepository.deleteRestaurant(restaurantId); // 레스토랑 삭제
    return deleted;
  }
}

export {
  RestaurantService, // RestaurantService 클래스 내보내기
};
=======
import { HttpError } from '../errors/http.error.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const restaurantRepository = new RestaurantRepository();

export class RestaurantService {

    readOrder = async (userId, role) => {

        //사장님만 자기 업장의 주문 상태를 볼 수 있음.
        if(role != 'OWNER'){
            throw new HttpError.Forbidden('사장님이 아닙니다.');
        };

        const orders = await restaurantRepository.findOrders(userId);

        return orders.map((order) => ({
            orderId : order.orderId,
            userId : order.userId,
            restaurantId : order.restaurantId,
            userRequirment : order.userRequirment,
            orderStatus : order.orderStatus,
            totalPrice : order.totalPrice,
            menuId : order.menuId,
            menuName : order.menuName,
            menuPrice : order.menuPrice,
            menuCount : order.menuCount,
            createdAt : order.createdAt,
            updatedAt : order.updatedAt,
        }));
    };

}

