import { authService,LoginRequest } from '../services/auth/authService';
import { Dispatch } from 'react';

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGOUT = "LOGOUT";


export const login = (user:LoginRequest) => (dispatch: Dispatch<any>) => {
    return authService.login(user).then(
                (data: {token: string, user: any}) => {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: { token: data.token, user: data.user},
                      });
                    return Promise.resolve();
                },
                (error: any) => {
                  const message = error.response.data.error;
                    dispatch({
                        type: LOGIN_USER_FAIL,
                      });
                    
                    return Promise.reject(message);
                }
            );
};

export const logout = () => (dispatch: Dispatch<any>) => {
    authService.logout();
    dispatch({
      type: LOGOUT,
    });
  };

