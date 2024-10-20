import ProductDetailsDialog from "@/components/shopping/product-details";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeatureImages } from "@/store/common-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  ShirtIcon,
  WandSparkles,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Adidas from "../../assets/adidas.jpg";
import bannerOne from "../../assets/banner1.jpg";
import bannerTwo from "../../assets/banner2.jpg";
import bannerThree from "../../assets/banner3.jpg";
import bannerFour from "../../assets/banner4.jpg";
import HM from "../../assets/h&m.jpg";
import Levi from "../../assets/levis.png";
import Nike from "../../assets/nike.png";
import Puma from "../../assets/puma.png";
import Zara from "../../assets/zara.png";

const categoriesWithIcon = [
  { id: "men", label: "Nam", icon: ShirtIcon },
  { id: "women", label: "Nữ", icon: WandSparkles },
  { id: "kids", label: "Trẻ em", icon: BabyIcon },
  { id: "accessories", label: "Phụ kiện", icon: WatchIcon },
  { id: "footwear", label: "Giày dép", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Nike },
  { id: "adidas", label: "Adidas", icon: Adidas },
  { id: "puma", label: "Puma", icon: Puma },
  { id: "levi", label: "Levi's", icon: Levi },
  { id: "zara", label: "Zara", icon: Zara },
  { id: "h&m", label: "H&M", icon: HM },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const slides = [bannerOne, bannerTwo, bannerThree, bannerFour];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(
    getCurrentProductId,
    getTotalStock,
    selectedColor,
    selectedSize
  ) {
    let getCartItems = cartItems.items || [];
    const { hexCode, image } = selectedColor;

    console.log("cart", {
      userId: user?.user?.id || user?.user?._id,
      productId: getCurrentProductId,
      quantity: 1,
      selectedColorHex: hexCode, // Pass selected color hex code
      selectedImage: image,
      selectedSize,
    });

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Chỉ còn ${getQuantity} sản phẩm cho mặt hàng này`);

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.user?.id || user?.user?._id,
        productId: getCurrentProductId,
        quantity: 1,
        selectedColorHex: hexCode, // Pass selected color hex code
        selectedImage: image,
        selectedSize,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.user?.id || user?.user?._id));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides && slides.length > 0
          ? slides.map((slide, index) => (
              <img
                src={slide}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-fit transition-opacity duration-1000`}
              />
            ))
          : null}

        {/* Left navigation button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        {/* Right navigation button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Phân loại</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Thương hiệu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <img
                      src={brandItem.icon}
                      alt={brandItem.label}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <span className="font-bold text-center">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Sản phẩm nổi bật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
