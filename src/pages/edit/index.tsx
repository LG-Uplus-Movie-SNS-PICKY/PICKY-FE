import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { debounce } from "lodash";
import profileIcon from "@assets/icons/profile.svg";
import {
  containerStyle,
  headerStyle,
  headerTitleStyle,
  profileImageContainerStyle,
  profileImageStyle,
  labelStyle,
  photoEditStyle,
  inputRowStyle,
  inputWrapperStyle,
  inputLabelStyle,
  readonlyInputStyle,
  edityInputStyle,
  errorTextStyle,
  profileWrapper,
  saveButtonStyle,
  buttonWrapper,
  photoEditWrapper,
} from "./index.styles";
import SEO from "@components/seo";
import { Toast } from "@stories/toast";

export default function ProfileEditPage() {
  const [userData, setUserData] = useState({
    name: "",
    nickname: "",
    profile_url: "",
    birthdate: "",
    gender: "",
    nationality: "",
    movieId: [],
    genreId: [],
  });

  const [nickname, setNickname] = useState(userData.nickname);
  const [profileImage, setProfileImage] = useState(userData.profile_url);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);

  const accessToken = sessionStorage.getItem("accessToken");

  // Toast 표시 함수
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response.data.data;
        setUserData({
          name: data.name,
          nickname: data.nickname,
          profile_url: data.profile_url,
          birthdate: data.birthdate,
          gender: data.gender === "MALE" ? "남자" : "여자",
          nationality: data.nationality === "DOMESTIC" ? "내국인" : "외국인",
          movieId: data.movieId || [],
          genreId: data.genreId || [],
        });
        setNickname(data.nickname);
        setProfileImage(data.profile_url);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error);
        showToast("사용자 정보를 불러오는 데 실패했습니다.");
      }
    };
  
    fetchUserData();
  }, [accessToken]);


  const checkNicknameAvailability = useCallback(async (nickname: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/nickname-validation`,
        { params: { nickname } }
      );

      if (!response.data.data.isValid) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsNicknameValid(false);
      } else {
        setNicknameError(null);
        setIsNicknameValid(true);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
      setIsNicknameValid(false);
    }
  }, []);

  const debouncedCheckNickname = useMemo(
    () =>
      debounce((nickname: string) => {
        checkNicknameAvailability(nickname);
      }, 100),
    [checkNicknameAvailability]
  );

  useEffect(() => {
    if (userData.nickname && userData.profile_url) {
      setNickname(userData.nickname);
      setProfileImage(userData.profile_url);
    }
  }, [userData]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 10) {
      return;
    }

    setNickname(value);

    if (value.length < 2 || value.length > 10) {
      setNicknameError("닉네임은 2자 이상, 10자 이하로 입력해주세요.");
      setIsNicknameValid(false);
    } else if (/\s/.test(value)) {
      setNicknameError("닉네임에 공백은 포함될 수 없습니다.");
      setIsNicknameValid(false);
    } else {
      setNicknameError(null);
      setIsNicknameValid(null);
      debouncedCheckNickname(value);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      // 파일 크기 제한: 5MB
      if (file.size > 5 * 1024 * 1024) {
        setImageError("이미지 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
          setImageError(null);
        } else {
          setImageError("이미지를 처리하는 중 문제가 발생했습니다.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!accessToken) {
      showToast("인증 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }
    const isUnchanged =
      nickname === userData.nickname && profileImage === userData.profile_url;
  
    if (isUnchanged) {
      showToast("변경 사항이 없습니다.");
      return;
    }
  
    if (nicknameError || imageError || isNicknameValid === false) {
      showToast("입력을 확인해주세요.");
      return;
    }
  
    const payload = {
      name: userData.name,
      nickname,
      profile_url: profileImage,
      birthdate: userData.birthdate,
      gender: userData.gender.toUpperCase(),
      nationality: userData.nationality.toUpperCase(),
      movieId: userData.movieId,
      genreId: userData.genreId,
    };
  
    console.log(payload);
  
    try {
      const accessToken = sessionStorage.getItem("accessToken");
  
      if (!accessToken) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인 해주세요.");
      }
  
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        showToast("프로필이 성공적으로 수정되었습니다.");
        setUserData({
          ...userData,
          nickname,
          profile_url: profileImage,
        });
      } else {
        throw new Error("프로필 수정 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
      showToast("프로필 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDisabledClick = () => {
    if (!isSaveDisabled) return;

    const isUnchanged =
      nickname === userData.nickname && profileImage === userData.profile_url;
    if (isUnchanged) {
      showToast("변경 사항이 없습니다.");
    } else if (nicknameError || imageError) {
      showToast("닉네임의 요구사항을 따라주세요.");
    }
  };

  useEffect(() => {
    const isUnchanged =
      nickname === userData.nickname && profileImage === userData.profile_url;
  
    const hasError =
      !!nicknameError || !!imageError || isNicknameValid === false;
  
    setIsSaveDisabled(isUnchanged || hasError);
  }, [nickname, profileImage, nicknameError, imageError, isNicknameValid, userData]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <SEO title={`${nickname}: 프로필 수정`} />

      <div css={containerStyle}>
        <header css={headerStyle}>
          <h1 css={headerTitleStyle}>프로필 편집</h1>
        </header>

        <div css={profileImageContainerStyle}>
          <div css={profileWrapper}>
            <img
              src={profileImage || profileIcon}
              alt="프로필 이미지"
              css={profileImageStyle}
            />
            <label htmlFor="profileImageInput" css={photoEditWrapper}>
              <p css={photoEditStyle}>사진수정</p>
            </label>
          </div>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        <div css={profileWrapper}>
          <div css={inputRowStyle}>
            <label css={inputLabelStyle}>닉네임</label>
            <div css={inputWrapperStyle}>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                css={edityInputStyle}
                maxLength={10}
              />
              <span
                css={errorTextStyle}
                style={{
                  visibility: nicknameError ? "visible" : "hidden",
                }}
              >
                {nicknameError && nicknameError}
              </span>
            </div>
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>이름</label>
            <input
              type="text"
              value={userData.name}
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>생년월일</label>
            <input
              type="text"
              value={userData.birthdate}
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>성별</label>
            <input
              type="text"
              value={userData.gender}
              readOnly
              css={readonlyInputStyle}
            />
          </div>

          <div css={inputRowStyle}>
            <label css={labelStyle}>국적</label>
            <input
              type="text"
              value={userData.nationality}
              readOnly
              css={readonlyInputStyle}
            />
          </div>
        </div>
        <div css={buttonWrapper}>
          <button
            onClick={isSaveDisabled ? handleDisabledClick : handleSave}
            css={saveButtonStyle}
            style={{
              backgroundColor: isSaveDisabled ? "#d9d9d9" : "#ff084a",
              cursor: isSaveDisabled ? "not-allowed" : "pointer",
            }}
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}