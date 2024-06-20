-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'OWNER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `city_address` VARCHAR(191) NOT NULL,
    `street_address` VARCHAR(191) NOT NULL,
    `detail_address` VARCHAR(191) NOT NULL,
    `is_email_valid` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `points` (
    `point_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `points_point_id_key`(`point_id`),
    UNIQUE INDEX `points_user_id_key`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point_logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `point` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `point_logs_log_id_key`(`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `restaurant_id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `city_address` VARCHAR(191) NOT NULL,
    `street_address` VARCHAR(191) NOT NULL,
    `detail_address` VARCHAR(191) NOT NULL,
    `main_menu_type` VARCHAR(191) NOT NULL,
    `delivery_available_area` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `restaurants_owner_id_key`(`owner_id`),
    PRIMARY KEY (`restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurant_id` INTEGER NOT NULL,
    `menu_name` VARCHAR(191) NOT NULL,
    `menu_image_url` VARCHAR(191) NOT NULL,
    `menu_price` VARCHAR(191) NOT NULL,
    `menu_type` VARCHAR(191) NOT NULL,
    `menu_description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `carts_user_id_key`(`user_id`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_details` (
    `cart_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `menu_count` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cart_details_menu_id_key`(`menu_id`),
    PRIMARY KEY (`cart_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,
    `user_requirment` VARCHAR(191) NOT NULL,
    `order_status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_user_id_key`(`user_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `order_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `menu_price` INTEGER NOT NULL,
    `menu_count` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `order_details_menu_id_key`(`menu_id`),
    PRIMARY KEY (`order_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `restaurant_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `review` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `points_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point_logs` ADD CONSTRAINT `point_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `points`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurants` ADD CONSTRAINT `restaurants_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menus` ADD CONSTRAINT `menus_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_details` ADD CONSTRAINT `cart_details_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_details` ADD CONSTRAINT `cart_details_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `reviews`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
