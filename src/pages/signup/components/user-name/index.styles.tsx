import { css } from "@emotion/react";

export const UserNameContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 768px;
  width: 100%;
  padding: 8px 32px;
  align-items: center;
`;

export const TextWrapper = css`
  display: flex;
  width: 100%;
  padding-left: 16px;
`;

export const Warning = css`
color: #FF084A;
font-size: 13px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.52px;
visibility: hidden; 
height: 20px;
`;