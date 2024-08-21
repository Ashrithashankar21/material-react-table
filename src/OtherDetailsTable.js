import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OtherDetailsTable = ({ data }) => {
  const dataArray = [data];

  const columns = Object.keys(data).map((key) => {
    return {
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    };
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "85%", margin: "8px", boxShadow: 2 }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.accessorKey}
                sx={{
                  fontWeight: "bold",
                  padding: "8px 20px",
                  fontSize: "14px",
                  marginRight: "8px",
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ height: "24px" }}>
              {columns.map((column) => {
                const cellValue = row[column.accessorKey];
                if (column.accessorKey === "code") {
                  const firstLine = cellValue.split("\n")[0];
                  return (
                    <TableCell
                      key={column.accessorKey}
                      sx={{
                        padding: "8px 20px",
                        fontSize: "14px",
                        marginRight: "8px",
                      }}
                    >
                      {firstLine.length < cellValue.length
                        ? `${firstLine}...`
                        : firstLine}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={column.accessorKey}
                    sx={{
                      padding: "8px 20px",
                      fontSize: "12px",
                      marginRight: "8px",
                    }}
                  >
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OtherDetailsTable;
