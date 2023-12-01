import { inject } from "@angular/core";
import { AuthService } from "@/core/services/auth";

export const AuthGuard = () => {
    const authService: AuthService = inject(AuthService);
    return authService.isLoggedIn;
}