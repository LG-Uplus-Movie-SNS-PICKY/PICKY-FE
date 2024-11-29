// pages/MovieDetail/components/MovieReview/index.styles.tsx
import styled from '@emotion/styled';

export const TotalReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background-color: #FFFFFF;
`;

export const ReviewBody = styled.div<{ noBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px 4px;
  gap: 4px;
  border-bottom: ${(props) => props.noBorder ? 'none' : '0.5px solid #D9D9D9'};
  background-color: #FFFFFF;
`;

export const ReviewStars = styled.div`
  display: flex;
  margin-bottom: 5px;
`;


export const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Star = styled.span<{ filled: boolean }>`
  color: ${props => props.filled ? '#FC4C4E' : '#C8C8C8'};
  &::before {
    content: '★';
    display: block;
    width: 12px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
  }
`;

export const StarRating = styled.span`
  font-size: 12px;
  font-weight: 600;
  align-self: center;
`;

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const ReviewBadge = styled.div` 
  display: flex;
  width: 32px;
  height: 16px;
  font-size: 8px;
  color: #756262;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  border: 1px solid #D9D9D9;
`;

export const ReviewText = styled.div`
  font-size: 8px;
  display: flex; 
  align-items: center;
  justify-content: center; 
`;

export const ReviewDetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

export const ReviewDetailsText = styled.div`
  display: flex;
  font-size: 8px;
  color: #756262;
  align-items: center;
  justify-content: center; 
`;

export const ThumbsButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`;

export const ThumbsButton = styled.div<{ active?: boolean }>` 
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 32px;
  height: 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  color: #756262;
  font-size: 8px;
  font-weight: ${props => props.active ? '600' : '400'};
  border: ${props => props.active ? '1px solid #D9D9D9' : '0.5px solid #D9D9D9'};
`;