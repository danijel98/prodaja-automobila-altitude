import http from '../../../http-common';

export interface LoginRequest{
    username:string,
    password:string,
}

export class AuthService {

    async login(data:LoginRequest): Promise<any>{
        const response = await http.post(`auth/login`, {data});
        let accessToken = '';
        let role = '';
        if (response.headers) {
            accessToken = (response.headers['auth-access-token'])
            role = (response.headers['role'])
            localStorage.setItem('auth-access-token', accessToken);
            localStorage.setItem('role', role);
            return response;
        }
        return response;
    }

    async logout(): Promise<any>{
        const token = localStorage.getItem("auth-access-token");
        const data = {token}
        const response = await http.post(`auth/logout`, {data});
        localStorage.removeItem('auth-access-token');
        localStorage.removeItem('role')
        return response;
    }
  
       
   
}

export const authService = new AuthService();