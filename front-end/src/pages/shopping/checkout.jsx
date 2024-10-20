import Address from "@/components/shopping/address";
import UserCartItemsContent from "@/components/shopping/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import img from "../../assets/account.jpg";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast.error(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm 1 món hàng để tiếp tục"
      );

      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Vui lòng chọn 1 địa chỉ để tiếp tục");

      return;
    }

    const orderData = {
      userId: user?.user?.id || user?.user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
        selectedColorHex: singleCartItem?.selectedColorHex,
        selectedSize: singleCartItem?.selectedSize,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        fullname: currentSelectedAddress?.fullname,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        zipcode: currentSelectedAddress?.zipcode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "sangam");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Tổng</span>
              <span className="font-bold">{totalCartAmount}đ</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Đang tiến hành xử lý giao dịch thanh toán qua PayPal..."
                : "Thanh toán với Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
