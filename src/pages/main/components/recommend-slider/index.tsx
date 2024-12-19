import Netflix from "@assets/icons/netflix.svg?react";
import DisneyPlus from "@assets/icons/disneyplus.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { useRecommnedMovieQuery } from "@hooks/movie";
import { useEffect, useRef, useState } from "react";
import Loading from "@components/loading";
import { RecommendMovieDataTypes } from "@type/api/movie";
import { Swiper as SwiperCore } from "swiper";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * 사용자 맞춤 영화를 보여주는 슬라이더
 * @returns
 */
function RecommendMovieSlider() {
  const { data: recommendMovies, isLoading } = useRecommnedMovieQuery();
  const swiperRef = useRef<SwiperCore | null>(null);
  const navigate = useNavigate();

  const [imageLoad, setImageLoad] = useState(false);

  useEffect(() => {
    if (!isLoading && recommendMovies.data.length > 0) {
      swiperRef.current?.update();
      swiperRef.current?.slideTo(1);
    }
  }, [isLoading, recommendMovies]);

  return (
    <Swiper
      onSwiper={(swipper) => (swiperRef.current = swipper)}
      slidesPerView={1.3}
      spaceBetween={30}
      centeredSlides={true}
      modules={[Autoplay]}
      loop={true}
      touchRatio={0}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      css={styles.swiperContainer()}
    >
      {isLoading && <Loading />}
      {!isLoading &&
        recommendMovies?.data
          .slice(0, 5)
          .map((movie: RecommendMovieDataTypes) => (
            <SwiperSlide key={movie.movieId}>
              <div
                css={styles.sliderItem(
                  `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.posterUrl}`
                )}
                onClick={() => navigate(`/movie/${movie.movieId}`)}
              >
                {/* Background Image */}
                <div className="background" />

                {/* Content */}
                <div css={styles.content()}>
                  {/* Badge Section */}
                  <div css={styles.badgeContainer()}>
                    <div className="badge">PICKY 추천 영화</div>
                  </div>

                  {/* Movie Poster Section */}
                  <div css={styles.moviePosterContainer()}>
                    <LazyLoadImage
                      src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                        movie.posterUrl
                      }`}
                      alt={movie.title}
                      onLoad={() => setImageLoad(true)}
                      onError={() => setImageLoad(false)}
                    />
                    {!imageLoad && <span>{movie.title}</span>}
                  </div>

                  {/* Movie Info Section */}
                  <div css={styles.movieInfoContainer()}>
                    {/* Info */}
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <div className="movie-sub-info">
                        <span className="rate">
                          별점: ★ {movie.totalRating.toFixed(1)}
                        </span>
                        <span className="genres">
                          {movie.genres.map((genre) => genre.name).join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* OTT Servie */}
                    <div className="ott-service">
                      <div className="badge">
                        <Netflix width={18} height={18} />
                      </div>
                      <div className="badge">
                        <Watcha width={18} height={18} />
                      </div>
                      <div className="badge more-service">2+</div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

export default RecommendMovieSlider;
