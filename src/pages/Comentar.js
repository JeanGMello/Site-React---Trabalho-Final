import React, { useState } from 'react'
import {
    Button,
    Grid,
    TextField,
}
    from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';



function Comentar(){
    let history = useHistory();

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/login");
            }).catch(() => {
                history.push("/login");
            })
    }

    const voltar = () => {
        history.push("/");
    }


    const [nome, setNome] = useState("")
    const [comment, setComment] = useState("")

    const limpar = () => {
        setNome("")
        setComment("")
    }

    const salvarComment = () => {
        let objeto ={
            nome: nome,
            comment: comment,
        }
        let code = uuidv4()

        Firebase
            .database()
            .ref(`comentario/${code}`)
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
                onClick={logoff}
                color="primary"
                style={{ float: "right" }}>
                Logoff
            </Button>
            <Button
                onclick={voltar}
                color="primary"
                style={{ float: "left" }}>
                    <Link to="/">
                        voltar
                    </Link>
                
            </Button>
            <section id="three" className="wrapper special">
                
                <div className="inner">
                    <header className="align-center">
                        <h2>Comentários</h2>
                        <p>comente algo sobre o jogo. isso irá aparecer para os usuários não cadastrados</p>
                    </header>
                </div>
                
            <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="nome"
                    variant="outlined"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    label="comentario"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarComment}
                    style={{ float: "right" }}>
                    Enviar comentario
                </Button>
                
            </Grid>
            </Grid >

            </section>

        </>
    )
}
export default Comentar;