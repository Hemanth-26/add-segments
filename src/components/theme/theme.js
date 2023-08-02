import { createTheme } from "@mui/material";

const appTheme = {
    primary: "#00b89f",
    secondary: "#E98074",
    error: "#e74747",
};

const theme = createTheme({
    palette: {
        primary: {
            main: appTheme.primary,
        },
        secondary: {
            main: appTheme.secondary,
        },
    },
    typography: {
        fontFamily: [
            "montserrat-regular",
            "sf-pro-text",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: appTheme.primary
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: appTheme.error
                }
            }
        },
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             color: appTheme.primary
        //         }
        //     }
        // }
    },
});

export default theme;
