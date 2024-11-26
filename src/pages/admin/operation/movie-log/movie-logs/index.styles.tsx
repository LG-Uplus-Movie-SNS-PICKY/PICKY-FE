import { css, SerializedStyles } from "@emotion/react";

export default {
  titleHeaderContainer(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      gap: 28px;

      background-color: #fff;
      padding: 12px 8px;
      border-radius: 4px;

      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      & > .container {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 14px;
        font-weight: 600;

        & > h3 {
          color: #9d9d9d;
          margin-right: 8px;
        }
      }
    `;
  },

  reportContainer(): SerializedStyles {
    return css`
      width: 100%;
      background-color: #f0f0f0;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    `;
  },

  reportCard(): SerializedStyles {
    return css`
      width: 100%;
      background-color: #fff;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0 0 4px rgba(193, 193, 193, 0.4);

      & > .line {
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        margin: 16px 0;
        border-radius: 1px;
      }
    `;
  },

  reportCardHeader(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;
  },

  profilePanel(): SerializedStyles {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;

      & > .profile_image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: bisque;
        overflow: hidden;
        margin-right: 12px;

        & > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      & > .profile_info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        font-weight: 400;

        & > span:first-of-type {
          font-weight: 600;
        }

        & > span:last-child {
          color: #9d9d9d;
        }
      }
    `;
  },

  status(status?: boolean): SerializedStyles {
    return css`
      padding: 4px 16px;

      border-radius: 12px;
      background-color: ${status ? "#d2fae5" : "#ffbbbb"};
      color: ${status ? "#148e4f" : "#b91717"};

      font-size: 14px;
      font-weight: 600;
    `;
  },

  reportInfoContainer(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 8px;
    `;
  },

  reportMessageBox(): SerializedStyles {
    return css`
      display: flex;
      flex-direction: column;
      gap: 12px;

      & > .description {
        line-height: 1.4;
        word-break: keep-all;
      }
    `;
  },

  toggleBtn(): SerializedStyles {
    return css`
      position: relative;
      background-color: #ddd;
      border: 1px solid #d0d0d0;
      border-radius: 30px;
      width: 60px;
      height: 24px;
      transition: background-color 0.1s ease, border-color 0.2s ease;
      cursor: pointer;

      &.toggled {
        background-color: #15b58e;
      }

      &:hover {
        border-color: #aaa;
      }

      & > .thumb {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        transform: translateX(0);
        transition: left 0.15s ease;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
      }

      &.toggled .thumb {
        left: calc(60px - 25px);
      }
    `;
  },
};
