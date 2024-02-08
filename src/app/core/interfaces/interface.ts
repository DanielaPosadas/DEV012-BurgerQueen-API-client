
export interface Login {
    accessToken: string,
    user: User
}

export interface User {
    email: string,
    role: string,
    id: number
}
