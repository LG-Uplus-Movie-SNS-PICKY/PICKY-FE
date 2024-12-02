import { css } from "@emotion/react";

export const consentWrapper = css``;

export const textBase = css`
  font-family: Pretendard;
  line-height: normal;
  text-align: left;
`;

export const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
`;

export const titleWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  padding-bottom: 8px;
  width: 300px;
`;

export const titleContainer = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 300px;
`;

export const title = css`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const requiredBadge = css`
  padding: 4px 8px;
  background-color: #2e2e2e;
  color: #fff;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const subtitle = css`
  font-size: 12px;
  color: #c8c8c8;
  font-weight: 400;
  text-align: left;
`;

export const pageIndicator = css`
  text-align: right;
  padding: 0 24px 0 32px;
`;

export const selectedCount = css`
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
`

export const totalContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 363px;
  margin: 0 auto;
`;

export const currentPage = css`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const totalPages = css`
  color: #c8c8c8;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const movieGridWrapper = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const movieGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex: 1;
  justify-items: center;
  align-items: center;
`;

export const movieCard = ($isSelected: boolean) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 120px;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${$isSelected ? "transparent" : "transparent"};
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export const movieImage = ($isSelected: boolean) => css`
  position: relative;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  filter: ${$isSelected ? "brightness(40%) blur(0.6px)" : "none"};
  transition: filter 0.3s ease-in-out;
`;

export const movieTitle = css`
  ${textBase};
  color: #000;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.4px;
  margin-top: 4px;
`;

export const checkIcon = ($isVisible: boolean) => css`
  position: absolute;
  top: 42.9%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  display: ${$isVisible ? "block" : "none"};
  align-items: center;
  justify-content: center;
`;

export const arrowButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const previousButton = css`
  ${arrowButton};
`;

export const nextButton = css`
  ${arrowButton};
`;
