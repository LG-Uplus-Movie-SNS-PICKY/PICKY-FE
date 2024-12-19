import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
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
  commentSection,
  commentItem,
  commentProfileSection,
  commentTextSection,
  commentTimeSection,
  commentProfileDetails,
  commentInputSection,
  inputWrapper,
  registerImage,
  commentBox,
  CommentInfoSection,
  carouselWrapper,
} from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import CommentReportButton from "@assets/icons/comment_report_button.svg?react";
import RegistComment from "@assets/icons/regist_comment.svg?react";
import RegistCommentActive from "@assets/icons/regist_comment_active.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import { MovieLog, BoardContentTypes } from "@stories/movie-log";
import {
  fetchComments,
  createComment,
  deleteComment,
  toggleLike,
  deletePost,
} from "@api/movie";
import { fetchGetUserInfo } from "@api/user";
import { useQueryClient } from "@tanstack/react-query";

interface UserInfo {
  id: number;
  nickname: string;
  profileUrl: string;
  userRole: string;
}

interface Content {
  board_content_id: number;
  contentUrl: string;
  boardContentType: "IMAGE" | "VIDEO";
}

interface BoardContent {
  boardId: number;
  writerProfileUrl: string;
  writerNickname: string;
  movieTitle: string;
  createdDate: string;
  context: string;
  isSpoiler: boolean;
  isLike: boolean;
  likesCount: number;
  commentsCount: number;
  contents: Content[];
}

interface Comment {
  commentId: number;
  writerId: number;
  writerNickname: string;
  writerProfileUrl: string;
  context: string;
  createdDate: string;
  updatedDate: string;
  isAuthor: boolean;
}

export default function FeedComment() {
  const { boardId } = useParams<{ boardId: string }>();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [boardData, setBoardData] = useState<BoardContent | null>(
    location.state || null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const data = await fetchGetUserInfo();
        setUserInfo(data.data);
      } catch (error) {}
    };

    loadUserInfo();
  }, []);

  useEffect(() => {
    const fetchAndSetComments = async () => {
      if (!boardId) return;

      try {
        const response = await fetchComments(Number(boardId), 10);
        const fetchedComments =
          response?.content || response?.data?.content || [];
        if (Array.isArray(fetchedComments)) {
          setComments(fetchedComments);
        }
      } catch (error) {}
    };

    fetchAndSetComments();
  }, [boardId]);

  const handleToggleLike = async () => {
    if (!boardData) return;

    try {
      await toggleLike(boardData.boardId);
      queryClient.setQueryData(["movie-log"], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedPages = oldData.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            content: page.data.content.map((board: BoardContent) => {
              if (board.boardId === boardData.boardId) {
                return {
                  ...board,
                  isLike: !board.isLike,
                  likesCount: board.isLike
                    ? board.likesCount - 1
                    : board.likesCount + 1,
                };
              }
              return board;
            }),
          },
        }));

        return { ...oldData, pages: updatedPages };
      });

      setBoardData((prev) =>
        prev
          ? {
              ...prev,
              isLike: !prev.isLike,
              likesCount: prev.isLike
                ? prev.likesCount - 1
                : prev.likesCount + 1,
            }
          : prev
      );
    } catch (error) {}
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !boardId || !userInfo) return;

    try {
      const response = await createComment(Number(boardId), comment);

      setComments((prevComments) => [
        {
          commentId: response.commentId,
          writerId: userInfo.id,
          writerNickname: userInfo.nickname,
          writerProfileUrl: userInfo.profileUrl || "/default-profile.png",
          context: comment,
          createdDate: response.createdDate || new Date().toISOString(),
          updatedDate: response.updatedDate || new Date().toISOString(),
          isAuthor: true,
        },
        ...prevComments,
      ]);

      queryClient.setQueryData(["movie-log"], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedPages = oldData.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            content: page.data.content.map((board: BoardContent) => {
              if (board.boardId === Number(boardId)) {
                return {
                  ...board,
                  commentsCount: board.commentsCount + 1,
                };
              }
              return board;
            }),
          },
        }));

        return { ...oldData, pages: updatedPages };
      });

      setBoardData((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
            }
          : prev
      );

      setComment("");
      setToastMessage("댓글이 성공적으로 작성되었습니다.");
      setShowToast(true);
    } catch (error) {
      setToastMessage("댓글 작성에 실패했습니다.");
      setShowToast(true);
    }
  };

  const handleDeletePost = async () => {
    if (!boardData || !boardData.writerNickname) return;

    if (userInfo?.nickname !== boardData.writerNickname) {
      setToastMessage("권한이 없습니다. 삭제할 수 없습니다.");
      setShowToast(true);
      return;
    }

    try {
      await deletePost(boardData.boardId);

      queryClient.invalidateQueries({ queryKey: ["movie-log"] });
      setToastMessage("게시글이 성공적으로 삭제되었습니다.");
      setShowToast(true);
      navigate(-1);
    } catch (error) {
      setToastMessage("게시글 삭제 중 오류가 발생했습니다.");
      setShowToast(true);
    }
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

  return (
    <div css={wrapper}>
      <div css={feedContainer}>
        <div css={feedItem}>
          <div css={infoSection}>
            <div css={profileSection}>
              <img
                src={boardData?.writerProfileUrl || "/default-profile.png"}
                alt="프로필"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
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
                {boardData?.writerNickname}
                {userInfo?.userRole === "CRITIC" && <CriticBadge />}
              </span>
              <span css={movieTitle}>{boardData?.movieTitle}</span>
            </div>
          </div>
          <div css={timeSection}>
            {boardData && calculateTimeAgo(boardData.createdDate)}
          </div>
        </div>
        <div css={contentSection}>{boardData?.context}</div>

        <div css={carouselWrapper}>
          <div css={carouselSection}>
            {boardData?.contents && boardData.contents.length > 0 ? (
              <MovieLog
                boardContent={boardData.contents.map((content, index) => ({
                  board_content_id: index,
                  board_content_url: content.contentUrl,
                  board_content_type:
                    content.boardContentType === "VIDEO" ? "VIDEO" : "IMAGE",
                }))}
              />
            ) : (
              <div
                style={{
                  width: "360px",
                  height: "360px",
                  background: "gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                콘텐츠가 없습니다.
              </div>
            )}
          </div>
        </div>

        <div css={reactionsContainer}>
          <div css={reactionsSection}>
            <span onClick={handleToggleLike}>
              {boardData?.isLike ? <LikeFeedActive /> : <LikeFeed />}
              <span className="like-number">{boardData?.likesCount}</span>
            </span>
            <span>
              <CommentFeed />
              <span className="comment-number">{boardData?.commentsCount}</span>
            </span>
          </div>
          <div css={moreOptions} onClick={() => setIsDeleteModalOpen(true)}>
            <ReportButton />
          </div>
        </div>
      </div>

      <div css={commentSection}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div css={commentItem} key={`comment-${comment.commentId}`}>
              <div css={commentProfileSection}>
                <div css={commentProfileDetails}>
                  <img
                    src={comment.writerProfileUrl || "/default-profile.png"}
                    alt="댓글 작성자 프로필"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                  <div css={CommentInfoSection}>
                    <div css={commentBox}>
                      <span css={commentTimeSection}>
                        {comment.writerNickname}
                      </span>
                    </div>
                    <div css={commentTextSection}>
                      <p>{comment.context}</p>
                    </div>
                  </div>
                </div>
                {comment.isAuthor && (
                  <CommentReportButton
                    onClick={() => setIsCommentDeleteModalOpen(true)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div>댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
        )}
      </div>

      {/* 댓글 입력 섹션 */}
      <div
        css={commentInputSection}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          borderTop: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <img
          src={userInfo?.profileUrl} // 사용자 프로필 이미지 추가 가능
          alt="내 프로필"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
          }}
        />
        <div css={inputWrapper}>
          <input
            type="text"
            placeholder="댓글 추가..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />
          {comment.trim() ? (
            <RegistCommentActive
              css={registerImage}
              onClick={handleCommentSubmit}
            />
          ) : (
            <RegistComment css={registerImage} />
          )}
        </div>
      </div>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message="게시글을 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={handleDeletePost}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </div>
      )}

      {showToast && <Toast message={toastMessage} direction="down" />}
    </div>
  );
}
