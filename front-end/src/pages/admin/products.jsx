import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  colors: [
    { hexCode: "", imageFile: null, uploadedImageUrl: "", fileName: "" },
  ], // Store hexCode, image file, and uploaded image URL
  size: [],
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [colorImages, setColorImages] = useState([]);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const resetForm = () => {
    setFormData(initialFormData); // Reset formData to initial structure
    setCurrentEditedId(null); // Clear current edited ID
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const preparedColors = formData.colors.map((color) => ({
      hexCode: color.hexCode,
      image: color.image ? color.image : color.uploadedImageUrl, // Use the uploaded image URL
      fileName: color.fileName, // Use the original file name for image upload verification
    }));

    console.log("Form Data Before Submission: ", {
      ...formData,
      colors: preparedColors,
    });
    // If currentEditedId is not null, it means the user is editing an existing product
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: { ...formData, colors: preparedColors },
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            resetForm();
            setOpenCreateProductsDialog(false);
            toast.success("Sản phẩm đã được chỉnh sửa");
          }
        })
      : dispatch(addNewProduct({ ...formData, colors: preparedColors })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              resetForm();
              setOpenCreateProductsDialog(false);
              toast.success("Sản phẩm đã được thêm");
              console.log(data);
            }
          }
        );
  };

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return (
      Object.keys(formData)
        //.filter((currentKey) => currentKey !== "averageReview")
        .map((key) => formData[key] !== "")
        .every((item) => item)
    );
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Thêm mới sản phẩm
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null
                ? "Chỉnh sửa sản phẩm"
                : "Thêm mới sản phẩm"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Chỉnh sửa" : "Thêm sản phẩm"
              }
              isEditMode={currentEditedId !== null}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
