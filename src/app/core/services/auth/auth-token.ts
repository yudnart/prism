export type AuthToken = {
    accessToken:string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
    createdAt: Date
}