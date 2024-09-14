import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";

// Số lượng item trên mỗi trang
const ITEMS_PER_PAGE = 10;

const TestTables = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm để tải dữ liệu từ nhiều file JSON
    const loadData = async () => {
      try {
        setLoading(true);

        // Giả sử bạn có 10 file JSON, tên từ `data1.json` đến `data10.json`
        const files = [...Array(10).keys()].map((i) =>
          import(`./data-${i + 1}.json`)
        );

        // Sử dụng Promise.all để chờ tất cả file được tải về
        const data = await Promise.all(files);

        // Kết hợp dữ liệu từ tất cả các file
        const combinedData = data.flatMap((file) => file.default);
        setAllData(combinedData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = useMemo(
    () => allData.slice(offset, offset + ITEMS_PER_PAGE),
    [offset, allData]
  );

  if (loading) {
    return (
      <div>
        <div className="container mx-[600px] py-[300px] ">
          <div className="w-[70px] h-[70px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#0C60FF"
                stroke="#0C60FF"
                stroke-width="2"
                r="15"
                cx="40"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4"
                ></animate>
              </circle>
              <circle
                fill="#0C60FF"
                stroke="#0C60FF"
                stroke-width="2"
                r="15"
                cx="100"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2"
                ></animate>
              </circle>
              <circle
                fill="#0C60FF"
                stroke="#0C60FF"
                stroke-width="2"
                r="15"
                cx="160"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
            </svg>
          </div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <div className="font-sans overflow-x-auto">
          <table className="min-w-full divide-y ">
            <thead className=" whitespace-nowrap">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Document No
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Số tiền (VND)
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white bg-slate-900 uppercase tracking-wider">
                  Nội dung
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-x  whitespace-nowrap">
              {currentPageData.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-5 text-left text-sm text-black">
                    {data.d}
                  </td>
                  <td className="px-4 py-5 text-left text-sm text-black">
                    {data.no}
                  </td>
                  <td className="px-4 py-5 text-right text-sm text-black">
                    {data.am}
                  </td>
                  <td className="px-4 py-5 text-left text-sm text-black whitespace-pre-line">
                    {data.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mt-4">
          <ReactPaginate
            className="flex justify-center gap-10"
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={Math.ceil(allData.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            // Custom số trang hiển thị
            pageRangeDisplayed={3} // Số lượng trang ở giữa
            marginPagesDisplayed={1} // Số trang hiển thị ở đầu và cuối
            // Custom style cho các dấu "..."
            breakLabel={"..."}
            breakClassName={"pagination__break"}
            breakLinkClassName={"pagination__link"}
          />
        </div>
      </div>
    </div>
  );
};

export default TestTables;
