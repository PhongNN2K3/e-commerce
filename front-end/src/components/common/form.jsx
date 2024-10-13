import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  errors,
  isEditMode, // Prop để phân biệt giữa add và edit
  isBtnDisabled,
}) => {
  const [localColors, setLocalColors] = useState([
    // Sử dụng colors cục bộ khi không phải edit
    {
      hexCode: "",
      imageFile: null,
      uploadedImageUrl: "",
      fileName: "",
      isLoading: false,
    },
  ]);

  // Khi isEditMode là true, colors sẽ lấy từ formData, còn không thì dùng state cục bộ
  const colors = isEditMode ? formData.colors : localColors;

  // Hàm xử lý thay đổi màu
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = value;

    if (isEditMode) {
      setFormData({ ...formData, colors: updatedColors });
    } else {
      setLocalColors(updatedColors);
      setFormData({ ...formData, colors: updatedColors }); // Cập nhật vào formData khi thêm sản phẩm mới
    }
  };

  // Hàm thêm màu mới
  const handleAddColor = () => {
    const newColor = {
      hexCode: "",
      imageFile: null,
      uploadedImageUrl: "",
      fileName: "",
      isLoading: false,
    };
    const updatedColors = [...colors, newColor];

    if (isEditMode) {
      setFormData({ ...formData, colors: updatedColors });
    } else {
      setLocalColors(updatedColors);
      setFormData({ ...formData, colors: updatedColors });
    }
  };

  // Hàm xóa màu
  const handleRemoveColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);

    if (isEditMode) {
      setFormData({ ...formData, colors: updatedColors });
    } else {
      setLocalColors(updatedColors);
      setFormData({ ...formData, colors: updatedColors });
    }
  };

  // Upload ảnh lên
  const uploadImage = async (file, index) => {
    const formDataUpload = new FormData();
    formDataUpload.append("my_file", file);

    const response = await fetch(
      "http://localhost:5000/api/admin/products/upload-image",
      {
        method: "POST",
        body: formDataUpload,
      }
    );

    const data = await response.json();
    if (data.success) {
      handleColorChange(index, "uploadedImageUrl", data.result.url); // Cập nhật URL sau khi upload thành công
      handleColorChange(index, "fileName", file.name);
      console.log("Image uploaded successfully:", file.name);
      console.log("form data", formDataUpload);
    } else {
      console.error("Image upload failed");
    }
    handleColorChange(index, "isLoading", false);
  };

  // Trigger nút chọn ảnh
  const handleButtonClick = (index) => {
    document.getElementById(`file-input-${index}`).click();
  };

  // Hàm render các input theo loại component
  const renderInputByComponentType = (control) => {
    let element = null;
    const value = formData[control.name] || "";

    const handleInputChange = (e) => {
      setFormData({ ...formData, [control.name]: e.target.value });
    };

    switch (control.componentType) {
      case "input":
        element = (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({ ...formData, [control.name]: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.id}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
      case "checkbox":
        element = (
          <div className="flex flex-wrap gap-2">
            {control.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  checked={value.includes(option.id)}
                  onCheckedChange={() => {
                    const selectedSizes = value.includes(option.id)
                      ? value.filter((s) => s !== option.id)
                      : [...value, option.id];
                    setFormData({ ...formData, [control.name]: selectedSizes });
                  }}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        );
        break;
      case "colors": // Render phần input colors
        element = (
          <div className="flex flex-col gap-4">
            {colors.map((color, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="flex flex-col w-full">
                  <Input
                    type="text"
                    placeholder="Mã Hex, ví dụ: #FFFFFF"
                    value={color.hexCode}
                    onChange={(e) =>
                      handleColorChange(index, "hexCode", e.target.value)
                    }
                  />
                  {color.isLoading && (
                    <p className="text-sm text-gray-500">Đang tải ảnh...</p>
                  )}
                </div>
                {!(color.fileName || color.uploadedImageUrl) &&
                !color.isLoading ? (
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      id={`file-input-${index}`}
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        handleColorChange(index, "imageFile", file);
                        console.log(file);
                        if (file) {
                          handleColorChange(index, "isLoading", true);
                          await uploadImage(file, index);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => handleButtonClick(index)}
                    >
                      Tải ảnh lên
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-700 overflow-hidden overflow-ellipsis max-w-[200px]">
                    {!isEditMode ? color.imageFile?.name : color?.fileName}
                  </p>
                )}
                {(color.uploadedImageUrl || color.image) &&
                  !color.isLoading && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                    >
                      Xóa
                    </Button>
                  )}
              </div>
            ))}
            <Button type="button" onClick={handleAddColor}>
              Thêm một màu khác
            </Button>
          </div>
        );
        break;
      default:
        element = (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1 text-start">{control.label}</Label>
            {renderInputByComponentType(control)}
            {errors && errors[control.name] && (
              <p className="text-red-500 text-start my-1 text-sm font-semibold">
                {errors[control.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Gửi"}
      </Button>
    </form>
  );
};

export default CommonForm;
