const fs = require("fs");
const path = require("path");

// Đường dẫn đến các file JSON cần gộp
const jsonFiles = [
  "../data/data-1.json",
  "../data/data-2.json",
  "../data/data-3.json",
  "../data/data-4.json",
  "../data/data-5.json",
  "../data/data-6.json",
  "../data/data-7.json",
  "../data/data-8.json",
  "../data/data-9.json",
  "../data/data-10.json",
];

const outputFilePath = "../data/merged-data.json"; // Đường dẫn đến file JSON kết quả

// Đọc dữ liệu từ các file JSON và kết hợp chúng
const mergeJsonFiles = () => {
  let mergedData = [];

  jsonFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    mergedData = mergedData.concat(fileData);
  });

  // Ghi dữ liệu đã gộp vào file JSON mới
  fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2), "utf8");
  console.log(`Đã gộp dữ liệu vào ${outputFilePath}`);
};

// Gọi hàm để thực hiện gộp file
mergeJsonFiles();
