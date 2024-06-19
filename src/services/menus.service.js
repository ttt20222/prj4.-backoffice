import { MenusRepository } from "../repositories/menus.repository.js";
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class MenusService {
  menusRepository = new MenusRepository();

  create = async (
    restaurantId,
    menuName,
    menuPrice,
    menuType,
    menuDescription,
    menuImageUrl
  ) => {
    // 이미 존재하는 메뉴 이름인지 체크
    const existedMenuName = await this.menusRepository.findByMenuName(
      restaurantId,
      menuName
    );
    if (existedMenuName) {
      throw new HttpError.BadRequest(MESSAGES.MENUS.COMMON.NAME_ALREADY_EXISTS);
    }

    //메뉴 생성
    const createdMenu = await this.menusRepository.create(
      restaurantId,
      menuName,
      menuPrice,
      menuType,
      menuDescription,
      menuImageUrl
    );
    return {
      menuId: createdMenu.menuId,
      menuName: createdMenu.menuName,
      menuPrice: createdMenu.menuPrice,
      menuType: createdMenu.menuType,
      menuDescription: createdMenu.menuDescription,
      menuImageUrl: createdMenu.menuImageUrl,
    };
  };

  readAll = async (restaurantId) => {
    const menus = await this.menusRepository.readAll(restaurantId);
    return menus;
  };

  readById = async (restaurantId, menuId) => {
    const menu = await this.menusRepository.readById(restaurantId, menuId);

    //존재하는 메뉴인지 확인
    if (!menu) {
      throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);
    }

    return menu;
  };

  update = async (
    restaurantId,
    menuId,
    menuName,
    menuPrice,
    menuType,
    menuDescription,
    menuImageUrl
  ) => {
    const existedMenu = await this.menusRepository.readById(
      restaurantId,
      menuId
    );

    //존재하는 메뉴인지 확인
    if (!existedMenu) {
      throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);
    }

    const updatedMenu = await this.menusRepository.update(
      restaurantId,
      menuId,
      menuName,
      menuPrice,
      menuType,
      menuDescription,
      menuImageUrl
    );
    return updatedMenu;
  };

  delete = async (menuId, restaurantId) => {
    const existedMenu = await this.menusRepository.readById(
      restaurantId,
      menuId
    );

    //존재하는 메뉴인지 확인
    if (!existedMenu) {
      throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);
    }

    const deletedMenu = await this.menusRepository.delete(menuId, restaurantId);
    return deletedMenu;
  };
}
