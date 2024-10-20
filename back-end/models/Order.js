import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      selectedColorHex: String,
      selectedSize: String,
    },
  ],
  addressInfo: {
    addressId: String,
    fullname: String,
    address: String,
    city: String,
    zipcode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
