/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
  NAVER_LOGIN_URL,
} from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver } from "../../assets/svg";
import Picky_main_Logo from "@assets/icons/picky_main_logo.svg?react";
import { StyledText } from "./index.styles";
import { Block, Text } from "../../styles/ui";
import SEO from "@components/seo";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
// import { Cookies } from "react-cookie";
import { setCookie } from "@util/cookie";

export default function Login() {
  const navigate = useNavigate();
  const setIsLoginState = useSetRecoilState(isLogin);

  const handleKakaoLoginClick = () => {
    window.location.href = `${KAKAO_LOGIN_URL}`;
  };
  const handleGoogleLoginClick = () => {
    window.location.href = `${GOOGLE_LOGIN_URL}`;
  };
  const handleNaverLoginClick = async () => {
    window.location.href = `${NAVER_LOGIN_URL}`;
  };

  const socialLoginClikc = async () => {
    try {
      const data = await axios
        .patch(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
          { id: 5 },
          {
            headers: {
              Authorization: "1",
            },
          }
        )
        .then((res) => res.data);

      setCookie("user", data, {
        path: "/", // 모든 경로에서 접근 가능
        maxAge: 60 * 60 * 24, // 1일 (초 단위)
        sameSite: "strict", // 보안 설정
        secure: true, // HTTPS 필요 여부 (개발 시 false)
      });

      setIsLoginState({
        isLoginState: true,
        isAuthUser: data.isAuthUser,
        isLoginInfo: data.user,
        isLoading: false,
      });

      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <SEO
        title="PICKY: 로그인"
        description="PICKY에 로그인 하고 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스를 이용해 보세요"
      />

      <Block.FlexBox
        $width="100%"
        $height="100vh"
        $direction="column"
        $alignItems="center"
        $justifyContent="center"
        $gap="34px"
      >
        <Text.TitleMenu100>영화인 필수!</Text.TitleMenu100>
        <Text.TitleMenu300>영화 리뷰 1등 플랫폼</Text.TitleMenu300>

        <Block.FlexBox $direction="column" $alignItems="center" $gap="108px">
          <Picky_main_Logo width={300} height={100} />
          <div css={StyledText}>⚡️간편로그인으로 3초만에 빠르게 회원가입!</div>
        </Block.FlexBox>

        <Block.FlexBox $justifyContent="center" $gap="50px">
          <BtnKakao
            onClick={handleKakaoLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
          <BtnNaver
            onClick={handleNaverLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
          <BtnGoogle
            onClick={handleGoogleLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
        </Block.FlexBox>

        {process.env.NODE_ENV === "development" && (
          <button onClick={socialLoginClikc} style={{ cursor: "pointer" }}>
            Local Login Btn
          </button>
        )}
      </Block.FlexBox>
    </>
  );
}
