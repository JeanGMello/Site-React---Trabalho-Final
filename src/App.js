import './assets/css/main.css';
import Header from './components/Header';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Menu from './pages/Menu';
import Comentar from './pages/Comentar';
import Contato from './pages/Contato';
import Recados from './pages/VerRecados';
import VerComentario from './pages/VerComentario';
import React, { useLayoutEffect, useState } from 'react'
import {HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'

import Firebase from './services/FirebaseConnect'

export default function App() {

  const [user, setUser] = useState(null)

  useLayoutEffect(() => {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          setUser(user.uid)
        } else {
          setUser(null)
        }
      })


  }, [])

    
  const PrivateRoute = ({ component: Component }) => {
    return <Route
      render={(props => {
        if (user) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: "/login" }} />
        }


      })}

    />
  }


  return (
    <>
      
      <HashRouter>
        <Header/>
        <Banner titulo= "THE LAST OF US"/>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact={true} component={Menu} />
          <PrivateRoute path="/comentar" component={Comentar} />
          <Route path="/comentarios" component={VerComentario} />
          <Route path="/contato" component={Contato} />
          <PrivateRoute path="/recados" component={Recados} />
        </Switch>
        
        <Footer />
      </HashRouter>
    </>
  )
}