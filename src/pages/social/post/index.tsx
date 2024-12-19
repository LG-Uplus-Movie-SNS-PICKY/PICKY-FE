import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "@api/movie";
import { fetchMovieSearch } from "@api/user";
import MovieSearch from "@assets/icons/movie_search.svg?react";
import DelButton from "@assets/icons/delete.svg?react";
import BackPost from "@assets/icons/back_post.svg?react";
import Review from "@assets/icons/review.svg?react";
import { Button } from "@stories/button";
import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import {
  wrapper,
  postContainer,
  searchBox,
  searchSection,
  searchInputWithPadding,
  movieSearchIcon,
  autocompleteBox,
  autocompleteItem,
  modalOverlay,
  reviewSection,
  reviewContainer,
  reviewInput,
  charCount,
  spoilerSection,
  spoilerContainer,
  pText,
  buttonContainer,
  buttonStyle,
  activeButtonStyle,
  shareButton,
  searchContainer,
  deleteIcon,
  backButton,
  movieInfo,
  movieTitleStyle,
  movieDetails,
  movieGenres,
  modalContainer,
  movieCountry,
  activeAutocompleteItem,
  reviewIcon,
} from "./index.styles";
import { FileInput } from "@stories/file-input";
import { useQueryClient } from "@tanstack/react-query";
import { GENRE_EMOJI } from "@constants/genre";

interface MovieData {
  movieId: number;
  movieTitle: string;
  releaseDate: string;
  genres: { genreId: number; name: string }[];
  originalLanguage: string;
}

export default function SocialPost() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false); // 뒤로가기 모달 상태
  const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>("null");
  const [activeIndex, setActiveIndex] = useState<number>(-1); // 활성화된 항목 인덱스
  const [fileUrl, setFileUrl] = useState<string>("asdasdasd"); // 파일 URL 저장
  const [images, setImages] = useState<File[]>([]); // 이미지 상태
  const [videos, setVideos] = useState<File[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // 토스트 메시지 상태
  const [mediaFiles, setMediaFiles] = useState<File[]>([]); // 업로드 된 파일 정보를 나타내는 상태 변수
  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const isButtonActive =
    !!selectedMovie && !!reviewText.trim() && selectedSpoiler !== "null";

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      try {
        const results = await fetchMovieSearch(value);
        setFilteredMovies(results);
      } catch (error) {
        // console.error("영화 검색 중 오류 발생:", error);
      }
    } else {
      setFilteredMovies([]);
    }
  };

  const handleMovieSelect = (movie: MovieData) => {
    // console.log("선택된 영화:", movie.genres);
        
    setSelectedMovie({
      movieId: movie.movieId,
      movieTitle: movie.movieTitle,
      releaseDate: movie.releaseDate || "정보 없음", // 기본값 설정
      genres:
        movie.genres?.length > 0
          ? movie.genres
          : [{ genreId: 0, name: "장르 정보 없음" }],
      originalLanguage: movie.originalLanguage,
    });
    setSearchTerm(movie.movieTitle);
    setFilteredMovies([]);
    setIsModalOpen(false); // 오버레이를 닫음
  };

  const getHighlightedText = (
    text: string | undefined,
    highlight: string | undefined
  ) => {
    if (!text || !highlight) return text || ""; // 값이 없으면 원본 문자열 반환

    const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (startIndex === -1) return text;

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + highlight.length);
    const afterMatch = text.slice(startIndex + highlight.length);

    return (
      <>
        {beforeMatch}
        <span style={{ color: "#FF084A", fontWeight: "bold" }}>{match}</span>
        {afterMatch}
      </>
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredMovies.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredMovies.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredMovies.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleMovieSelect(filteredMovies[activeIndex]);
      }
    }
  };

  const handleOverlayClick = () => {
    setIsModalOpen(false);
    setFilteredMovies([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      setToastMessage("리뷰는 500자까지만 작성 가능합니다."); // 토스트 메시지 설정
      return;
    }
    setReviewText(e.target.value);
  };

  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredMovies([]);
  };

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...fileArray];
        return updatedImages;
      });
    }
  };

  const handleShareClick = async () => {
    if (!selectedMovie) return;

    try {
      await createBoard(
        reviewText,
        selectedMovie.movieId,
        selectedSpoiler === "있음",
        mediaFiles
      );

      setToastMessage("게시글이 성공적으로 생성되었습니다."); // 성공 메시지
      queryClient.invalidateQueries({ queryKey: ["movie-log"] });

      setTimeout(() => navigate("/movie-log"), 1500);
    } catch (error) {
      setToastMessage("게시글 생성에 실패했습니다.");
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "정보 없음";
    return dateString.split("T")[0];
  };

  return (
    <div css={wrapper}>
      {isModalOpen && <div css={modalOverlay} onClick={handleOverlayClick} />}

      {isBackModalOpen && (
        <>
          <div css={modalOverlay} onClick={() => setIsBackModalOpen(false)} />
          <div css={modalContainer}>
            <Modal
              message="공유하지 않고 화면을 나가면 작성 중인 리뷰가 삭제될 수 있습니다. 나가시겠습니까?"
              confirmText="나가기"
              cancelText="취소"
              onConfirm={() => navigate(-1)}
              onCancel={() => setIsBackModalOpen(false)}
            />
          </div>
        </>
      )}

      {selectedMovie ? (
        // 선택된 영화가 있을 때, 영화 정보 표시
        <div css={movieInfo}>
          <div css={backButton} onClick={handleBackClick}>
            <BackPost />
          </div>
          <h2 css={movieTitleStyle}>{selectedMovie.movieTitle}</h2>
          <div css={movieDetails}>
            <p>🕑 {formatDate(selectedMovie.releaseDate)}</p>
          </div>
          <div css={movieGenres}>
            {selectedMovie?.genres?.length > 0 ? (
              selectedMovie.genres.slice(0, 3).map((genre, idx) => (
                <span key={`${genre.genreId}-${idx}`}>
                  {genre.name in GENRE_EMOJI ? (
                    <>
                      {GENRE_EMOJI[genre.name as keyof typeof GENRE_EMOJI]}{" "}
                      {/* 이모지 */}
                      <span>{genre.name}</span> {/* 장르 이름 */}
                    </>
                  ) : (
                    genre.name
                  )}
                </span>
              ))
            ) : (
              <span>장르 정보가 없습니다.</span>
            )}
          </div>
        </div>
      ) : (
        // 선택된 영화가 없을 때, 검색창 표시
        <div css={searchBox}>
          <div css={backButton} onClick={handleBackClick}>
            <BackPost />
          </div>
          <div css={searchContainer}>
            <div css={searchSection}>
              <input
                css={searchInputWithPadding}
                type="text"
                placeholder="영화 제목 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsModalOpen(true)}
              />
              <MovieSearch css={movieSearchIcon} />
              {isModalOpen && (
                <button css={deleteIcon} onClick={handleClearSearch}>
                  <DelButton />
                </button>
              )}
            </div>

            {/* 자동완성 리스트 */}
            {isModalOpen && filteredMovies.length > 0 && (
              <div css={autocompleteBox}>
                {filteredMovies.map((movie, index) => (
                  <div
                    key={movie.movieId || index}
                    css={[
                      autocompleteItem,
                      activeIndex === index && activeAutocompleteItem,
                    ]}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {getHighlightedText(movie.movieTitle || "", searchTerm)}{" "}
                    {/* 수정 */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div css={postContainer}>
        <FileInput
          type="media"
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
        />
      </div>

      <div css={reviewSection}>
        <div css={reviewContainer}>
          {!reviewText && <Review css={reviewIcon} />}
          <textarea
            placeholder="        리뷰를 작성해주세요...&#13;&#10;&#13;&#10;욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
            css={reviewInput}
            value={reviewText}
            onChange={handleInputChange}
          />
          <div css={charCount}>{reviewText.length} / 500</div>
        </div>
      </div>

      <div css={spoilerSection}>
        <div css={spoilerContainer}>
          <p css={pText}>게시글에 스포일러가 포함되어있나요?</p>
          <div css={buttonContainer}>
            <button
              css={[
                buttonStyle,
                selectedSpoiler === "없음" && activeButtonStyle,
              ]}
              onClick={() => handleSpoilerClick("없음")}
            >
              없음
            </button>
            <button
              css={[
                buttonStyle,
                selectedSpoiler === "있음" && activeButtonStyle,
              ]}
              onClick={() => handleSpoilerClick("있음")}
            >
              있음
            </button>
          </div>
        </div>
      </div>

      <div css={shareButton}>
        <Button
          primary={isButtonActive}
          btnType="Active"
          label="공유"
          onClick={handleShareClick}
        />
      </div>

      {/* 토스트 메시지 */}
      {toastMessage && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}
