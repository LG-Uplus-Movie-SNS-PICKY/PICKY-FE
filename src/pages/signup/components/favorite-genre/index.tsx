/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import Emoji from "../emoji";
import { inputState } from "../../../../review/atoms";
import {
  wrapper,
  pageContainer,
  titleWrapper,
  titleContainer,
  genreGrid,
  title,
  subtitle,
  requiredBadge,
  TextWrapper,
  Warning,
  genreButton,
} from "./index.styles";

import action from "@assets/images/action.png";
import romance from "@assets/images/romance.png";
import musical from "@assets/images/musical.png";
import comedy from "@assets/images/comedy.png";
import crime from "@assets/images/crime.png";
import animation from "@assets/images/animation.png";
import documentary from "@assets/images/documentary.png";
import horror from "@assets/images/horror.png";
import darama from "@assets/images/drama.png";
import fantasy from "@assets/images/fantasy.png";
import thriller from "@assets/images/thriller.png";
import sf from "@assets/images/sf.png";
import western from "@assets/images/western.png";
import mystery from "@assets/images/mystery.png";
import tv from "@assets/images/tv.png";
import war from "@assets/images/war.png";
import history from "@assets/images/history.png";
import family from "@assets/images/family.png";
import adventure from "@assets/images/adventure.png";

const genres = [
  { id: 28, name: "액션", emoji: <Emoji src={action} alt="액션" /> },
  { id: 10749, name: "로맨스", emoji: <Emoji src={romance} alt="로맨스" /> },
  { id: 35, name: "코미디", emoji: <Emoji src={comedy} alt="코미디" /> },
  { id: 18, name: "드라마", emoji: <Emoji src={darama} alt="드라마" /> },
  { id: 80, name: "범죄", emoji: <Emoji src={crime} alt="범죄" /> },
  {
    id: 99,
    name: "다큐멘터리",
    emoji: <Emoji src={documentary} alt="다큐멘터리" />,
  },
  {
    id: 16,
    name: "애니메이션",
    emoji: <Emoji src={animation} alt="애니메이션" />,
  },
  { id: 10402, name: "음악", emoji: <Emoji src={musical} alt="음악" /> },
  { id: 53, name: "스릴러", emoji: <Emoji src={thriller} alt="스릴러" /> },
  { id: 27, name: "호러", emoji: <Emoji src={horror} alt="호러" /> },
  { id: 878, name: "SF", emoji: <Emoji src={sf} alt="SF" /> },
  { id: 12, name: "판타지", emoji: <Emoji src={fantasy} alt="판타지" /> },
  { id: 14, name: "모험", emoji: <Emoji src={adventure} alt="모험" /> },
  { id: 10751, name: "가족", emoji: <Emoji src={family} alt="가족" /> },
  { id: 36, name: "역사", emoji: <Emoji src={history} alt="역사" /> },
  { id: 10752, name: "전쟁", emoji: <Emoji src={war} alt="전쟁" /> },
  { id: 10770, name: "TV 영화", emoji: <Emoji src={tv} alt="TV 영화" /> },
  { id: 9648, name: "미스터리", emoji: <Emoji src={mystery} alt="미스터리" /> },
  { id: 37, name: "서부", emoji: <Emoji src={western} alt="서부" /> },
];

const MovieGenreSelector = () => {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [isValid, setIsValid] = useState(true);

  const validateGenres = useCallback(() => {
    const genreCount = inputData.favoriteGenres.length;
    return genreCount >= 3 && genreCount <= 5;
  }, [inputData.favoriteGenres]);

  const toggleGenre = (id: number) => {
    setInputData((prev) => {
      const updatedGenres = prev.favoriteGenres.includes(id)
        ? prev.favoriteGenres.filter((genreId) => genreId !== id)
        : prev.favoriteGenres.length < 5
        ? [...prev.favoriteGenres, id]
        : prev.favoriteGenres;

      return {
        ...prev,
        favoriteGenres: updatedGenres,
      };
    });
  };

  useEffect(() => {
    setIsValid(validateGenres());
  }, [inputData.favoriteGenres, validateGenres]);

  return (
    <div css={wrapper}>
      <div css={pageContainer}>
        <div css={titleWrapper}>
          <div css={titleContainer}>
            <h2 css={title}>🧸 좋아하는 영화 장르를 선택해 주세요.</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <span css={subtitle}>
            평소 좋아하는 영화 장르를 골라주세요.(3개~5개)
          </span>
        </div>
        <div css={genreGrid}>
          {genres.map((genre) => (
            <button
              key={genre.id}
              css={genreButton(inputData.favoriteGenres.includes(genre.id))}
              onClick={() => toggleGenre(genre.id)}
            >
              <span css={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {genre.emoji}
                {genre.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div css={TextWrapper} style={{ height: "20px" }}>
        <div
          css={Warning}
          style={{ visibility: isValid ? "hidden" : "visible" }}
        >
        </div>
      </div>
    </div>
  );
};

export default MovieGenreSelector;
