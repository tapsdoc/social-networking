/* tslint:disable */
/* eslint-disable */
import { User } from './user';
export interface PostWithVotes {
  content: string;
  created_at: string;
  id: number;
  owner: User;
  owner_id: number;
  published?: boolean;
  title: string;
  votes: number;
}
