import { useState, useEffect } from "react";

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
} from "@mui/material";
import { Row } from "./Row";

export default function WorkflowsTable({ setGlobalJobs, setGlobalTraces }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [traces, setTraces] = useState([]);
  const [users, setUsers] = useState([]);
  const [workflows, setWorkflows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = (path, stateAction) => {
    setIsLoaded(false);

    fetch(`http://localhost:3000/${path}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          stateAction(result);
          if (path === "jobs") {
            setGlobalJobs(result);
          }
          if (path === "traces") {
            setGlobalTraces(result);
          }
          setIsLoaded(false);
          setTimeout(() => {
            setIsLoaded(true);
          }, 1000);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchData("jobs", setJobs);
    fetchData("projects", setProjects);
    fetchData("traces", setTraces);
    fetchData("users", setUsers);
    fetchData("workflows", setWorkflows);
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper sx={{ width: "60%" }} elevation={8}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Duration (in seconds)</TableCell>
                <TableCell align="right">Created At</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {workflows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((workflow) => (
                  <Row
                    key={workflow.id}
                    workflow={workflow}
                    projects={projects}
                    jobs={jobs}
                    users={users}
                    isLoaded={isLoaded}
                  />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={workflows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}
