import { css, SerializedStyles } from "@emotion/react";

export default {
  cardContainer(): SerializedStyles {
    return css`
      width: 90%;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);

      margin-top: 24px;

      display: flex;
      flex-direction: column;

      border-radius: 4px;
      overflow: hidden;

      cursor: pointer;
    `;
  },

  cardThumbnail(): SerializedStyles {
    return css`
      width: 100%;
      aspect-ratio: 16 / 9;

      box-sizing: border-box;
      overflow: hidden;

      & img {
        display: block;
        width: 100%;
      }
    `;
  },

  cardContext(): SerializedStyles {
    return css`
      display: flex;
      padding: 12px;
      justify-content: space-between;
      align-items: center;

      & > .context {
        display: flex;
        flex-direction: column;
        gap: 4px;

        & > h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        & > p {
          font-size: 14px;
          font-weight: 600;
          color: #a5a5a5;
        }
      }

      & > .arrow-btn {
        position: relative;

        transform: rotate(180deg);

        width: 24px;
        height: 24px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 1px solid #a5a5a5;

        & > svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          & > path {
            fill: #a5a5a5;
          }
        }
      }
    `;
  },
};
