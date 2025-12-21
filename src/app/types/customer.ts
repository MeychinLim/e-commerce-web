import { BaseResponse } from "./response";

export type CustomerType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: number;
};

export type CustomerReviewType = {
  id: number;
  name: string;
  review: string;
  rating: number;
  avatarUrl: string;
};

export type CustomerTypeResponse = BaseResponse<CustomerType>;
