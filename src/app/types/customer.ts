import { BaseResponse } from "./response";

export type CustomerType ={
    id: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: number;
}
    
export type CustomerTypeResponse = BaseResponse<CustomerType>;