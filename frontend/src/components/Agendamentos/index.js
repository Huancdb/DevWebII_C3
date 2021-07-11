import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Titulo from '../Titulo';

// Generate Order Data
function createData(id, date, name, Local, Data, amount) {
    return { id, date, name, Local, Data, amount };
}

const rows = [
    createData(0, '11122233344', 'Huan Barros', 'Vitoria, ES', '23/08/2021', "10:00"),
    createData(1, '99988877766', 'Paul McCartney', 'London, UK', '23/08/2021', "11:00"),
    createData(2, '12345678900', 'Tom Scholz', 'Boston, MA', '23/08/2021', "12:00"),
    createData(3, '12312312312', 'Michael Jackson', 'Gary, IN', '23/08/2021', "13:00"),
    createData(4, '45645645645', 'Bruce Springsteen', 'Long Branch, NJ', '23/08/2021', "14:00"),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Agendamentos() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Titulo>Agendamentos</Titulo>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>CPF</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Local</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell align="right">Hora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.Local}</TableCell>
                            <TableCell>{row.Data}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
                </Link>
            </div>
        </React.Fragment>
    );
}