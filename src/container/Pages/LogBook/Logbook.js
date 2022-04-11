//base
import React, { Fragment, useState, useEffect } from "react";

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
import GENI from "../../../services";
import axios from 'axios';


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
    const [post, setPost] = useState([]);
    const [data, setData] = useState(false);
    // const [kd_user,setKd_user]       = useState('');
    // const [nama,setNama]             = useState('');
    // const [username,setUsername]     = useState('');
    // const [password,setPassword]     = useState('');

    const [formData, setFormData] = useState({
        kd_user: "",
        nama: "",
        username: "",
        password: ""
    })

    //get data user
    const getDataAPI = () => {
        GENI.getUser().then(result => {
            setPost(result);
            setData(true)
        })
    }

    const editDataAPI = (e) => {
        GENI.editUser(e).then(result => {
            let isi = JSON.stringify(result);
            console.log(JSON.parse(isi))
            // setFormData(JSON.stringify(result))
           // console.log(isi[nama])
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
        postDataAPI();
    }

    //delete data
    const handleDelete = (e) => {
        GENI.deleteUser(e).then(result => {
            getDataAPI();
        })
    }


    useEffect(() => {
        getDataAPI();
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
                            <Grid container justifyContent="center">
                                <Grid item xs={8}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 600 }} gutterBottom variant="h4">
                                        Nama Lengkap
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} justifyContent="center" style={{ paddingLeft: '30vh' }}>
                                    <TextField style={{ width: '80%' }} name="nama" onChange={(e) => setFormData({ ...formData, nama: e.target.value, kd_user: new Date().getTime() })} value={formData.nama} />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" paddingTop={3}>
                                <Grid item xs={8}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 600 }} gutterBottom variant="h4">
                                        Username
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} justifyContent="center" style={{ paddingLeft: '30vh' }}>
                                    <TextField style={{ width: '80%' }} name="username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username} />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" paddingTop={3}>
                                <Grid item xs={8}>
                                    <Typography sx={{ fontSize: 20, fontWeight: 600 }} gutterBottom variant="h4">
                                        Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} justifyContent="center" style={{ paddingLeft: '30vh' }}>
                                    <TextField style={{ width: '80%' }} hintText="Password" name="password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center" paddingTop={5} paddingBottom={5}>
                                <Button variant="contained" onClick={(handleSubmit)}>Simpan</Button>
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
                                        {post.map((row, index = 1) => (
                                            <StyledTableRow key={row.kd_user}>
                                                <StyledTableCell scope="row" style={{ width: '2px' }}>
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.nama}</StyledTableCell>
                                                <StyledTableCell align="left">{row.username}</StyledTableCell>
                                                <StyledTableCell align="left"><Button variant="contained" style={{ margin: '1rem', background: '#4CAF50' }} onClick={() => editDataAPI(row.kd_user)}>Edit</Button>
                                                    <Button variant="contained" style={{ background: 'red' }} onClick={() => handleDelete(row.kd_user)}>Delete</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Fragment>
    )
}
export default Logbook;