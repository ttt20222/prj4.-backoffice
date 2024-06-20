export const MESSAGES = {
  AUTH: {
    COMMON: {
      JWT: {
        UNAUTHOREIZED: "비밀번호가 일치하지 않습니다.",
        NO_TOKEN: "인증 정보가 없습니다.",
        NOT_SUPPORTED_TYPE: "지원하지 않는 인증 방식입니다.",
        EXPIRED: "인증 정보가 만료되었습니다.",
        INVALID: "인증 정보가 유효하지 않습니다.",
        NO_USER: "존재하지 않는 사용자입니다.",
        DISCARDED_TOKEN: "폐기 된 인증 정보입니다.",
      },
    },
    SIGN_IN: {
      SUCCEED: "로그인에 성공했습니다.",
    },
  },
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
        INVALID: "유효하지 않은 메뉴타입니다.",
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
};
