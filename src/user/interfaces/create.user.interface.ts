import { RoleType } from "../dto/user.dto";

export default interface UserInterface {
    id:string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    city: string;
    province: string;
    role: RoleType;
}   