import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchToDo = createAsyncThunk("todo/fetchToDo", async () => {
    const token = localStorage.getItem('to-do-token');
    const response = await axios.get("https://todo.de-code.uz/api/tasks", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.payload;
});

// Todo slice
export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todo: [],
        status: null,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDo.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchToDo.fulfilled, (state, action) => {
                state.status = "resolved";
                state.todo = action.payload;
            })
            .addCase(fetchToDo.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export default todoSlice.reducer;
