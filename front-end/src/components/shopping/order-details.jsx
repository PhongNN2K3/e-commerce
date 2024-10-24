import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const shippingStatus = {
    pending: "Đang chờ xử lý",
    inProcess: "Đang xử lý",
    inShipping: "Đang giao",
    delivered: "Đã giao",
    rejected: "Đã hủy",
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 text-sm">
        <div className="grid gap-1">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ID đơn hàng</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Ngày đặt hàng</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Giá trị đơn hàng</p>
            <Label>{orderDetails?.totalAmount}đ</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Phương thức thanh toán</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Tình trạng thanh toán</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Tình trạng đơn hàng</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "Đã xác nhận"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "Đã hủy"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {shippingStatus.hasOwnProperty(orderDetails?.orderStatus) &&
                orderDetails?.orderStatus
                  ? shippingStatus[orderDetails?.orderStatus]
                  : orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Chi tiết đơn hàng</div>
            <div className="overflow-x-auto">
              <ul className="flex gap-4">
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item) => (
                      <li className="flex flex-col items-start border p-4 min-w-[200px]">
                        <span>Tiêu đề: {item.title}</span>
                        <span>Số lượng: {item.quantity}</span>
                        <span>Giá: {item.price}đ</span>
                        <span className="flex">
                          Màu sắc:
                          <div
                            className="w-5 h-5 ml-1 rounded-full border-2 border-slate-500"
                            style={{ backgroundColor: item?.selectedColorHex }}
                          ></div>
                        </span>
                        <span>Kích thước: {item?.selectedSize}</span>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Thông tin vận chuyển:</div>
            <div className="grid gap-0.5 text-xs font-semibold">
              <span>{orderDetails?.addressInfo?.fullname}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.zipcode}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
