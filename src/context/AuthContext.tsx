import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import Api from '../api/Api';

type AuthContextProps = {
    errorMessage: string;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (RegisterData:RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    useEffect(() => {

        validaUser();
    }, []);


    const validaUser = async() => {
        const userEmail = await AsyncStorage.getItem('email');

        const userPass = await AsyncStorage.getItem('password');

        if (!userEmail && !userPass) return dispatch({ type: 'notAuthenticated' });

        const resp = await Api.post<LoginResponse>('/login',{userEmail,userPass});
        if(resp.status!==200){
            return dispatch({type:'notAuthenticated'});
        }
        dispatch({
            type: 'signUp'
            , payload: {
                user: resp.data.usuario
            }
        });

    }


    const signIn = async ({ email, password }: LoginData) => {
        try {
            const { data } = await Api.post<LoginResponse>('/login', { email, password });
            dispatch({
                type: 'signUp'
                , payload: {
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('email', data.usuario.email);
            await AsyncStorage.setItem('password', data.usuario.password);
        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.error || 'Información Incorrecta' })
        }

    };

    const signUp = async ({email,password,name}:RegisterData) => {
        try {
            const { data } = await Api.post<LoginResponse>('/', { email, password,name });
            dispatch({
                type: 'signUp'
                , payload: {
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('email', data.usuario.email);
            await AsyncStorage.setItem('password', data.usuario.password);
        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.error || 'No se pudo crear el usuario, revise la información' })
        }
     };

    const logOut = async() => { 
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        dispatch({type:'logout'});
    };
    const removeError = () => {
        dispatch({ type: 'removeError' })
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}