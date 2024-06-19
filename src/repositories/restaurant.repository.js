import prisma from '../utils/prisma/index.js';

class RestaurantRepository {
  async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async updateRestaurant(restaurantId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
    try {
      const updatedRestaurant = await prisma.restaurant.update({
        where: { restaurantId: restaurantId },
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
    } catch (error) {
      throw error;
    }
  }

  async deleteRestaurant(restaurantId) {
    try {
      const existingRestaurant = await prisma.restaurant.findUnique({
        where: { restaurantId: parseInt(restaurantId) }
      });

      if (!existingRestaurant) {
        throw new Error(`Restaurant with id ${restaurantId} does not exist.`);
      }

      await prisma.restaurant.delete({
        where: { restaurantId: parseInt(restaurantId) }
      });

      return true; 
    } catch (error) {
      throw error;
    }
  }

  async searchRestaurants(name, mainMenuType) {
    try {
      const restaurants = await prisma.restaurant.findMany({
        where: {
          OR: [
            { name: { contains: name || '' } },
            { mainMenuType: { contains: mainMenuType || '' } }
          ]
        }
      });
      return restaurants;
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantById(restaurantId) {
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: { restaurantId: restaurantId },
      });
      return restaurant;
    } catch (error) {
      throw error;
    }
  }
}

export {
  RestaurantRepository,
};
