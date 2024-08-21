import React, { useState } from "react";
import { Button } from "@mui/material";
import OtherDetailsTable from "./OtherDetailsTable.tsx"; // Import the updated table component
 
function DetailPanel({ row, data, setData }) {
  const [code, setCode] = useState(row.original.otherDetails.code);
 
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };
 
  const handleSave = () => {
    const updatedData = data.map((item, index) => {
      if (index === parseInt(row.id)) {
        return {
          ...item,
          otherDetails: { ...item.otherDetails, code },
        };
      }
      return item;
    });
    setData(updatedData);
  };
  const otherDetails = row.original.otherDetails;
 
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OtherDetailsTable data={otherDetails} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "8px",
          width: "85%",
          gap: "8px",
        }}
      >
        <textarea
          value={code}
          onChange={handleCodeChange}
          rows={10}
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            padding: "10px",
          }}
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          style={{ width: "fit-content" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
 
export default DetailPanel;