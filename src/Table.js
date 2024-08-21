import React, { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import userData from "./data1.json";
import DetailPanel from "./DetailPanel";

function Table() {
  const [data, setData] = useState(userData);
  const [isCreating, setIsCreating] = useState(false);

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setData(data.filter((r) => r !== row.original));
    }
  };

  const columns = Object.keys(userData[0])
    .filter((key) => key !== "otherDetails")
    .map((key) => {
      return {
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      };
    });

  if (!isCreating) {
    columns.push({
      id: "actions",
      header: "Actions",
      enableEditing: false,
      width: 30,
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    });
  }

  const table = useMaterialReactTable({
    muiTableBodyRowProps: {
      style: {
        padding: "0px",
        fontSize: "0.875rem",
      },
    },
    muiTableCellProps: {
      style: {
        padding: "0px",
        fontSize: "0.875rem",
      },
    },
    columns,
    data,
    enableExpandAll: false,
    enableExpanding: true,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableEditing: true,
    editDisplayMode: "cell",
    createDisplayMode: "modal",
    positionCreatingRow: "bottom",
    renderDetailPanel: ({ row }) => (
      <DetailPanel row={row} data={data} setData={setData} />
    ),
    onCreatingRowSave: ({ table, values }) => {
      const newRow = {
        device_profile: "",
        sweep_parameter: "",
        sweep_type: "",
        max: "",
        min: "",
        nominal: "",
        coarse_step_value: "",
        operation: "",
        spec_min: "",
        spec_max: "",
        Last_pass_value: "",
        code: "",
      };
      setData([...data, newRow]);
      table.setCreatingRow(null);
      setIsCreating(false);
    },
    onCreatingRowCancel: () => {
      setIsCreating(false);
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true);
          setIsCreating(true);
        }}
      >
        Create New Row
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
