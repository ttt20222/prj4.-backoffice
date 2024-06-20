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
        MIN_LENGTH: `메뉴소개는 8자 이상 작성해야 합니다.`,
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
  RESTAURANTS: {
    COMMON: {
      NAME: {
        REQUIRED: "레스토링 이름을 입력해 주세요.",
      },
      NUMBER: {
        REQUIRED: "레스토랑 전화번호를 입력해 주세요.",
        INVALID: "전화번호 유형이 올바르지 않습니다.",
      },
      CITY: {
        REQUIRED: "레스토랑 도시를 입력해 주세요.",
      },
      STREETADDRESS: {
        REQUIRED: "레스토랑 도로명 주소를 입력해 주세요.",
      },
      DETAILADDRESS: {
        REQUIRED: "레스토랑 상세 주소를 입력해 주세요.",
      },
      FOODTYPE: {
        REQUIRED: "레스토랑 메인 푸드 타입을 입력해 주세요.",
        INVALID: "유효하지 않은 푸드 타입입니다.",
      },
      DELEVERYAREA: {
        REQUIRED: "레스토랑 배달 가능 지역을 입력해 주세요.",
        INVALID: "유효하지 않은 지역입니다.",
      },
    },
    UPDATE: {
      COMMON : {
        NUMBER: {
          INVALID: "전화번호 유형이 올바르지 않습니다.",
        },
        FOODTYPE: {
          INVALID: "유효하지 않은 푸드 타입입니다.",
        },
        DELEVERYAREA: {
          INVALID: "유효하지 않은 지역입니다.",
        },
      },
    },
  },
};
