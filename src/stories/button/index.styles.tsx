import { css, SerializedStyles } from "@emotion/react";

export default {
  // 버튼 컴포넌트 기본 스타일
  storybookButton(): SerializedStyles {
    return css`
      display: inline-block;
      cursor: pointer;
      border: 0;
      border-radius: 4px;
      font-family: "Pretendard", sans-serif;
      font-weight: 600;
      cursor: pointer;
    `;
  },

  // 버튼 Active Btn 스타일
  storybookButtonActive(isActive: boolean): SerializedStyles {
    return css`
      width: 100%;
      padding: 16px 0;
      border-radius: 10px;
      font-size: 16px;
      background-color: ${isActive ? "#FF084A" : "#D9D9D9"};
      color: #fff;
      cursor: pointer;
    `;
  },

  // 버튼 Social Btn 스타일
  storybookButtonSocial(isActive: boolean, size: string): SerializedStyles {
    return css`
      width: ${size === "Small" ? "45px" : "100%"};
      padding: ${size === "Small" ? "2px 0" : "12px 0px"};
      font-size: ${size === "Small" ? "8px" : "14px"};

      border-radius: ${size === "Small" ? "4px" : "8px"};

      background-color: ${isActive ? "#EFEFEF" : "#0095F6"};
      color: ${isActive ? "#000000" : "#FFFFFF"};
      cursor: pointer;
    `;
  },

  // 버튼 More Btn 스타일
  storybookButtonMore(): SerializedStyles {
    return css`
      width: 100%;
      padding: 10px 16px;
      font-size: 12px;
      background-color: #f8f8f8;
      color: #9d9d9d;
      border-top: 0.5px solid #d9d9d9;
      border-bottom: 0.5px solid #d9d9d9;
      border-radius: 0px;
      font-weight: 400;
      cursor: pointer;
    `;
  },
};