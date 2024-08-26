"use client"
import Button from '@mui/material/Button';
import { PersonPin, Logout } from '@mui/icons-material';
import { useHeader } from '@/app/hooks/useHeader';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Popover from '@mui/material/Popover';

export default function LayoutHeader() {
  const {
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
  } = useHeader()
  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className='w-full shadow-md'>
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-3 py-5">
        <Button size="large" style={{textTransform: 'none'}}>RideEase</Button>
        <div className='flex justify-between gap-3'>
          {isuserLogged ? 
            <div>              
              <Button variant="outlined" startIcon={<PersonPin />} onClick={handleClickPop}>Hi, {user.firstName}</Button>
              <Popover
                id={id}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handleClosePop}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <IconButton onClick={handleLogout} aria-label="fingerprint" color="warning">
                  <Logout />
                </IconButton>
              </Popover>    
            </div>:
            <div className='flex gap-3'>              
              <Button variant="outlined" startIcon={<PersonPin />} onClick={() => handleOpen('signin')}>Signin</Button>        
              <Button variant="contained" onClick={() => handleOpen('register')}>Register</Button>
            </div>
          
          }
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {signinOrRegister == 'signin' ? ('Sign in'): ('Register')}
                </Typography>
                {signinOrRegister == 'signin' ? (
                  
                  <div className='flex flex-col gap-2 mt-2'>
                    <TextField onChange={(e) => handleEmailInput(e.target.value)} fullWidth label="Email" variant="standard" />
                    <FormControl fullWidth variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        onChange={(e) => handlePasswordInput(e.target.value)}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <div className='w-full mt-3'>
                      <Button onClick={(e) => handleSignIn(e)} disabled={isLoading} variant="contained" fullWidth>
                        {isLoading ?<span>Signing In...</span> : 'Sign In'}
                      </Button>
                    </div>
                    <span className='mt-3'>
                      Don't have an account? 
                      <Button style={{textTransform: 'none'}} 
                        variant="text" 
                        onClick={() => handleSetSigninOrRegister('register')}
                        >
                          Register Now
                      </Button>
                    </span>
                  </div>
                ) : (
                  <div>
                    
                    <div className='flex flex-col gap-2 mt-2'>
                      <TextField fullWidth label="Email" variant="standard" />
                      <div className='w-full mt-3'>
                        <Button variant="contained" fullWidth>Continue</Button>
                      </div>
                      <span className='mt-3'>
                        Already Registered?  
                        <Button style={{textTransform: 'none'}} 
                          variant="text" 
                          onClick={() => handleSetSigninOrRegister('signin')}
                          >
                            Sign in
                        </Button>
                      </span>
                    </div>
                  </div>
                  )
                }
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}