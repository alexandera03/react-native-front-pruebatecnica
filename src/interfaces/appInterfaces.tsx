
export interface LoginData{
    email:string;
    password:string;
}

export interface RegisterData{
    email:string;
    password:string;
    name:string;
}
export interface LoginResponse {
    usuario:Usuario;
}

export interface Usuario{
    
        id: number,
        email: string,
        password: string,
        name: string,
        created_at: string,
        updated_at: string,
    
}