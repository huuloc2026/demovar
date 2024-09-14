import React from "react";
import Header from "./components/Header";
import TestTables from "./components/TestTables";
import Body from "./components/Body";

// import Search from "./components/Search";
// import TablesSearch from "./components/TablesSearch";

const App = () => {
  return (
    <div>
      <Header></Header>
      <Body></Body>
      {/* <Search></Search> */}
      {/* <TablesSearch></TablesSearch> */}
      <TestTables></TestTables>
      {/* <Fetch></Fetch> */}
    </div>
  );
};

export default App;
