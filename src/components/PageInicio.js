import React, { Component } from 'react'

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const urlEventos = 'http://localhost:9000/api/marcadores/2'



class PageInicio extends Component{
   
    state={
        data: []
    }


    peticionGet = () => {
        axios.get(urlEventos).then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
      }

      componentDidMount(){
        this.peticionGet()
      }


    render(){
        return <div>
            <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Equipo1</th>
            <th>Marcador1</th>            
            <th>Equipo2</th>
            <th>Marcador2</th>            
            <th>Deporte</th>
                        
           
            
            
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(marcadores => {
            return(
              <tr key={marcadores.mar_id}>
                <td>{marcadores.mar_fechaevento}</td>
                <td>{marcadores.hora}</td> 
                <td>{marcadores.nombre1}</td> 
                <td>{marcadores.marcador1}</td>
                <td>{marcadores.nombre2}</td>
                <td>{marcadores.marcador2}</td>
                <td>{marcadores.deportes}</td>   
              </tr>
            )
          })}
        </tbody>
        </table>
        </div>
    }
}

export default PageInicio;