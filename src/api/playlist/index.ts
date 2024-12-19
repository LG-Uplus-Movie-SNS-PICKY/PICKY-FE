import apiClient from "@api";

// 플레이리스트 조회 API 호출
export async function fetchPlaylists(lastPlaylistId: number) {
  const params = new URLSearchParams({ size: "6" });

  // lastPlaylistId가 입력되면 해당 값을 Query String에 포함시킨다.
  if (lastPlaylistId) {
    params.append("last-playlist-id", lastPlaylistId.toString());
  }

  const { data } = await apiClient.get(`/playlist/all?${params.toString()}`);
  return data;
}

// 플레이리스트 추가 POST API
export async function fetchCreatePlaylist(movieIds: number[], title: string) {
  const { data } = await apiClient.post(`/admin/playlist`, {
    movieIds,
    title,
  });

  return data;
}

// 플레이리스트 수정 PATCH API
export async function fetchUpdatePlaylist(
  playlistId: number,
  title: string,
  movieIds: number[]
) {
  const { data } = await apiClient.patch("/admin/playlist", {
    playlistId,
    movieIds,
    title,
  });

  return data;
}

// 플레이리스트 삭제 DELETE API
export async function fetchDeletePlaylist(playlistId: number) {
  const { data } = await apiClient.delete(
    `/admin/playlist?playlistId=${playlistId}`
  );
  return data;
}
