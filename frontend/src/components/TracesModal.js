import { useState } from "react";


import {
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { TraceRow } from "./TraceRow";
import { style } from "../constants/styles";

export default function TracesModal({ traces, jobs }) {
  const [tracePage, setTracePage] = useState(0);
  const [traceRowsPerPage, setTraceRowsPerPage] = useState(3);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChangeTracePage = (event, newPage) => {
    setTracePage(newPage);
  };

  const handleChangeTraceRowsPerPage = (event) => {
    setTraceRowsPerPage(+event.target.value);
    setTracePage(0);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: 3 }}
      >
        <Button variant="outlined" onClick={handleOpen}>
          Show Traces
        </Button>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Paper sx={style}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Trace ID</TableCell>
                    <TableCell align="right">Job ID</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {traces
                    .slice(
                      tracePage * traceRowsPerPage,
                      tracePage * traceRowsPerPage + traceRowsPerPage
                    )
                    .map((trace) => (
                      <TraceRow key={trace.id} trace={trace} jobs={jobs} />
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[3, 5, 7]}
                component="div"
                count={traces.length}
                rowsPerPage={traceRowsPerPage}
                page={tracePage}
                onPageChange={handleChangeTracePage}
                onRowsPerPageChange={handleChangeTraceRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </Modal>
      </Box>
    </>
  );
}
