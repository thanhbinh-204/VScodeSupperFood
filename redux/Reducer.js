import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login,register } from "./UserAPI";
import { checkoutCart, getAllCate, getAllProducts } from "./MainAPI";

// Slice = action + reducer

const appSlice = createSlice({
    name: "app",
    initialState: {
        loading: false,
        count: 1,
        cart: [], // {id, name, price, quantity ,images}
        user: null, // chưa login
        products: [], // danh sach cac san pham
        cate :[],
        orders: [], // trường này để quản lý danh sách đơn hàng
        feedelivery: 30000,
    },

    reducers: {
        addItemToCart: (state, action) => {
            const index = state.cart.findIndex(
                (item) =>
                    item._id && action.payload._id && item._id.toString() === action.payload._id.toString()
            );
        
            if (index >= 0) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
        },
        
        removeItemFromCart: (state, action) => {
            state.cart = state.cart.filter
            (item => item._id !== 
            action.payload);
        },
        increaseItemQuantity: (state, action) => {
            const index = state.cart.findIndex(
                (item) =>
                    item._id && action.payload && item._id.toString() === action.payload.toString()
            );
        
            if (index >= 0) {
                state.cart[index].quantity++;
            }
        },
        decreaseItemQuantity: (state, action) => {
            const index = state.cart.findIndex(
                (item) =>
                    item._id && action.payload && item._id.toString() === action.payload.toString()
            );
        
            if (index >= 0 && state.cart[index].quantity > 1) {
                state.cart[index].quantity--;
            }
        },
        

        logout: (state) => {
            state.user = null;
            state.initiaRouteNameUser = 'LoginScreen';
        },
        clearcart: (state) => {
            state.cart = [];
        }

    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            console.log('>>>>> login.pending: ')
        });
        // chờ kết quả

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            // state.error = null;
            console.log('>>>>> login.fulfilled: ', action.payload);
            state.user = action.payload;
        });
        // kết quả thành công

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
            console.log('>>>>> login.rejected: ', action.payload);
        });
        //ket qua that bai


        // lay danh sach san pham
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(getAllCate.fulfilled,(state,action) =>{
            state.cate = action.payload
        });

        // register
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
            console.log('>>>>> register.fulfilled: ', action.payload);
        });
        builder.addCase(register.rejected, (state, action) => {
            console.log('>>>>> register.rejected: ', action.payload);
        });

        
        // them cart
        builder.addCase(checkoutCart.fulfilled, (state, action) => {
            state.user.carts = [...state.user.carts,
            {
                "_id": action.payload._id,
                "date": action.payload.date,
                "total": action.payload.total,
                "status": action.payload.status
            }]
            console.log('>>>>> checkoutCart.fulfilled: ', action.payload);
        });
    },
});

export const { addItemToCart, decreaseItemQuantity, increaseItemQuantity, logout, clearcart ,removeItemFromCart} = appSlice.actions;
export default appSlice.reducer;


