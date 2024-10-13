export const registrationFormControls = [
  {
    name: "username",
    label: "Tên tài khoản",
    type: "text",
    placeholder: "Nhập tên tài khoản",
    componentType: "input",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Nhập email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
    componentType: "input",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Nhập email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
    componentType: "input",
  },
];

export const addProductFormElements = [
  {
    label: "Tên sản phẩm",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả",
  },
  {
    label: "Phân loại",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Nam" },
      { id: "women", label: "Nữ" },
      { id: "kids", label: "Trẻ em" },
      { id: "accessories", label: "Phụ kiện" },
      { id: "footwear", label: "Giày dép" },
    ],
  },
  {
    label: "Thương hiệu",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá sale",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sale (nếu có)",
  },
  {
    label: "Hàng tồn kho",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập số lượng hàng tồn kho",
  },
  {
    label: "Kích thước",
    name: "size",
    componentType: "checkbox",
    options: [
      { id: "small", label: "S" },
      { id: "medium", label: "M" },
      { id: "large", label: "L" },
      { id: "extra-large", label: "XL" },
      { id: "double-extra-large", label: "XXL" },
    ],
  },
  {
    label: "Màu sắc",
    name: "colors",
    componentType: "colors",
  },
];
