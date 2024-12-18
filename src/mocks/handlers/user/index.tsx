import { http, HttpHandler, HttpResponse } from "msw";
import genres from "@constants/json/genres/genres.json";

// Movie 관련 모킹 API(Mocking Object) 설계
const userHandler: HttpHandler[] = [
  // 장르의 종류를 가져오는 모킹 API
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/genres`, () => {
    return HttpResponse.json(
      {
        data: genres.map((genre) => ({
          genreId: genre.genre_id,
          name: genre.genre_name,
        })),
      },
      { status: 200 }
    );
  }),
];

export default userHandler;
