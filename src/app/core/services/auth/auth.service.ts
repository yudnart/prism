import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public get isLoggedIn() {
        return true;
    }
}