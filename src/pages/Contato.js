import React, { useState } from 'react'
import {
    Button,
    Grid,
    TextField,
}
    from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';



function Contato(){
    let history = useHistory();

    const voltar = () => {
        history.push("/");
    }


    const [recado, setRecado] = useState("")

    const limpar = () => {
        setRecado("")
    }

    const salvarRecado = () => {
        let objeto ={
            recado: recado,
        }
        let code = uuidv4()

        Firebase
            .database()
            .ref(`recado/${code}`)
            .set(objeto)
            .then(() => {
                limpar()
            })
            .catch((erro) => {
                console.log(erro)
            })
    };



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
                        <h2>Contato</h2>
                        <p>Deixe seu recado ou critica para ajudar a melhorar nosso site. Todos os recados são anonimos!</p>
                    </header>
                </div>
                
            <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="recado"
                    variant="outlined"
                    value={recado}
                    onChange={(e) => setRecado(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRecado}
                    style={{ float: "right" }}>
                    Enviar recado
                </Button>
                
            </Grid>
            </Grid >

            </section>

        </>
    )
}
export default Contato;