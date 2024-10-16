import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BooksItemsCart = {
    items: BooksCart[]
    isOpen: boolean
}

const initialState: BooksItemsCart = {
    items: [],
    isOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        },
        add: (state, action: PayloadAction<BooksCart>) => {
            const book = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (!book) {
                state.items.push(action.payload)
            }
        }
    }
})
export const { close, open, add } = cartSlice.actions
export default cartSlice.reducer
