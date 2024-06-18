import { MenusRepository } from "../repositories/menus.repository.js";

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
    const createdMenu = await this.menusRepository.create(
      restaurantId,
      menuName,
      menuPrice,
      menuType,
      menuDescription,
      menuImageUrl
    );
    return createdMenu;
  };

  readAll = async (restaurantId) => {
    const menus = await this.menusRepository.readAll(restaurantId);
    return menus;
  };

  readById = async (restaurantId, menuId) => {
    const menu = await this.menusRepository.readById(restaurantId, menuId);
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
}
