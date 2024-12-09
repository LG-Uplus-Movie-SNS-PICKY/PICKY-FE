import { isEmpty } from "lodash";
import { http, HttpHandler, HttpResponse } from "msw";

import movies from "@constants/json/movie/movie.json";
import movieAndGenres from "@constants/json/genres/movieAndGenre.json";
import movieCrews from "@constants/json/movie/movieCrew.json";
import filmCrew from "@constants/json/movie/filmCrew.json";
import movieBehindVideos from "@constants/json/movie/movieBehindVideos.json";
import platforms from "@constants/json/movie/platforms.json";
import movieLikes from "@constants/json/movie/movieLikes.json";

const movieHandlers: HttpHandler[] = [
  // 영화 등록 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie`,
    ({ request }) => {}
  ),

  // 영화 좋아요 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId/like`,
    ({ params, request }) => {}
  ),

  // 영화 상세 정보 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const { movieId } = params;

      // console.log()

      const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || !movieId || isEmpty(userInfo)) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Path Validation에 boardId를 추가했는지 또는 로그인을 하셨는지 확인해주세요.",
          },
          { status: 403 }
        );
      }

      // Path Validation으로 넘어온 값을 통해서 해당 영화 정보를 검색한다.
      const movieInfo = movies.find(
        (movie) => movie.movie_id === Number(movieId)
      );
      if (isEmpty(movieInfo)) {
        return HttpResponse.json(
          {
            message: "유효하지 않은 영화 ID 입니다.",
            errorCode: "ERR_INVALID_Movie_ID",
          },
          { status: 400, statusText: "Invalid Movie ID" }
        );
      }
      // response data 구성
      return HttpResponse.json(
        {
          // 영화 정보
          movie_info: {
            id: movieInfo.movie_id,
            original_title: movieInfo.movie_original_title,
            release_date: movieInfo.movie_release_data,
            poster_path: movieInfo.movie_poster_url,
            overview: movieInfo.movie_plot,
            runtime: movieInfo.movie_running_time,

            // 장르 정보 필터링
            genres: [
              ...movieAndGenres.filter((genre) => {
                if (genre.movie_id === movieInfo.movie_id) {
                  return {
                    id: genre.genre_id,
                  };
                }
              }),
            ],

            // 배우 or 제작진 필터링
            credits: {
              // 배우 정보
              cast: [
                ...movieCrews
                  .filter(
                    (crew) =>
                      crew.movie_id === movieInfo.movie_id &&
                      crew.movie_crew_position === "Actor"
                  )
                  .map((crew) => {
                    const actorInfo = filmCrew.find(
                      (actor) => actor.film_crew_id === crew.film_crew_id
                    );

                    return {
                      id: actorInfo?.film_crew_id,
                      character: crew.movie_crew_role,
                      original_name: actorInfo?.film_crew_name,
                      profile_path: actorInfo?.film_crew_profile_url,
                    };
                  }),
              ],
              crew: [],
              // 감독 정보
              directingCrew: [
                ...movieCrews
                  .filter(
                    (crew) =>
                      crew.movie_id === movieInfo.movie_id &&
                      crew.movie_crew_position === "Director"
                  )
                  .map((crew) => {
                    const directingCrewInfo = filmCrew.find(
                      (directing) =>
                        directing.film_crew_id === crew.film_crew_id
                    );

                    return {
                      id: directingCrewInfo?.film_crew_id,
                      job: crew.movie_crew_role,
                      original_name: directingCrewInfo?.film_crew_name,
                      profile_path: directingCrewInfo?.film_crew_profile_url,
                    };
                  }),
              ],
            },

            backdrop_path: "",
          },
          trailer: movieInfo.movie_trailer_url,
          ost: movieInfo.movie_ost_url,
          movie_behind_videos: movieBehindVideos.find(
            (video) => video.movie_id === movieInfo.movie_id
          ),
          platforms: platforms.filter(
            (platform) => platform.movie_id === movieInfo.movie_id
          ),
          like: !isEmpty(
            movieLikes
              .filter((like) => like.movie_id === movieInfo.movie_id)
              .find((like) => like.user_id === userInfo.user_id)
          ),
        },
        { status: 200 }
      );
    }
  ),

  // 영화 정보 업데이트 API(Mocking Object)
  http.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
    ({ params, request }) => {}
  ),

  // 영화 Top 10 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/top10`,
    ({ request }) => {}
  ),

  // 영화 추천 리스트 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/recommend`,
    ({ request }) => {}
  ),

  // 장르별 영화 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/genre`,
    ({ request }) => {}
  ),
];

export default movieHandlers;
