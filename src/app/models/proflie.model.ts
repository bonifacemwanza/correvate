export interface Profile extends Session{
    id?:string,
    email:string,
}
export interface UserLogin {
    password: string;
    username:string;
}
export interface CreateProfile extends Profile,UserLogin {
    password_confirm?:string;
    firstName: string;
    lastName: string;
    phone: string;
    userStatus:number;
}
export interface Session {
    isLoggedIn?: boolean;
    sessionId?: string;
}