import { ID } from "./app-types";

export type Comment = {
  id: ID;
  username: string;
  userPic: string | null;
  text: string;
  likes: number;
  deslikes: number;
  replies: Comment[];
  intention: -1 | 0 | 1;
}