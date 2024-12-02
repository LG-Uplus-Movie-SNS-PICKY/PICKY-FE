import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 768px;
  width: 100%;
`;

export const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
`;

export const backButtonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 16px;
`;

export const filterContainerStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 0 8px 0 0;
  border-right: 1px solid #D9D9D9;
  font-family: 12px;
  font-weight: 600;
  color: #FF084A;
`;

export const filterLabelStyle = css`
font-family: Pretendard;
font-size: 12px;
font-weight: 600;
color: #FF084A;
`;

export const filterModalStyle = css`
  position: absolute;
  top: 12.5%;
  left: 10%;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #D9D9D9;
  padding: 4px;
  z-index: 1000; /* 항상 위에 렌더링 */
`;

export const filterOptionStyle = css`
  padding: 4px 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  letter-spacing: -0.5px;
  border-bottom: 0.5px solid #F1F1F1;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none; /* 마지막 옵션 아래쪽 보더 제거 */
  }
`;

export const filterButtonStyle = css`
  display: flex;
  height: 38px;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 8px 0 8px 16px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
`;

export const filterIconStyle = css`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;  

export const searchInputStyle = css`
  display: flex;
  padding: 8px 12px 8px 8px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background: #f1f1f1;
  flex: 1;
  border: 1.5px solid transparent;
  color: #000000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9D9D9D;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const recentSearchHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: none;
`;

export const titleStyle = css`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const clearAllButtonStyle = css`
  background: none;
  color: #9d9d9d;
  border: none;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
`;

export const emptyStateContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 140px;
  flex: 1;
  color: #c8c8c8;
  text-align: center;
  width: 100%;
`;

export const emptyIconStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const emptyTextStyle = css`
  border-top: 12px;
  font-size: 14px;
  align-self: stretch;
  color: #9d9d9d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const searchButtonStyle = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  display: flex;
  border: none;
  cursor: pointer;
`;

export const searchInputContainerStyle = (isFocused: boolean) => css`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: 50px;
  border: 1.5px solid ${isFocused ? "#FF084A" : "transparent"};
  transition: border-color 0.3s ease;
`;

export const suggestionListStyle = css`
  display: flex;
  padding-left: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;

  li {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
      width: 12px;
      height: 12px;
    }

    span {
      font-family: Pretendard;
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
  }
`;

export const recentSearchListStyle = css`
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    div:first-of-type {
      display: flex;
      align-items: center;

      img {
        margin-right: 8px;
        width: 16px;
        height: 17.45px;
      }

      span {
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 400;
        color: #9d9d9d;
      }
    }

    /* 닫기 버튼 스타일 */
    div:last-of-type img {
      cursor: pointer;
      width: 14px;
      height: 14px;
    }
  }
`;
