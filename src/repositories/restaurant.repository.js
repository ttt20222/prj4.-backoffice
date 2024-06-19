import prisma from '../utils/prisma/index.js';

class RestaurantRepository {
  async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
        phoneNumber: restaurantPhoneNumber,
        cityAddress: restaurantCity,
        streetAddress: restaurantStreetAddress,
        detailAddress: restaurantDetailAddress,
        mainMenuType: mainFoodType,
        deliveryAvailableArea: deliveryAvailableArea,
        User: {
          connect: { userId: parseInt(ownerId) } 
        }
      },
    });
    return newRestaurant;
  }

  async updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        name: restaurantName,
        phoneNumber: restaurantPhoneNumber,
        cityAddress: restaurantCity,
        streetAddress: restaurantStreetAddress,
        detailAddress: restaurantDetailAddress,
        mainMenuType: mainFoodType,
        deliveryAvailableArea: deliveryAvailableArea,
        updatedAt: new Date(),
      },
    });
    return updatedRestaurant;
  }

  async deleteRestaurant(restaurantId) {
    await prisma.restaurant.delete({
      where: { id: restaurantId },
    });
  }

  async searchRestaurants(name, mainMenuType) {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        OR: [
          { name: { contains: name } },
          { mainMenuType: { contains: mainMenuType } }
        ]
      },
    });
    return restaurants;
  }

  async getRestaurantById(restaurantId) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    return restaurant;
  }
}

export {
  RestaurantRepository,
};