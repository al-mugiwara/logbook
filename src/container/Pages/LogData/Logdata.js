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
import InputIcon from '@mui/icons-material/Input';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FaceRetouchingOffSharpIcon from '@mui/icons-material/FaceRetouchingOffSharp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
    });
    const [postblm, setPostblm] = useState([]);
    const [data, setData] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    //searchblm
    //cari data
    const requestSearch = (searchVal) => {
        const filteredRows = postblm.filter((row) => {
            return row.deskripsi.toLowerCase().includes(searchVal.toLowerCase())
        })
        setPostblm(filteredRows);
        if (searchVal === "") {
            getDataBlm()
        }
    }

    const cancelSearch = () => {
        setSearch("");
        requestSearch(search)
        getDataBlm()
    }

    //datatable
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

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

    //getData Blm 
    const getDataBlm = () => {
        GENI.getLogblm().then(result => {
            setPostblm(result);
            setData(true)
        })
    }

    // put data sta
    const putDataSta = (e, sta) => {
        GENI.updatestaLog(sta, e).then(result => {
            getDataBlm()
            setAlert(true)
        })
    }

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
            getDataBlm()
        })
    }
    const handleSubmit = (e) => {
        postDataAPI()
    }

    const handleUpSta = (e, sta) => {
        putDataSta(e, sta)
    }

    const handleUbah = (e) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <Paper elevation={3}>
                            <CardContent>
                                <Typography variant="h5"><PriorityHighIcon /> Status Akan Diubah</Typography>
                                <p>Apakah Anda Akan Mengubah Status Kegiatan ? </p>
                                <Grid container justifyContent="center">
                                    <Grid item xs={3} marginRight={3}>
                                        <Button size="small" variant="contained" startIcon={<DirectionsRunIcon />} onClick={() => [handleUpSta(e, 'sd'), onClose()]}>Sedang </Button>
                                    </Grid>
                                    <Grid item xs={3} marginRight={7}>
                                        <Button size="small" variant="contained" color="success" endIcon={<EmojiPeopleIcon />} onClick={handleSubmit}>Sudah </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Paper>
                    </div>
                );
            }
        });
    }

    useEffect(() => {
        getDataBlm()
    }, [data])

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
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                value={formData.tanggal_log}
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData,
                                                        tanggal_log: newValue
                                                    })
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        {/* <TextField name="tanggal" type="date" fullWidth size="small" onChange={(e) => setFormData({ ...formData, tanggal_log: e.target.value })} value={} /> */}
                                    </Grid>
                                    <Grid item xs={6} >
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Deskripsi:</Typography></FormLabel>
                                        <TextField name="deskripsi" label="Deskripsi" fullWidth multiline rows={2} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} value={formData.deskripsi} />
                                    </Grid>
                                </Grid>
                                <Grid container margin={0} spacing={1}  >
                                    <Grid item xs={6}>
                                        <FormLabel><Typography sx={{ fontSize: 13, fontWeight: 600, color: 'black' }}>Keterangan:</Typography></FormLabel>
                                        <TextField name="keterangan" label="Keterangan" fullWidth multiline rows={2} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} value={formData.keterangan} />
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
                                <Grid container padding={2} >
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4}>
                                        <Button variant="contained" startIcon={<InputIcon />} onClick={handleSubmit}>Tambahkan</Button>
                                    </Grid>
                                    <Grid item xs={4}></Grid>

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
                                <Grid container padding={2} >
                                    <SearchBar
                                        value={search}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                        label="Cari Berdasarkan Deskripsi Pekerjaan"
                                    >
                                    </SearchBar>
                                </Grid>
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
                                            {
                                                postblm.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index = 1) => (
                                                    <StyledTableRow key={row.kd_log_d}>
                                                        <StyledTableCell scope="row" style={{ width: '2px', height: "8px" }}>
                                                            {index + 1}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>{row.tanggal_log}</StyledTableCell>
                                                        <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>{row.deskripsi}</StyledTableCell>
                                                        <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>{row.keterangan}</StyledTableCell>
                                                        <StyledTableCell align="left" style={{ height: "8px", padding: "0px" }}>
                                                            <Chip onClick={() => handleUbah(row.kd_log_d)} variant="outlined" color="error" icon={<FaceRetouchingOffSharpIcon />} label="Belum Dikerjakan"></Chip>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {
                                    postblm && postblm.length > 0 ? " "
                                        : <Typography justifyContent="center" style={{ textAlign: 'center' }}>Tidak Ada Data Yang Ditampilkan</Typography>
                                }
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={postblm.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                >
                                </TablePagination>
                            </CardContent>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default LogData;