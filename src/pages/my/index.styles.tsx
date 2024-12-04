// pages/my/index.styles.tsx
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    gap: 16px;
    width: 100%;
`;

export const ProfileContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 32px;
`;

export const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 200px;
`;

export const ProfileInfoContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 16px;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.span`
    font-size: 16px;
    font-weight: 400;
    color: #000000;
`;

export const BaseBoldText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #000000;
`;

export const BoldText = styled(BaseBoldText)<{ isZero: boolean }>`
    ${({ isZero }) =>
        isZero &&
        css`
            color: #9D9D9D;
        `}
`;

export const GrayText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #9D9D9D;
`;

export const NickName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 12px;
`;

export const EditButton = styled.div`
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 12px 0;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    background-color: #F4F5F7;
    border: none;
    cursor: pointer;
`;

export const SettingsButton = styled.div`
    padding: 6px 8px;
    border-radius: 8px;
    background-color: #F4F5F7;
    border: none;
    cursor: pointer;
`;