import { configureStore } from "@reduxjs/toolkit";
import adminOrderSlice from "./admin/order-slice";
import AdminProductsSlice from "./admin/products-slice";
import authReducer from "./auth-slice";
import commonFeatureSlice from "./common-slice";
import shopAddressSlice from "./shop/address-slice";
import shopCartSlice from "./shop/cart-slice";
import shopOrderSlice from "./shop/order-slice";
import shopProductsSlice from "./shop/products-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    commonFeature: commonFeatureSlice,
    shopOrder: shopOrderSlice,
    shopAddress: shopAddressSlice,
  },
});
export default store;
