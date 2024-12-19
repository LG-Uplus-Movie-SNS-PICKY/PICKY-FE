import React, { useEffect, useState } from "react";
import styles from "./index.styles";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import GenreTab from "../genre-tab";
import { useGenreMovieQuery } from "@hooks/movie";
import { useInView } from "react-intersection-observer";
import Loading from "@components/loading";
import { MovieDataTypes } from "@type/api/movie";
import { MovieItem } from "@stories/movie-item";

import Checked from "@assets/icons/checked-movie.svg?react";
import { Toast } from "@stories/toast";
import { fetchCreatePlaylist, fetchUpdatePlaylist } from "@api/playlist";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export interface ModalStateTypes {
  type: "create" | "edit";
  playlistId: number;
  title: string;
  movieIds: number[];
  open: boolean;
}

interface ModalProps {
  type: "create" | "edit";
  openModal?: ModalStateTypes;
  setOpenModal: React.Dispatch<React.SetStateAction<ModalStateTypes>>;
  initialTitle?: string;
  initialMovies?: number[];
}

function Modal({
  type,
  openModal,
  setOpenModal,
  initialTitle = "",
  initialMovies = [],
}: ModalProps) {
  const [title, setTitle] = useState<string>(initialTitle); // 초기 제목 설정
  const [selectMovie, setSelectMovie] = useState<number[]>(initialMovies); // 초기 영화 설정

  const isCreate = type === "create"; // 모달 타입 정의

  const loadable = useRecoilValueLoadable(genresSelector);

  const [selectButton, setSelectButton] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (loadable.state === "hasValue" && loadable.contents.data.length > 0) {
      setSelectButton(loadable.contents.data[0].genreId);
    }
  }, [loadable]);

  const {
    data: genreMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGenreMovieQuery(selectButton ?? -1);

  const { ref, inView } = useInView({
    threshold: 0.7, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // 플레이리스트 추가 이벤트 핸들러
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isFlag = false;

    // Common Exception #1. 추가, 수정 상관 없이 선택한 영화의 개수가 부족할 경우
    if (selectMovie.length < 3 || selectMovie.length > 10) {
      setToastMessage("영화는 최소 3개에서 최대 10만 선택해주세요.");
    }

    // Common Exception #2. 추가, 수정 상관 없이 선택한 영화의 개수가 부족할 경우
    else if (!title && !selectMovie.length) {
      setToastMessage(
        "플레이리스트 제목을 작성하고, 추가할 영화를 선택해주세요."
      );
    }

    // Common Exception #3. 플레이리스트 제목을 작성하지 않은 경우
    else if (!title && selectMovie.length) {
      setToastMessage("플레이리스트 제목을 작성해주세요.");
    }

    // Common Exception #4. 플레이리스트에 아무런 영화도 선택하지 않을 경우
    else if (title && !selectMovie.length) {
      setToastMessage("플레이리스트에 추가할 영화를 선택해주세요.");
    }

    // 현재 모달 Type이 Create 모달이면서 모든 예외에 통과한 경우
    if (isCreate) {
      // 모든 예외에 통과한 경우
      await fetchCreatePlaylist(selectMovie, title);
      setToastMessage("플레이리스트가 추가되었습니다!!");
      isFlag = true;

      queryClient.refetchQueries({ queryKey: ["playlist"] });
    }

    // 현재 모달 Type이 Edit 모달이면서, 공통 예외를 모두 통과한 경우
    else {
      // Exception. 수정할 영화가 같을 경우
      if (selectMovie.toString() === initialMovies.toString()) {
        setToastMessage(
          "플레이리스트에 등록된 영화과 기존에 있던 항목들과 동일합니다."
        );
      }

      if (openModal?.playlistId) {
        await fetchUpdatePlaylist(openModal.playlistId, title, selectMovie);
        setToastMessage("플레이리스트가 수정되었습니다!!");
        queryClient.refetchQueries({ queryKey: ["playlist"] });
        isFlag = true;
      }
    }

    if (isFlag) {
      setTimeout(() => {
        setOpenModal({
          type: "create",
          open: false,
          title: "",
          movieIds: [],
          playlistId: 0,
        });
      }, 1000);
    }
  };

  return (
    // 모달 외부
    <div
      css={styles.modalOuter()}
      onClick={() =>
        setOpenModal({
          type: "create",
          open: false,
          title: "",
          movieIds: [],
          playlistId: 0,
        })
      }
    >
      {/* 모달 컨테이너 */}
      <form
        css={styles.modalContainer()}
        onClick={(event) => event.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div css={styles.modalTitle()}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="플레이리스트 제목"
          />
          <button type="submit">{isCreate ? "추가" : "수정"}</button>
        </div>

        <div style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}>
          {/* 영화 장르 선택 */}
          <GenreTab
            setSelectButton={setSelectButton}
            selectedGenres={selectButton ?? -1}
          />
        </div>

        <div css={styles.modalMovies()}>
          {/* 영화 조회 */}
          <div className="movies-container">
            {isLoading && <Loading />}
            {!genreMovies?.pages[0].data.content.length && <div>영화 없음</div>}
            {/* 영화 목록 */}
            <div className="movie-lists">
              {Array.isArray(genreMovies?.pages) &&
                genreMovies?.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {/* Playlist Data JSX Element Mapping  */}
                    {Array.isArray(page?.data.content) &&
                      page?.data.content.map((movie: MovieDataTypes) => (
                        <div
                          style={{ position: "relative" }}
                          key={movie.movieId}
                        >
                          {selectMovie.includes(movie.movieId) && (
                            <div
                              css={styles.select()}
                              onClick={() =>
                                setSelectMovie((selectMovies) =>
                                  selectMovies.filter(
                                    (select) => select !== movie.movieId
                                  )
                                )
                              }
                            >
                              <Checked />
                            </div>
                          )}
                          <MovieItem
                            type="basic"
                            src={movie.posterUrl}
                            name={movie.title}
                            title={movie.title}
                            disabled={true}
                            onClick={() =>
                              setSelectMovie((selectMovies) => [
                                ...selectMovies,
                                movie.movieId,
                              ])
                            }
                          />
                        </div>
                      ))}
                  </React.Fragment>
                ))}

              {/* Movies 마지막 영역 */}
              <div ref={ref} style={{ height: "10px" }} />
            </div>
          </div>
        </div>
      </form>

      {toastMessage && (
        <Toast
          message={toastMessage}
          direction="none"
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
}
export default Modal;
