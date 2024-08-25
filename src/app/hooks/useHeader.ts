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
  
  useEffect(() => {
    console.log(email,password)
  }, [email,password]);
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
      if(userData.error){
        return showSnackbar(userData.error.response.data.msg);
      }
      return showSnackbar('Login Success');
    }catch(error: any){
      console.log(error)
      setIsLoading(false)
    }
  }

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
    handleSignIn
  }
}

function showSnackbar(arg0: string) {
  throw new Error('Function not implemented.');
}
