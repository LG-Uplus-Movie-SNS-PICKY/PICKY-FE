import { useState } from "react";
import {
  banner,
  feedContainer,
  feedItem,
  profileSection,
  textSection,
  timeSection,
  contentSection,
  carouselSection,
  reactionsSection,
  wrapper,
  infoSection,
  movieTitle,
  moreOptions,
  modalOverlay,
  modalContent,
  reactionsContainer,
  spoilerImageWrapper,
  blank,
  commentSection,
  commentItem,
  commentProfileSection,
  commentTextSection,
  commentTimeSection,
  commentProfileDetails,
} from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import CommentReportButton from "@assets/icons/comment_report_button.svg?react";

export default function FeedComment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 추가
  const [likeCountValue, setLikeCountValue] = useState(100);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const revealSpoiler = () => {
    setShowSpoiler(true);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCountValue(isLiked ? likeCountValue - 1 : likeCountValue + 1);
  };

  return (
    <div css={wrapper}>
      <div css={feedContainer}>
        <div css={feedItem}>
          <div css={infoSection}>
            <div css={profileSection}>
              <Profile />
            </div>
            <div css={textSection}>
              경원쨩
              <span css={movieTitle}>어벤져스 엔드게임</span>
            </div>
          </div>
          <div css={timeSection}>4시간 전</div>
        </div>
        <div css={contentSection}>이 영화 정말 재미있었어요! 꼭 보세요! 👍</div>

        <div css={carouselSection}>
          <div css={spoilerImageWrapper} onClick={revealSpoiler}>
            <img
              css={showSpoiler}
              src="https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
              alt="사진 1"
            />
          </div>
        </div>

        <div css={reactionsContainer}>
          <div css={reactionsSection}>
            <span onClick={toggleLike} style={{ cursor: "pointer" }}>
              {isLiked ? <LikeFeedActive /> : <LikeFeed />}{" "}
              {isLiked ? "101" : "100"}
            </span>
            <span>
              <CommentFeed />
              20
            </span>
          </div>
          <div css={moreOptions} onClick={toggleModal}>
            <ReportButton />
          </div>
        </div>
      </div>
      {/* 댓글 리스트 추가 */}
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>경원쨩</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>경원쨩</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>케이럽</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>우진쓰</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>계순이</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>
      <div css={commentSection}>
        <div css={commentItem}>
          <div css={commentProfileSection}>
            <div css={commentProfileDetails}>
              <Profile width={"36px"} height={"36px"} />
              <span css={commentTimeSection}>소연쓰</span>
              <div css={timeSection}>3시간 전</div>
            </div>
            <CommentReportButton onClick={toggleModal} />
          </div>
          <div css={commentTextSection}>
            <p>액션 씬이 최고였어요! 👍</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div css={modalOverlay} onClick={toggleModal}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            <div css={blank}></div>
            <button onClick={() => alert("욕설 신고가 접수되었습니다!")}>
              욕설 신고
            </button>
            <button onClick={() => alert("스포일러 신고가 접수되었습니다!")}>
              스포일러 신고
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
