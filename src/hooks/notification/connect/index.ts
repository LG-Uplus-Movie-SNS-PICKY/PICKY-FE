import { isLogin } from "@recoil/atoms/isLoginState";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "@util/cookie";
import { useQueryClient } from "@tanstack/react-query";
import { UnreadNotificationsTypes } from "@type/api/notification";
import { unreadCountState } from "@recoil/atoms/isNotificationState";

function NotificationSSE() {
  const queryClient = useQueryClient();

  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);
  const setUnreadCount = useSetRecoilState(unreadCountState);

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    // 이미 프론트와 서버 간의 SSE가 연결되어 있다면 중복 연결을 방지한다.
    if (eventSourceRef.current) {
      return;
    }

    // 사용자가 로그인을 했을 경우에 SSE랑 연결을 시도한다.
    if (isLoginState && !isAuthUser) {
      // 1. 읽지 않은 알림은 무한 스크롤링을 지원하는 것이기 때문에 React Query를 통해 데이터를 캐싱하고 무한 스크롤링 기능을 구현한다.
      // 2. 프론트-서버 간의 SSE를 연결한다.
      const token = getCookie("user") || {};

      // Header를 포함시켜야 하기 때문에 기존 EventSource가 아닌 EventSourcePolyfill 라이브러리를 사용한다.
      const eventSource = new EventSourcePolyfill(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/notification/connect`,
        {
          headers: {
            Authorization: `Bearer ${token.localJwtDto.accessToken}`,
          },
          heartbeatTimeout: 1000 * 60 * 10, // 10분으로 타임아웃 연장
        }
      );

      // 3. 실시간으로 데이터 올 시 해당 데이터를 캐시 데이터를 업데이트 시킨다.
      eventSource.onmessage = (event) => {
        // 초기 메세지 무시
        if (event.data.startsWith("EventStream ")) {
          // console.log("Initial connection message ignored: " + event.data);
          // console.log("Hello");
          return;
        }

        const newNotification = JSON.parse(event.data);

        // React Query 캐시 업데이트
        queryClient.setQueryData<UnreadNotificationsTypes>(
          ["unreadNotification"],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page, index) => {
                if (index === 0) {
                  // 첫 번째 페이지에 새 알림 추가
                  return {
                    ...page,
                    data: {
                      ...page.data,
                      numberOfElements: page.data.numberOfElements + 1, // 새로운 알림 수 증가
                      content: [newNotification, ...page.data.content], // 새로운 알림 추가
                    },
                  };
                }

                return page;
              }),
            };
          }
        );
      };

      // 에러 처리
      eventSource.onerror = (error) => {
        // console.log("SSE Error:", error);

        // 상태 확인 -> 연결이 중단된 경우
        if (eventSource.readyState === EventSourcePolyfill.CLOSED) {
          // console.log("SSE 연결이 닫혔습니다. 재연결 시도 중...");
        }
      };

      // 컴포넌트 언마운트 시 SSE 연결 종료
      return () => {
        eventSource.close();
      };
    }
  }, [isLoginState]);

  return null;
}

export default NotificationSSE;
