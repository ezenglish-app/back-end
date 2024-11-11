import type { ObjectId } from "mongodb";
import type { CardInfo } from "@/pkg/vocabulary/Vocabulary.ts";

export interface User {
  _id?: ObjectId;
  name?: string;
  email: string;
  password: string;
  vocabulary?: UserVocabulary;
  timeSpent: number;
  createdAt?: string;
}

export interface UserVocabulary {
  new: number;
  learning: number;
  reviewing: number;
  cards: Record<string, Record<string, IAsking>>;
}

export interface IAsking {
  new: number;
  learning: number;
  reviewing: number;
  cards: CardInfo[];
}

export type Response = {
  user?: User;
  token?: string;
};
