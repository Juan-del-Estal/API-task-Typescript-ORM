import { RoleType } from "../dto/user.dto";

export default interface UserInterface {
    id:string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword:string;
    city: string;
    province: string;
    profilePhoto: File | null;
    role: RoleType;
}   