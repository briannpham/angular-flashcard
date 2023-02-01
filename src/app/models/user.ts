export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserReponse {
  _id: string;
  firstName: string;
  token: string;
}
