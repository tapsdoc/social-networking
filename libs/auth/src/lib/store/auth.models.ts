/**
 * Interface for the 'Auth' data
 */

export interface SignupEntity {
  email: string;
  password: string;
  username: string;
}

export interface LoginEntity {
  username: string;
  password: string;
}

export interface AuthResponseEntity {
  access_token: string;
  token_type: string;
}