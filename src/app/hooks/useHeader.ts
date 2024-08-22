import * as React from 'react';
export function useHeader () {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [signinOrRegister, setSigninOrRegister] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleOpen = (action:string) => {
    setOpen(true)
    setSigninOrRegister(action)
  };
  const handleClose = () => setOpen(false);
  return {
    handleOpen,
    handleClose,
    open,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    signinOrRegister
  }
}