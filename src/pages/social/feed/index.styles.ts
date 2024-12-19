import { css } from "@emotion/react";

export const wrapper = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

export const banner = css`
  width: 100%;
  height: 80px;
  margin-bottom: 16px;
  background: #000000;
  border-radius: 4px;
  overflow: hidden;
`;

export const feedContainer = css`
  width: 100%;
  border: none;
`;

export const feedItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const infoSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const profileSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const textSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;
  gap: 2px;
`;

export const movieTitleStyle = css`
  color: #9d9d9d;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.48px;
`;

export const timeSection = css`
  color: #c8c8c8;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.48px;
`;

export const contentSection = css`
  margin: 16px 0;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.64px;
  cursor: pointer;
`;

export const carouselWrapper = css`
  position: relative; /* 스포주의 텍스트가 블러된 요소 위에 표시되도록 설정 */
  cursor: pointer;
`;

export const carouselWrapper = css`
  position: relative; /* 스포주의 텍스트가 블러된 요소 위에 표시되도록 설정 */
`;

export const carouselSection = css`
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 8px;
`;

export const reactionsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const reactionsSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 16px; */

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.64px;
    cursor: pointer;

    /* 숫자와 아이콘 사이 최소 너비 설정 */
    min-width: 58px; /* 최소 너비 고정 */
    justify-content: space-between;

    .like-number,
    .comment-number {
      min-width: 24px; /* 숫자의 최소 너비 */
      text-align: center; /* 숫자 중앙 정렬 */
    }
  }
`;

export const moreOptions = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  animation: fadeIn 0.3s ease-out;
  z-index: 999;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const modalContent = css`
  position: absolute;
  bottom: 55px;
  border-radius: 10px 10px 0 0;
  background: #fff;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  max-width: 430px;
  animation: slideUp 0.3s ease-out;

  button:first-of-type {
    border-radius: 10px 10px 0 0;
    border-bottom: 0.5px solid rgba(217, 217, 217, 0.85);
    color: #000;
  }

  button:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  button {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    border: none;
    background: #f1f1f1;
    color: #f00;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
    gap: 12px;
  }
`;

export const spoilerImageWrapper = css`
  position: relative;
  width: 100%;
  cursor: pointer;
  p {
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.64px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
    margin-top: 8px;
  }
`;

export const blurredImage = css`
  filter: blur(5px);
  cursor: pointer;
  position: relative;
  z-index: 1; /* 스포주의 텍스트 아래에 위치 */
`;

export const spoilerText = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 16px;
  text-align: center;
  color: #f00;
  font-size: 24px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  pointer-events: none; /* 클릭이 MovieLog로 전달되도록 설정 */
  z-index: 10; /* 블러 처리된 요소 위에 표시되도록 설정 */
  p {
    color: #000;
    font-size: 16px;
    font-weight: 400;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
    margin-top: 8px;
  }
`;

export const blurredContent = css`
  filter: blur(5px);
  cursor: pointer;
  position: relative;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  user-select: none;
`;

export const slideUp = css`
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
