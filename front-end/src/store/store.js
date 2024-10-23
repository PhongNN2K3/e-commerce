import { configureStore } from "@reduxjs/toolkit";
import adminFeatureSlice from "./admin/feature-slice";
import adminOrderSlice from "./admin/order-slice";
import AdminProductsSlice from "./admin/products-slice";
import authReducer from "./auth-slice";
import shopAddressSlice from "./shop/address-slice";
import shopCartSlice from "./shop/cart-slice";
import shopOrderSlice from "./shop/order-slice";
import shopProductsSlice from "./shop/products-slice";
import shopReviewSlice from "./shop/review-slice";
import shopSearchSlice from "./shop/search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    adminFeature: adminFeatureSlice,
    shopOrder: shopOrderSlice,
    shopAddress: shopAddressSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
  },
});
export default store;
