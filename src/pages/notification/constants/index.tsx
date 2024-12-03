interface Movie {
  movie_id: number;
  movie_tile: string;
}

interface MovieLog {
  movie_log_id: number;
  movie_image: string;
}

export interface Notification {
  id: number;
  req_user_id: number;
  req_user_profile: string;
  req_user_nickname: string;
  req_user_movie: Movie;
  req_user_movie_log: MovieLog;
  created_at: string;
}

export const notificationDummyData: Array<Notification> = [
  {
    id: 1,
    req_user_id: 1,
    req_user_profile:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    req_user_nickname: "Leo",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 1,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-04 00:43:38",
  },
  {
    id: 2,
    req_user_id: 2,
    req_user_profile:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2451",
    req_user_nickname: "Bill",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 2,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-04 00:37:11",
  },
  {
    id: 3,
    req_user_id: 3,
    req_user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s",
    req_user_nickname: "Rebecca",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 3,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-04 00:29:19",
  },
  {
    id: 4,
    req_user_id: 4,
    req_user_profile:
      "https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg",
    req_user_nickname: "John",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 4,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-01 15:38:15",
  },
  {
    id: 5,
    req_user_id: 5,
    req_user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&s",
    req_user_nickname: "Unknown",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 5,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-01 15:38:15",
  },
  {
    id: 6,
    req_user_id: 6,
    req_user_profile:
      "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    req_user_nickname: "Reina",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 6,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-12-01 15:38:15",
  },
  {
    id: 7,
    req_user_id: 7,
    req_user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEH14u7rKYD9aCAr-qRwTjpnXljCPuy4xbQSkW4HWJtCFReJNpt0-3ZW3MQyiyaIWoYyI&usqp=CAU",
    req_user_nickname: "Gavin",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 7,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-11-13 15:38:15",
  },
  {
    id: 8,
    req_user_id: 8,
    req_user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&s",
    req_user_nickname: "Lily",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 8,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-11-13 15:38:15",
  },
  {
    id: 9,
    req_user_id: 9,
    req_user_profile:
      "https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A=",
    req_user_nickname: "Granger",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 9,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-11-13 15:38:15",
  },
  {
    id: 10,
    req_user_id: 10,
    req_user_profile:
      "https://i.pinimg.com/564x/ce/d8/4a/ced84a67302c60bd1abaaf9314064433.jpg",
    req_user_nickname: "Jasmine",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 10,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-08-03 15:38:15",
  },
  {
    id: 11,
    req_user_id: 11,
    req_user_profile:
      "https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0060/image-07b3ce0d-c32a-43c5-9bb5-a794fa511311.png",
    req_user_nickname: "Kavin",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 11,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-08-03 15:38:15",
  },
  {
    id: 12,
    req_user_id: 12,
    req_user_profile:
      "https://newsimg.hankookilbo.com/2016/05/04/201605041056000674_1.jpg",
    req_user_nickname: "Chrise",
    req_user_movie: {
      movie_id: 1,
      movie_tile: "러브 스토리",
    },
    req_user_movie_log: {
      movie_log_id: 12,
      movie_image:
        "	https://image.tmdb.org/t/p/original/3j2n8Bs0zpy4AxvPYrCGw4Pmcff.jpg",
    },

    created_at: "2024-08-03 15:38:15",
  },
];
