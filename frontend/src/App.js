import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";

import { darkTheme } from "./constants/styles";
import AppBar from "./components/AppBar";
import TracesModal from "./components/TracesModal";
import WorkflowsTable from "./components/WorkflowsTable";

function App() {
  const [jobs, setJobs] = useState([]);
  const [traces, setTraces] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar />
      <WorkflowsTable setGlobalJobs={setJobs} setGlobalTraces={setTraces} />
      <TracesModal traces={traces} jobs={jobs} />
    </ThemeProvider>
  );
}

export default App;
