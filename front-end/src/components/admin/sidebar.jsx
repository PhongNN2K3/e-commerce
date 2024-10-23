import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Receipt,
  ShoppingBasket,
  User,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuitems = [
  {
    id: "dashboard",
    label: "Trang chủ",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "product",
    label: "Sản phẩm",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Đơn hàng",
    path: "/admin/orders",
    icon: <Receipt />,
  },
  {
    id: "user",
    label: "Người dùng",
    path: "/admin/users",
    icon: <User />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  const path = "/admin/" + window.location.pathname.split("/")[2];
  console.log(path, "path");

  return (
    <nav className="mt-8 flex-col flex gap-2 font-semibold">
      {adminSidebarMenuitems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className={
            menuItem.path === path
              ? "flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 bg-muted text-foreground"
              : "flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
