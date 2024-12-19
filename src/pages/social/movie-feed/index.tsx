import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMovieLogByIdQuery } from "@hooks/movie-log";
import { useInView } from "react-intersection-observer";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import Loading from "@components/loading";
import { MovieLog } from "@stories/movie-log";
import { Toast } from "@stories/toast";
import { Modal } from "@stories/modal";
import {
  wrapper,
  feedContainer,
  feedItem,
  profileSection,
  textSection,
  timeSection,
  contentSection,
  reactionsContainer,
  moreOptions,
  movieTitle,
  spoilerText,
  blurredContent,
  blurredImage,
  carouselWrapper,
  reactionsSection,
  banner,
  infoSection,
  modalOverlay,
  modalContent,
} from "./index.styles";
import { toggleLike, deletePost } from "@api/movie";
import { useQueryClient } from "@tanstack/react-query";
import MovieLogBanner from "@assets/images/banner.jpg";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import { fetchGetUserInfo } from "@api/user";

interface UserInfo {
  id: number;
  nickname: string;
  profileUrl: string;
  userRole: string;
}

// 게시글 데이터 타입
interface BoardContent {
  boardId: number;
  writerNickname: string;
  writerProfileUrl: string;
  movieTitle: string;
  createdDate: string;
  context: string;
  isSpoiler: boolean;
  isLike: boolean;
  isAuthor: boolean;
  likesCount: number;
  commentsCount: number;
  contents: {
    contentUrl: string;
    boardContentType: string;
  }[];
}

export default function MovieLogList() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardContent | null>(null);
  const { ref, inView } = useInView({ threshold: 0.8 });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const {
    data: board,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useFetchMovieLogByIdQuery(Number(movieId));

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchGetUserInfo();
        setUserInfo(data.data);
      } catch (error) {
        console.error("유저 정보를 가져오는 중 오류 발생:", error);
      }
    };

    loadUserInfo();
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const revealSpoiler = (boardId: number) => {
    setRevealedSpoilers((prev) => [...prev, boardId]);
  };

  const calculateTimeAgo = (createdDate: string) => {
    // 현재 시간을 한국 시간(UTC+9)으로 변환
    const now = new Date();

    // 생성 시간을 한국 시간(UTC+9)으로 변환
    const created = new Date(createdDate);
    const createdKST = new Date(created.getTime() + 9 * 60 * 60 * 1000);
    console.log(now);
    // 두 시간의 차이를 초 단위로 계산
    const diffInSeconds = Math.floor(
      (now.getTime() - createdKST.getTime()) / 1000
    );

    // 조건에 따라 시간 계산
    if (diffInSeconds < 300) return "방금"; // 5분 미만
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`; // 1시간 미만
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}시간 전`; // 24시간 미만
    return `${Math.floor(diffInSeconds / 86400)}일 전`; // 24시간 이상
  };

  const handleToggleLike = async (boardId: number) => {
    try {
      await toggleLike(boardId);
      queryClient.invalidateQueries({ queryKey: ["movie-log"] });
    } catch (error) {}
  };

  const handleOptionsModal = (board: BoardContent) => {
    setSelectedBoard(board);
    setIsOptionsModalOpen(true);
  };

  const handleDeletePost = async () => {
    if (!selectedBoard || !selectedBoard.isAuthor) {
      setToastMessage("삭제 권한이 없습니다.");
      setShowToast(true);
      return;
    }

    try {
      await deletePost(selectedBoard.boardId);
      queryClient.invalidateQueries({ queryKey: ["movie-log"] });
      setToastMessage("게시글이 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      setToastMessage("게시글 삭제 중 오류가 발생했습니다.");
      setShowToast(true);
    } finally {
      setIsOptionsModalOpen(false);
    }
  };

  return (
    <div css={wrapper}>
      <div css={banner}>
        <img src={MovieLogBanner} alt="배너 이미지" style={{ width: "100%" }} />
      </div>
      <div css={feedContainer}>
        {isLoading && <Loading />}
        {Array.isArray(board?.pages) &&
          board.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {Array.isArray(page.data.content) &&
                page.data.content.map((board: BoardContent) => {
                  const isSpoilerRevealed = revealedSpoilers.includes(
                    board.boardId
                  );

                  return (
                    <>
                      <div key={board.boardId} css={feedItem}>
                        {/* 프로필 및 사용자 정보 */}
                        <div
                          css={infoSection}
                          onClick={() =>
                            navigate(`/user/${board.writerNickname}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div css={profileSection}>
                            <img
                              src={
                                board.writerProfileUrl || "/default-profile.png"
                              }
                              alt="프로필"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div css={textSection}>
                            <span
                              style={{
                                display: "flex",
                                gap: "4px",
                                alignItems: "center",
                              }}
                            >
                              {board?.writerNickname}
                              {userInfo?.userRole === "CRITIC" && (
                                <CriticBadge />
                              )}
                            </span>{" "}
                            <span css={movieTitle}>{board.movieTitle}</span>
                          </div>
                        </div>

                        <div css={timeSection}>
                          {calculateTimeAgo(board.createdDate)}
                        </div>
                      </div>

                      {/* 게시글 내용 */}
                      <div
                        css={[
                          contentSection,
                          board.isSpoiler &&
                            !isSpoilerRevealed &&
                            blurredContent,
                        ]}
                        onClick={() =>
                          navigate(`/movie-log/detail/${board.boardId}`, {
                            state: board,
                          })
                        }
                      >
                        {board.context}
                      </div>

                      {/* 미디어 콘텐츠 */}
                      <div
                        css={carouselWrapper}
                        onClick={() =>
                          board.isSpoiler && !isSpoilerRevealed
                            ? revealSpoiler(board.boardId)
                            : navigate(`/movie-log/detail/${board.boardId}`, {
                                state: board,
                              })
                        }
                      >
                        <div
                          css={[
                            carouselWrapper,
                            board.isSpoiler &&
                              !isSpoilerRevealed &&
                              blurredImage,
                          ]}
                        >
                          <MovieLog
                            boardContent={board.contents.map(
                              (content, index: number) => ({
                                board_content_id: index,
                                board_content_url: content.contentUrl,
                                board_content_type:
                                  content.boardContentType === "VIDEO"
                                    ? "VIDEO"
                                    : "IMAGE",
                              })
                            )}
                          />
                        </div>

                        {/* 스포일러 알림 */}
                        {board.isSpoiler && !isSpoilerRevealed && (
                          <div css={spoilerText}>
                            🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                          </div>
                        )}
                      </div>

                      {/* 리액션 및 옵션 */}
                      <div css={reactionsContainer}>
                        <div css={reactionsSection}>
                          <span onClick={() => handleToggleLike(board.boardId)}>
                            {board.isLike ? <LikeFeedActive /> : <LikeFeed />}
                            <span className="like-number">
                              {board.likesCount}
                            </span>
                          </span>
                          <span
                            onClick={() =>
                              navigate(`/movie-log/detail/${board.boardId}`, {
                                state: board,
                              })
                            }
                          >
                            <CommentFeed />
                            <span className="comment-number">
                              {board.commentsCount}
                            </span>
                          </span>
                        </div>
                        <div
                          css={moreOptions}
                          onClick={() => handleOptionsModal(board)}
                          style={{ cursor: "pointer" }}
                        >
                          <ReportButton />
                        </div>
                      </div>
                    </>
                  );
                })}
            </React.Fragment>
          ))}

        {/* 로딩 감지기 */}
        <div ref={ref} style={{ width: "100%", height: "20px" }} />
      </div>

      {isOptionsModalOpen && selectedBoard && (
        <div css={modalOverlay} onClick={() => setIsOptionsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {selectedBoard.isAuthor ? (
              <>
                <button
                  onClick={() =>
                    navigate(`/movie-log/edit/${selectedBoard.boardId}`, {
                      state: {
                        boardId: selectedBoard.boardId,
                        movieTitle: selectedBoard.movieTitle,
                        contents: selectedBoard.contents,
                        boardContext: selectedBoard.context,
                        isSpoiler: selectedBoard.isSpoiler,
                      },
                    })
                  }
                  style={{ color: "#000" }}
                >
                  <EditPost /> 수정하기
                </button>
                <button onClick={handleDeletePost} style={{ color: "#000" }}>
                  <DeletePost /> 삭제하기
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setToastMessage("욕설 신고가 접수되었습니다.");
                    setShowToast(true);
                    setIsOptionsModalOpen(false);
                  }}
                  style={{ color: "#000" }}
                >
                  욕설 신고
                </button>
                <button
                  onClick={() => {
                    setToastMessage("스포일러 신고가 접수되었습니다.");
                    setShowToast(true);
                    setIsOptionsModalOpen(false);
                  }}
                  style={{ color: "#000" }}
                >
                  스포일러 신고
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}
