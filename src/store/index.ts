import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'
import loginSiginReducer from './reducers/loginSign'
const store = configureStore({
    reducer: {
        cart: cartReducer,
        loginSigin: loginSiginReducer
    }
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
