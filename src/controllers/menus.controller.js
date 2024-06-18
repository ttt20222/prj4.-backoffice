import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MenusService } from "../services/menus.service.js";

export class MenusController {
  menusService = new MenusService();
  create = async (req, res, next) => {
    try {
      //path parameters에서 restaurantId 추출
      const { restaurantId } = req.params;
      //req.body에서 데이터 추출
      const { menuName, menuPrice, menuType, menuDescription, menuImageUrl } =
        req.body;

      const menu = await this.menusService.create(
        restaurantId,
        menuName,
        menuPrice,
        menuType,
        menuDescription,
        menuImageUrl
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: "메뉴 등록이 완료되었습니다.",
        menu,
      });
    } catch (error) {
      next(error);
    }
  };

  readAll = async (req, res, next) => {
    try {
      //path parameters에서 restaurantId 추출
      const { restaurantId } = req.params;
      const menus = await this.menusService.readAll(restaurantId);

      return res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, menus });
    } catch (error) {
      next(error);
    }
  };

  readById = async (req, res, next) => {
    try {
      //path parameters에서 restaurantId, menuId 추출
      const { restaurantId, menuId } = req.params;

      const menu = await this.menusService.readById(restaurantId, menuId);

      return res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, menu });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      //path parameters에서 restaurantId 추출
      const { restaurantId, menuId } = req.params;
      //req.body에서 데이터 추출
      const { menuName, menuPrice, menuType, menuDescription, menuImageUrl } =
        req.body;

      const updatedMenu = await this.menusService.update(
        restaurantId,
        menuId,
        menuName,
        menuPrice,
        menuType,
        menuDescription,
        menuImageUrl
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: "메뉴수정이 완료되었습니다.",
        updatedMenu,
      });
    } catch (error) {
      next(error);
    }
  };
}
