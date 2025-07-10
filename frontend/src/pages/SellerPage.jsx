import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/SellerSidebar";
import SellerTopbar from "../components/SellerTopbar";

const SellerPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar />
      <div className="flex flex-col flex-1">
        <SellerTopbar />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerPage;
