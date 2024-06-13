/* tslint:disable */
/* eslint-disable */
import { User } from './user';

export interface Post {
  content: string;
  created_at: string;
  id: number;
  owner: User;
  owner_id: number;
  published?: boolean;
  title: string;
}
