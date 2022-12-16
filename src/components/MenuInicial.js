import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import { Link } from 'react-router-dom'

import Cookies from 'universal-cookie'
const cookies = new Cookies();


class MenuInicial extends Component {

      state={
        estaLoguin:false,
        admin:false
        //otra variable de estado
      }

      componentDidMount(){
        //otro if que si es igual a un 
        if(cookies.get("usu_nombres")){
            this.setState({estaLoguin:true})
        }else{
            this.setState({estaLoguin:false})
           // window.location.href="./" /// redirigir al inicio
        }
        if(cookies.get("usu_nombres")=='admin'){
            this.setState({admin:true})
        }else{
            this.setState({admin:false})
           // window.location.href="./" /// redirigir al inicio
        }


      }

      cerrarSesion(){
        cookies.remove("usu_id",{path:"/"})
        cookies.remove("usu_email",{path:"/"})
        cookies.remove("usu_nombres",{path:"/"})
        cookies.remove("usu_apellidos",{path:"/"})
        //window.location.href="./"
        this.setState({estaLoguin:false})
      }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/' >
                        <img src='./logo.png' width={80} height={40} alt="Deportes" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item" hidden={this.state.estaLoguin}>
                                <Link className="nav-link" aria-current="page" to='/PageLogin'>Login</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.estaLoguin}>
                                <Link className="nav-link" aria-current="page" to='/PageEventos'>Eventos</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.estaLoguin||!this.state.admin}>
                                <Link className="nav-link" aria-current="page" to='/PageUsuarios'>Usuarios</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.estaLoguin||!this.state.admin}>
                                <Link className="nav-link" aria-current="page" to='/PageDeportes'>Deportes</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.estaLoguin||!this.state.admin}>
                                <Link className="nav-link" aria-current="page" to='/PageEquipos'>Equipos</Link>
                            </li>

                            <li className="nav-item" hidden={!this.state.estaLoguin}>
                                <Link className="nav-link" onClick={()=>this.cerrarSesion()} to='/'>Salir</Link>
                            </li>
                            

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default MenuInicial;

