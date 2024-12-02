/** @jsxImportSource @emotion/react */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import aboutTime from "../../../../assets/images/Rectangle 2.jpg";
import { ArrowLeft, ArrowRight, Checked } from "../../../../assets/svg";
import { inputState } from "../../../../review/atoms";
// import { Text } from "../ui";
import {
  consentWrapper,
  wrapper,
  titleWrapper,
  titleContainer,
  title,
  requiredBadge,
  subtitle,
  totalContainer,
  pageIndicator,
  currentPage,
  totalPages,
  movieGridWrapper,
  movieGrid,
  movieCard,
  movieImage,
  checkIcon,
  previousButton,
  nextButton,
  movieTitle,
  selectedCount
} from "./index.styles";

const MOVIES = [
  { id: 1, title: "어바웃타임", image: aboutTime },
  { id: 2, title: "인사이드아웃2", image: aboutTime },
  { id: 3, title: "타이타닉", image: aboutTime },
  { id: 4, title: "인터스텔라", image: aboutTime },
  { id: 5, title: "라라랜드", image: aboutTime },
  { id: 6, title: "기생충", image: aboutTime },
  { id: 7, title: "어벤져스", image: aboutTime },
  { id: 8, title: "겨울왕국", image: aboutTime },
  { id: 9, title: "미션임파서블", image: aboutTime },
  { id: 10, title: "미션임파서블", image: aboutTime },
  { id: 11, title: "미션임파서블", image: aboutTime },
  { id: 12, title: "미션임파서블", image: aboutTime },
  { id: 13, title: "미션임파서블", image: aboutTime },
  { id: 14, title: "미션임파서블", image: aboutTime },
  { id: 15, title: "미션임파서블", image: aboutTime },
  { id: 16, title: "미션임파서블", image: aboutTime },
  { id: 17, title: "미션임파서블", image: aboutTime },
  { id: 18, title: "미션임파서블", image: aboutTime },
  { id: 19, title: "미션임파서블", image: aboutTime },
  { id: 20, title: "미션임파서블", image: aboutTime },
  { id: 21, title: "미션임파서블", image: aboutTime },
  { id: 22, title: "미션임파서블", image: aboutTime },
  { id: 23, title: "미션임파서블", image: aboutTime },
  { id: 24, title: "미션임파서블", image: aboutTime },
  { id: 25, title: "미션임파서블", image: aboutTime },
  { id: 26, title: "미션임파서블", image: aboutTime },
  { id: 27, title: "미션임파서블", image: aboutTime },
];

const InputFavoriteMovie: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [inputData, setInputData] = useRecoilState(inputState);

  const moviesPerPage = 9;

  const toggleSelection = (id: number) => {
    setInputData((prev) => {
      const updatedMovies = prev.favoriteMovie.includes(id)
        ? prev.favoriteMovie.filter((movieId) => movieId !== id)
        : [...prev.favoriteMovie, id].slice(0, 10); // 최대 10개 제한
      return { ...prev, favoriteMovie: updatedMovies };
    });
  };

  const total = Math.ceil(MOVIES.length / moviesPerPage);
  const paginatedMovies = MOVIES.slice(
    (current - 1) * moviesPerPage,
    current * moviesPerPage
  );

  return (
    <div css={consentWrapper}>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <div css={titleContainer}>
            <h2 css={title}>어떤 영화를 좋아하나요?</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <div css={subtitle}>평소 좋아하는 영화를 골라주세요.(5개 ~ 10개)</div>
        </div>
      </div>

      <div css={totalContainer}>
        <div css={pageIndicator}>
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div css={selectedCount}>
              선택된 영화:{" "}
              <span css={{ color: "#FF084A" }}>
                {inputData.favoriteMovie.length}
              </span>
              개
            </div>
            <div>
              <span css={currentPage}>{current}</span>
              {" / "}
              <span css={totalPages}>{total}</span>
            </div>
          </div>
        </div>

        <div css={movieGridWrapper}>
          <button
            css={previousButton}
            onClick={() => setCurrent((prev) => prev - 1)}
            disabled={current === 1}
          >
            <ArrowLeft />
          </button>

          <div css={movieGrid}>
            {paginatedMovies.map((movie) => (
              <div
                key={movie.id}
                css={movieCard(inputData.favoriteMovie.includes(movie.id))}
                onClick={() => toggleSelection(movie.id)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  css={movieImage(inputData.favoriteMovie.includes(movie.id))}
                />
                {inputData.favoriteMovie.includes(movie.id) && (
                  <div css={checkIcon(true)}>
                    <Checked />
                  </div>
                )}
                <div
                  css={checkIcon(inputData.favoriteMovie.includes(movie.id))}
                />
                <p css={movieTitle}>
                  {movie.title.length > 8
                    ? `${movie.title.slice(0, 6)}...`
                    : movie.title}
                </p>
              </div>
            ))}
          </div>

          <button
            css={nextButton}
            onClick={() => setCurrent((prev) => prev + 1)}
            disabled={current === total}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputFavoriteMovie;
