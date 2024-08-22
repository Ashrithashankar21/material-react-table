import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
  } from "@mui/material";
  import React, {  useState } from "react";
   
  const OtherDetailsTable = ({otherDetails, data, setData }) => {
    console.log('otherDetails',otherDetails);
    const [editIdx, setEditIdx] = useState(-1);
    const [editKey, setEditKey] = useState(null);
   
    const columns = Object.keys(otherDetails).map((key) => {
      return {
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      };
    });
   
    const handleDoubleClick = (index, key) => {
      setEditIdx(index);
      setEditKey(key);
    };
   
    const handleChange = (e) => {
      const { value } = e.target;
      console.log(editIdx, editKey, value);
      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[editIdx]['otherDetails'][editKey!] = value;
        return updatedData;
      });
    };
   
    const handleBlur = () => {
      setEditIdx(-1);
      setEditKey(null);
    };
   
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleBlur();
      }
    };
   
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
            {[otherDetails].map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={{ height: "24px" }}>
                {columns.map((column) => {
                  const cellValue = row[column.accessorKey];
                  const isEditing =
                    editIdx === rowIndex && editKey === column.accessorKey;
   
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
                        onDoubleClick={() =>
                          handleDoubleClick(rowIndex, column.accessorKey)
                        }
                      >
                        {isEditing ? (
                          <TextField
                            value={cellValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            fullWidth
                            variant="standard"
                            inputProps={{
                              style: {
                                padding: 0,
                                fontSize: "14px",
                              },
                            }}
                            sx={{
                              margin: 0,
                            }}
                          />
                        ) : firstLine.length < cellValue.length ? (
                          `${firstLine}...`
                        ) : (
                          firstLine
                        )}
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
                      onDoubleClick={() =>
                        handleDoubleClick(rowIndex, column.accessorKey)
                      }
                    >
                      {isEditing ? (
                        <TextField
                          value={cellValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          fullWidth
                          variant="standard"
                          inputProps={{
                            style: {
                              padding: 0,
                              fontSize: "12px",
                            },
                          }}
                          sx={{
                            margin: 0,
                          }}
                        />
                      ) : (
                        cellValue
                      )}
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