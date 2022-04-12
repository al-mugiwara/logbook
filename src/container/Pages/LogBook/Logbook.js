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


const useStyles = makeStyles((theme) => ({
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.divider,
    },
}))

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

const Logbook = () => {
    //deklarasi const
    const [post, setPost] = useState([]);
    const [data, setData] = useState(false);
    const [tipe, setTipe] = useState(false);
    const [kd_user, setKd_user] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        kd_user: "",
        nama: "",
        username: "",
        password: ""
    })

    //cari data
    const requestSearch = (searchVal) => {
        const filteredRows = post.filter((row) => {
            return row.nama.toLowerCase().includes(searchVal.toLowerCase())
        })
        setPost(filteredRows);
        if (searchVal === "") {
            getDataAPI()
        }
    }

    const cancelSearch = () => {
        setSearch("");
        requestSearch(search)
        getDataAPI()
    }


    //datatable
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    //get data user
    const getDataAPI = () => {
        GENI.getUser().then(result => {
            setPost(result);
            setData(true)
        })
    }

    //get edit user
    const editDataAPI = (e) => {
        GENI.editUser(e).then(result => {
            let a = result.map((row) => {
                let b = row;
                setFormData(row)
                setKd_user(row.kd_user)
                setTipe(true)
            });
        })
    }

    //put data user
    const putDataAPI = (e) => {
        GENI.updateUser(formData, kd_user).then(result => {
            getDataAPI()
            setFormData({
                kd_user: '',
                nama: '',
                username: '',
                password: ''
            })
        })
    }

    //post data user
    const postDataAPI = () => {
        GENI.postUser(formData).then(result => {
            getDataAPI()
            setFormData({
                kd_user: '',
                nama: '',
                username: '',
                password: ''
            })
        })
    }

    // const FormChange = (event,type) => {
    //     setNama(event.target.name);
    // }

    const handleSubmit = (e) => {
        if (tipe) {
            putDataAPI()
        } else {
            postDataAPI()
        }
    }

    //delete data
    const handleDelete = (e) => {
        GENI.deleteUser(e).then(result => {
            getDataAPI();
        })
    }

    useEffect(() => {
        // setTimeout(() => {
        //     getDataAPI();
        // }, 2000)
        getDataAPI()
    }, [data]);

    return (
        <Fragment>
            <CssBaseline />
            <Box sx={{ bgcolor: '#f7f5f0', height: '100vh' }}>
                <Grid container paddingTop={15} paddingLeft={10} >
                    <Typography variant="h4" component="div" style={{ fontWeight: 600 }} gutterBottom>
                        Form Pengguna
                    </Typography>
                </Grid>
                <Grid container paddingLeft={10} paddingRight={10}>
                    <Card sx={{ minWidth: 275, width: '100%' }} >
                        <Divider textAlign="left" style={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', borderBlockColor: "blue" }}><Typography variant="h5" component="div" style={{ fontWeight: 600 }} gutterBottom>
                            Form Pengguna
                        </Typography></Divider>
                        <CardContent>
                            <Grid container justifyContent="center" style={{ margin: 10 }} >
                                <Grid item xs={2}>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} style={{ paddingBottom: 30, marginLeft: 150, marginTop: 15 }} gutterBottom variant="h4">
                                        Nama Lengkap
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} justifyContent="center">
                                    <TextField style={{ width: '80%' }} name="nama" onChange={(e) => setFormData({ ...formData, nama: e.target.value, kd_user: new Date().getTime() })} value={formData.nama} label="Nama Lengkap" />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" style={{ margin: 10 }}>
                                <Grid item xs={2}>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} style={{ paddingBottom: 30, marginLeft: 150, marginTop: 15 }} gutterBottom variant="h4">
                                        Username
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} justifyContent="center" >
                                    <TextField style={{ width: '80%' }} name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username} label="Username" />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" style={{ margin: 10 }}>
                                <Grid item xs={2}>
                                    <Typography sx={{ fontSize: 15, fontWeight: 600 }} style={{ paddingBottom: 30, marginLeft: 150, marginTop: 15 }} gutterBottom variant="h4">
                                        Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={10} justifyContent="center">
                                    <TextField style={{ width: '80%' }} hintText="Password" name="password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} label="Password" />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" >
                                <Button variant="contained" onClick={(handleSubmit)} endIcon={<SendIcon />}>Simpan</Button>
                            </Grid>
                            <Grid container padding={2} >
                                <SearchBar
                                    value={search}
                                    onChange={(searchVal) => requestSearch(searchVal)}
                                    onCancelSearch={() => cancelSearch()}
                                >
                                </SearchBar>
                            </Grid>
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
                                        {
                                            post.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index = 1) => (
                                                <StyledTableRow key={row.kd_user}>
                                                    <StyledTableCell scope="row" style={{ width: '2px',height: "8px"}}>
                                                        {index + 1}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left" style={{ height: "8px", padding: "0px"}}>{row.nama}</StyledTableCell>
                                                    <StyledTableCell align="left" style={{ height: "8px", padding: "0px"}}>{row.username}</StyledTableCell>
                                                    <StyledTableCell align="left" style={{ height: "8px", padding: "0px"}}><Button variant="contained" style={{ margin: '1rem', background: '#4CAF50' }} onClick={() => editDataAPI(row.kd_user)}>Edit</Button>
                                                        <Button variant="contained" style={{ background: 'red' }} onClick={() => handleDelete(row.kd_user)} startIcon={<DeleteIcon />}>Delete</Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                post && post.length > 0 ? " "
                                    : <LinearProgress component={Paper} color="primary" style={{ width: '100%' }} />
                            }
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={post.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            >
                            </TablePagination>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Fragment>
    )
}
export default Logbook;