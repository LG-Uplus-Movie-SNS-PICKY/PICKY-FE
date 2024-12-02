import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 8px 0;
  align-items: center;
`;

export const pageContainer = css`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  gap: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
`;

export const titleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const titleContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const title = css`
  color: #5e5e5e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.64px;
`;

export const subtitle = css`
  font-size: 12px;
  color: #c8c8c8;
  font-weight: 400;
  text-align: left;
`;

export const genreGroup = css`
  display: flex;
  flex-direction: column;
`;

export const requiredBadge = css`
  padding: 4px 8px;
  background-color: #2e2e2e;
  color: #fff;
  border-radius: 12px;
  /* font-size: 12px; */
  /* font-weight: bold; */
  display: flex;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const genreGrid = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const genreButton = ($isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border: ${$isSelected ? "1px solid #000000" : "0.5px solid #f1f1f1"};
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  background-color: ${$isSelected ? "#000000" : "#ffffff"};
  color: ${$isSelected ? "#ffffff" : "#5e5e5e"};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;
  font-size: ${$isSelected ? "13px" : "12px"};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;
