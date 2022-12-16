import React, { Component } from 'react'

import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import Cookies from 'universal-cookie'

const urlLogin="http://localhost:9000/api/usuarios"


const cookies = new Cookies();


class PageLogin extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
        
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
        //console.log(this.state.form)
    }

    iniciarSesion=async()=>{
        let name=this.state.form.username
        let pwd=this.state.form.password
        if(name.length<=0 || pwd.length<=0){
            alert('Se requieren todos los datos')
            return "Datos Vacios"
        }

                
        //para cambiar usuario admin
        
        await axios.get(urlLogin+"/"+name+"/"+pwd)
        .then(response=>{
            //console.log(response.data)
            return response.data
        }).then(response=>{
            if(response.length>0){
              var resp=response[0] // para evitar llamados tan largos con corchetes
              cookies.set("usu_id",resp.usu_id,{path:"/"})/// el path es para que se puedan acceder de cualquier pagina
              cookies.set("usu_email",resp.usu_email,{path:"/"})
              cookies.set("usu_nombres",resp.usu_nombres,{path:"/"})
              cookies.set("usu_apellidos",resp.usu_apellidos,{path:"/"})
              alert("Bienveni@ "+resp.usu_nombres)
              
              window.location.href='./'
            }else{
                alert("Verificar Usuario y/o Clave")
            }
        })
        .catch(error=>{
            console.log(error)
        })

    }


    render() {
        return(
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
        )
    }
}

export default PageLogin