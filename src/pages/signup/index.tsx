/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../review/atoms";
import InputUserName from "./components/user-name";
import InputBirthDate from "./components/birth-date";
import InputNickname from "./components/nick-name";
import InputGender from "./components/gender";
import InputNationality from "./components/nationality";
import InputConsentForm from "./components/consent-form";
import InputProfile from "./components/profile";
import InputFavoriteGenre from "./components/favorite-genre";
import InputFavoriteMovie from "./components/favorite-movie";
import { IInputData } from "../../review/atoms";
import BackButtonIcon from "@assets/icons/back_button_red.svg?react";
import { Button, Text } from "../../styles/ui";
import {
  progressBarContainer,
  progressStyle,
  responsiveButtonWrapper,
  wrapper,
  backWrapper,
  backButtonStyle,
  backButtonWrapper,
} from "./index.styles";

export default function Signup() {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [step, setStep] = useState(1);

  // 줌 비활성화 및 스크롤 비활성화 처리
  useEffect(() => {
    // 줌 비활성화
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(metaTag);

    // 스크롤 비활성화
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // 줌 설정 복원
      document.head.removeChild(metaTag);

      // 스크롤 활성화 복원
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const steps = [
    {
      components: [<InputUserName key="name" />],
      requiredFields: ["name"],
    },
    {
      components: [<InputNickname key="nickname" />],
      requiredFields: ["nickname"],
    },
    {
      components: [<InputBirthDate key="birthDate" />],
      requiredFields: ["birthDate"],
    },
    {
      components: [<InputGender key="gender" />],
      requiredFields: ["gender"],
    },
    {
      components: [<InputNationality key="nationality" />],
      requiredFields: ["nationality"],
    },
    {
      components: [<InputProfile key="profile" />],
      requiredFields: ["profileImage"],
    },
    {
      components: [<InputFavoriteGenre key="favoriteGenres" />],
      requiredFields: ["favoriteGenres"],
    },
    {
      components: [<InputFavoriteMovie key="favoriteMovie" />],
      requiredFields: ["favoriteMovie"],
    },
    {
      components: [<InputConsentForm key="consent" />],
      requiredFields: ["consentAll", "consentAge"],
    },
  ];

  const isStepValid = () => {
    const requiredFields = steps[step - 1].requiredFields;
    return requiredFields.every((field) => {
      const value = inputData[field as keyof IInputData];
      if (field === "profilePicture") {
        return typeof value === "string" && value.trim() !== "";
      }
      if (field === "favoriteGenres") {
        return Array.isArray(value) && value.length > 2;
      }
      if (field === "favoriteMovie") {
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      }
      return field === "consentAll" || field === "consentAge"
        ? value === true
        : typeof value === "string"
        ? value.trim() !== ""
        : value !== null;
    });
  };

  const handleNextStep = () => {
    if (isStepValid()) setStep((prev) => prev + 1);
    else alert("모든 필드를 입력해주세요.");
  };

  const handleBackStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    const isValid = Object.keys(inputData).every((key) => {
      const value = inputData[key as keyof IInputData];
      if (key === "profileImage") {
        return typeof value === "string" && value.trim() !== "";
      }
      if (key === "favoriteGenres") {
        return Array.isArray(value) && value.length > 0;
      }
      if (key === "favoriteMovie") {
        return Array.isArray(value) && value.length >= 5 && value.length <= 15;
      }
      if (key === "consentAll" || key === "consentAge") {
        return value === true;
      }
      return typeof value === "string" ? value.trim() !== "" : value !== null;
    });

    if (isValid) {
      alert("회원가입이 완료되었습니다!");
      console.log("회원가입 데이터:", inputData);
    } else {
      alert("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
    }
  };

  const { components } = steps[step - 1];

  return (
    <div css={wrapper}>
      <div css={backWrapper}>
        <div css={progressBarContainer}>
          <div css={progressStyle((step / steps.length) * 100)} />
        </div>
        <div css={backButtonWrapper}>
          {step > 1 && (
            <button css={backButtonStyle} onClick={handleBackStep}>
              <BackButtonIcon width="16px" height="16px" />
              <p>뒤로</p>
            </button>
          )}
        </div>
      </div>

      {components.map((component) => component)}
      <div css={responsiveButtonWrapper}>
        <Button.Confirm
          onClick={step === steps.length ? handleComplete : handleNextStep}
          $isDisabled={!isStepValid()}
          style={{
            maxWidth: "768px",
            width: "100%",
            fontSize: "16px",
          }}
        >
          <Text.TitleMenu300 color="White" style={{ fontSize: "16px" }}>
            {step === steps.length ? "완료" : "다음"}
          </Text.TitleMenu300>
        </Button.Confirm>
      </div>
    </div>
  );
}
