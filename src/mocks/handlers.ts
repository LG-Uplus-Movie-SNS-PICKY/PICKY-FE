import { http, HttpResponse } from "msw";

// 모의 API 생성
const handlers = [
  http.get("/user", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];

export default handlers;