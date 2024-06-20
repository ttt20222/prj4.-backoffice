export const MESSAGES = {
  UPLOADS: {
    COMMON: {
      NOT_SUPPORT: "지원하지 않는 확장자입니다.",
    },
  },
  REVIEWS: {
    COMMON: {
      NOT_FOUND: "존재하지 않는 리뷰입니다.",
    },
    CREATE: {
      SUCCEED: "리뷰 작성에 성공했습니다.",
      NO_ORDER_ID: "orderId를 입력해 주세요.",
      NO_SCORE: "평점을 입력해 주세요.",
      NO_REVIEW: "리뷰를 입력해 주세요.",
      ALREADY_REVIEWED: "이미 리뷰를 작성하셨습니다.",
    },
    READ_LIST: {
      SUCCEED: "리뷰 목록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "리뷰 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "리뷰 수정에 성공했습니다.",
      NO_SCORE: "평점을 입력해 주세요.",
      NO_REVIEW: "리뷰를 입력해 주세요.",
    },
    DELETE: {
      SUCCEED: "리뷰 삭제에 성공했습니다.",
    },
  },
  RESTAURANTS: {
    COMMON: {
      NOT_FOUND: "존재하지 않는 식당입니다.",
    },
  },
  MENUS: {
    COMMON: {
      MENUMANE: {
        REQUIRED: "메뉴 이름을 입력해 주세요.",
      },
      MENUPRICE: {
        REQUIRED: "메뉴 가격을 입력해 주세요.",
      },
      MENUTYPE: {
        REQUIRED: "메뉴 타입을 입력해 주세요.",
        INVALID: "유효하지 않은 메뉴타입 입니다.",
      },
      MENUDESCRIPTION: {
        REQUIRED: "메뉴 설명을 입력해 주세요.",
        MIN_LENGTH: `자기소개는 10자 이상 작성해야 합니다.`,
      },
      NAME_ALREADY_EXISTS: "이미 존재하는 이름입니다.",
      NOT_FOUND: "메뉴가 존재하지 않습니다.",
    },
    CREATE: {
      SUCCEED: "메뉴 생성에 성공했습니다.",
    },
    READ_LIST: {
      SUCCEED: "메뉴 목록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "메뉴 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "메뉴 수정에 성공했습니다.",
    },
    DELETE: {
      SUCCEED: "메뉴 삭제에 성공했습니다.",
    },
  },
  ADMIN: {
    COMMON: {
      USERID: {
        REQUIRED: "유저아이디를 입력해 주세요.",
      },
      NAME: {
        REQUIRED: "유저 이름을 입력해 주세요.",
      },
      ROLE: {
        REQUIRED: "바꾸려는 ROLE을 입력해주세요",
        INVALID: "유효하지 않은 ROLE 입니다.",
        ROLE_ALREADY_EXISTS: "이미 존재하는 ROLE 입니다.",
      },
      NOT_FOUND: "사용자가 존재하지 않습니다.",
    },
    USER: {
      READ_LIST: {
        SUCCEED: "유저 목록 조회에 성공했습니다.",
      },
      ROLE: {
        UPDATE: {
          SUCCEED: "ROLE 수정에 성공했습니다.",
        },
      },
    },
  },
};
