import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { link } from "./ApiLink";
import CheckIcon from '@mui/icons-material/Check';

export const Card = () => {
    var token = sessionStorage.getItem("token");
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const[fdate,setfdate] = useState();
    const[edate,setedate] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [id, setId] = useState('');
    const config1 = {
        headers: { Authorization: "Tq6ahVugctSE3PU9xp6z99pgnTbjt38tM2qMacBeDPnJtKdiGP" }
    };


    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let nav = useNavigate();
    const [card, setcard] = useState([]);
    useEffect(() => {
        axios.get(`${link}v1/card`, config).then((data) => {
           // console.log(data);
            setcard(data.data);
        })
    }, []);
    const paymentInvoke = (id, idcard, number, name) => {
        var confirm = window.confirm("process payment");
        var data = {
            total: Number.parseFloat(40),
            reference: "Panelty",
            type_id: Number.parseInt(44),
            code_id: Number.parseInt(31),
            sms: Number.parseInt(1),
            nid: idcard,
            name: name,
            mobile: number,


        }
        axios.post("https://stagingpayments.malecity.gov.mv/api/generate", data, config1).then((data) => {
           // console.log(data);


        }).catch((err) => {

            alert(err)
          //  console.log(err)
        })

    }
    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: false,



        },
        {
            field: 'idcard',
            headerName: 'Id card',
            width: 150,
            editable: false,



        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
            editable: false,

        },
        {
            field: 'type',
            headerName: 'Type',
            width: 250,
            editable: false,

        },
        {
            field: 'serialNumber',
            headerName: 'Serial',
            width: 150,
            editable: false,

        },
        {
            field: 'sdate',
            headerName: 'From',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    {moment(params.row.sdate).format("MMM Do YY")}
                </>
        },
        {
            field: 'edate',
            headerName: 'From',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    {moment(params.row.edate).format("MMM Do YY")}
                </>
        },
        {
            field: 'Card created',
            headerName: 'Created',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    {params.row.cardCreated?<CheckIcon></CheckIcon>:null}
                </>
        },
        {
            field: 'renew',
            headerName: 'Renew',
            width: 150,
            editable: false,
            renderCell: (params) =>
                <>
                    {params.row.renew?<CheckIcon></CheckIcon>:null}
                </>
        },
        {
            field: 'More',
            headerName: 'More',
            width: 400,
            editable: false,
            renderCell: (params) =>
                <>
                    <Button style={{ marginRight: 5 }} variant="contained" onClick={() => { paymentInvoke(params.row.id, params.row.idcard, params.row.contactNum, params.row.name) }}> Payment</Button>
                    <Button style={{ marginRight: 5 }} variant="contained" onClick={() => { setId(params.row.id); handleOpen(); }}> Issue card</Button>

                </>

        }
    ]
    const cardCreate = ()=>{
        var varify = window.confirm("create digital card")
        if (varify === true) {
            var data = {
                fdate:fdate,
                edate:edate
            }
            axios.put(`${link}v1/card/${id}`,data,config).then((data)=>{
                axios.get(`${link}v1/card`, config).then((data) => {
                    //console.log(data);
                    setcard(data.data);
                })
            })
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">

                    <div style={{ marginTop: 20 }}>
                        {card &&
                            (card != null) ? <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid style={{ height: 700 }}
                                rows={card}
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
                        Create Card
                    </Typography>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12 ">
                            <TextField label={'from'} value={fdate} onChange={e=>setfdate(e.target.value)} fullWidth type={'date'}></TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12 ">
                            <TextField label={'to'} value={edate} onChange={e=>setedate(e.target.value)} fullWidth type={'date'}></TextField>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-12 ">
                            <Button variant="contained" onClick={cardCreate}>create</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

