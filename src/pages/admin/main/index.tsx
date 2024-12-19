import MovieBgImage from "@assets/images/movie.avif";
import PlaylistBgImage from "@assets/images/playlist.jpg";

import { DashboardInfoListProps } from "@hooks/admin/info/types";
import SEO from "@components/seo";
import OperationCard from "./components/operation-card";
import { useNavigate } from "react-router-dom";

function AdminDashboardPage({ data }: DashboardInfoListProps) {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="ADMIN" />

      {/* Movie Operation Card */}
      <OperationCard
        image={MovieBgImage}
        title="새로운 영화를 등록해보세요!"
        context="영화 정보를 추가하고 리뷰와 게시물이 가능하도록 해보세요."
        onClick={() => navigate("/admin/movie-management/movies")}
      />

      {/* Playlist Operation Card */}
      <OperationCard
        image={PlaylistBgImage}
        title="새로운 플레이리스트를 만들어보세요!"
        context="PICKY가 추천하는 영화를 사용자들과 공유해보세요."
        onClick={() => navigate("/admin/movie-management/playlists")}
      />
    </>
  );
}

export default AdminDashboardPage;
