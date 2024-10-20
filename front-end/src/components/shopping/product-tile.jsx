import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto cursor-pointer">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.colors[0]?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Hết hàng
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Chỉ còn ${product?.totalStock} sản phẩm`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[250px]">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.price}đ
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                {product?.salePrice}đ
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {!product?.totalStock ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Hết hàng
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleAddtoCart(
                product?._id,
                product?.totalStock,
                product?.colors[0],
                product?.size[0]
              )
            }
            className="w-full"
          >
            Thêm vào giỏ hàng
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
