import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { useMemo } from "react";
import Routes from "../Routes/Routes";
import AuthContextProvider from "../../contexts/auth";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "../../contexts/messages";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        props: {
          MuiButtonBase: {
            disableRipple: true,
          },
        },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            light: "#74cafe",
            main: "#1da1f2",
          },
          secondary: {
            main: "#e2264d",
          },
          background: {
            paper: "#1e2e3e",
            default: "#15202b",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <MessageProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MessageProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
