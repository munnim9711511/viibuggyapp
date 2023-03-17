import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { link } from "./ApiLink";


export const Cash = () => {
    var token = sessionStorage.getItem("token");
const config = {
    headers: { Authorization: `Bearer ${token}` }
};
let nav = useNavigate();
    const [cash, setcash] = useState();
    useEffect(() => {
        axios.get(`${link}v1/cash`, config).then((data) => {
           // console.log(data);
            setcash(data.data);
        })
    }, [])

    const columns = [

        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false,


        },
        
        {
            field: 'serialNumber',
            headerName: 'Detail',
            width: 200,
            editable: false,


        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: false,
            renderCell: (params) =>
            <>
                {moment(params.row.date).format('MMMM Do YYYY')}

            </>


        }
    ,
    {
        field: 'type',
        headerName: 'Transaction Type',
        width: 180,
        editable: false,


    },
    {
        field: 'amount',
        headerName: 'Amount (MVR)',
        width: 180,
        editable: false,


    },
    ]
    return (
        <>
                 <div className="row">
                <div className="col-md-12">

                    <div style={{ marginTop: 20 }}>
                        {cash &&
                            (cash != null) ? <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid rowHeight={25} style={{ height: 700 }}
                                rows={cash}
                                columns={columns}
                                pageSize={20}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                                components={{ Toolbar: GridToolbar }}
                            />

                        </Box> : ""


                        }
                    </div>



                </div>
            </div>
        </>
    );
}

