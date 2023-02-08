import AddTaskIcon from "@mui/icons-material/AddTask";

import {
  AppBar as MaterialAppBar,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export default function AppBar() {
  return (
    <MaterialAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddTaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Workflows
          </Typography>
        </Toolbar>
      </Container>
    </MaterialAppBar>
  );
}
