import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StarRatingComponent from "../common/star-rating";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); // New state for selected color
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  // Set default size on initial render
  useEffect(() => {
    if (productDetails?.size?.length) {
      setSelectedSize(productDetails.size[0]); // Default to first size
    }
  }, [productDetails]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) =>
          item.productId === getCurrentProductId &&
          item.selectedColorHex ===
            productDetails?.colors[selectedColorIndex]?.hexCode &&
          item.selectedSize === selectedSize
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Chỉ còn ${getQuantity} sản phẩm cho mặt hàng này`);

          return;
        }
      }
    }

    // Get selected color details
    const selectedColor = productDetails?.colors[selectedColorIndex];
    const selectedColorHex = selectedColor.hexCode;
    const selectedImage = selectedColor.image;

    dispatch(
      addToCart({
        userId: user?.user?.id || user?.user?._id,
        productId: getCurrentProductId,
        quantity: 1,
        selectedColorHex,
        selectedImage,
        selectedSize,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.user?.id || user?.user?._id));
        console.log("Added to cart", data);
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedColorIndex(0);
    setSelectedSize("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.user?.id || user?.user?._id,
        username: user?.user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      console.log("Added review", data);

      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Đánh giá sản phẩm thành công!");
      }
      if (data.error && data.error.message.includes("400")) {
        toast.error("Bạn đã đánh sản phẩm này");
      } else if (data.error && data.error.message.includes("403")) {
        toast.error("Bạn cần mua sản phẩm này trước khi đánh giá");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");
  console.log(user, "user");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  // Handler for color selection
  const handleColorSelect = (index) => {
    setSelectedColorIndex(index);
  };

  // Handler for size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  // Get the selected color and image
  const selectedColor = productDetails?.colors[selectedColorIndex];
  const selectedImage = selectedColor?.image;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={selectedImage}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          <div>
            <h1 className="text-xl font-extrabold">{productDetails?.title}</h1>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  className={`p-1 rounded-full transition-colors ${
                    star <= averageReview ? "text-yellow-500" : "text-black"
                  }`}
                >
                  <StarIcon
                    style={{
                      width: `14px`,
                      height: `14px`,
                    }} // Set star size dynamically relative to button size
                    className={`${
                      star <= averageReview ? "fill-yellow-500" : "fill-gray-50"
                    }`}
                  />
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(1)})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {productDetails?.price}đ
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl font-bold">{productDetails?.salePrice}đ</p>
            ) : null}
          </div>

          {/* Color selection */}
          <div className="mt-5">
            <h3 className="text-md font-bold mb-2">Màu sắc:</h3>
            <div className="flex items-center gap-2">
              {productDetails?.colors?.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border ${
                    selectedColorIndex === index
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                  onClick={() => handleColorSelect(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* Size selection with RadioGroup */}
          <div className="mt-5">
            <h3 className="text-lg font-bold mb-2">Kích cỡ:</h3>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex items-center gap-4"
            >
              {productDetails?.size?.map((size, index) => (
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={size} key={index} id={size} />
                  <Label htmlFor={size} className="cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Hết hàng
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Thêm vào giỏ hàng
              </Button>
            )}
          </div>
          <div>
            <p className="text-sm mb-5 mt-4 overflow-y-auto max-h-[300px]">
              {productDetails?.description}
            </p>
          </div>
          <Separator />
          {
            <div className="">
              <h2 className="text-xl font-bold mb-4">Đánh giá</h2>
              <div className="grid gap-6 max-h-[300px] overflow-auto">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem, index) => (
                    <div key={index} className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.username}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <div className="flex items-center gap-2 my-2">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  className={`p-1 rounded-full transition-colors ${
                                    star <= reviewItem?.reviewValue
                                      ? "text-yellow-500"
                                      : "text-black"
                                  }`}
                                >
                                  <StarIcon
                                    style={{
                                      width: `14px`,
                                      height: `14px`,
                                    }} // Set star size dynamically relative to button size
                                    className={`${
                                      star <= reviewItem?.reviewValue
                                        ? "fill-yellow-500"
                                        : "fill-gray-50"
                                    }`}
                                  />
                                </div>
                              ))}
                            </div>
                            <span className="text-muted-foreground">
                              ({reviewItem?.reviewValue})
                            </span>
                          </div>
                        </div>
                        <p className="text-sm">{reviewItem.reviewMessage}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>Không có đánh giá nào</h1>
                )}
              </div>
              <div className="mt-10 flex-col flex gap-2">
                <div className="flex gap-1">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                    dimension={24}
                  />
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setReviewMsg(event.target.value)}
                  placeholder="Hãy viết đánh giá ở đây..."
                />
                <Button
                  onClick={handleAddReview}
                  //disabled={reviewMsg.trim() === ""}
                >
                  Gửi
                </Button>
              </div>
            </div>
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
