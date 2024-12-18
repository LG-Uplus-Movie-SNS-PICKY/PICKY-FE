import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

export const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Star = styled.span<{ filled: boolean }>`
  color: ${(props) => (props.filled ? "#FC4C4E" : "#C8C8C8")};
  &::before {
    content: "★";
    display: block;
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }
`;

export const StarRating = styled.span`
  font-size: 12px;
  font-weight: 600;
  align-self: center;
`;

export default {
  container(): SerializedStyles {
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      gap: 16px;
      padding: 16px;

      &.centered {
        justify-content: center;
        gap: 12px;

        font-size: 24px;
        font-weight: 600;
        color: #191919;
      }
    `;
  },

  reviewCard(): SerializedStyles {
    return css`
      position: relative;

      width: 100%;
      display: flex;
      gap: 8px;

      & > .poster {
        width: 60px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;

        & > img {
          width: 100%;
          height: 100%;
        }
      }
    `;
  },

  reviewInfo(): SerializedStyles {
    return css`
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 4px;

      padding: 8px 4px;

      & > .line-review-info {
        font-size: 12px;

        display: flex;
        align-items: center;
        gap: 8px;

        & > div {
          width: 32px;
          height: 16px;
          border-radius: 80px;

          font-size: 8px;
          color: #756262;

          border: 1px solid #d9d9d9;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      & > .sub-info {
        display: flex;
        align-items: center;
        gap: 4px;

        font-size: 10px;
        color: #756262;

        & > .round {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: #d9d9d9;
        }
      }

      & > .reaction-info {
        display: flex;
        gap: 8px;

        & > .reaction-buttons {
          padding: 2px 6px;

          display: flex;
          align-items: center;
          gap: 4px;

          border: 1px solid #d9d9d9;
          border-radius: 80px;

          font-size: 10px;
          color: #756262;
        }
      }

      border-bottom: 1px solid #d9d9d9;
    `;
  },

  emptyState(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 120px;
    `;
  },

  // reviewDeleteBtn(): SerializedStyles {
  //   return css`
  //     position: absolute;

  //     top: 1px;
  //     right: 4px;

  //     padding: 0 8px;

  //     & > svg {
  //       cursor: pointer;
  //       transition: all 0.3s;

  //       &:hover path {
  //         fill: #191919;
  //       }
  //     }
  //   `;
  // },

  reviewBtnContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    `;
  },

  reviewEditBtn(): SerializedStyles {
    return css`
      text-align: center;
      color: #ffffff;
      font-size: 10px;
      font-weight: 600;
      border-radius: 4px;
      background-color: #ff084a;
      padding: 2px 4px;
      margin-bottom: 8px;
      border: 1px solid #ff084a;

      &:hover {
        color: #ff084a;
        background-color: #ffffff;
        border-radius: 4px;
      }
    `;
  },

  reviewDeleteBtn(): SerializedStyles {
    return css`
      text-align: center;
      color: #ff084a;
      font-size: 10px;
      font-weight: 600;
      border-radius: 4px;
      background-color: #ffffff;
      padding: 2px 4px;
      border: 1px solid #ff084a;

      &:hover {
        color: #ffffff;
        background-color: #ff084a;
        border: 1px solid #ff084a;
      }
    `;
  },

  modalContainer(): SerializedStyles {
    return css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 10000;
      padding: 0 32px;
    `;
  },

  modalContent(): SerializedStyles {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      position: relative;
      max-width: 430px;
      width: 100%;
    `;
  },

  toastContainer(): SerializedStyles {
    return css`
      z-index: 10001;
    `;
  },
};

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 150px;
  margin: 0 auto;
`;

export const ModalWrapper = styled.div`
  display: flex;
  width: 200x;
  justify-content: center;
  align-items: center;
`;
