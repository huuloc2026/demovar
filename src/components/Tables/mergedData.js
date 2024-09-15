import data1 from "./data-1.json" with { type: "json" };
import data2 from "./data-2.json" with { type: "json" };
import data3 from "./data-3.json" with { type: "json" };
import data4 from "./data-4.json" with { type: "json" };
import data5 from "./data-5.json" with { type: "json" };
import data6 from "./data-6.json" with { type: "json" };
import data7 from "./data-7.json" with { type: "json" };
import data8 from "./data-8.json" with { type: "json" };
import data9 from "./data-9.json" with { type: "json" };
import data10 from "./data-10.json" with { type: "json" };
const dataArrays = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10];

let mergedData = [];

dataArrays.forEach(data => {
  mergedData = mergedData.concat(data.slice(0, 20));
  // console.log(mergedData);
});

export default mergedData;