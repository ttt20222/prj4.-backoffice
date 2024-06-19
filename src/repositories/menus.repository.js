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
      select: {
        menuId: true,
        menuName: true,
        menuPrice: true,
        menuType: true,
        menuDescription: true,
        menuImageUrl: true,
      },
    });
    return createdMenu;
  };

  findByMenuName = async (restaurantId, menuName) => {
    const existedMenuName = await prisma.menu.findFirst({
      where: { RestaurantId: +restaurantId, menuName },
      select: {
        menuId: true,
        menuName: true,
        menuPrice: true,
        menuType: true,
        menuDescription: true,
        menuImageUrl: true,
      },
    });
    return existedMenuName;
  };

  readAll = async (restaurantId) => {
    let menus = await prisma.menu.findMany({
      where: { RestaurantId: +restaurantId },
      orderBy: {
        menuName: "asc",
      },
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

    if (!menu) {
      return null; // 존재하지 않는 경우 null을 반환하도록 수정
    }

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

  delete = async (menuId, restaurantId) => {
    const deletedMenu = await prisma.menu.delete({
      where: { menuId: +menuId, RestaurantId: +restaurantId },
    });
    return deletedMenu;
  };
}
