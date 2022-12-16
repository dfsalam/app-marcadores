import React, { Component } from "react";

import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url = 'http://localhost:9000/api/deportes'
const field_id = '/dep_id/'


// PageUsuarios es una clase.
// Se crea los siguientes objetos
class PageDeportes extends Component{

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal:'',
        form:{
          dep_id:'',
          dep_nombre:''
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
        delete this.state.form.dep_id //esto borra el campo usu_id
        await axios.post(url, this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionPut = () => {
        axios.put(url+field_id+this.state.form.dep_id,this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionDelete = () => {
        axios.delete(url+field_id+this.state.form.dep_id).then(response => {
          this.modalEliminar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
    
      seleccionarDeporte=(deporte)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            dep_id: deporte.dep_id,
            dep_nombre: deporte.dep_nombre
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
            <h1> TABLA DEPORTES</h1> 
            <br /><br /><br />
            <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >Agregar Deporte</button>
            <br /><br />
            <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(deporte => {
                return(
                  <tr>
                    <td>{deporte.dep_id}</td>
                    <td>{deporte.dep_nombre}</td>
                    <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarDeporte(deporte); this.modalInsertar()}}/></button>
                        {" "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarDeporte(deporte); this.modalEliminar()}}/></button>
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
                  <label htmlFor="dep_id">ID</label>
                  <input className="form-control" type="text" name="dep_id" id="dep_id" readOnly onChange={this.handleChange} value = {form ? form.dep_id : this.state.data.length+1}></input>
                  <br />
    
                  <label htmlFor="dep_nombre">Nombre</label>
                  <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value = {form ? form.dep_nombre : ''}></input>
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

export default PageDeportes;