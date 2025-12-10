import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import { rows } from "../../utils/cost_explorer_row_mockup";

const columns = [
  { width: 300, label: "Service", dataKey: "service" },
  { width: 120, label: "Jun-2025", dataKey: "jun2025", numeric: true },
  { width: 120, label: "Jul-2025", dataKey: "jul2025", numeric: true },
  { width: 120, label: "Aug-2025", dataKey: "aug2025", numeric: true },
  { width: 120, label: "Sep-2025", dataKey: "sep2025", numeric: true },
  { width: 120, label: "Oct-2025", dataKey: "oct2025", numeric: true },
  { width: 120, label: "Nov-2025", dataKey: "nov2025", numeric: true },
  { width: 140, label: "Total", dataKey: "total", numeric: true },
];
// const mainRows = rows.filter((row) => row.service !== "Total");
// const totalRow = rows.find((row) => row.service === "Total");

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
          
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  const isTotalRow = row.service === "Total";

  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          sx={{
            fontWeight: column.dataKey === "service" ? "bold" : "normal",
            fontSize: "11px",
            color: isTotalRow
              ? "oklch(45.7% 0.24 277.023)"
              : column.dataKey === "service"
              ? "black"
              : column.dataKey === "total"
              ? "oklch(45.7% 0.24 277.023)"
              : undefined,
            backgroundColor: isTotalRow
              ? "oklch(95.1% 0.026 236.824)"
              : undefined,
                          // marginBottom: isTotalRow ? "100px" : ""

          }}
          
        >
          {typeof row[column.dataKey] === "number"
            ? row[column.dataKey].toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
