import { css, SerializedStyles } from "@emotion/react";

export default {
  // 모든 헤더의 공통 영역
  headerContainer(): SerializedStyles {
    return css`
      width: 100%;
      max-width: 393px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 60px;

      box-sizing: border-box;

      & > .main-logo {
        width: 82px;
      }
    `;
  },

  headerTitleBox(): SerializedStyles {
    return css`
      display: flex;
      align-items: center;

      & > span {
        font-size: 16px;
        font-weight: 600;
        color: #141414;
        padding-top: 2px;
      }
    `;
  },

  // 헤더 버튼 Container
  headerActivesBtn(isLogin: boolean): SerializedStyles {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;

      gap: ${!isLogin ? "4px" : "8px"};

      border: ${!isLogin ? "1px solid #D9D9D9" : ""};
      border-radius: ${!isLogin ? "20px" : ""};
      padding: ${!isLogin ? "8px 12px" : ""};

      cursor: ${!isLogin ? "pointer" : ""};

      & > span {
        font-size: 12px;
        font-weight: 400;
        padding-top: 2px;
      }

      & > .active-icon-btn {
        cursor: pointer;
      }
    `;
  },
};
