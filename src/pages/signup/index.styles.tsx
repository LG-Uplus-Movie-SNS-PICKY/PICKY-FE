import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
`;

export const backWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
`;

export const progressBarContainer = css`
  width: 100%;
  height: 8px;
  background-color: #f3f3f3;

  @media (max-width: 76px) {
    height: 8px;
  }

  @media (max-width: 48px) {
    height: 6px;
    margin-bottom: 15px;
  }
`;

export const progressStyle = (progress: number) => css`
  width: ${progress}%;
  height: 100%;
  background-color: #ff084a;
  transition: width 0.3s ease-in-out;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const responsiveFlexBox = css`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const responsiveButtonWrapper = css`
  max-width: 768px;
  width: 100%;
  display: flex;
  /* position: fixed; */
  align-items: center;
  bottom: 16px;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  padding: 0 16px;

  @media (max-width: 768px) {
    button {
      width: 90%;
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    button {
      width: 100%;
      font-size: 12px;
      padding: 8px;
    }
  }
`;
export const backButtonWrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  p{color: #ff084a;}

`;

export const backButton = css`
  align-items: left;
  background-color: transparent;
  border: none;
  color: #ff084a;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  /* padding: 16px 16px 16px 8px; */
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const backButtonStyle = css`
  background: none; /* 배경색 제거 */
  border: none; /* 테두리 제거 */
  display: flex; /* 아이콘과 텍스트 정렬 */
  align-items: center;
  cursor: pointer; 

  p {
    margin: 0;
    color: #ff084a; /* 텍스트 색상 */
  }
`;

export const logoContainer = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1px 32px;
`;

export const block = {
  FlexBox: ({
    $direction = "row",
    $justifyContent = "flex-start",
    $alignItems = "stretch",
    $width = "100%",
    $height = "auto",
    $margin = "0",
    $padding = "0",
    $border = "none",
    $borderRadius = "0",
    $bgColor = "transparent",
    $gap = "0",
    $pointer = false,
  }: StyleBlock) => css`
    display: flex;
    flex-direction: ${$direction};
    justify-content: ${$justifyContent};
    align-items: ${$alignItems};
    width: ${$width};
    height: ${$height};
    margin: ${$margin};
    padding: ${$padding};
    border: ${$border};
    border-radius: ${$borderRadius};
    background-color: ${$bgColor};
    cursor: ${$pointer ? "pointer" : "default"};
    gap: ${$gap};
  `,
};

type StyleBlock = {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $direction?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $border?: string;
  $borderRadius?: string;
  $bgColor?: string;
  $gap?: string;
  $pointer?: boolean;
};
