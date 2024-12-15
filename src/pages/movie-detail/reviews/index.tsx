// pages/movie-detail/reviews/index.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import MovieHeader from "../components/movie-header";
import MovieReviewsPoster from "./components/movie-poster";
import ReviewGraph from "./components/review-graph";
import ReviewRegist from "./components/review-regist";
import MovieReview from "../components/movie-review";
import {
  MovieReviewContainer,
  InfoContainer,
  Title,
  DetailContainer,
  DetailText,
  ReviewsWrapper,
  FilterContainer,
  SortContainer,
  SortOption,
  SpoilerToggleContainer,
  SpoilerToggleText,
  SpoilerToggleButton,
  LoadingContainer
} from "./index.styles";
import SpoilerToggleSvg from "@assets/icons/spoiler_toggle.svg?react";
import SpoilerToggleActiveSvg from "@assets/icons/spoiler_toggle_active.svg?react";
import SEO from "@components/seo";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import Loading from "@components/loading";
import { fetchGenders, fetchLineReviewMovie, fetchRatings } from "@api/linereview";
import { useMovieDetailQuery } from "@hooks/movie";
import { useLineReviewMovieQuery } from "@hooks/review";

interface Review {
  id: number;
  writerNickname: string;
  userId: number;
  movieId: number;
  rating: number;
  context: string;
  isSpoiler: boolean;
  likes: number;
  dislikes: number;
  createdAt: string;
}

const defaultRatings: RatingsData = {
  totalCount: 0,
  oneCount: 0,
  twoCount: 0,
  threeCount: 0,
  fourCount: 0,
  fiveCount: 0,
};

const defaultGenders: GendersData = {
  totalCount: 0,
  maleCount: 0,
  femaleCount: 0,
  manAverage: 0,
  womanAverage: 0,
};

interface RatingsData {
  totalCount: number;
  oneCount: number;
  twoCount: number;
  threeCount: number;
  fourCount: number;
  fiveCount: number;
}

interface GendersData {
  totalCount: number;
  maleCount: number;
  femaleCount: number;
  manAverage: number;
  womanAverage: number;
}

const ReviewsPage = () => {
  const { id } = useParams(); // URL에서 movieId 추출
  const movieId = id ? Number(id) : 0; // id가 undefined인 경우 기본값 설정

  // // 더미 데이터
  // const dummyRatings: RatingsData = {
  //   totalCount: 5,
  //   oneCount: 0,
  //   twoCount: 0,
  //   threeCount: 1,
  //   fourCount: 1,
  //   fiveCount: 3,
  // };
  
  // const dummyGenders: GendersData = {
  //   totalCount: 5,
  //   maleCount: 3,
  //   femaleCount: 2,
  //   manAverage: 3.0,
  //   womanAverage: 4.0,
  // };

  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useMovieDetailQuery(Number(id));
  // const { data: lineReviews, isLoading: lineReviewsIsLoading } =
  //   useLineReviewMovieQuery(Number(id));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("likes");
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ratings, setRatings] = useState<RatingsData>(defaultRatings);
  const [genders, setGenders] = useState<GendersData>(defaultGenders);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useLineReviewMovieQuery(Number(id));

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 병합된 모든 리뷰 데이터
  const allReviews = data?.pages?.flatMap((page) => page.data.content) || []; // 병합된 데이터

  // 영화 데이터 가져오기
  useEffect(() => {
    if (!movieDetailIsLoading) {
      // API 응답 데이터 구조 검증
      if (!movieDetail.data) {
        throw new Error("Invalid API response: Missing data");
      }

      const { movie_info } = movieDetail.data;

      if (!movie_info) {
        throw new Error("Invalid API response: Missing movie_info");
      }

      setMovieData({
        ...movie_info,
      });
    }
  }, [movieDetailIsLoading]);

  // ratings와 genders 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratingsData = await fetchRatings(movieId);
        const gendersData = await fetchGenders(movieId);
        setRatings(ratingsData);
        console.log("평점 데이터:", ratingsData);
        setGenders(gendersData);
        console.log("성별 데이터:", gendersData);
      } catch (error) {
        console.error("Error fetching ratings or genders:", error);
      }
    };

    fetchData();
  }, [movieId]);

  // 한줄평 데이터 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchLineReviewMovie(Number(id));
        const allReviews = data?.data?.content || [];
        setReviews(allReviews);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, [id, sortBy]);

  // 스포일러 포함 여부 필터링
  const filteredReviews = includeSpoilers
    ? allReviews // 모든 데이터 반환
    : allReviews.filter((review) => !review.isSpoiler); // 스포일러 제거

  // 새로운 리뷰 추가 함수
  const handleAddReview = (newReview: Review) => {
    console.log("새로 추가된 리뷰 데이터:", newReview); // 전달된 리뷰 데이터 확인
    setReviews((prevReviews) => [newReview, ...prevReviews]); // 새로운 리뷰를 앞에 추가
  };

  // 정렬된 리뷰 데이터
  const sortedReviews = [...reviews]
    .filter((review) => (includeSpoilers ? true : !review.isSpoiler)) // 스포일러 필터링
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes; // 좋아요 순 정렬
      if (sortBy === "latest")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신 순 정렬
      return 0;
    });

  useEffect(() => {
    console.log("현재 정렬된 리뷰 데이터:", sortedReviews);
  }, [sortedReviews]);

  const handleToggleSpoilers = () => {
    setIncludeSpoilers((prev) => !prev);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    movieData && (
      <>
        {/* <SEO
          title={`${movieData.original_title}(${new Date(movieData.release_date).getFullYear()})`}
          description={`${movieData.original_title}의 ${filteredReviews?.length || 0}개의 모든 리뷰를 확인해보세요`}
          image={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          url={`http://localhost:5173/${location.pathname}`}
        /> */}

        <div style={{ width: "100%" }}>
          <MovieReviewContainer>
            <MovieHeader />
            <MovieReviewsPoster imageUrl={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`} />
            <InfoContainer>
              <Title>{movieData.original_title}</Title>
              <DetailContainer>
                <DetailText>{new Date(movieData.release_date).getFullYear()}</DetailText>
                |
                <DetailText>{formatRuntime(movieData.runtime)}</DetailText>
              </DetailContainer>
            </InfoContainer>

            {/* ReviewGraph에 ratings와 genders 전달 */}
            <ReviewGraph ratings={ratings} genders={genders} />
            {/* <ReviewGraph ratings={dummyRatings} genders={dummyGenders} /> */}

            {/* 리뷰 등록 컴포넌트 */}
            <ReviewRegist movieId={movieId} refetch={refetch} onAddReview={handleAddReview} />

            <ReviewsWrapper>
              <FilterContainer>
                <SortContainer>
                  <SortOption
                    onClick={() => setSortBy("likes")}
                    active={sortBy === "likes"}
                  >
                    공감순
                  </SortOption>
                  <SortOption
                    onClick={() => setSortBy("latest")}
                    active={sortBy === "latest"}
                  >
                    최신순
                  </SortOption>
                </SortContainer>
                <SpoilerToggleContainer>
                  <SpoilerToggleText>스포일러 포함</SpoilerToggleText>
                  <SpoilerToggleButton onClick={handleToggleSpoilers}>
                    {includeSpoilers ? (
                      <SpoilerToggleActiveSvg />
                    ) : (
                      <SpoilerToggleSvg />
                    )}
                  </SpoilerToggleButton>
                </SpoilerToggleContainer>
              </FilterContainer>

              <MovieReview reviews={sortedReviews} />

              {/* 리뷰 데이터 */}
              {/* {isLoading ? (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              ) : (
                <>
                  <MovieReview reviews={sortedReviews || []} />
                </>
              )} */}
            </ReviewsWrapper>
          </MovieReviewContainer>
          <div ref={ref} style={{ height: "20px" }} />
          {isFetchingNextPage &&
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          }
          {!hasNextPage && allReviews.length > 0 && (
            <div style={{ textAlign: "center", margin: "16px", fontWeight: "600" }}>
              마지막 리뷰입니다.
            </div>
          )}
        </div>
      </>
    )
  );
};

export default ReviewsPage;
