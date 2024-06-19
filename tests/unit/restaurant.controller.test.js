import request from 'supertest';
import app from '../src/app';

describe('POST /restaurants', () => {
  it('should create a new restaurant', async () => {
    const newRestaurant = {
      ownerId: 1,
      restaurantName: '최고의 식당',
      restaurantPhoneNumber: '123-456-7890',
      restaurantCity: '서울',
      restaurantAddress: '강남',
      restaurantStreetAddress: '123 거리',
      restaurantDetailAddress: '2층',
      mainFoodType: '한식',
      deliveryAvailableArea: '서울',
    };

    const response = await request(app)
      .post('/restaurants')
      .send(newRestaurant);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('restaurantId');
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
  });
});
