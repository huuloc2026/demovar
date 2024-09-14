import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

const TestClear = () => {
  const [allData, setAllData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchDoc, setSearchDoc] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const itemsPerPage = 20; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);

  // Load data from JSON files
  const loadData = async () => {
    try {
      setLoading(true);

      // Create array of promises to load data from JSON files
      const files = [...Array(10).keys()].map((i) =>
        import(`../data/data-${i + 1}.json`)
      );

      // Use Promise.all to wait for all files to load
      const data = await Promise.all(files);

      // Combine data from all files
      const combinedData = data.flatMap((file) => file.default);
      setAllData(combinedData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const performSearch = () => {
    setCurrentPage(0); // Go to the first page when searching
    setSearchSubmitted(true); // Mark search as submitted

    const filteredData = allData.filter((item) => {
      const itemDate = item.d;
      const itemDoc = item.no;
      const itemAmount = item.am.replace(/,/g, ""); // Remove commas from amount
      const itemContent = item.c.toLowerCase();

      // Convert input date from dd/mm/yyyy to yyyy/mm/dd for comparison
      const formattedSearchDate = searchDate
        ? searchDate.split("/").reverse().join("/")
        : "";

      return (
        (formattedSearchDate === "" ||
          itemDate.includes(formattedSearchDate)) &&
        (searchDoc === "" || itemDoc.includes(searchDoc)) &&
        (searchAmount === "" ||
          itemAmount.includes(searchAmount.replace(/,/g, ""))) &&
        (searchContent === "" ||
          itemContent.includes(searchContent.toLowerCase()))
      );
    });

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  };

  const handleSearchClick = () => {
    performSearch();
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      (currentPage + 1) * itemsPerPage < allData.length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (searchSubmitted) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const filteredData = allData.filter((item) => {
        const itemDate = item.d;
        const itemDoc = item.no;
        const itemAmount = item.am.replace(/,/g, ""); // Remove commas from amount
        const itemContent = item.c.toLowerCase();

        // Convert input date from dd/mm/yyyy to yyyy/mm/dd for comparison
        const formattedSearchDate = searchDate
          ? searchDate.split("/").reverse().join("/")
          : "";

        return (
          (formattedSearchDate === "" ||
            itemDate.includes(formattedSearchDate)) &&
          (searchDoc === "" || itemDoc.includes(searchDoc)) &&
          (searchAmount === "" ||
            itemAmount.includes(searchAmount.replace(/,/g, ""))) &&
          (searchContent === "" ||
            itemContent.includes(searchContent.toLowerCase()))
        );
      });

      setDisplayedData(filteredData.slice(startIndex, endIndex));
    }
  }, [
    currentPage,
    allData,
    searchDate,
    searchDoc,
    searchAmount,
    searchContent,
    searchSubmitted,
  ]);

  return (
    <div className="container mx-auto p-5">
      <div className="mb-5">
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <input
            type="text"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
            placeholder="Tìm kiếm theo ngày (dd/mm/yyyy)"
          />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
            placeholder="Tìm kiếm theo document no"
          />
          <input
            type="text"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
            placeholder="Tìm kiếm theo số tiền"
          />
          <input
            type="text"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4"
            placeholder="Tìm kiếm theo nội dung"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 md:mt-0"
          >
            <BsSearch />
            <span className="ml-2">Tìm kiếm</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-5">
            {displayedData.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-md"
              >
                <div>
                  <strong>Ngày:</strong> {item.d}
                </div>
                <div>
                  <strong>Document No:</strong> {item.no}
                </div>
                <div>
                  <strong>Số tiền (VND):</strong> {item.am} ₫
                </div>
                <div>
                  <strong>Nội dung:</strong> {item.c}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange("prev")}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mx-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={currentPage === 0}
            >
              Trước
            </button>
            <button
              onClick={() => handlePageChange("next")}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mx-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={(currentPage + 1) * itemsPerPage >= allData.length}
            >
              Tiếp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TestClear;
