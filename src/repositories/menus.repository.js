import { prisma } from "../utils/prisma/index.js";

export class MenusRepository {
  create = async (
    restaurantId,
    menuName,
    menuPrice,
    menuType,
    menuDescription,
    menuImageUrl
  ) => {
    const createdMenu = await prisma.menu.create({
      data: {
        menuName,
        menuPrice,
        menuType,
        menuDescription,
        menuImageUrl,
        Restaurant: { connect: { restaurantId: +restaurantId } },
      },
    });
    return createdMenu;
  };

  readAll = async (restaurantId) => {
    let menus = await prisma.menu.findMany({
      where: { RestaurantId: +restaurantId },
    });

    menus = menus.map((menu) => {
      return {
        menuId: menu.menuId,
        menuName: menu.menuName,
        menuPrice: menu.menuPrice,
        menuType: menu.menuType,
        menuDescription: menu.menuDescription,
        menuImageUrl: menu.menuImageUrl,
      };
    });
    return menus;
  };

  readById = async (restaurantId, menuId) => {
    let menu = await prisma.menu.findUnique({
      where: { RestaurantId: +restaurantId, menuId: +menuId },
    });

    menu = {
      menuId: menu.menuId,
      menuName: menu.menuName,
      menuPrice: menu.menuPrice,
      menuType: menu.menuType,
      menuDescription: menu.menuDescription,
      menuImageUrl: menu.menuImageUrl,
    };

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
    const updatedMenu = await prisma.menu.update({
      where: { menuId: +menuId },
      data: {
        menuName,
        menuPrice,
        menuType,
        menuDescription,
        menuImageUrl,
        RestaurantId: +restaurantId,
      },
    });
    return updatedMenu;
  };
}
