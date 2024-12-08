/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecoilState } from "recoil";
import { inputState, userState } from "../../../../review/atoms";
import { Text } from "../ui";
import useFocus from "../../../../components/hooks/useFocus";
import DefaultImage from "@assets/icons/defaultImage.svg?react";
import React, { useState } from "react";
import { Toast } from "@stories/toast";
import defaultUserImage from "@assets/images/default_userImage.png";
import {
  fileInput,
  customFileLabel,
  imageContainer,
  defaultImageText,
  profileContainer,
} from "./index.styles";

export default function InputProfile() {
  const { isFocused } = useFocus();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [inputData, setInputData] = useRecoilState(inputState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToastMessage = (message: string) => {
    setToastMessage(null);
    setTimeout(() => setToastMessage(message), 0);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToastMessage("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setUserInfo((prev) => ({ ...prev, profileImage: imageUrl }));
      setInputData((prev) => ({ ...prev, profileImage: imageUrl }));
      showToastMessage("이미지가 성공적으로 업로드되었습니다.");
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const setDefaultImage = () => {
    if (userInfo.profileImage !== defaultUserImage) {
      setUserInfo((prev) => ({ ...prev, profileImage: defaultUserImage }));
      setInputData((prev) => ({ ...prev, profileImage: defaultUserImage }));
      showToastMessage("기본 이미지가 설정되었습니다.");
    } else {
      showToastMessage("이미 기본 이미지가 설정되어 있습니다.");
    }
  };

  return (
    <div css={profileContainer}>
      <Text.TitleMenu300>당신의 프로필을 선택해주세요</Text.TitleMenu300>
      <Text.FocusedMenu $isFocused={isFocused}>프로필 이미지</Text.FocusedMenu>
      {toastMessage && <Toast message={toastMessage} />}
      <div css={imageContainer}>
        {userInfo.profileImage ? (
          <img
            src={userInfo.profileImage}
            alt="프로필 미리보기"
            width={240}
            height={240}
          />
        ) : (
          <DefaultImage width="100%" height="100%" />
        )}
      </div>
      <input
        type="file"
        id="profile-upload"
        accept="image/*"
        onChange={handleProfileUpload}
        css={fileInput}
      />
      <label htmlFor="profile-upload" css={customFileLabel}>
        이미지 업로드
      </label>
      <span
        css={[
          defaultImageText,
          {
            visibility:
              userInfo.profileImage === defaultUserImage ? "hidden" : "visible",
          },
        ]}
        onClick={setDefaultImage}
      >
        기본 이미지 설정
      </span>
    </div>
  );
}
