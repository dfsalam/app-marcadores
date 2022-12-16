import React, { Component } from "react";

import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url = 'http://localhost:9000/api/marcadores'
const field_id = '/mar_id/'

class PageEventos extends Component{

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal:'',
        form:{
          mar_id:'',
          mar_fechaevento:'',
          mar_horaevento:'',
          mar_fecharegistro:'',
          mar_horaregistro:'',
          equi_id1:'',
          equi_id2:'',
          mar_marcadorequi1:'',
          mar_marcadorequi2:'',
          dep_id:'',
          usu_id:''
        }
      }
    
      peticionGet = () => {
        axios.get(url).then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionPost = async () => {
        delete this.state.form.mar_id //esto borra el campo usu_id
        await axios.post(url, this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionPut = () => {
        axios.put(url+field_id+this.state.form.mar_id,this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionDelete = () => {
        axios.delete(url+field_id+this.state.form.mar_id).then(response => {
          this.modalEliminar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
    
      seleccionarDeporte=(marcador)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            mar_id: marcador.mar_id,
            mar_fechaevento: marcador.mar_fechaevento,
            mar_horaevento: marcador.mar_horaevento,
            mar_fecharegistro: marcador.mar_fecharegistro,
            mar_horaregistro: marcador.mar_horaregistro,
            equi_id1: marcador.equi_id1,
            equi_id2: marcador.equi_id2,
            mar_marcadorequi1: marcador.mar_marcadorequi1,
            mar_marcadorequi2: marcador.mar_marcadorequi2,
            dep_id: marcador.dep_id,
            usu_id: marcador.usu_id
          }
        })
      }
    
      modalInsertar = () =>{
        this.setState({modalInsertar:!this.state.modalInsertar})
      }
    
      modalEliminar = () =>{
        this.setState({modalEliminar:!this.state.modalEliminar})
      }
    
      handleChange = async e=>{  /// función para capturar los datos del usuario. Es en 2do plano debe ser asincrona
        e.persist();           /// y por eso debemos especificar persistencia
        await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
          form:{
            ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
            [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
          }
        });
        console.log(this.state.form);  /// probar por consola lo que se guarda
      }
    
      //se ejecuta cuando lo realiza
      componentDidMount(){
        this.peticionGet();
      }
    
      render(){  
    
        const form = this.state.form
    
        return (
          <div className="App">
            <h1> TABLA MARCADORES</h1> 
            <br /><br /><br />
            <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >Agregar Marcador</button>
            <br /><br />
            <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Evento</th>
                <th>Hora Evento</th>
                <th>Fecha Registro</th>
                <th>Hora de registro</th>
                <th>ID Equipo 1</th>
                <th>ID Equipo 2</th>
                <th>Mar Equipo 1</th>
                <th>Mar Equipo 2</th>
                <th>ID Deporte</th>
                <th>ID Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(marcador => {
                return(
                  <tr>
                    <td>{marcador.mar_id}</td>
                    <td>{marcador.mar_fechaevento}</td>
                    <td>{marcador.mar_horaevento}</td> 
                    <td>{marcador.mar_fecharegistro}</td> 
                    <td>{marcador.mar_horaregistro}</td> 
                    <td>{marcador.equi_id1}</td> 
                    <td>{marcador.equi_id2}</td> 
                    <td>{marcador.mar_marcadorequi1}</td>
                    <td>{marcador.mar_marcadorequi2}</td>
                    <td>{marcador.dep_id}</td>
                    <td>{marcador.usu_id}</td>
                    <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarDeporte(marcador); this.modalInsertar()}}/></button>
                        {" "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarDeporte(marcador); this.modalEliminar()}}/></button>
                    </td> 
                  </tr>
                )
              })}
            </tbody>
            </table>
    
            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader style={{display:'block'}}>
              </ModalHeader>
              <ModalBody>
                <div>
                  <label htmlFor="mar_id">ID</label>
                  <input className="form-control" type="text" name="mar_id" id="mar_id" readOnly onChange={this.handleChange} value = {form ? form.mar_id : this.state.data.length+1}></input>
                  <br />
    
                  <label htmlFor="mar_fechaevento">Fecha Evento</label>
                  <input className="form-control" type="text" name="mar_fechaevento" id="mar_fechaevento" onChange={this.handleChange} value = {form ? form.mar_fechaevento : ''}></input>
                  <br />
                  <label htmlFor="mar_horaevento">Hora Evento</label>
                  <input className="form-control" type="text" name="mar_horaevento" id="mar_horaevento" onChange={this.handleChange} value = {form ? form.mar_horaevento : ''}></input>
                  <br />

                  <label htmlFor="mar_fecharegistro">Fecha Registro</label>
                  <input className="form-control" type="text" name="mar_fecharegistro" id="mar_fecharegistro" onChange={this.handleChange} value = {form ? form.mar_fecharegistro : ''}></input>
                  <br />
                  <label htmlFor="mar_horaregistro">Hora Registro</label>
                  <input className="form-control" type="text" name="mar_horaregistro" id="mar_horaregistro" onChange={this.handleChange} value = {form ? form.mar_horaregistro : ''}></input>
                  <br />
    
                  <label htmlFor="equi_id1">ID equipo 1</label>
                  <input className="form-control" type="text" name="equi_id1" id="equi_id1" onChange={this.handleChange} value = {form ? form.equi_id1 : ''}></input>
                  <br />
                  <label htmlFor="equi_id2">ID equipo 2</label>
                  <input className="form-control" type="text" name="equi_id2" id="equi_id2" onChange={this.handleChange} value = {form ? form.equi_id2 : ''}></input>
                  <br />
                  <label htmlFor="mar_marcadorequi1">Mar Equipo 1</label>
                  <input className="form-control" type="text" name="mar_marcadorequi1" id="mar_marcadorequi1" onChange={this.handleChange} value = {form ? form.mar_marcadorequi1 : ''}></input>
                  <br />
                  <label htmlFor="mar_marcadorequi2">Mar Equipo 2</label>
                  <input className="form-control" type="text" name="mar_marcadorequi2" id="mar_marcadorequi2" onChange={this.handleChange} value = {form ? form.mar_marcadorequi2 : ''}></input>
                  <br />
                  <label htmlFor="dep_id">ID Deporte</label>
                  <input className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange} value = {form ? form.dep_id : ''}></input>
                  <br />
                  <label htmlFor="usu_id">ID Usuario</label>
                  <input className="form-control" type="text" name="usu_id" id="usu_id" onChange={this.handleChange} value = {form ? form.usu_id : ''}></input>
                  <br />
                </div>
              </ModalBody>
              <ModalFooter>
                {
                  this.state.tipoModal === 'insertar' ?
                  <button className="btn btn-success" onClick={()=> this.peticionPost()}>Insertar</button>
                  :
                  <button className="btn btn-success" onClick={()=> this.peticionPut()}>Modificar</button>
                }
                <button className="btn btn-danger" onClick={()=> this.modalInsertar()} >Cancelar</button>
              </ModalFooter>
            </Modal>
    
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                ¿Estas seguro que deseas eliminar?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=> this.peticionDelete()} >Si</button>
                <button className="btn btn-success" onClick={()=> this.modalEliminar()} >No</button>
              </ModalFooter>
            </Modal>
    
          </div>
        )}
}

export default PageEventos;