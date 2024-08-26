import * as React from 'react';
import { useState, useEffect } from "react";
import { userSignIn } from '../services/api/auth';
import { useSnackbar } from '../components/SnackbarProvider';

export function useHeader () {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signinOrRegister, setSigninOrRegister] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isuserLogged, setIsuserLogged] = useState(false);
  const [user, setUser] = useState<any>(null)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  
  useEffect(() => {
    checkUser()
  }, []);
  const { showSnackbar } = useSnackbar();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleOpen = (action:string) => {
    setOpen(true)
    setSigninOrRegister(action)
  };
  const handleSetSigninOrRegister = (action:string) => {
    setSigninOrRegister(action)
  }
  const handleEmailInput = (e: any) => {
    setEmail(e);
  };
  const handlePasswordInput = (e: any) => {
    setPassword(e);
  };
  const handleClose = () => setOpen(false);

  const handleSignIn = async (e: any) => {
    setIsLoading(true)
    try{
      const userData:any = await userSignIn(email, password);
      console.log('jq',userData)
      setIsLoading(false)
      handleClose()
      if(userData.error){
        return showSnackbar(userData.error.response.data.msg, "error");
      }
      if(userData.data.userData){
        localStorage.setItem('userData', JSON.stringify(userData.data.userData));
        checkUser()
      }
      return showSnackbar('Login Success', "success");
    }catch(error: any){
      console.log(error)
      setIsLoading(false)
      handleClose()
    }
  }
  const checkUser = () => {
    const storedUserData = localStorage.getItem('userData');    
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setIsuserLogged(true)
      setUser(parsedData);
    } else {
      setIsuserLogged(false)
    }
  }
  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const handleLogout = () => {
    // Remove user data from localStorage
    handleClosePop()
    localStorage.removeItem('userData');
    
    // Reset user state
    setUser(null);

    // Optionally show a message or redirect the user
    checkUser()
    showSnackbar('Logged out successfully', "success");
  };

  return {
    handleOpen,
    handleClose,
    open,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    signinOrRegister,
    handleSetSigninOrRegister,
    handleEmailInput,
    handlePasswordInput,
    isLoading,
    handleSignIn,
    isuserLogged,
    user,
    anchorEl,
    handleClickPop,
    handleClosePop,
    id,
    openPop,
    handleLogout
  }
}

function showSnackbar(arg0: string) {
  throw new Error('Function not implemented.');
}
