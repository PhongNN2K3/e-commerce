import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    fullname: String,
    address: String,
    city: String,
    zipcode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;
