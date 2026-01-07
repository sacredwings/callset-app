//// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { set } from '../../utils/secureStore'

// ---- Типы ----
export interface accountStateType {
    auth: boolean
    _id: string | null
    login: string | null
}

// ---- Начальное состояние ----
const initialState: accountStateType = {
    auth: false,
    _id: null,
    login: null,
}

// ---- Create Slice ----
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<accountStateType>) {
            //cookie.set('tid=' + action.payload.tokenId, !action.payload.remember)
            //cookie.set('tkey=' + action.payload.tokenKey, !action.payload.remember)

            set('tid', action.payload.tokenId)
            set('tkey', action.payload.tokenKey)

            state.auth = true // Явно устанавливаем auth в true при успешной аутентификации
            state._id = action.payload._id
            state.login = action.payload.login


        },
        deleteAuth(state) {
            // Явно сбрасываем все поля в начальное состояние
            state.auth = false
            state._id = null
            state.login = null
            // Или, если вы уверены, что всегда хотите сбросить к полному initialState:
            // Object.assign(state, initialState);
        },
        updateAuth(state, action: PayloadAction<accountStateType>) {
            return {
                ...state,
                auth: true,
                _id: action.payload._id,
                login: action.payload.login,
            }
        },
    },
})

export const { setAuth, deleteAuth, updateAuth } = accountSlice.actions
export default accountSlice.reducer // Экспортируем функцию-редьюсер