import { css, SerializedStyles } from "@emotion/react";

export default {
  notificationContainer(): SerializedStyles {
    return css`
      width: 100%;
      padding: 16px;

      display: flex;
      flex-direction: column;
      gap: 8px;

      & > .title {
        font-size: 16px;
        font-weight: 600;
        color: #5d5d5d;
      }

      & > ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `;
  },

  notificationCard(): SerializedStyles {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .req-user {
        display: flex;
        align-items: center;
        gap: 12px;

        & > .profile {
          width: 48px;
          height: 48px;
          overflow: hidden;
          border-radius: 50%;
          /* background-color: aqua; */

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        & > .content {
          flex: 1;
          font-size: 14px;
          color: #191919;

          & > .bold {
            font-weight: 600;
            color: #000;
          }

          & > .date {
            color: #5e5e5e;
            margin-left: 8px;
          }
        }
      }

      & > .movie-log-thumbnail {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        background-color: blue;
        overflow: hidden;

        & > img {
          width: 100%;
        }
      }
    `;
  },
};
