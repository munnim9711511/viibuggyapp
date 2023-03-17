import { Button, LinearProgress, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { link } from "./ApiLink";
import { UserModal } from "./UserModal";

export const Setting = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [singleuser, setsingleuser] = useState();
    const [buggy, setbuggy] = useState();
    useEffect(() => {
        axios.get(`${link}v1/user`,config).then((data) => {
          //  console.log(data);
            setloading(false);
            setusers(data.data.data);
        });
        axios.get(`${link}v1/buggy`,config).then((data) => {
          //  console.log(data);
            setbuggy(data.data);
        })
    }, []);
    const update = () => {
        axios.get(`${link}v1/user`,config).then((data) => {
           // console.log(data);
            setloading(false);
            setusers(data.data.data);
        })
    }
    const GetSingle = (id) => {
        axios.get(`${link}v1/user/user-detail/${id}`,config).then((data) => {
          //  console.log(data);
            setsingleuser(data.data);
        })
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'whitesmoke',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        {
            field: 'fullName',
            headerName: 'user',
            width: 150,
            editable: false,



        },
        {
            field: 'rank',
            headerName: 'role',
            width: 150,
            editable: false,

        },

        {
            field: 'edit',
            headerName: 'edit',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    <Button variant="contained" onClick={() => { GetSingle(params.row.fullName); handleOpen() }} color="primary" >edit</Button>

                </>

        },
    ];

    return (
        <>
            {
                loading &&
                <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                        <LinearProgress color="secondary" />
                    </div>
                </div>
            }

            <div className="row">
                <div className="col-md-12">
                    <div>
                        <UserModal userUpdate={update}></UserModal>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <div style={{ marginTop: 20 }}>
                        {users &&
                            (users != null) ? <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid rowHeight={25} style={{ height: 700 }}
                                rows={users}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}

                            />

                        </Box> : ""


                        }
                    </div>



                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User Detail
                    </Typography>
                    {
                        singleuser &&
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>
                                        Full name
                                    </td>
                                    <td>
                                        {singleuser.fullName}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Role
                                    </td>
                                    <td>
                                        {singleuser.rank}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Update Role
                                    </td>
                                    <td>
                                        <TextField label='roles' select variant='outlined' fullWidth>
                                            <MenuItem value={'Admin'}>Admin</MenuItem>
                                            <MenuItem value={'Staff'}>Staff</MenuItem>
                                            <MenuItem value={'driver'}>Driver</MenuItem>
                                        </TextField>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }

                </Box>
            </Modal>

        </>
    );
}

