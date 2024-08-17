import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">Về Chúng Tôi</h3>
            <p className="mb-6 text-sm">
              Chúng tôi là một trong những cửa hàng trực tuyến hàng đầu, cung
              cấp các sản phẩm chất lượng cao với giá cả phải chăng. Hãy ghé
              thăm chúng tôi để có trải nghiệm mua sắm tuyệt vời!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên Kết</h3>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Trang Chủ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Sản Phẩm
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Khuyến Mãi
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <p className="mb-4 text-sm">
              <i className="fas fa-map-marker-alt"></i> 123 Đường ABC, Phường
              XYZ, Thành Phố ABC
            </p>
            <p className="mb-4 text-sm">
              <i className="fas fa-phone"></i> (+84) 123 456 789
            </p>
            <p className="text-sm">
              <i className="fas fa-envelope"></i> support@ecommerce.com
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-600 pt-6 text-sm">
        <p className="text-center">
          &copy; 2024 E-commerce | Thiết Kế bởi Đội Ngũ Sáng Tạo
        </p>
      </div>
    </footer>
  );
};

export default Footer;
