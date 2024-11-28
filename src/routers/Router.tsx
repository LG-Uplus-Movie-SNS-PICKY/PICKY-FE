import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { Main } from "@pages";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/Home";
import Layout from "@components/layout";
import AdminLayout from "./AdminLayout";
import MovieDetail from "../pages/MovieDetail";
import MovieReviews from "../pages/MovieDetail/Reviews";

function Router() {
  return (
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

          {/* 관리자 전용 라우트 */}
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
