import { fetchUnreadNotification } from "@api/notification";
import { useInfiniteQuery } from "@tanstack/react-query";

// 사용자의 읽지 않은 알림 조회 React Query - Custom Hook
export const useUnreadNotificationQuery = (loginCheck: boolean) => {
  return useInfiniteQuery({
    queryKey: ["unreadNotification"],
    queryFn: ({ pageParam }) =>
      fetchUnreadNotification(pageParam.lastNotificationId),

    getNextPageParam: (lastPage) => {
      // console.log(lastPage);

      if (!lastPage?.data?.last) {
        return {
          lastNotificationId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1]
              .notificationId,
        };
      }

      return undefined;
    },

    initialPageParam: { lastNotificationId: 0 },
    enabled: !!loginCheck,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
