import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Họ tên: {addressInfo?.fullname}</Label>
        <Label>Số điện thoại: {addressInfo?.phone}</Label>
        <Label>Địa chỉ: {addressInfo?.address}</Label>
        <Label>Tỉnh/Thành phố: {addressInfo?.city}</Label>
        <Label>Mã zip: {addressInfo?.zipcode}</Label>
        <Label>Ghi chú: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>
          Chỉnh sửa
        </Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Xóa</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
