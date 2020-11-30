import React from 'react'
import {
    Button,
}from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'



function Menu(){
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

    const comentar = () => {
        history.push("/comentar");
    }
    const comentarios = () => {
        history.push("/comentarios");
    }
    const recados = () => {
        history.push("/recados");
    }


    return (
        <>
            <Button
                onClick={logoff}
                color="primary"
                style={{ float: "right" }}>
                Logoff
            </Button>
            <Button
                onClick={recados}
                color="primary"
                style={{ float: "right" }}>
                Recados
            </Button>
            <Button
                onclick={comentar}
                color="primary"
                style={{ float: "left" }}>
                    <Link to="/comentar">
                        comentar
                    </Link>

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
                        <h2>Menu</h2>
                        <p>site information</p>
                    </header>
                </div>
                <div className="creator">
                    
                    <h9>Jean Gonçalves Mello </h9> 
                    <p>creator</p>
                    
                    <h9>1120449 </h9> 
                    <p>ra</p>
                    
                    <h9>jeangm.09@gmail.com  </h9>
                    <p>e-mail</p>
                    
                    
                </div>
            </section>
        </>
    )
}
export default Menu;