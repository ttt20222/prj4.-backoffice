import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const restaurantRepository = new RestaurantRepository();

class RestaurantService {
  async searchRestaurants(name, mainMenuType) {
    const restaurants = await restaurantRepository.searchRestaurants(name, mainMenuType);
    return restaurants;
  }

  async getRestaurantById(restaurantId) {
    const restaurant = await restaurantRepository.getRestaurantById(restaurantId);
    return restaurant;
  }

  async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const newRestaurant = await restaurantRepository.createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea);
    return newRestaurant;
  }

  async updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const updatedRestaurant = await restaurantRepository.updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantAddress, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea);
    return updatedRestaurant;
  }

  async deleteRestaurant(restaurantId) {
    const deleted = await restaurantRepository.deleteRestaurant(restaurantId);
    return deleted;
  }
}

export {
  RestaurantService,
};
