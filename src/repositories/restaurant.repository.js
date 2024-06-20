import { prisma } from '../utils/prisma/index.js';

export class RestaurantRepository {
    //레스토랑 주문내역 찾기
    findOrders = async (userId) => {
        const restaurant = await prisma.Restaurant.findFirst({
            where: { ownerId : userId },
            select: { restaurantId : true }
        });

        const orders = await prisma.order.findMany({
            where: { restaurantId: restaurant.restaurantId },
            include: {
                OrderDetail: {
                    select: {
                        menuId: true,
                        Menu: {
                            select: {
                                menuName: true,
                            },
                        },
                        menuPrice: true,
                        menuCount: true,
                    },
                },
            },
        });

        return orders;
    };

        // 새 업장 생성 메서드
    async createRestaurant(ownerId, restaurantName, restaurantPhoneNumber, restaurantCity, restaurantStreetAddress, restaurantDetailAddress, mainFoodType, deliveryAvailableArea) {
        const newRestaurant = await prisma.restaurant.create({
            data: {
            ownerId: ownerId,
            name: restaurantName, // 업장 이름
            phoneNumber: restaurantPhoneNumber, // 업장 전화번호
            cityAddress: restaurantCity, // 업장 도시
            streetAddress: restaurantStreetAddress, // 업장 도로명 주소
            detailAddress: restaurantDetailAddress, // 업장 상세 주소
            mainMenuType: mainFoodType, // 업장 메인 메뉴 종류
            deliveryAvailableArea: deliveryAvailableArea, // 배달 가능 지역
            },
        });
        return newRestaurant; // 생성된 업장 반환
    };

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
            },
        });
        return updatedRestaurant; // 수정된 업장 반환
        } catch (error) {
        throw error; // 에러 발생 시 예외 처리
        }
    };

    // 업장 삭제 메서드
    async deleteRestaurant(restaurantId) {
        try {
        const deleteRestaurant = await prisma.restaurant.delete({
                where: { restaurantId: parseInt(restaurantId) } // 업장 삭제
            });

        return deleteRestaurant; // 삭제 성공 반환
        } catch (error) {
        throw error; // 에러 발생 시 예외 처리
        }
    };

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
    };
};
