export interface FlashCard {
  _id: string;
  user: string;
  question: string;
  answer: string;
  status: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
