"use client"
import Button from '@mui/material/Button';
import PersonPinIcon from '@mui/icons-material/PersonPin';
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

export default function LayoutHeader() {
  const {
    handleOpen,
    handleClose,
    open,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    signinOrRegister
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
    <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-3 py-5">
      <Button size="large" style={{textTransform: 'none'}}>RideEase</Button>
      <div className='flex justify-between gap-3'>
        <Button variant="outlined" startIcon={<PersonPinIcon />} onClick={() => handleOpen('signin')}>Signin</Button>        
        <Button variant="contained" onClick={() => handleOpen('register')}>Register</Button>
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
                  <TextField fullWidth  id="standard-basic" label="Email" variant="standard" />
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
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
                    <Button variant="contained" fullWidth>Sign in</Button>
                  </div>
                </div>
              ) : (
                <div>
                  register
                </div>
                )
              }
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  )
}