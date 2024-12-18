import { useLocation, useNavigate } from "react-router-dom";
import {
  Wrapper,
  IconWrapper,
  Message,
  ButtonWrapper,
  Button,
} from "./index.styles";
import NotFound from "@assets/icons/error_message.svg?react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <div css={Wrapper}>
        <div css={IconWrapper}>
          <NotFound />
        </div>
        <div css={Message}>
          <h2>죄송합니다. 현재 페이지를 찾을 수 없습니다.</h2>
          <p>
            존재하지 않는 주소를 입력하거나, <br /> 요청하신 페이지의 주소가
            변경, 삭제되어 찾을 수 없습니다.
          </p>
        </div>
        <div css={ButtonWrapper}>
          <button css={Button} onClick={() => navigate("/")}>
            메인으로
          </button>
          <button css={Button} onClick={() => navigate(-1)}>
            이전페이지
          </button>
        </div>
      </div>
    </>
  );
}
