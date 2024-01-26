import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
import EmailComponent from "../components/EmailComponent";
import {
  left_1,
  left_2,
  left_3,
  left_4,
  right_1,
  right_2,
  right_3,
  right_4,
} from "../assets";
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Dummy data for the data grid
  const personalData = [
    {
      id: 1,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.000151,
    },
    {
      id: 2,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.000151,
    },
    {
      id: 3,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.000151,
    },
    {
      id: 4,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.000151,
    },
    {
      id: 5,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.000151,
    },
  ];

  const globalData = [
    {
      id: 1,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.01,
    },
    {
      id: 2,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.01,
    },
    {
      id: 3,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.01,
    },
    {
      id: 4,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.01,
    },
    {
      id: 5,
      date: "01/09/24 08:45",
      txnHash:
        "0x7c8f749d5fe60229fcd3e49d285ee2be462b1f48989fcb3d6d89cb42f4c1d8eb",
      rewards: 0.01,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "txnHash", headerName: "Txn Hash", width: 650 },
    { field: "rewards", headerName: "Rewards", width: 150 },
  ];

  const CustomCell = ({ value }) => <div style={{ color: dark }}>{value}</div>;

  const [rowsToShow, setRowsToShow] = useState(4); // Number of rows to show initially

  const getRows = (data) => {
    return data.slice(0, rowsToShow);
  };

  const handleViewMore = () => {
    // Check if there are more records to show
    if (value === 0 && personalData.length > rowsToShow) {
      // For example, show the next 5 rows on each click
      setRowsToShow((prevRowsToShow) => prevRowsToShow + 5);
    } else if (value === 1 && globalData.length > rowsToShow) {
      // For example, show the next 5 rows on each click
      setRowsToShow((prevRowsToShow) => prevRowsToShow + 5);
    }
  };

  const theme = useTheme();
  // console.log(theme.palette.mode);
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <div className="h-screen overflow-auto" style={{ background: alt }}>
      <Navbar />
      <div className="sm:my-7">
        <div className="p-4 flex flex-col items-center">
          <h1
            className="text-[15px] md:text-3xl font-bold text-white"
            style={{ color: dark }}
          >
            <p className="font-[300]">
              <span className="text-[#5763F3] text-[300]">Congratulations</span>{" "}
              on your Node Purchase
            </p>
          </h1>
          <p
            className="flex items-center justify-center text-md text-[14px] text-white"
            style={{ color: dark }}
          >
            Your first step towards financial freedom is to invest in yourself,
            through X Bull Run.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row justify-center py-4 px-4">
          {" "}
          {/* Left Box */}
          <Card
            sx={{
              minWidth: 275,
              boxShadow: "0px 0px 4px 0px rgba(21, 20, 71, 0.2)", // Equal box shadow
              width: "100%", // Full width on small screens
              maxWidth: "530px", // Limit maximum width on larger screens
              // margin: "0 auto", // Center the card horizontally
            }}
          >
            <CardContent
              sx={{
                backgroundColor: primaryLight,
                height: "390px", // Set your desired height
                width: "100%", // Full width on small screens
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "30px", // Add padding to the content
              }}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_1} alt="Left 1" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    MY FOUNDER'S NODES
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  01
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_2} alt="Left 2" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">XBR REWARDS</span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  0.0358
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_3} alt="Left 3" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    UNCLAIMED XBR REWARDS
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  0.0145
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_4} alt="Left 4" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    REFERRAL EARNINGS
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  $600.00
                </span>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-[#22246A] text-[#5763F3] px-6 rounded-l-full"
                  style={{ background: neutralLight }}
                >
                  Mint & Claim
                </button>
                <button
                  className="bg-[#22246A] text-[#5763F3] py-2 px-4 rounded-r-full ml-2"
                  style={{ background: neutralLight }}
                >
                  Sell a Node
                </button>
              </div>
            </CardContent>
          </Card>
          {/* Right Box */}
          <Card
            sx={{
              minWidth: 275,
              boxShadow: "0px 0px 4px 0px rgba(21, 20, 71, 0.2)", // Equal box shadow
              width: "100%", // Full width on small screens
              maxWidth: "530px", // Limit maximum width on larger screens
              // margin: "0 auto", // Center the card horizontally
            }}
          >
            <CardContent
              sx={{
                backgroundColor: primaryLight,
                height: "390px", // Set your desired height
                width: "100%", // Full width on small screens
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "30px", // Add padding to the content
              }}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_1} alt="Left 1" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    GLOBEL FOUNDER'S NODES
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  01
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_2} alt="Left 2" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    AVALIABLE FOUNDER'S NODES
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  0.0358
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_3} alt="Left 3" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    XBR REWARDS DISTRIBUTED
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  0.0145
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#080628]">
                <div className="flex items-center gap-10">
                  <img src={left_4} alt="Left 4" className="w-10 h-10" />
                  <span className="text-[#5763F3] font-bold">
                    0x7c8f749d5fe60229fcd...
                  </span>
                </div>
                <span className="text-white" style={{ color: dark }}>
                  $600.00
                </span>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-[#22246A] text-[#5763F3] px-6 rounded-l-full"
                  style={{ background: neutralLight }}
                >
                  Mint & Claim
                </button>
                <button
                  className="bg-[#22246A] text-[#5763F3] py-2 px-4 rounded-r-full ml-2"
                  style={{ background: neutralLight }}
                >
                  Sell a Node
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Centered Tabs Box */}
        <div className="w-[71vw] mx-auto">
          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Reward History" sx={{ color: "#5763F3" }} />
              <Tab label="Referral's Claims" sx={{ color: "#5763F3" }} />
            </Tabs>
          </Box>
        </div>
        {/* Data Grids */}
        {value === 0 && (
          <div>
            <Box
              style={{ height: 295, width: "71vw", margin: "auto" }}
              className="text-white"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  borderRadius: "5rem",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none", // Remove bottom border for cells
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: alt, // Set the desired color
                  color: dark,
                  border: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  display: "none", // Hide the entire footer container
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#ffedc2 !important",
                },
                "& .MuiPaginationItem-root": {
                  color: "#ffedc2", // Set the desired pagination item color
                },
              }}
            >
              <DataGrid
                rows={getRows(personalData)}
                columns={columns.map((column) => ({
                  ...column,
                  renderCell: (params) => <CustomCell {...params} />,
                }))}
                // pageSize={4}
              />
            </Box>
            {personalData.length > rowsToShow && (
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewMore}
                  sx={{ marginBottom: "20px", background: neutralLight }}
                >
                  View More
                </Button>
              </div>
            )}
          </div>
        )}

        {value === 1 && (
          <div>
            <Box
              style={{ height: 295, width: "71vw", margin: "auto" }}
              className="text-white"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  borderRadius: "5rem",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: alt,
                  color: dark,
                  border: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  display: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "#ffedc2 !important",
                },
                "& .MuiPaginationItem-root": {
                  color: "#ffedc2",
                },
              }}
            >
              <DataGrid
                rows={getRows(globalData)}
                columns={columns.map((column) => ({
                  ...column,
                  renderCell: (params) => <CustomCell {...params} />,
                }))}
                // pageSize={4}
              />
            </Box>
            {globalData.length > rowsToShow && (
              <div className="flex justify-center mt-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewMore}
                  sx={{ marginBottom: "20px" }}
                >
                  View More
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <EmailComponent />
      <FooterComponent />
    </div>
  );
};

export default Home;
