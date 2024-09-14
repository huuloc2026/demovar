import React, { useEffect, useState } from "react";
import TestTables from "./TestTables";

const TablesSearch = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    searchTerm: "",
    fromDate: "",
    toDate: "",
    itemsPerPage: 10,
    sortBy: "date",
    sortOrder: "asc",
    amountRange: "all",
  });

  const loadData = async () => {
    try {
      setLoading(true);

      // Giả sử bạn có 10 file JSON, tên từ `data1.json` đến `data10.json`
      const files = [...Array(10).keys()].map((i) =>
        import(`../data/data-${i + 1}.json`)
      );

      // Sử dụng Promise.all để chờ tất cả file được tải về
      const data = await Promise.all(files);

      // Kết hợp dữ liệu từ tất cả các file
      const combinedData = data.flatMap((file) => file.default);
      setAllData(combinedData);
      setFilteredData(combinedData); // Hiển thị tất cả dữ liệu ban đầu
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSearch = () => {
    let data = allData;

    // Lọc theo từ khóa tìm kiếm
    if (filter.searchTerm) {
      data = data.filter(
        (item) =>
          item.no.toString().includes(filter.searchTerm) ||
          item.c.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }

    // Lọc theo khoảng thời gian
    if (filter.fromDate) {
      data = data.filter(
        (item) => new Date(item.d) >= new Date(filter.fromDate)
      );
    }
    if (filter.toDate) {
      data = data.filter((item) => new Date(item.d) <= new Date(filter.toDate));
    }

    // Lọc theo khoảng số tiền
    if (filter.amountRange !== "all") {
      const [min, max] = filter.amountRange.split("-").map(Number);
      data = data.filter((item) => item.am >= min && (!max || item.am <= max));
    }

    // Sắp xếp theo ngày hoặc số tiền
    if (filter.sortBy) {
      data.sort((a, b) => {
        if (filter.sortBy === "date") {
          return (
            new Date(a.d) -
            new Date(b.d) * (filter.sortOrder === "asc" ? 1 : -1)
          );
        } else if (filter.sortBy === "amount") {
          return (a.am - b.am) * (filter.sortOrder === "asc" ? 1 : -1);
        }
        return 0;
      });
    }

    setFilteredData(data);
  };

  return (
    <div className="container mx-auto py-5">
      <div className="mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search term"
          value={filter.searchTerm}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="fromDate"
          placeholder="From date"
          value={filter.fromDate}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="toDate"
          placeholder="To date"
          value={filter.toDate}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />

        <select
          name="amountRange"
          value={filter.amountRange}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        >
          <option value="all">Tất cả số tiền</option>
          <option value="0-1000000">0 - 1,000,000 VND</option>
          <option value="1000000-5000000">1,000,000 - 5,000,000 VND</option>
          <option value="5000000">Trên 5,000,000 VND</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Tìm kiếm
        </button>
      </div>
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <TestTables data={filteredData} itemsPerPage={filter.itemsPerPage} />
      )}
    </div>
  );
};

export default TablesSearch;
