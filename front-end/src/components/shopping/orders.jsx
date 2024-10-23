import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details.jsx";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const shippingStatus = {
    pending: "Đang chờ xử lý",
    inProcess: "Đang xử lý",
    inShipping: "Đang giao",
    delivered: "Đã giao",
    rejected: "Đã hủy",
  };

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }
  const shipping = shippingStatus[orderDetails?.orderStatus];
  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.user?.id || user?.user?._id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");
  console.log(orderList, "orderList");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử đặt hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID đơn hàng</TableHead>
              <TableHead>Ngày đặt hàng</TableHead>
              <TableHead>Tình trạng đơn hàng</TableHead>
              <TableHead>Giá trị đơn hàng</TableHead>
              <TableHead>
                <span className="sr-only">Chi tiết</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "Đã xác nhận"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "Đã hủy"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {shippingStatus.hasOwnProperty(
                          orderItem?.orderStatus
                        ) && orderItem?.orderStatus
                          ? shippingStatus[orderItem?.orderStatus]
                          : orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{orderItem?.totalAmount}đ</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          Xem chi tiết
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
