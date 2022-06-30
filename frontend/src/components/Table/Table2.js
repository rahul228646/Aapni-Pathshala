import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const columns = [
    {id: 'Rank', label: 'Rank', minWidth: 100},
    {id: 'Name', label: 'Name', minWidth: 170},
    {id: 'Score', label: 'Score', minWidth: 100},

];

function createData(Rank,  Name, Score) {
    return { Rank,  Name, Score };
}



const useStyles = makeStyles({
    root: {
        width: '80%',
        marginBottom: 25 ,
        marginLeft:18,
    },
    container: {
        maxHeight: 440,
    },

});



export default function Table2(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [tableData, setTableData] = React.useState([]);
    
    const idClass=props.classId;
    console.log('-->', props.classId)

    const row=[];
    var j=1;
    for(var i=tableData.length-1;i>=0;i--){
        row.push(createData(j++,tableData[i].student.name,tableData[i].progress));
    }

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
            },
        }
        console.log(idClass);
        const body = {
            classId:idClass,
        }
        axios.post("http://localhost:5000/api/classroom/leaderboard",body,config).then(res =>{
            console.log("&&&",res.data)
            setTableData(res.data)
            
        }).catch(err => console.log(err))
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>
            <h3 style={{marginLeft: "18px"}}>{tableData[0]?tableData[0].subject:""}</h3>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell

                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth,
                                        backgroundColor: '#e37f5b',
                                        color: 'white' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 10 ]}
                component="div"
                count={row.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    );
}

