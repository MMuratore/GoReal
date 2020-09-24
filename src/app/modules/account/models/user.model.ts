import { Role } from './role.enum';

export class User {
    userId : number;
    goTag : string;
    firstName? : string;
    lastName? : string;
    email : string;
    password : string;
    isActive: boolean;
    isBan: boolean;
    token: string;
    roles: Role;
    isRequesting: boolean;
}