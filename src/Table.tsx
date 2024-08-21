import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React,{useState} from "react";
import userData from "./data1.json";
import DetailPanel from "./DetailPanel.tsx";
 
function Table() {
  const [data, setData] = useState(userData);
  const [isCreating, setIsCreating] = useState(false);
  const [newRow, setNewRow] = useState({
    device_profile: "",
    sweep_parameter: "",
    sweep_type: "",
    Last_pass_value: "",
    max: "",
    min: "",
    nominal: "",
    coarse_step_value: "",
    operation: "",
    spec_min: "",
    spec_max: "",
    code: "",
  });
 
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
          enableEditing: true,
          width:50,
          Cell: ({ cell, row }) => cell.getValue(),
        };
      });
 
  if (!isCreating) {
    columns.push({
      accessorKey: "actions",
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
 
  const handleCreateNewRowChange = (key, value) => {
    setNewRow({ ...newRow, [key]: value });
  };
 
  const handleSaveRow = () => {
    const {
      min,
      max,
      nominal,
      coarse_step_value,
      operation,
      spec_min,
      spec_max,
      code,
      ...mainTableData
    } = newRow;
 
    const combinedRow = {
      ...mainTableData,
      result:"Null",
      otherDetails: {
        max,
        min,
        coarse_step_value,
        operation,
        spec_min,
        spec_max,
        nominal,
        code,
      },
    };
 
    setData([...data, combinedRow]);
    setIsCreating(false);
    resetForm();
  };
 
  const resetForm = () => {
    setNewRow({
      device_profile: "",
      sweep_parameter: "",
      sweep_type: "",
      Last_pass_value: "",
      max: "",
      min: "",
      nominal: "",
      coarse_step_value: "",
      operation: "",
      spec_min: "",
      spec_max: "",
      code: "",
    });
  };
 
  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false,
    enableExpanding: true,
    enableRowSelection: true,
    enableGlobalFilter: true,
    enableColumnOrdering: false,
    enableEditing: true,
    muiPaginationProps: {
      showRowsPerPage: false,
      showFirstButton: false,
      showLastButton: false,
    },
    enableColumnDragging: false,
    enableSorting: false,
    editDisplayMode: "cell",
    enableColumnFilters: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    createDisplayMode: "modal",
    positionToolbarAlertBanner: 'none',
    initialState: {
      density: "compact",
    },
    positionCreatingRow: "bottom",
    renderDetailPanel: ({ row }) => (
      <DetailPanel row={row} data={data} setData={setData} />
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button onClick={() => setIsCreating(true)}>Create New Row</Button>
    ),
  });
 
  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Create New Row</DialogTitle>
        <DialogContent>
          {Object.keys(newRow).map((key) => (
            <TextField
              key={key}
              label={key.replace(/_/g, " ").toUpperCase()}
              value={newRow[key]}
              onChange={(e) => handleCreateNewRowChange(key, e.target.value)}
              fullWidth
              margin="dense"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveRow}>Save</Button>
          <Button onClick={() => setIsCreating(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );

}
 
 
export default Table;