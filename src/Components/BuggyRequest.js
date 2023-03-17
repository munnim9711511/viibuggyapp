import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, LinearProgress, List, ListItem, ListItemButton, ListItemText, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { link } from "./ApiLink";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import moment from "moment/moment";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Request } from "./RequestModal";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
export const BuggyReq = () => {
    var token = sessionStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const config1 = {
        headers: { Authorization: "Tq6ahVugctSE3PU9xp6z99pgnTbjt38tM2qMacBeDPnJtKdiGP" }
    };
    let nav = useNavigate();
    const [amount, setamout] = useState(0);
    const [selectedBuggy, setselectedBuggy] = useState();
    const [loadingAmount, setloadingAmount] = useState(false);
    const [request, setrequest] = useState([]);
    const [bookingId, setbookingId] = useState(0);
    const [loading, setloading] = useState(true)
    const [drivers, setdrivers] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [loadingb, setloadingb] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setbuggy([]) }
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => { setOpen1(false); }
    const [assignedVehicles, setassignedVehicles] = useState([]);
    const [id, setid] = useState(0);
    const [number, setnumber] = useState('');
    const [idcard, setidcard] = useState('');
    const [name, setname] = useState('');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [buggy, setbuggy] = useState([]);
    useEffect(() => {
        axios.get(`${link}v1/booking`, config).then((data) => {
            // console.log(data);
            setrequest(data.data);

        })
        axios.get(`${link}v1/drver`, config).then((data) => {
            //console.log(data);
            setdrivers(data.data);
        })
        setloading(false);
    }, []);
    const put = (id, data) => {
        setloading(true);
        axios.put(`${link}v1/booking/${id}`, data, config).then((data) => {
            axios.get(`${link}v1/booking`, config).then((data) => {
                //console.log(data);
                setrequest(data.data);
                setloading(false);
            })
        })
    }
    const approve = () => {
        var varify = window.confirm("assign the task");
        if (varify === true) {
            setloadingb(true);
            var data = {
                bookingId: bookingId,
                reg: buggy
            }
            axios.post(`${link}v1/bookinglink`, data, config).then((data) => {
                setloadingb(false);
                handleClose();
                axios.get(`${link}v1/booking`).then((data) => {
                    //  console.log(data);
                    setrequest(data.data);
                    setloading(false);
                    setbuggy([]);
                })
            })
        }
    }
    const updateRecord = () => {
        axios.get(`${link}v1/booking`, config).then((data) => {
            //console.log(data);
            setrequest(data.data);
        })
        axios.get(`${link}v1/drver`, config).then((data) => {
            //console.log(data);
            setdrivers(data.data);
        })
    }

    const sendPaymentLink = () => {
        // console.log(number)
        var varify = window.confirm("send payment link");
        if (varify === true) {
            setloadingAmount(true);
            var data = {
                Status: "payment link send"
            }
            axios.put(`${link}v1/bookingLink/update/${id}/${amount}`, config).then((data) => {
                setloadingAmount(false);
                setamout(0);
                axios.get(`${link}v1/booking`, config).then((data) => {
                    // console.log(data);
                    setrequest(data.data);
                })
                axios.get(`${link}v1/drver`, config).then((data) => {
                    //  console.log(data);
                    setdrivers(data.data);
                })
                var data = {
                    total: Number.parseFloat(amount),
                    reference: `Buggy Fee (SN/${id})`,
                    type_id: Number.parseInt(60),
                    code_id: Number.parseInt(15),
                    sms: Number.parseInt(1),
                    nid: idcard,
                    name: name,
                    mobile: number,


                }
                axios.post("https://payments.malecity.gov.mv/api/generate", data, config1).then((data) => {
                    //console.log(data);


                }).catch((err) => {

                    alert(err)
                    // console.log(err)
                })
                setloading(false);
            })
            setOpen1(false);
        }



    }
    const getBuggy = (id) => {
        axios.get(`${link}v1/bookinglink/get-booked-buggy/${id}`).then((data) => {
            // console.log(data);
            setselectedBuggy(data.data);
        })
    }
    const RemoveBuggyBook = (id, bookingid) => {
        var varify = window.confirm("Remove the buggy")
        if (varify === true) {
            axios.get(`${link}v1/bookinglink/remove-vehicle/${id}`).then((data) => {
                axios.get(`${link}v1/bookinglink/get-booked-buggy/${bookingid}`).then((data) => {
                    //  console.log(data);
                    setselectedBuggy(data.data);
                })
            })
        }
    }
    const finished = (id) => {
        var varify = window.confirm("Mark as completed service?")
        if (varify === true) {
            setloadingb(true);
            axios.get(`${link}v1/bookinglink/finish-ride/${id}`).then((data) => {
                setOpen1(false);
                setOpen(false);
                axios.get(`${link}v1/booking`, config).then((data) => {
                    // console.log(data);
                    setrequest(data.data);

                })
                axios.get(`${link}v1/drver`, config).then((data) => {
                    //console.log(data);
                    setdrivers(data.data);
                })
                setloading(false);
                setloadingb(false);

            })
        }

    }
    const paymentRecive = (id) => {
        var varify = window.confirm("Set payment recived")
        if (varify === true) {
            setloading(true);
            axios.get(`${link}v1/booking/payemnt-recived/${id}`).then((data) => {
                axios.get(`${link}v1/booking`, config).then((data) => {
                    // console.log(data);
                    setrequest(data.data);

                })
                axios.get(`${link}v1/drver`, config).then((data) => {
                    //  console.log(data);
                    setdrivers(data.data);
                })
                setloading(false);
            })
        }

    }

    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        {
            field: 'MOre',
            headerName: 'More',
            width: 350,
            editable: false,
            renderCell: (params) =>
                <>

                    {params.row.paymentType === "Online payment" && params.row.paymentStatus != "Recived" &&
                        <Button variant="contained" style={{ marginRight: 5 }} onClick={() => {

                            setname(params.row.number);
                            setidcard('A000000');
                            setid(params.row.id);
                            setnumber(params.row.number)
                            setamout(params.row.total)
                            setOpen1(true)

                        }} > <InsertLinkIcon></InsertLinkIcon></Button>


                    }
                    {
                        params.row.paymentStatus != "Recived" &&
                        <Button onClick={() => {
                            paymentRecive(params.row.id)

                        }} variant="contained" style={{ marginRight: 5 }}><CreditScoreIcon></CreditScoreIcon></Button>
                    }

                    <Button onClick={() => {
                        setbookingId(params.row.id)
                        handleOpen();
                        getBuggy(params.row.id)
                    }} variant="contained" style={{ marginRight: 5 }}><HowToRegRoundedIcon></HowToRegRoundedIcon></Button>



                    <Button
                        onClick={() => {
                            var varify = window.confirm("Are you sure to cancel this trip?");
                            if (varify === true) {
                                params.row.cancel = 'true';
                                var data = {
                                    Status: params.row.status,
                                    Cancel: true
                                }
                                put(params.row.id, data);
                            }
                        }}
                        variant="contained" style={{ marginRight: 5 }}><CancelRoundedIcon ></CancelRoundedIcon ></Button>


                </>


        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: false,


        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 150,
            editable: false,


        },

        {
            field: 'Ref',
            headerName: 'Ref No',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    SN/{params.row.id}
                </>


        },
        {
            field: 'dateRe',
            headerName: 'Date',
            width: 250,
            editable: false,


        },
        {
            field: 'time',
            headerName: 'Time',
            width: 150,
            editable: false,


        },

        {
            field: 'number',
            headerName: 'Number',
            width: 150,
            editable: false,


        },

        {
            field: 'from',
            headerName: 'Pick Up',
            width: 250,
            editable: false,


        },
        {
            field: 'to',
            headerName: 'Drop off',
            width: 250,
            editable: false,


        },
        {
            field: 'paymentType',
            headerName: 'Payment Type',
            width: 250,
            editable: false,


        },

        {
            field: 'buggyAssigned',
            headerName: 'Buggies',
            width: 250,
            editable: false,


        },
        {
            field: 'total',
            headerName: 'Total Amount',
            width: 250,
            editable: false,
            renderCell: (params) =>
                <>
                    {params.row.total} MVR
                </>


        },



    ]



    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Request updateRequ={updateRecord} />
                </div>
            </div>
            {
                loading &&
                <div className="row" style={{ marginTop: 10 }}>
                    <div className="col-md-12">
                        <LinearProgress color="secondary" />
                    </div>
                </div>
            }

            <div className="row" style={{ marginTop: 10 }}>
                <div className="col-md-12">

                    {request &&
                        (request != null) ? <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid style={{ height: 700 }}
                            rows={request}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Assign a driver
                    </Typography>
                    {loadingb &&
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col-md-12">
                                <LinearProgress color="secondary" />
                            </div>
                        </div>
                    }

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    Driver
                                </th>
                                <th>
                                    Buggy
                                </th>
                                <th>
                                    Capacity
                                </th>
                                <th>
                                    Rate
                                </th>
                                <th>
                                    More
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                drivers &&
                                drivers.map((data) => {
                                    return (

                                        <tr key={data.id}>
                                            <td>
                                                {data.user}
                                            </td>
                                            <td>
                                                {data.buggyDetail.regNumber}
                                            </td>
                                            <td>
                                                {data.buggyDetail.capacity}
                                            </td>
                                            <td>
                                                {data.buggyDetail.price}
                                            </td>

                                            <td>
                                                <Button variant="contained" onClick={() => {
                                                    setbuggy(buggy => [...buggy, data.buggyDetail.regNumber])
                                                }}><AssignmentTurnedInIcon></AssignmentTurnedInIcon></Button>
                                            </td>
                                        </tr>
                                    )
                                })

                            }


                        </tbody>
                    </table>

                    <h6>Assigned Vehicles</h6>
                    <table className="table table-striped">
                        <tbody>
                            {
                                buggy && buggy.map((data, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                {data}
                                            </td>
                                            <td>
                                                <Button variant="contained" onClick={() => {
                                                    var array = [...buggy]; // make a separate copy of the array
                                                    var index = array.indexOf(data)
                                                    if (index !== -1) {
                                                        array.splice(index, 1);
                                                        setbuggy(array);
                                                    }
                                                }}><DeleteForeverIcon></DeleteForeverIcon></Button>
                                            </td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                    {
                        buggy.length > 0 &&
                        <Button variant="contained" onClick={approve} fullWidth>Assign</Button>

                    }


                    <div className="row">
                        <div className="col-md-12">
                            <h6>Current Buggies Assigned</h6>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Reg</th>
                                        <th>Capacity</th>
                                        <th>Rate</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedBuggy && selectedBuggy.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>
                                                        {data.buggyDetail.regNumber}
                                                    </td>
                                                    <td>
                                                        {data.buggyDetail.capacity}
                                                    </td>
                                                    <td>
                                                        {`${data.buggyDetail.price} MVR`}
                                                    </td>
                                                    <td>
                                                        {
                                                            data.completed == false ?
                                                                <>
                                                                    <Button onClick={() => {
                                                                        finished(data.id)
                                                                    }} variant="contained" style={{ marginRight: 5 }}><CheckIcon></CheckIcon></Button>
                                                                    <Button onClick={() => { RemoveBuggyBook(data.id, data.bookingsId) }} variant="contained" style={{ marginRight: 5 }}><ClearIcon></ClearIcon></Button>
                                                                </>

                                                                : null
                                                        }

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>


                </Box>
            </Modal>

            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Payment Link
                    </Typography>
                    {
                        loadingAmount &&
                        <div className="row" style={{ marginTop: 10 }}>
                            <div className="col-md-12">
                                <LinearProgress color="secondary" />
                            </div>

                        </div>
                    }

                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6">
                            <TextField fullWidth label='amount' type={'number'} value={amount} onChange={e => setamout(e.target.value)} ></TextField>
                        </div>
                        <div className="col-md-6">
                            <Button fullWidth variant="contained" onClick={sendPaymentLink} size="large" style={{ marginTop: 5 }}>send </Button>
                        </div>
                    </div>
                </Box>
            </Modal>

        </>
    );
}

