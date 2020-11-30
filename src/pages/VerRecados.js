import React, { useState, useLayoutEffect } from 'react'
import {
    Button,
    Grid,
    Paper,
}
    from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../services/FirebaseConnect'
import { useHistory } from "react-router-dom"



export default function Recados() {
    const history = useHistory()
    const [lista, setLista] = useState([])

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/recado`)
            .on('value', snapchot => {
                // converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setLista(lista)
                } else{
                    setLista([])
                }
            })

    }, [])

    const voltar = () => {
        history.push("/");
    }

    return (
        <>
        <Button
            onClick={voltar}
            color="primary"
            style={{ float: "left" }}>
            voltar
        </Button>
        <section id="three" className="wrapper special">
            <div className="inner">
                <header className="align-center">
                    <h2>Recados dos visitantes</h2>
                    <p>Recados e opiniões dos visitantes anonimos do site.</p>
                </header>
                
            </div>

            <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Recados</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.recado}
                                    </TableCell>
                                    
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </Grid>

        </section>
        </>
    )
}