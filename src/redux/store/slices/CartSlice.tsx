import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    cartList: any[]; // Set the type to any[]
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        //cartList to any and empty initially
        cartList: [] as any[],
    },
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            state.cartList.push(action.payload)
        },
        removeFromCart: (state, action: PayloadAction<any>) => {
            state.cartList = state.cartList.filter((item) => item.id !== action.payload.id)
        },
        incrementCartItemQuantity: (state, action: PayloadAction<any>) => {
            const item = state.cartList.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decrementCartItemQuantity: (state, action: PayloadAction<any>) => {
            const item = state.cartList.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity--;
            }
        },
        checkIfCartItemExists: (state, action: PayloadAction<any>) => {
            const item = state.cartList.find((item) => item.id === action.payload.id);
            if (item) {
                return item;
            } else {
                return;
            }
        },

    }
})

export const {
    addToCart,
    removeFromCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    checkIfCartItemExists
} = cartSlice.actions

export default cartSlice.reducer;