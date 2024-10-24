import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/**header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full overflow-y-auto max-h-[calc(100vh-36px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
