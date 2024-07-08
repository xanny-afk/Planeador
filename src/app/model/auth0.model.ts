import { User } from "@auth0/auth0-angular";

export namespace Nauth0 {
    export interface UserInfo extends User {
        description: string;
    }
}