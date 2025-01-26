import { IUser } from "src/interfaces";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
};                                 