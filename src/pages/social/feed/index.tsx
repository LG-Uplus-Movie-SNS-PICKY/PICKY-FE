import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  moreOptions,
  modalOverlay,
  reactionsContainer,
  spoilerText,
  blurredContent,
  blurredImage,
  carouselWrapper,
  modalContent,
  movieTitleStyle,
} from "./index.styles";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import SEO from "@components/seo";
import { fetchAllData, deletePost, toggleLike } from "@api/movie";
import { Toast } from "@stories/toast";
import { useFetchAllMovieLogQuery } from "@hooks/movie-log";
import { useInView } from "react-intersection-observer";
import { MovieLog } from "@stories/movie-log";
import Loading from "@components/loading";
import { useQueryClient } from "@tanstack/react-query";
import MovieLogBanner from "@assets/images/banner.jpg";
import { fetchGetUserInfo } from "@api/user";
import CriticBadge from "@assets/icons/critic_badge.svg?react";

interface UserInfo {
  id: number;
  nickname: string;
  profileUrl: string;
  userRole: string;
}

interface BoardContent {
  boardId: number;
  writerProfileUrl: string;
  writerNickname: string;
  movieTitle: string;
  createdDate: string;
  context: string;
  isAuthor: boolean;
  isSpoiler: boolean;
  isLike: boolean;
  likesCount: number;
  commentsCount: number;
  writerId: number;
  contents: {
    contentUrl: string;
    boardContentType: string;
  }[];
}

export default function SocialFeed() {
  const [boardData, setBoardData] = useState<BoardContent[]>([]);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardContent | null>(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const {
    data: board,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useFetchAllMovieLogQuery();

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

  // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
  const { ref, inView } = useInView({
    threshold: 0.8, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // 게시글 데이터를 가져오는 함수
  const loadBoardData = async () => {
    try {
      const lastBoardId = 0; // 첫 호출 시 기본값 설정
      const response = await fetchAllData(lastBoardId);

      const contentArray = response.data?.content || [];
      setBoardData(Array.isArray(contentArray) ? contentArray : []);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      setBoardData([]);
    }
  };

  useEffect(() => {
    loadBoardData();
  }, []);

  // 게시글 좋아요 처리
  const handleToggleLike = async (boardId: number) => {
    try {
      await toggleLike(boardId);

      // 좋아요 후 React Query 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["movie-log"] });
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    }
  };

  // 옵션 모달 열기
  const handleOptionsModal = (board: BoardContent) => {
    setSelectedBoard(board);
    setIsOptionsModalOpen(true);
  };

  // 게시글 삭제 확인 모달 표시
  const handleDeletePost = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // 게시글 삭제 처리
  const confirmDeletePost = async () => {
    if (!selectedBoard || !selectedBoard.isAuthor) {
      setToastMessage("권한이 없습니다. 삭제할 수 없습니다."); // 토스트 메시지 설정
      setShowToast(true); // 토스트 표시
      return;
    }

    try {
      await deletePost(selectedBoard.boardId);

      queryClient.invalidateQueries({ queryKey: ["movie-log"] });
      setToastMessage("게시글이 삭제되었습니다."); // 삭제 완료 메시지
      setShowToast(true);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
      setToastMessage("게시글 삭제 중 오류가 발생했습니다."); // 오류 메시지
      setShowToast(true);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleReport = (type: "욕설" | "스포일러") => {
    setToastMessage(`${type} 신고가 접수되었습니다!`);
    setShowToast(true);
    setIsOptionsModalOpen(false); // 모달창 닫기
  };

  // 스포일러 표시 처리
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

  useEffect(() => {
    if (board?.pages) {
      const newBoardData = board.pages.flatMap((page) => page.data.content);
      setBoardData(newBoardData);
    }
  }, [board]);

  return (
    <>
      <SEO
        title="PICKY: MOVIE LOG"
        description="MOVIE LOG는 PICKY에 등록된 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
        url="http://localhost:5173/movie-log"
      />
      <div css={wrapper}>
        <div css={banner}>
          <img
            src={MovieLogBanner}
            alt="배너 이미지"
            style={{ width: "100%" }}
          />
        </div>
        <div css={feedContainer}>
          {isLoading && (
            <div
              style={{
                width: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "120px",
              }}
            >
              <Loading />
            </div>
          )}
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
                                  board.writerProfileUrl ||
                                  "/default-profile.png"
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
                              </span>
                              <span css={movieTitleStyle}>
                                {board?.movieTitle}
                              </span>
                             
                            </div>
                          </div>

                          <div css={timeSection}>
                            {calculateTimeAgo(board.createdDate)}
                          </div>
                        </div>

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

                        <div
                          css={carouselWrapper}
                          onClick={() => {
                            // 스포일러가 가려져 있으면 먼저 해제
                            if (
                              board.isSpoiler &&
                              !revealedSpoilers.includes(board.boardId)
                            ) {
                              revealSpoiler(board.boardId);
                            } else {
                              // 스포일러가 없으면 바로 페이지 이동
                              navigate(`/movie-log/detail/${board.boardId}`, {
                                state: board,
                              });
                            }
                          }}
                        >
                          <div
                            css={[
                              carouselSection,
                              board.isSpoiler &&
                                !revealedSpoilers.includes(board.boardId) &&
                                blurredImage,
                            ]}
                            style={{ cursor: "pointer" }}
                          >
                            {/* MovieLog 컴포넌트 */}
                            <MovieLog
                              boardContent={board.contents.map(
                                (content, index) => ({
                                  board_content_id: index, // index를 고유 ID로 사용
                                  board_content_url: content.contentUrl, // URL
                                  board_content_type:
                                    content.boardContentType === "VIDEO"
                                      ? "VIDEO"
                                      : "IMAGE", // 타입 설정
                                })
                              )}
                            />
                          </div>

                          {/* 스포일러 안내 텍스트 */}
                          {board.isSpoiler &&
                            !revealedSpoilers.includes(board.boardId) && (
                              <div css={spoilerText}>
                                🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                              </div>
                            )}
                        </div>

                        <div css={reactionsContainer}>
                          <div css={reactionsSection}>
                            <span
                              onClick={() => handleToggleLike(board.boardId)}
                            >
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
                          >
                            <ReportButton />
                          </div>
                        </div>
                      </>
                    );
                  })}
              </React.Fragment>
            ))}

          <div ref={ref} style={{ width: "100%", height: "10px" }} />
        </div>
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
                <button onClick={handleDeletePost}>
                  <DeletePost /> 삭제하기
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleReport("욕설")}>욕설 신고</button>
                <button onClick={() => handleReport("스포일러")}>
                  스포일러 신고
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message="게시글을 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={confirmDeletePost}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </div>
      )}
      {showToast && <Toast message={toastMessage} direction="up" />}
    </>
  );
}
