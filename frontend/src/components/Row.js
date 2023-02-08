import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  Link,
  Divider,
  Skeleton,
  Chip,
  Typography,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";

export function Row(props) {
  const { workflow, projects, jobs, users, isLoaded } = props;
  const [open, setOpen] = useState(false);
  const workflowStatus = workflow.status === "success" ? true : false;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {!isLoaded ? <Skeleton /> : "Workflow " + workflow.id}
          {isLoaded && (
            <Chip
              sx={{ marginLeft: 1 }}
              size="small"
              label={workflowStatus ? "success" : "failure"}
              color={workflowStatus ? "success" : "error"}
            />
          )}
        </TableCell>
        <TableCell align="right">
          {!isLoaded ? <Skeleton /> : workflow.duration_seconds}
        </TableCell>
        <TableCell align="right">
          {!isLoaded ? <Skeleton /> : workflow.created_at}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: 3 }}>
              <Typography variant="h4" gutterBottom component="div">
                {`${
                  projects.find((project) => project.id === workflow.project_id)
                    .name
                }`}
              </Typography>
              <Divider />
              <Typography sx={{ marginTop: 1 }} gutterBottom component="div">
                {"Initiated by "}
                <Link
                  href={`mailto:${
                    users.find((user) => user.id === workflow.created_by_user)
                      .email
                  }`}
                >{`${
                  users.find((user) => user.id === workflow.created_by_user)
                    .name
                }`}</Link>
              </Typography>
              <Divider />
              {(!workflowStatus || true) && (
                <>
                  <Typography
                    sx={{ marginTop: 3 }}
                    variant="h6"
                    gutterBottom
                    component="div"
                  >
                    Jobs
                  </Typography>
                  <Table size="small" aria-label="failed jobs">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Stage</TableCell>
                        <TableCell>Duration Seconds</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobs
                        .filter((job) => {
                          return (
                            job.workflow_id === workflow.id
                            // &&
                            // workflow.status === "failure" &&
                            // job.status === "failed"
                          );
                        })
                        .map((job) => (
                          <TableRow key={job.id}>
                            <TableCell component="th" scope="row">
                              {job.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {job.stage}
                              <Chip
                                sx={{ marginLeft: 1 }}
                                size="small"
                                label={
                                  job.status === "success"
                                    ? "success"
                                    : job.status === "failed"
                                    ? "failure"
                                    : "pending"
                                }
                                color={
                                  job.status === "success"
                                    ? "success"
                                    : job.status === "failed"
                                    ? "error"
                                    : "warning"
                                }
                              />
                            </TableCell>
                            <TableCell>
                              {job.duration_seconds || "NaN"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
