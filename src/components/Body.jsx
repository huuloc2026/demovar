import React from "react";

const Body = () => {
  return (
    <div className="container mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <div className="text-xl sm:text-2xl md:text-3xl font-bold">
        Danh sách đóng góp bão số 3 Yagi cho MTTQVN
      </div>
      <div className="text-xs sm:text-sm md:text-base mt-2">
        Theo danh sách công bố từ MTTQVN đến ngày 10/09/2024
        <div>
          Miễn trừ trách nhiệm: Thông tin được cung cấp từ MTTQVN, chúng tôi chỉ
          XỬ LÝ DỮ LIỆU và giúp việc tìm kiếm, lọc dữ liệu đơn giản hơn, để xem
          bản gốc vui lòng truy cập:
        </div>
      </div>
      <a
        href="https://www.facebook.com/thongtinchinhphu"
        className="block mt-2 text-blue-600 hover:underline text-xs sm:text-sm md:text-base"
      >
        Thông tin chính phủ - Facebook
      </a>
      <div className="mt-4 text-xs sm:text-sm md:text-base">
        Trang web không chèn link Shopee, quảng cáo hay bất cứ thứ gì, nếu bạn
        truy cập vào trang web có chứa quảng cáo, hãy kiểm tra kỹ trước khi tiếp
        tục.
      </div>
    </div>
  );
};

export default Body;
