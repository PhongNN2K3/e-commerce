import { addressFormControls } from "@/config";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card.jsx";

const initialAddressFormData = {
  fullname: "",
  address: "",
  city: "",
  phone: "",
  zipcode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("Bạn chỉ có thể thêm tối đa 3 địa chỉ");

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.user?.id || user?.user?._id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.user?.id || user?.user?._id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Địa chỉ cập nhật thành công");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.user?.id || user?.user?._id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.user?.id || user?.user?._id));
            setFormData(initialAddressFormData);
            toast.success("Địa chỉ thêm thành công");
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userId: user?.user?.id || user?.user?._id,
        addressId: getCurrentAddress._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.user?.id || user?.user?._id));
        toast.success("Địa chỉ xóa thành công");
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      fullname: getCuurentAddress?.fullname,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      zipcode: getCuurentAddress?.zipcode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.user?.id || user?.user?._id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Chỉnh sửa địa chỉ" : "Thêm mới địa chỉ"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Chỉnh sửa" : "Thêm"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
