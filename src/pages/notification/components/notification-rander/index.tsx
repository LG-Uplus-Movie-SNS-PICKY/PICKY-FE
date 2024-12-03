import styles from "./index.styles";
import { Notification } from "../../constants";

interface NotificationRanderProps {
  title: string;
  section: Notification[];
}

function formatRelativeTime(createdAt: string) {
  const now = new Date(); // 현재 날짜를 가져온다.
  const createdDate = new Date(createdAt); // 데이터가 등록된 날짜를 Date 객체로 형변환 시킨다.

  // 현재 날짜(초)와 데이터가 등록된 날짜(초)의 차이를 구한 뒤 1000으로 나눠서 몇 초전에 등록된 알림인지 계산
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const diffInMinutes = Math.floor(diffInSeconds / 60); // 몇 분전에 등록된 날짜인지 계산
  const diffInHours = Math.floor(diffInMinutes / 60); // 몇 시간전에 등록된 날짜인지 계산
  const diffInDays = Math.floor(diffInHours / 24); // 몇 일전에 등록된 날짜인지 계산
  const diffInWeeks = Math.floor(diffInDays / 7); // 몇 주전에 등록된 날짜인지 계산

  if (diffInSeconds < 60)
    return `${diffInSeconds}초`; // 60초 이내에 등록된 날짜일 경우
  else if (diffInMinutes < 60)
    return `${diffInMinutes}분`; // 60분 이내에 등록된 날짜일 경우
  else if (diffInHours < 24)
    return `${diffInHours}일`; // 하루 이내에 등록된 날짜일 경우
  else if (diffInDays < 7)
    return `${diffInDays}일`; // 7일 이내에 등록된 날짜일 경우
  else if (diffInDays < 30)
    return `${diffInDays}일`; // 30일 이내에 등록된 날짜일 경우
  else {
    return `${diffInWeeks}주`; // 1주 ~ N주 이내에 등록된 날짜일 경우
  }
}

function NotificationRander({ title, section }: NotificationRanderProps) {
  return (
    <div css={styles.notificationContainer()}>
      <h2 className="title">{title}</h2>
      <ul>
        {section.map((notif, index) => (
          <li key={notif.id} css={styles.notificationCard()}>
            <div className="req-user">
              <div className="profile">
                <img
                  src={notif.req_user_profile}
                  alt={`${notif.req_user_nickname}-profile`}
                />
              </div>

              <p className="content">
                <span className="bold">{notif.req_user_nickname}</span>님이{" "}
                <span className="bold">{notif.req_user_movie.movie_tile}</span>
                에 새로운 게시물을 등록했습니다.
                <span className="date">
                  {formatRelativeTime(notif.created_at)}
                </span>
              </p>
            </div>

            <div className="movie-log-thumbnail">
              <img
                src={notif.req_user_movie_log.movie_image}
                alt={`${notif.req_user_movie.movie_tile}-movie-log-${notif.req_user_movie_log.movie_log_id}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationRander;
