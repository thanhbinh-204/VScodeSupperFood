import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helper/AxiosInstance";

// lấy danh sách sản phẩm

export const getAllProducts = createAsyncThunk(// trả ra 1 action name 
    "product/getAllProducts", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().get(`/products/getallproduct`);
            const result = response.data;
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllCate = createAsyncThunk(// trả ra 1 action name 
    "categories/getallcate", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance().get(`/categories/getallcate`);
            const result = response.data;
            console.log('ok')
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const checkoutCart = createAsyncThunk(
    "cart/checkout",
    async (data,{ rejectWithValue }) => {
        try {
            const response = await AxiosInstance().post(`/cart`);
            const result = response.data;
            console.log('>>>>> checkoutcart response: ', result);
            return result; // []
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)


