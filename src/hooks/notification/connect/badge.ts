import { unreadCountState } from "@recoil/atoms/isNotificationState";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useUnreadNotificationQuery } from "../fetch";
import { isLogin } from "@recoil/atoms/isLoginState";
import { NotificationTypes } from "@type/api/notification";

// 읽지 않은 알림 데이터를 요청하여 badge를 계산한다.
function NotificationBadge() {
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);

  const setUnreadCount = useSetRecoilState(unreadCountState);

  const { data: unreadNotificationData, isLoading } =
    useUnreadNotificationQuery(isLoginState && !isAuthUser);

  useEffect(() => {
    if (!isLoading && isLoginState && !isAuthUser) {
      // console.log(unreadNotificationData);

      // 알림의 numberOfElements 값을 합산
      const count = unreadNotificationData?.pages
        .map(
          (page) =>
            page.data.content.filter(
              (notif: NotificationTypes) => !notif.isRead
            ).length
        ) // 각 페이지의 읽지 않은 알림 수 추출
        .reduce((total, count) => (total += count), 0); // 합산

      // 알림 개수를 전역 상태로 관리
      setUnreadCount(count);
    }
  }, [unreadNotificationData, isLoading]);

  return null;
}

export default NotificationBadge;
