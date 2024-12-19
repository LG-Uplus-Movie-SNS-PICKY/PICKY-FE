// pages/my/index.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Wrapper,
  ProfileContainer,
  ProfileImage,
  ProfileInfoContainer,
  ProfileInfo,
  Text,
  BoldText,
  NickNameContainer,
  NickName,
  ButtonContainer,
  EditButton,
  SettingsButton,
} from "./index.styles";

import SettingsSvg from "@assets/icons/settings.svg?react";
import CriticBadge from "@assets/icons/critic_badge.svg?react";
import defaultProfileImage from "@assets/images/default_profile.png";

import LogoutModal from "./components/logout-modal";
import FollowersModal from "./components/followers-modal";
import TabMenu from "./components/tab-menu";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Button } from "@stories/button";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "@stories/toast";
import SEO from "@components/seo";
import { useRecoilValue } from "recoil";
import { isLogin } from "@/recoil/atoms/isLoginState";
import {
  fetchFollowersList,
  fetchFollowingsList,
  fetchNicknameValidation,
  fetchUserInfo,
  toggleFollow,
} from "@api/user";
import { set } from "lodash";
import {
  useFetchFollowersListQuery,
  useFetchFollowingsListQuery,
} from "@hooks/follow";
import { useQueryClient } from "@tanstack/react-query";

function My() {
  const { nickname } = useParams(); // URL에서 nickname 추출
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement | null>(null); // SettingsButton ref 추가

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "followings">(
    "followers"
  );

  // 로그인 상태에서 사용자 정보 가져오기
  const loginState = useRecoilValue(isLogin);
  const myNickname = loginState.isLoginInfo.nickname; // Recoil 상태에서 nickname 추출

  const [isValid, setIsValid] = useState<boolean | null>(null); // 닉네임 유효성 상태
  const [userData, setUserData] = useState<{
    userId: number;
    boardCount: number;
    followerCount: number;
    followingCount: number | null;
  } | null>(null); // 전체 사용자 정보를 객체로 관리

  const [userId, setUserId] = useState<number>(0); // 사용자 ID 상태
  const [profileImage, setProfileImage] = useState<string>(""); // 프로필 이미지 상태
  const [userRole, setUserRole] = useState<string>(""); // 사용자 역할 상태
  const [boardCount, setBoardCount] = useState(0); // 게시글 수 상태
  const [followersCount, setFollowersCount] = useState(0); // 팔로워 수 상태
  const [followingCount, setFollowingCount] = useState(0); // 팔로잉 수 상태
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]); // 팔로워 목록
  const [followingsList, setFollowingsList] = useState([]); // 팔로잉 목록

  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const loadUserProfileAndInfo = async () => {
      if (!nickname) {
        setError("닉네임이 제공되지 않았습니다.");
        return;
      }

      // 상태 초기화
      setUserData(null);
      setUserId(0);
      setProfileImage("");
      setUserRole("");
      setBoardCount(0);
      setFollowersCount(0);
      setFollowingCount(0);
      setIsFollowing(false);

      try {
        setLoading(true);
        const data = await fetchUserInfo(nickname); // 특정 닉네임 정보 가져오기

        setUserId(data.data.userId ?? 0);
        setProfileImage(data.data.userProfileUrl || defaultProfileImage);
        setUserRole(data.data.userRole ?? "");
        setBoardCount(data.data.boardCount ?? 0);
        setFollowersCount(data.data.followerCount ?? 0);
        setFollowingCount(data.data.followingCount ?? 0);
        setIsFollowing(data.data.isFollowing ?? false);
        setUserData(data);
      } catch (err) {
        navigate("/error/404?type=NotUser");
        setError("사용자 정보를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfileAndInfo();
  }, [nickname]); // nickname이 변경될 때만 실행

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    navigate(`/user/${myNickname}/edit`);
  };

  const queryClient = useQueryClient();

  // 팔로우/팔로잉 버튼 클릭 시
  const handleFollowClick = async () => {
    const followingId = userId; // 팔로우 대상 ID

    if (!followingId || !nickname) {
      return;
    }

    try {
      // 버튼 상태를 즉시 토글 (낙관적 업데이트)
      setIsFollowing((prev) => !prev);

      // 서버에 팔로우/언팔로우 요청 보내기
      const response = await toggleFollow(followingId);

      queryClient.refetchQueries({ queryKey: ["following", nickname] });
      queryClient.refetchQueries({ queryKey: ["followers", nickname] });

      if (!response.success) {
        throw new Error(response.message || "팔로우 처리 실패");
      }

      // 서버에서 최신 사용자 정보 가져와 업데이트
      const updatedUserInfo = await fetchUserInfo(nickname);

      // 팔로우/팔로잉 수 상태 업데이트
      setFollowersCount(updatedUserInfo.data.followerCount ?? 0);
      setFollowingCount(updatedUserInfo.data.followingCount ?? 0);
    } catch (err) {
      // 에러 발생 시 버튼 상태 복구
      setIsFollowing((prev) => !prev);
    }
  };

  const openFollowersModal = async (initialTab: "followers" | "followings") => {
    setActiveTab(initialTab); // 클릭된 탭을 활성화
    setIsFollowersModalOpen(true);
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const followerLists = useFetchFollowersListQuery(nickname ? nickname : "");
  const followingLists = useFetchFollowingsListQuery(nickname ? nickname : "");

  return (
    <>
      <SEO
        title={`PICKY: ${nickname}`}
        description={`${nickname}님의 프로필(팔로워: ${followersCount}명, 팔로잉: ${followingCount}명)`}
        image={profileImage}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <Wrapper ref={wrapperRef}>
        <ProfileContainer>
          {/* 사용자 프로필 이미지 */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#262626",
              position: "relative",
            }}
          >
            <LazyLoadImage
              src={profileImage}
              onLoad={() => setIsLoading(true)}
              onError={() => setIsLoading(false)}
              style={{ width: "100%" }}
            />
            {!isLoading && (
              <span style={{ position: "absolute", color: "#b3b3b3" }}>
                {nickname}
              </span>
            )}
          </div>

          <ProfileInfoContainer>
            <ProfileInfo>
              <BoldText isZero={boardCount === 0}>{boardCount}</BoldText>
              <Text>게시글</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followers")}>
              {" "}
              {/* 팔로워 클릭 시 */}
              <BoldText isZero={followersCount === 0}>
                {followersCount}
              </BoldText>
              <Text>팔로워</Text>
            </ProfileInfo>
            <ProfileInfo onClick={() => openFollowersModal("followings")}>
              {" "}
              {/* 팔로잉 클릭 시 */}
              <BoldText isZero={followingCount === 0}>
                {followingCount}
              </BoldText>
              <Text>팔로잉</Text>
            </ProfileInfo>
          </ProfileInfoContainer>
        </ProfileContainer>

        <NickNameContainer>
          <NickName>{nickname}</NickName>
          {userRole === "CRITIC" && <CriticBadge />}{" "}
          {/* critic일 때만 렌더링 */}
        </NickNameContainer>

        {/* 프로필 편집 or 팔로우/팔로잉 버튼 */}
        <ButtonContainer>
          {nickname === myNickname ? (
            <EditButton onClick={handleEditClick}>프로필 편집</EditButton>
          ) : (
            <Button
              btnType="Social"
              primary={isFollowing}
              label={isFollowing ? "팔로잉" : "팔로우"}
              size="Large"
              onClick={handleFollowClick}
            />
          )}

          {/* 설정 버튼 */}
          {nickname === myNickname ? (
            <SettingsButton ref={settingsButtonRef} onClick={toggleModal}>
              <SettingsSvg />
            </SettingsButton>
          ) : null}
        </ButtonContainer>

        {/* 탭 메뉴 */}
        <TabMenu wrapperRef={wrapperRef} nickname={nickname || "guest_user"} />
      </Wrapper>

      {/* 로그아웃 or 탈퇴 확인 모달 */}
      {isModalOpen && (
        <div>
          <LogoutModal onClose={closeModal} targetRef={settingsButtonRef} />
        </div>
      )}

      {/* 팔로워/팔로잉 리스트 모달 */}
      {isFollowersModalOpen && (
        <FollowersModal
          onClose={closeFollowersModal}
          followers={followerLists}
          followersCount={followersCount}
          followings={followingLists}
          followingCount={followingCount}
          activeTab={activeTab} // 현재 활성화된 탭 전달
        />
      )}
    </>
  );
}

export default My;
