/*
 *  1️⃣ 주문 관리 Redux Slice (ordersSlice.js)
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 주문 목록 가져오기 (비동기 API 요청)
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get("http://localhost:8000/api/orders/");
  return response.data;
});

// ✅ Redux Slice 생성
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;

// ✅ 이제 주문 데이터를 Django API에서 가져와 Redux Store에 저장할 준비 완료!


