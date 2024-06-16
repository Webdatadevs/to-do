import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchToDoCategory = createAsyncThunk(
    "todoCategory/fetchToDoCategory",
    async () => {
        const token = localStorage.getItem("to-do-token");
        const response = await axios.get(
            "https://todo.de-code.uz/api/categories",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            
        );
        // console.log('API Response:', response.data); 
        return response.data.data;
    }
);
export const categorySlice = createSlice({
    name: "todoCategory",
    initialState: {
        todoCategory: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDoCategory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchToDoCategory.fulfilled, (state, action) => {
                state.status = "resolved";
                state.todoCategory = action.payload;
            })
            .addCase(fetchToDoCategory.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
