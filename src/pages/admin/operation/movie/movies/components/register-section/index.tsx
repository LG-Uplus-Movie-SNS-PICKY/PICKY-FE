import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios, { AxiosError } from "axios";

import styles from "./index.styles";

import Search from "@assets/icons/search.svg?react";
import AddCircle from "@assets/icons/add_circle.svg?react";
import Logo from "@assets/icons/main_logo.svg?react";

import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Check from "@assets/icons/check.svg?react";

import { useDetailMovieInfo, useSearchMovie } from "@hooks/movie";
import { fetchMovieCreate } from "@api/movie";
import Loading from "@components/loading";
import { LoadingContainer } from "@pages/movie-detail/reviews/index.styles";
import { Toast } from "@stories/toast";

// // Swiper Lib Import
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Mousewheel } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

interface Movie {
  [key: string]: unknown;
  id: number;
  backdrop_path: string;
  title: string;
  original_title: string;
  release_date: string;
}

interface Genres {
  id: number;
  name: string;
}

interface DetailMovie {
  [key: string]: unknown;
  title: string;
  original_title: string;
  genres: Genres[];
  release_date: string;
  overview: string;
  poster_path: string;
}

const streamingServie = [
  { icon: Netflix, name: "netflix" },
  { icon: Diesney, name: "disney" },
  { icon: Watcha, name: "watcha" },
  { icon: Wavve, name: "wavve" },
  { icon: Tving, name: "tving" },
  { icon: Coupang, name: "coupang" },
];

function RegistMovieSection() {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [movieSearch, setMovieSearch] = useState<string>("");

  const [isInputFocus, setIsInputFocus] = useState<boolean>(false); // 입력창 포커스(활성화 도중에만 자동완성 검색 결과 보이기)

  const [movieId, setMovieId] = useState<number>(0);

  const [trailerInputValue, setTrailerInputValue] = useState("");
  const [ostInputValue, setOstInputValue] = useState("");
  const [behindInputValue, setBehindInputValue] = useState("");

  const [isPosterImageLoading, setIsPosterImageLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  // const [movieInfo, setMovieInfo] = useState<DetailMovie | null>(null);
  const [activeOttBtn, setActiveOttBtn] = useState<Record<string, boolean>>({
    netflix: false,
    disney: false,
    watcha: false,
    wavve: false,
    tving: false,
    coupang: false,
  });

  // lodash debounce 함수 정의 -> debounce: 짧은 시간 간격으로 발생하는 이벤트를 바로 호출하는 것이 아닌 마지막 이벤트 핸들러만 호출
  const handleSearch = debounce((value) => setMovieSearch(value), 300);

  // 검색어 Input Change Event Handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInputValue(value);
    handleSearch(value);
  };

  // TMDB를 통해 불러온 영화 데이터 캐싱
  const {
    data: result = [],
    isLoading: isSearchLoadign,
    isError: isSearchError,
  } = useSearchMovie(movieSearch);

  // TMDB를 통해 불러온 영화 상세 정보 데이터 캐싱
  const {
    data: movieInfo,
    isLoading: isMovieInfoLoading,
    isError: isMovieInfoError,
  } = useDetailMovieInfo(movieId);

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault();

    if (movieInfo && behindInputValue && ostInputValue) {
      try {
        await fetchMovieCreate(
          movieInfo,
          trailerInputValue,
          ostInputValue,
          [behindInputValue],
          activeOttBtn
        );

        setToastMessage("영화가 등록되었습니다.");

        setTimeout(() => {
          setSearchInputValue("");
          setMovieSearch("");
          setMovieId(0);
          setTrailerInputValue("");
          setOstInputValue("");
          setBehindInputValue("");
        }, 1000);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setToastMessage(error.response.data.message);
          }
        }
      }
    }
  };

  return (
    <>
      {/* 영화 등록 Form */}
      <form
        onSubmit={(event: React.FormEvent<Element>) => onSubmit(event)}
        css={styles.registerForm()}
      >
        <div css={styles.registerContainer()}>
          {/* 영화 검색 Input */}
          <div css={styles.registerSearch()}>
            <div className="search">
              <input
                type="text"
                placeholder="등록할 영화 제목 입력"
                value={searchInputValue}
                onChange={handleChange}
                onFocus={() => setIsInputFocus(true)}
                onBlur={() => setIsInputFocus(false)}
              />
              <button>
                <Search width="18px" height="18px" />
              </button>
            </div>

            {/* 자동완성 */}
            {isInputFocus && movieSearch !== "" && (
              <ul css={styles.movieAutoCompleteContainer(result.length > 0)}>
                {isSearchLoadign && (
                  <li className="loading">
                    <Loading />
                  </li>
                )}
                {isSearchError && (
                  <li className="error">잠시 후 다시 시도해주세요...</li>
                )}
                {result.length > 0 &&
                  result.slice(0, 5).map((element: Movie) => (
                    <li
                      key={element.id}
                      className="list-item"
                      onMouseDown={() => setMovieId(element.id)}
                    >
                      <div>
                        <div className="poster">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`}
                          />
                        </div>

                        <div className="title">
                          <h3>{element.title}</h3>

                          <div>
                            <span>{element.original_title}</span>
                            <span>{element.release_date}</span>
                          </div>
                        </div>
                      </div>

                      <AddCircle width="24px" height="24px" />
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* 영화 등록 Button */}
          <button css={styles.registerButton()}>등록하기</button>
        </div>

        <div css={styles.movieDetailContainer()}>
          {!movieInfo ? (
            <div className="no-detail-movie-info">
              <div className="logo">
                <Logo />
              </div>
              <h3>검색창에 영화 제목 검색 후 리스트 중 하나를 선택해주세요</h3>
            </div>
          ) : (
            <div css={styles.movieDetailInfoContainer()}>
              {/* Movie Detail Info */}
              <div className="movie-detail-info">
                <div css={styles.movieDetailTop()}>
                  <div className="detail">
                    {/* Title, Genres, Release */}
                    <div className="info">
                      <h3>제목</h3>
                      <span>
                        {movieInfo?.title}({movieInfo?.original_title})
                      </span>
                    </div>

                    <div className="info">
                      <h3>장르</h3>
                      <span>
                        {movieInfo?.genres
                          .map(
                            (genre: { [key: string]: unknown; name: string }) =>
                              genre.name
                          )
                          .join(", ")}
                      </span>
                    </div>

                    <div className="info">
                      <h3>출시년도</h3>
                      <span>{movieInfo?.release_date}</span>
                    </div>
                  </div>

                  {/* Movie Poster */}
                  <div className="movie-poster">
                    <LazyLoadImage
                      src={`${import.meta.env.VITE_TMDB_IMAGE_URL}/${
                        movieInfo?.poster_path
                      }`}
                      effect={"blur"}
                      onLoad={() => setIsPosterImageLoading(true)}
                      onError={() => setIsPosterImageLoading(false)}
                    />

                    {!isPosterImageLoading && (
                      <span>{movieInfo?.original_title}</span>
                    )}
                  </div>
                </div>

                <div className="desciprtion">
                  <h3>소개</h3>
                  <p>{movieInfo?.overview}</p>
                </div>

                {/* Actress - Swiper */}

                {/* Trailer, OST or Behind Id Input */}
                <div css={styles.inputContainer()}>
                  <div className="input">
                    <label htmlFor="trailer">예고편</label>
                    <div>
                      <input
                        type="text"
                        id="trailer"
                        placeholder="영화의 예고편 주소를 작성해주세요."
                        value={trailerInputValue}
                        onChange={(event) =>
                          setTrailerInputValue(event.target.value)
                        }
                      />
                      <span>
                        * Youtube 재생목록의 List Param 값을 기입해주세요.
                      </span>
                    </div>
                  </div>

                  <div className="input">
                    <label htmlFor="ost">OST</label>
                    <div>
                      <input
                        type="text"
                        id="ost"
                        placeholder="영화의 OST 주소를 작성해주세요."
                        value={ostInputValue}
                        onChange={(event) =>
                          setOstInputValue(event.target.value)
                        }
                      />
                      <span>
                        * Youtube 재생목록의 List Param 값을 기입해주세요.
                      </span>
                    </div>
                  </div>

                  <div className="input">
                    <label htmlFor="behind">비하인드</label>
                    <div>
                      <input
                        type="text"
                        id="behind"
                        placeholder="영화의 비하인드 주소를 작성해주세요."
                        value={behindInputValue}
                        onChange={(event) =>
                          setBehindInputValue(event.target.value)
                        }
                      />
                      <span>
                        * Youtube 재생목록의 List Param 값을 기입해주세요.
                      </span>
                    </div>
                  </div>
                </div>

                {/* OTT Select */}
                <div className="select-box">
                  {streamingServie.map((data, idx) => {
                    return (
                      <div
                        key={idx}
                        className="icon-btn"
                        onClick={() =>
                          setActiveOttBtn((prev) => ({
                            ...prev,
                            [data.name]: !activeOttBtn[data.name],
                          }))
                        }
                        // style={data.name === "coupangplay" && {}}
                      >
                        {activeOttBtn[data.name] && (
                          <div className="selected">
                            <Check />
                          </div>
                        )}
                        {React.createElement(data.icon)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>

      {toastMessage && <Toast message={toastMessage} direction="none" />}
    </>
  );
}

export default RegistMovieSection;
