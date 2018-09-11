import { UserRole } from "./user-role";

export class User{
    Id?:number;
    FullName?:string;
    PhoneNumber?:string;
    Password?:string;
    Role?:UserRole;
    Address?: string;
    LatLng?:string;
}