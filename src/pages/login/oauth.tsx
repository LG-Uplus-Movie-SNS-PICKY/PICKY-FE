import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("LoginCallback useEffect triggered");

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");
    console.log(code);
    console.log(state);
    if (!code || !state) {
      alert("잘못된 로그인 요청입니다. 다시 시도해주세요.");
      return;
    }

    // 소셜 로그인 API 요청
    axios
      // .get(`http://api.picky-movie.com/api/v1/oauth/naver/user`, {
        .get(`https://api.picky-movie.com/api/v1/oauth/naver/user`, {
        params: { code, state },
      })
      .then((response) => {
        // 응답 데이터 디버깅
        console.log("Response data:", response.data.data);

        // 토큰 및 데이터 확인
        const { oAuth2Token, localJwtDto, isRegistrationDone } = response.data.data;

        if (
          oAuth2Token?.access_token &&
          oAuth2Token?.refresh_token &&
          localJwtDto?.accessToken
        ) {
          // sessionStorage에 저장
          sessionStorage.setItem("access_token", oAuth2Token.access_token);
          sessionStorage.setItem("refresh_token", oAuth2Token.refresh_token);
          sessionStorage.setItem("accessToken", localJwtDto.accessToken);
          console.log("Tokens stored successfully.");
        } else {
          alert("로그인 처리 중 문제가 발생했습니다.");
          return;
        }

        // 회원가입 여부 확인 후 페이지 이동
        if (isRegistrationDone) {
          navigate("/");
        } else {
          navigate("/auth/sign-up");
        }
      })
      .catch((error) => {
        // 에러 처리
        if (error.response) {
          console.error("Error response from server:", error.response);
          alert(`서버 오류: ${error.response.data.message}`);
        } else if (error.request) {
          console.error("No response received. Request details:", error.request);
          alert("서버로부터 응답이 없습니다. 다시 시도해주세요.");
        } else {
          console.error("Request setup error:", error.message);
          alert("요청 설정 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      });
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;