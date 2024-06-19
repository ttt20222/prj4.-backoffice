// import prisma from '../prisma/client.js';
// import { validationResult } from 'express-validator';

// // 리뷰 생성
// export const createReview = async (req, res) => {
//   const { restaurantId } = req.params;
//   const { orderId, score, review } = req.body;
  
//   try {
    
//     const createdReview = await prisma.review.create({
//       data: {
//         UserId: req.user.userId, 
//         RestaurantId: parseInt(restaurantId),
//         orderId: orderId,
//         score: score,
//         review: review,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       include: {
//         Image: true, 
//       },
//     });

//     res.status(201).json({
//       status: 201,
//       message: '리뷰 작성에 성공했습니다.',
//       data: createdReview,
//     });
//   } catch (error) {
//     console.error('Error creating review:', error);
//     res.status(500).json({ status: 500, message: '리뷰 작성 중 오류가 발생했습니다.' });
//   }
// };

// // 리뷰 조회
// export const getReview = async (req, res) => {
//   const { restaurantId, reviewId } = req.params;

//   try {
//     const review = await prisma.review.findUnique({
//       where: {
//         reviewId: parseInt(reviewId),
//       },
//     });

//     if (!review) {
//       return res.status(404).json({ status: 404, message: '존재하지 않는 리뷰입니다.' });
//     }

//     res.status(200).json({
//       status: 200,
//       message: '리뷰 조회에 성공했습니다.',
//       data: review,
//     });
//   } catch (error) {
//     console.error('Error fetching review:', error);
//     res.status(500).json({ status: 500, message: '리뷰 조회 중 오류가 발생했습니다.' });
//   }
// };

// // 리뷰 수정
// export const updateReview = async (req, res) => {
//   const { restaurantId, reviewId } = req.params;
//   const { score, review } = req.body;

//   try {
//     const updatedReview = await prisma.review.update({
//       where: {
//         reviewId: parseInt(reviewId),
//       },
//       data: {
//         score: score,
//         review: review,
//         updatedAt: new Date(),
//       },
//       include: {
//         Image: true, 
//       },
//     });

//     res.status(200).json({
//       status: 200,
//       message: '리뷰 수정에 성공했습니다.',
//       data: updatedReview,
//     });
//   } catch (error) {
//     console.error('Error updating review:', error);
//     res.status(500).json({ status: 500, message: '리뷰 수정 중 오류가 발생했습니다.' });
//   }
// };

// // 리뷰 삭제
// export const deleteReview = async (req, res) => {
//   const { restaurantId, reviewId } = req.params;

//   try {
//     const deletedReview = await prisma.review.delete({
//       where: {
//         reviewId: parseInt(reviewId),
//       },
//     });

//     res.status(200).json({
//       status: 200,
//       message: '리뷰 삭제에 성공했습니다.',
//     });
//   } catch (error) {
//     console.error('Error deleting review:', error);
//     res.status(500).json({ status: 500, message: '리뷰 삭제 중 오류가 발생했습니다.' });
//   }
// };
