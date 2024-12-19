import { http, HttpHandler, HttpResponse } from "msw";

import user from "@constants/json/user.json";
import { isEmpty } from "lodash";

const authHandler: HttpHandler[] = [
  // 로그인
  http.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
    async ({ request }) => {
      const authorization = request.headers.get("Authorization");

      // 권환이 없을 경우 403 에러 발생
      if (!authorization) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가해주세요. (임시로 아무값이나 넣어도 무관)",
          },
          { status: 403 }
        );
      }

      const body = (await request.json()) as { id: number };

      // Request Body를 보내지 않은 경우
      if (isEmpty(body)) {
        return HttpResponse.json(
          {
            message:
              "Body를 올바른 형식으로 작성해주세요. (SwaggerAPI - board-controlle 보고 참고)",
            errorCode: "ERR_EMPTY_BODY",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      const userInfo = user.find((info) => info.user_id === body.id);

      if (!userInfo) {
        return HttpResponse.json(
          {
            message: "존재하지 않는 사용자 정보입니다.",
            errorCode: "ERR_UNAUTHORIZED",
          },
          { status: 401, statusText: "Unauthorized" }
        );
      }

      const data = {
        oAuth2Token: {
          access_token: "string",
          refresh_token: "string",
          token_type: "string",
          expires_in: "string",
        },
        localJwtDto: {
          accessToken: "1"
        },
        isAuthUser: userInfo.user_role === "Admin",
        isRegistrationDone: true,
        user: {
          name: userInfo.user_name,
          nickname: userInfo.user_nickname,
          profile_url: userInfo.user_profile_url,
          birthdate: userInfo.user_birthdate,
          gender: userInfo.user_gender,
          nationality: userInfo.user_nationality,
          genres: [],
        },
      };

      return HttpResponse.json({ ...data }, { status: 200 });
    }
  ),

  // 프로필 페이지 접속 시 해당 사용자 유무 파악
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/validate-user`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const loginUser = JSON.parse(sessionStorage.getItem("user") || "{}");

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || isEmpty(loginUser)) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다 - Request Headers에 Authorization를 추가 또는 로그인을 해주세요.",
            errorCode: "AUTH_HEADER_MISSING",
          },
          { status: 403, statusText: "Forbidden" }
        );
      }

      const url = new URL(request.url);
      const nickname = url.searchParams.get("nickname");

      // 사용자 정보를 가져온다.
      const findUser = user.find((user) => user.user_nickname === nickname);

      if (isEmpty(findUser)) {
        return HttpResponse.json(
          {
            message: "존재하지 않는 사용자 프로필입니다.",
            errorCode: "USER_NOT_FOUND",
          },
          { status: 403, statusText: "Forbidden" }
        );
      }

      return HttpResponse.json(
        {
          message:
            findUser.user_nickname !== loginUser.user.nickname
              ? "OUTER_USER"
              : "USER",
        },
        { status: 200 }
      );
    }
  ),
];

export default authHandler;
