import {setIsLoggedInAC} from '../features/Login/authReducer';
import {authAPI} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppThunkDispatch} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case  'APP/SET-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializeAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedType = ReturnType<typeof setAppInitializeAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializedType


export const initializeAppTC = () => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        //@ts-ignore
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppInitializeAC(true))
    }
}