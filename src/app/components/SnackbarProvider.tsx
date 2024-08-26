"use client";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert, { AlertColor } from "@mui/material/Alert";

interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor) => void;
}

const SnackbarContext = React.createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [state, setState] = React.useState<SnackbarOrigin & { open: boolean; message: string, severity: string }>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: '',
    severity: 'info'
  });

  const showSnackbar = (message: string, severity: AlertColor) => {
    setState({ ...state, open: true, message, severity  });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
        open={state.open}
        onClose={handleClose}
        key={state.vertical + state.horizontal}
        autoHideDuration={3500}
        
      >
        <Alert
          variant="filled"
          //@ts-ignore
          severity={state.severity}
          onClose={handleClose}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
