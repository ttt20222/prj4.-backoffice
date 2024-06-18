import express from "express";
import { MenusController } from "../controllers/menus.controller.js";

const menusRouter = express.Router();
const menusController = new MenusController();

//메뉴 생성
menusRouter.post("/:restaurantId/menus", menusController.create);

//메뉴 목록 조회
menusRouter.get("/:restaurantId/menus", menusController.readAll);

//메뉴 상세 조회
menusRouter.get("/:restaurantId/menus/:menuId", menusController.readById);

//메뉴 수정
menusRouter.patch("/:restaurantId/menus/:menuId", menusController.update);

// //메뉴 삭제
menusRouter.delete("/:restaurantId/menus/:menuId", menusController.delete);

export { menusRouter };
