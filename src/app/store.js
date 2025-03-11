/* Redux Store 설정 */
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orders/ordersSlice";
import usersReducer from "../features/users/usersSlice";
import booksReducer from "../features/books/booksSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    users: usersReducer,
    books: booksReducer,
  },
});

export default store;
