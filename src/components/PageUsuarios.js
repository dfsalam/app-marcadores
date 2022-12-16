import React, { Component } from "react";

import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url = 'http://localhost:9000/api/usuarios'
const field_id = '/usu_id/'


// PageUsuarios es una clase.
// Se crea los siguientes objetos
class PageUsuarios extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        tipoModal:'',
        form:{
          usu_id:'',
          usu_email:'',
          usu_clave:'',
          usu_nombres:'',
          usu_apellidos:''
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
        delete this.state.form.usu_id //esto borra el campo usu_id
        await axios.post(url, this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionPut = () => {
        axios.put(url+field_id+this.state.form.usu_id,this.state.form).then(response => {
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
      peticionDelete = () => {
        axios.delete(url+field_id+this.state.form.usu_id).then(response => {
          this.modalEliminar()
          this.peticionGet()
        }).catch(error => {
          console.log(error.message);
        })
      }
    
    
      seleccionarUsuario=(usuario)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            usu_id: usuario.usu_id,
            usu_email: usuario.usu_email,
            usu_clave: usuario.usu_clave,
            usu_nombres: usuario.usu_nombres,
            usu_apellidos: usuario.usu_apellidos
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
            <h1> TABLA USUARIOS</h1> 
            <br /><br /><br />
            <button className="btn btn-success" onClick={()=> {this.setState({form:null, tipoModal:'insertar'}); this.modalInsertar()}} >Agregar Usuario</button>
            <br /><br />
            <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(usuario => {
                return(
                  <tr>
                    <td>{usuario.usu_id}</td> 
                    <td>{usuario.usu_email}</td> 
                    <td>{usuario.usu_clave}</td> 
                    <td>{usuario.usu_nombres}</td> 
                    <td>{usuario.usu_apellidos}</td> 
                    <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick = {()=>{this.seleccionarUsuario(usuario); this.modalInsertar()}}/></button>
                        {" "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{this.seleccionarUsuario(usuario); this.modalEliminar()}}/></button>
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
                  <label htmlFor="usu_id">ID</label>
                  <input className="form-control" type="text" name="usu_id" id="usu_id" readOnly onChange={this.handleChange} value = {form ? form.usu_id : this.state.data.length+1}></input>
                  <br />
                  <label htmlFor="usu_email">Email</label>
                  <input className="form-control" type="text" name="usu_email" id="usu_email" onChange={this.handleChange} value = {form ? form.usu_email : ''}></input>
                  <br />
                  <label htmlFor="usu_clave">Clave</label>
                  <input className="form-control" type="text" name="usu_clave" id="usu_clave" onChange={this.handleChange} value = {form ? form.usu_clave : ''}></input>
                  <br />
                  <label htmlFor="usu_nombres">Nombres</label>
                  <input className="form-control" type="text" name="usu_nombres" id="usu_nombres" onChange={this.handleChange} value = {form ? form.usu_nombres : ''}></input>
                  <br />
                  <label htmlFor="usu_apellidos">Apellidos</label>
                  <input className="form-control" type="text" name="usu_apellidos" id="usu_apellidos" onChange={this.handleChange} value = {form ? form.usu_apellidos : ''}></input>
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

export default PageUsuarios;