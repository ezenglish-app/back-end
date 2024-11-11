export interface CardInfo {
  id: number;
  factor: number;
  nextReview: string;
  interval: number;
  isReverse: boolean;
}

export interface ICard {
  uuid: string;
  english: string;
  spanish: string;
  pronunciation: string;
}

export type Vocabulary = {
  totalCards: number;
  cards: Record<string, ICard[]>;
};
