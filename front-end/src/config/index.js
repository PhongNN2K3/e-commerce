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
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
      { id: "XXL", label: "XXL" },
    ],
  },
  {
    label: "Màu sắc",
    name: "colors",
    componentType: "colors",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Trang chủ",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Sản phẩm",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Nam",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Nữ",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Trẻ em",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Giày dép",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Phụ kiện",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Tìm kiếm",
    path: "/shop/search",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Nam" },
    { id: "women", label: "Nữ" },
    { id: "kids", label: "Trẻ em" },
    { id: "accessories", label: "Phụ kiện" },
    { id: "footwear", label: "Giày dép" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến cao" },
  { id: "price-hightolow", label: "Giá: Cao đến thấp" },
  { id: "title-atoz", label: "A đến Z" },
  { id: "title-ztoa", label: "Z đến A" },
];

export const categoryOptionsMap = {
  men: "Nam",
  women: "Nữ",
  kids: "Trẻ em",
  accessories: "Phụ kiện",
  footwear: "Giày dép",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const addressFormControls = [
  {
    label: "Họ tên",
    name: "fullname",
    componentType: "input",
    type: "text",
    placeholder: "Nhập họ tên của bạn",
  },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại của bạn",
  },
  {
    label: "Địa chỉ",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Nhập địa chỉ của bạn",
  },
  {
    label: "Tỉnh/Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tỉnh/thành phố của bạn",
  },
  {
    label: "Mã zip",
    name: "zipcode",
    componentType: "input",
    type: "text",
    placeholder: "Nhập mã zip của bạn",
  },

  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú",
  },
];
