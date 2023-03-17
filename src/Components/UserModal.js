import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LinearProgress, MenuItem, Snackbar, TextField } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import axios from 'axios';
import { link } from './ApiLink';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
export const UserModal = (props) => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setloading] = useState(false);
    const [buggy, setbuggy] = useState(null);
    const [driverpick, setdriverpick] = useState(false);

    const [user, setuser] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('');
    const [buggyId, setbuggyId] = useState(0);

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        axios.get(`${link}v1/buggy`,config).then((data) => {
            //console.log(data);
            setbuggy(data.data);
        })
    }, []);
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    
    const saveUser = () => {
        setloading(true);
        var data = {
            User: user,
            Roles: role,
            Password: password,
            BuggyId: buggyId
        }
        axios.post(`${link}v1/user/create-user`, data,config).then((data) => {
            setloading(false);
            props.userUpdate();
            setuser('');
            setpassword('');
            role('');
            setbuggyId(0);
            setdriverpick(false);



            setOpen1(true);
        });
    }
    const [open1, setOpen1] = useState(false);

    const handleClick = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    return (
        <>
            <div className="row" style={{ marginTop: 10, float: 'right' }}>
                <div className="col-md-12">
                    <Button variant='outlined' onClick={handleOpen}>Add User </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                New User
                            </Typography>
                            {
                                loading &&
                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='col-md-12'>
                                        <LinearProgress color="secondary" />
                                    </div>
                                </div>
                            }

                            <div className='row' style={{ marginTop: 10 }}>
                                <div className='col-md-12'>
                                    <TextField label='user' value={user} onChange={e => setuser(e.target.value)} variant='outlined' fullWidth></TextField>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: 10 }}>
                                <div className='col-md-12'>
                                    <TextField label='password' value={password} onChange={e => setpassword(e.target.value)} variant='outlined' fullWidth></TextField>
                                </div>
                            </div>
                            <div className='row' style={{ marginTop: 10 }}>
                                <div className='col-md-12'>
                                    <TextField label='roles' value={role} onChange={e => {
                                        setrole(e.target.value)
                                        if (e.target.value === "driver") {
                                            setdriverpick(true)
                                        }
                                        else {
                                            setdriverpick(false)

                                        }
                                    }} select variant='outlined' fullWidth>
                                        <MenuItem value={'Admin'}>Admin</MenuItem>
                                        <MenuItem value={'Staff'}>Staff</MenuItem>
                                        <MenuItem value={'driver'}>Driver</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            {driverpick &&

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='col-md-12'>
                                        <TextField label='buggy assigned' select variant='outlined' fullWidth value={buggyId}

                                            onChange={e => setbuggyId(e.target.value)}>
                                            {
                                                buggy &&
                                                buggy.map((data) => {
                                                    return (
                                                        <MenuItem key={data.id} value={data.id}><img style={{ width: "10%", marginRight: 5 }}
                                                            src={`data:image/${data.fileType};base64,${data.photo}`}
                                                        /> {data.regNumber} , {data.capacity} seats</MenuItem>

                                                    )
                                                })
                                            }


                                        </TextField>
                                    </div>
                                </div>
                            }

                            <div className='row' style={{ marginTop: 10 }}>
                                <div className='col-md-12'>
                                    <Button onClick={saveUser} endIcon={<SaveAsOutlinedIcon></SaveAsOutlinedIcon>} variant='contained' fullWidth style={{ backgroundColor: "#adb5bd", color: 'black' }}>save</Button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
            <Snackbar
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                message="User created sucessfuly"
                action={action}
            />
        </>
    );
}

