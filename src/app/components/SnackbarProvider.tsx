"use client";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarOrigin } from '@mui/material/Snackbar';

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
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
  const [state, setState] = React.useState<SnackbarOrigin & { open: boolean; message: string }>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: '',
  });

  const showSnackbar = (message: string) => {
    setState({ ...state, open: true, message });
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
        message={state.message}
        key={state.vertical + state.horizontal}
      />
    </SnackbarContext.Provider>
  );
};
