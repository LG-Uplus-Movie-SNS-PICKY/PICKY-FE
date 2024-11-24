import { css, SerializedStyles } from "@emotion/react";

export default {
  dashboardWrapper(): SerializedStyles {
    return css`
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > .dashboard-title {
        font-size: 14px;
        font-weight: 600;
        color: #9e9e9e;
        text-transform: uppercase;
      }
    `;
  },

  dashboardContainer(): SerializedStyles {
    return css``;
  },
};
