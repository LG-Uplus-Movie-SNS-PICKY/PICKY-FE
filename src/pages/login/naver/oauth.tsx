import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../review/atoms";
import { Toast } from "@stories/toast";
import { Cookies } from "react-cookie";
import { isLogin } from "@recoil/atoms/isLoginState";
import { getCookie, setCookie } from "@util/cookie";
import { fetchGetUserInfo } from "@api/user";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setIsLoginState = useSetRecoilState(isLogin);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");
    const cookies = new Cookies();

    if (!code || !state) {
      setToastMessage("잘못된 로그인 요청입니다. 다시 시도해주세요.");
      return;
    }

    setIsLoading(true);

    axios
      .get(`https://api.picky-movie.com/api/v1/oauth/naver/user`, {
        params: { code, state },
      })
      .then(async (response) => {
        // 소셜 로그인 서비스에서 정보를 제대로 전달 받았을 경우

        const { oAuth2Token, localJwtDto, isRegistrationDone, role } =
          response.data.data;

        console.log("Response");
        console.log(response);
        console.log();

        console.log("Response Data");
        console.log(response.data);
        console.log();

        console.log("Response Data Data");
        console.log(response.data.data);
        console.log();

        if (
          oAuth2Token?.access_token &&
          oAuth2Token?.refresh_token &&
          localJwtDto?.accessToken
        ) {
          // 소셜 로그인을 위한 oAuth2Token, localJwtDTO, 회원가입 여부(isRegisterationDone)을 일단 쿠키에 저장한다.
          // -> 이유: 비로그인 사용자가 개인 정보를 입력할 때 localJwtDTO를 통해서 닉네임, 장르 선택, 영화 GET / POST를 위한 Headers으로 사용이 되어야 하기 때문
          // cookies.set(
          //   "user",
          //   JSON.stringify({
          //     oAuth2Token,
          //     localJwtDto,
          //     isRegistrationDone,
          //   })
          // );

          setCookie(
            "user",
            JSON.stringify({
              oAuth2Token,
              localJwtDto,
              isRegistrationDone,
              isAuthUser: role === "ADMIN",
            }),
            {
              path: "/", // 모든 경로에서 접근 가능
              maxAge: 60 * 60 * 24, // 1일 (초 단위)
              sameSite: "strict", // 보안 설정
              secure: false, // HTTPS 필요 여부 (개발 시 false)
            }
          );

          if (isRegistrationDone) {
            const currentUserCookie = getCookie("user");

            console.log("Current User Cookie");
            console.log(currentUserCookie);
            console.log();

            // User GET API 모듈로 분리
            const userResponse = await fetchGetUserInfo();

            // Cookie에 저장할 새로운 정보
            const newUserData = {
              ...currentUserCookie,
              isAuthUser: role === "ADMIN",
              user: {
                birthdate: userResponse.data.birthdate,
                name: userResponse.data.name,
                nickname: userResponse.data.nickname,
                gender: userResponse.data.gender,
                nationality: userResponse.data.nationality,
                email: userResponse.data.email,
                profileUrl: userResponse.data.profileUrl,
              },
            };

            // 로그인 사용자의 쿠키 값을 설정
            // cookies.set("user", JSON.stringify(newUserData));
            setCookie("user", JSON.stringify(newUserData), {
              path: "/", // 모든 경로에서 접근 가능
              maxAge: 60 * 60 * 24, // 1일 (초 단위)
              sameSite: "strict", // 보안 설정
              secure: false, // HTTPS 필요 여부 (개발 시 false)
            });

            // 전역 상태로 관리할 유저의 정보 -> 중요하지 않은 정보
            setIsLoginState({
              isLoginState: true, // 로그인이 된 상태
              isAuthUser: newUserData.isAuthUser,
              isLoginInfo: newUserData.user,
              isLoading: false,
            });

            setToastMessage("로그인에 성공했습니다!");
            // setTimeout(() => navigate("/"), 2000);
          } else {
            // 유저 정보가 등록되지 않았을 경우
            // console.error("User API error:", );

            // console.log(getCookie("user"));
            setToastMessage(
              "등록되지 않은 사용자입니다. 잠시 후 개인정보 입력 페이지로 넘어가겠습니다."
            );
            setTimeout(() => navigate("/auth/sign-up"), 2000);
          }
        } else {
          setToastMessage("로그인 처리 중 문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        // 소셜 로그인 서비스에서 제대로 된 정보를 받지 못했을 경우

        console.error("Social login API error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "로그인 처리 중 문제가 발생했습니다.";
        setToastMessage(errorMessage);
      })
      .finally(() => {
        // 성공, 실패에 상관없이 무조건 한 번은 실행되는 코드

        setIsLoading(false);
      });
  }, [navigate, setUserState, setIsLoginState]);

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} />}
      {isLoading && <div>로그인 처리 중...</div>}
    </div>
  );
};

export default LoginCallback;
