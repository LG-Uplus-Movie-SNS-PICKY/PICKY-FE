import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Feed, Comment } from "@pages";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/main";
import Login from "@pages/login";
import Signup from "@pages/signup";
import Search from "@pages/search";
import Layout from "@components/layout";
import AdminLayout from "./AdminLayout";
import MovieDetail from "@pages/movie-detail";
import MovieReviews from "@pages/movie-detail/reviews";
import My from "@pages/my";
import Recommendations from "@pages/recommendations";
import Edit from "@pages/edit";
import Callback from "@pages/login/oauth";
import Post from "@pages/social/post";
import { HelmetProvider } from "react-helmet-async";
import PickyPage from "@pages/picky/main";
import PickyGenreDetailPage from "@pages/picky/genre-detail";
import NotificationPage from "@pages/notification";

function Router() {
  return (
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Global styles={globalStyle} />

        <Layout>
          <Routes>
            {/* 공개 라우트 */}
            <Route path="/" element={<Home />} />

            {/* 로그인 사용자 라우트 */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movie/:id/reviews" element={<MovieReviews />} />
            <Route path="/my" element={<My />} />

            <Route path="/login/oauth2/callback" element={<Callback />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/recommendations" element={<Recommendations/>} />

            {/* 관리자 전용 라우트 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-profile/edit" element={<Edit />} />
            <Route path="/movie-log" element={<Feed />} />
            <Route path="/add-feed" element={<Post />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/search" element={<Search />} />
            <Route path="/picky" element={<PickyPage />} />
            <Route
              path="/picky/genre/:genreId"
              element={<PickyGenreDetailPage />}
            />

            {/* 관리자 전용 라우트 */}
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Router;
