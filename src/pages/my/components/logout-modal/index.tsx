// pages/my/components/logout-modal/index.tsx
import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalItem,
  ModalBackground,
  ModalWidth,
} from "./index.styles";
import { Toast } from "@stories/toast";
import { Modal } from "@stories/modal";
import { cancelMembership } from "@api/user";
import { removeCookie } from "@util/cookie";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { useLocation, useNavigate } from "react-router-dom";

interface LogoutModalProps {
  onClose: () => void;
  targetRef: React.RefObject<HTMLButtonElement>; // SettingsButton의 ref 전달
}

function LogoutModal({ onClose, targetRef }: LogoutModalProps) {
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const resetLoginState = useResetRecoilState(isLogin);
  const setLoginState = useSetRecoilState(isLogin);

  const navigate = useNavigate();

  useEffect(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const rightOffset = window.innerWidth - rect.right;
      setModalPosition({
        top: rect.bottom + window.scrollY + 4,
        right: rightOffset,
      });
    }
  }, [targetRef]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [toast, setToast] = useState<{
    message: string;
    direction: "none" | "up" | "down";
  } | null>(null);

  const showToast = (
    message: string,
    direction: "none" | "up" | "down"
  ): Promise<void> => {
    return new Promise((resolve) => {
      setToast({ message, direction });
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1500);
    });
  };

  const handleLogoutClick = () => {
    setModalMessage("로그아웃하시겠습니까?");
    setIsConfirmModalOpen(true);
  };

  const location = useLocation();

  const handleConfirmLogout = async () => {
    await showToast("로그아웃이 완료되었습니다.", "up");
    removeCookie("user");
    resetLoginState();

    setLoginState((prev) => ({
      ...prev,
      isLoading: false,
    }));

    // 세션 스토리지 초기화
    sessionStorage.clear();

    const { pathname } = location;
    // console.log(pathname);

    window.location.href = "/";

    // window.location.reload();
  };

  const handleCancelMembershipClick = () => {
    setModalMessage("회원탈퇴하시겠습니까?");
    setIsConfirmModalOpen(true);
  };

  // const handleConfirmCancelMembership = async () => {
  //     await showToast('회원탈퇴가 완료되었습니다.', 'up');
  //     window.location.reload();
  // };

  const handleConfirmCancelMembership = async () => {
    try {
      const platform = "kakao"; // 플랫폼 정보 (예: kakao, google 등)
      const oAuth2Token = {
        access_token: "string", // 실제 토큰으로 교체
        refresh_token: "string",
        token_type: "string",
        expires_in: "string",
      };

      const response = await cancelMembership(platform, oAuth2Token);

      await showToast("회원탈퇴가 완료되었습니다.", "up");
      window.location.replace("/"); // 탈퇴 후 메인 페이지로 이동
    } catch (error: any) {
      await showToast("회원탈퇴에 실패했습니다. 다시 시도해주세요.", "down");
    }
  };

  const handleCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      {/* 기존 모달 */}
      <ModalContainer onClick={onClose}>
        <ModalWrapper
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: modalPosition.top,
            right: modalPosition.right,
          }}
        >
          <ModalItem onClick={handleLogoutClick}>로그아웃</ModalItem>
          <ModalItem onClick={handleCancelMembershipClick}>탈퇴하기</ModalItem>
        </ModalWrapper>
      </ModalContainer>

      {/* 확인 모달 */}
      {isConfirmModalOpen && (
        <ModalBackground onClick={() => setIsConfirmModalOpen(false)}>
          <ModalWidth>
            <Modal
              message={modalMessage}
              confirmText={
                modalMessage === "로그아웃하시겠습니까?"
                  ? "로그아웃"
                  : "회원탈퇴"
              }
              cancelText="취소"
              onConfirm={
                modalMessage === "로그아웃하시겠습니까?"
                  ? handleConfirmLogout
                  : handleConfirmCancelMembership
              }
              onCancel={handleCancel}
            />
          </ModalWidth>
        </ModalBackground>
      )}

      {/* Toast 메시지 */}
      {toast && <Toast message={toast.message} direction={toast.direction} />}
    </>
  );
}

export default LogoutModal;
