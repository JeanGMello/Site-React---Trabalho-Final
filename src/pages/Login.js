import React, {useState, useLayoutEffect} from 'react'
import Form from 'react-bootstrap/Form'
import firebase from '../services/FirebaseConnect.js'
import Checkbox from '@material-ui/core/checkbox';
import { useHistory, Link } from "react-router-dom";
import {
    Button,
}from '@material-ui/core';


export default function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [lembreme, setLembreme] = useState(false)

    const login = () => {

        if (lembreme === false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((retorno) => {
                sessionStorage.setItem("uuid", retorno.user.uid)
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg("")
                setTimeout(() => {
                    history.push("/");
                }, 100);


            })
            .catch((erro) => {
                console.log(erro)
                setMsg("Email ou senha inválidos!")
            })
    }
    function cadastrar(){
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((retorno) => {
            setMsg("Usuário cadastrado")
        })
        .catch((erro) => {
            console.log(erro)
            setMsg("erro ao cadastrar")
        })
 }

    useLayoutEffect(() => {
        let emailStorage = localStorage.getItem("email")
        let passwordStorage = localStorage.getItem("password")
        if (emailStorage && passwordStorage) {
            setEmail(emailStorage)
            setPassword(passwordStorage)
            setLembreme(true)
        }

    }, [])

    const comentarios = () => {
        history.push("/comentarios");
    }
    const contato = () => {
        history.push("/contato");
    }


    return (
        <>
        <Button
            onClick={contato}
            color="primary"
            style={{ float: "right" }}>
            contato
        </Button>
        <Button
                onclick={comentarios}
                color="primary"
                style={{ float: "left" }}>
                    <Link to="/comentarios">
                        comentarios
                    </Link>
                
        </Button>
        <section id="three" className="wrapper special">
            <div className="inner">
                <header className="align-center">
                    <h2>Login</h2>
                    <p>Enter with your own account</p>
                </header>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>senha</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Checkbox
                        checked={lembreme}
                        onChange={(e) => setLembreme(e.target.checked)}
                        inputProps={{ 'label-before': 'checkbox' }}/> 
                        Lembre-me

                    <Button
                    onClick={login} 
                    variant="primary">
                        ENTRAR
                    </Button>
                    <Button
                    onClick={cadastrar} 
                    variant="primary">
                        cadastrar
                    </Button>
                </Form>
                {msg}
            </div>
        </section>
        </>
    )
}
