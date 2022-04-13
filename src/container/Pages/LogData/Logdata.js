//base
import React, { Fragment, useState, useEffect } from "react";

//self
import GENI from "../../../services";

//material ui
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import LinearProgress from '@mui/material/LinearProgress';
import SearchBar from "material-ui-search-bar";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const LogData = () => {
    const [alert, setAlert] = useState(false);
    const [formData, setFormData] = useState({
        kd_log_d: "",
        kd_log_h: "",
        tanggal_log: "",
        deskripsi: "",
        keterangan: "",
        status: ""
    })

    //alert
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    //post data
    const postDataAPI = () => {
        GENI.postLog(formData).then(result => {
            setFormData({
                kd_log_d: "",
                kd_log_h: "",
                tanggal_log: "",
                deskripsi: "",
                keterangan: "",
                status: "b"
            })
            setAlert(true)
        })
    }


    const handleSubmit = (e) => {
        postDataAPI()
    }




    return (
        <Fragment>
            <CssBaseline />
            <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Data Berhasil Disimpan
                </Alert>
            </Snackbar>
            <Grid container paddingTop={15} paddingLeft={10} >
                <Grid item xs={6} padding={5}>
                    <Grid container  >
                        <Typography variant="h4" component="div" style={{ fontWeight: 600 }} gutterBottom>
                            FORM LOG BOOK
                        </Typography>
                    </Grid>
                    <Paper elevation={3}>
                        <Box sx={{ minWidth: 275, bgcolor: '#f7f5f0' }}>
                            <CardContent>
                                <Divider textAlign="left" style={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', borderBlockColor: "blue" }}><Typography variant="h6" component="div" style={{ fontWeight: 600 }} gutterBottom>
                                    Form Log Book
                                </Typography></Divider>
                                <Grid container margin={0} spacing={1} >
                                    <Grid item xs={6} >
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Tanggal:</Typography> </FormLabel>
                                        <TextField name="tanggal" type="date" fullWidth size="small" onChange={(e) => setFormData({ ...formData, tanggal_log: e.target.value })}  value={formData.tanggal_log}/>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Deskripsi:</Typography></FormLabel>
                                        <TextField name="deskripsi" label="Deskripsi" fullWidth multiline rows={2} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} value={formData.deskripsi}/>
                                    </Grid>
                                </Grid>
                                <Grid container margin={0} spacing={1}  >
                                    <Grid item xs={6}>
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Keterangan:</Typography></FormLabel>
                                        <TextField name="keterangan" label="Keterangan" fullWidth multiline rows={2} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} value={formData.keterangan}/>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Status:</Typography></FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="status"
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            defaultValue={formData.status}
                                        >
                                            <FormControlLabel value="b" control={<Radio />} label="Belum" />
                                            <FormControlLabel value="sd" control={<Radio />} label="Sedang" />
                                            <FormControlLabel value="sh" control={<Radio />} label="Sudah" />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center" padding={5} >
                                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>Add</Button>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6} padding={5}>
                    <Grid container  >
                        <Typography variant="h4" component="div" style={{ fontWeight: 600 }} gutterBottom>
                            SEDANG / SUDAH DIKERJAKAN
                        </Typography>
                    </Grid>
                    <Paper elevation={3}>
                        <Box sx={{ minWidth: 275, bgcolor: '#f7f5f0' }}>
                            <CardContent>
                                <Divider textAlign="left" style={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', borderBlockColor: "blue" }}><Typography variant="h6" component="div" style={{ fontWeight: 600 }} gutterBottom>
                                    Kegiatan Yang Sedang / Sudah Dikerjakan
                                </Typography></Divider>
                                <TableContainer component={Paper} padding={10}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell style={{ width: '10vh' }} align="left">No</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Tanggal</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Deskripsi Pekerjaan</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Keterangan</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Status</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow key="31">
                                                <StyledTableCell scope="row" style={{ width: '2px', height: "8px" }}>
                                                    1
                                                </StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>sadsa</StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>ad</StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>ad</StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>
                                                    <Button variant="contained" style={{ margin: '10px', padding: '8px', background: '#4CAF50' }} startIcon={<EditIcon />}>Edit</Button>
                                                    <Button variant="contained" style={{ background: 'red', margin: '10px', padding: '8px' }} startIcon={<DeleteIcon />}>Delete</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} padding={5}>
                    <Grid container  >
                        <Typography variant="h4" component="div" style={{ fontWeight: 600 }} gutterBottom>
                            BELUM DIKERJAKAN
                        </Typography>
                    </Grid>
                    <Paper elevation={3}>
                        <Box sx={{ minWidth: 275, bgcolor: '#f7f5f0' }}>
                            <CardContent>
                                <Divider textAlign="left" style={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', borderBlockColor: "blue" }}><Typography variant="h6" component="div" style={{ fontWeight: 600 }} gutterBottom>
                                    Kegiatan Yang Belum Dikerjakan
                                </Typography></Divider>
                                <TableContainer component={Paper} padding={10}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell style={{ width: '10vh' }} align="left">No</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Nama Lengkap</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Username</StyledTableCell>
                                                <StyledTableCell style={{ width: '20vh' }} align="left">Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow key="31">
                                                <StyledTableCell scope="row" style={{ width: '2px', height: "8px" }}>
                                                    1
                                                </StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>sadsa</StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>ad</StyledTableCell>
                                                <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>
                                                    <Button variant="contained" style={{ margin: '1rem', background: '#4CAF50' }} startIcon={<EditIcon />}>Edit</Button>
                                                    <Button variant="contained" style={{ background: 'red' }} startIcon={<DeleteIcon />}>Delete</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default LogData;