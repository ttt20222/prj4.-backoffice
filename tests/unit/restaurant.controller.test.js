import request from 'supertest';
import app from '../src/app';

// '/restaurants' 경로의 POST 요청 테스트 정의
describe('POST /restaurants', () => {
  // 새로운 식당을 생성하는 테스트 케이스
  it('should create a new restaurant', async () => {
    // 테스트에 사용할 새 식당 데이터
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

    // POST 요청을 보내고 응답을 저장
    const response = await request(app)
      .post('/restaurants')
      .send(newRestaurant);

    // 응답 상태 코드가 201인지 확인 (생성됨)
    expect(response.status).toBe(201);
    // 응답 본문에 'data' 속성이 있는지 확인
    expect(response.body).toHaveProperty('data');
    // 'data' 속성 내에 'restaurantId' 속성이 있는지 확인
    expect(response.body.data).toHaveProperty('restaurantId');
    // 'data' 속성 내에 'createdAt' 속성이 있는지 확인
    expect(response.body.data).toHaveProperty('createdAt');
    // 'data' 속성 내에 'updatedAt' 속성이 있는지 확인
    expect(response.body.data).toHaveProperty('updatedAt');
  });
});
