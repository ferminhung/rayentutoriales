import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button, Alert,
  FormGroup, Input, Form,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, CardFooter
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";



class RegularTables extends React.Component {
  constructor() {
    super();
    this.state = {
      tutoriales:[],
      faltaInfo:false,
      nombre:"",
      profesor:"",
      materia:"",
      fecha:"",
      id:"",
      accion:"Agregar",
    }
    
  }

  componentDidMount = async () => {
    await this.verTutoriales();
    
  }
  
  verTutoriales = async () => {
    let url='https://rayentutorialtestapp.azurewebsites.net/tutorials';
    let respuesta = await fetch(url, {
      method: 'GET', 
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
    let result = await respuesta.json();
    this.setState({tutoriales:result});

  }

  eliminarTutoriales = async () => {
    let url='https://rayentutorialtestapp.azurewebsites.net/deletetutorials';
    let respuesta = await fetch(url, {
      method: 'DELETE', 
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
    let result = await respuesta.json();
    this.verTutoriales();

  }

  accionTutorial = async (accion) => {

    if(accion=="A"){
      const nombre= this.state.nombre;
      const profesor= this.state.profesor;
      const materia= this.state.materia;
      const fecha= this.state.fecha;
      this.setState({
        nombre:"",
        profesor:"",
        materia:"",
        fecha:"",
        accion:"Agregar"
      });
      let url='https://rayentutorialtestapp.azurewebsites.net/createtutorial';
      const data = {
        nombre: nombre, 
        profesor: profesor,
        materia: materia,
        fecha: fecha
      };
      let respuesta = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
      })
      .catch(error => {
          console.log(error);
      });
      let result = await respuesta.json();
    }else{
      let url='https://rayentutorialtestapp.azurewebsites.net/updatetutorial/'+this.state.id;
      const data = {
        nombre: this.state.nombre, 
        profesor: this.state.profesor,
        materia: this.state.materia,
        fecha: this.state.fecha
      };
      let respuesta = await fetch(url, {
        method: 'PUT', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
      })
      .catch(error => {
          console.log(error);
      });
      let result = await respuesta.json();
    }
    this.verTutoriales();

  }

  eliminarItem = async (id) => {
    let url='https://rayentutorialtestapp.azurewebsites.net/deletetutorial/'+id;
    
    let respuesta = await fetch(url, {
      method: 'DELETE', 
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
    let result = await respuesta.json();
    this.verTutoriales();

  }


  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={8}>
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="title" md="8">
                    <CardTitle tag="h4">Tutoriales</CardTitle>
                  </Col>
                  <Col className="title" md="4">
                    <Button color="success" 
                      className="btn-round"
                      onClick={()=>this.accionTutorial("A")}
                    >
                        Nuevo
                    </Button>
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th >
                        </th>
                        <th className="text-right">
                          id
                        </th>
                        <th >
                          nombre
                        </th>
                        <th >
                          profesor
                        </th>
                        <th >
                          materia
                        </th>
                        <th >
                          fecha
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tutoriales.map(tutorial=>(
                          <tr>
                            <td>
                              <div >
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    caret
                                    className="btn-round"
                                    color="info"
                                    data-toggle="dropdown"
                                    type="button"
                                  >
                                    <i className="nc-icon nc-settings-gear-65" />
                                  </DropdownToggle>
                                  <DropdownMenu persist>
                                    <DropdownItem
                                      onClick={()=>this.setState({
                                        id:tutorial.id,
                                        nombre:tutorial.nombre,
                                        profesor:tutorial.profesor,
                                        materia:tutorial.materia,
                                        fecha:tutorial.fecha,
                                        accion:"Modificar",
                                      })}
                                    >
                                      Modificar
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={()=>this.eliminarItem(tutorial.id)}
                                      >
                                      Eliminar
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </td>
                            <td className="text-right">
                              {tutorial.id}
                            </td>
                            <td>
                              {tutorial.nombre}
                            </td>
                            <td>
                              {tutorial.profesor}
                            </td>
                            <td>
                              {tutorial.materia}
                            </td>
                            <td>
                              {tutorial.fecha}
                            </td>
                            
                          </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                <Row>
                  <Col className="title" md="8">
                    
                  </Col>
                  <Col className="title" md="4">
                    <Button color="danger" 
                      className="btn-round"
                      onClick={()=>this.eliminarTutoriales()}
                    >
                        Eliminar Todo
                    </Button>
                  </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={4}>
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="title" md="7">
                    <CardTitle tag="h4">Tutorial</CardTitle>
                  </Col>
                  <Col className="title" md="5">
                    {this.state.accion=="Agregar" ? (
                      <Button color="success" 
                        className="btn-round"
                        onClick={()=>this.accionTutorial("A")}
                      >
                          {this.state.accion}
                      </Button>
                    ) : (
                      <Button color="info" 
                        className="btn-round"
                        onClick={()=>this.accionTutorial("M")}
                      >
                          {this.state.accion}
                      </Button>
                    )}
                  </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form>
                      <Row>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                            <label >Nombre</label>
                            <Input
                              defaultValue=""
                              placeholder=""
                              type="text"
                              value={this.state.nombre}
                              onChange={(texto)=>this.setState({nombre:texto.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                            <label >Profesor</label>
                            <Input
                              defaultValue=""
                              placeholder=""
                              type="text"
                              value={this.state.profesor}
                              onChange={(texto)=>this.setState({profesor:texto.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                            <label >Materia</label>
                            <Input
                              defaultValue=""
                              placeholder=""
                              type="text"
                              value={this.state.materia}
                              onChange={(texto)=>this.setState({materia:texto.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                            <label >Fecha</label>
                            <Input
                              defaultValue=""
                              placeholder=""
                              type="text"
                              value={this.state.fecha}
                              onChange={(texto)=>this.setState({fecha:texto.target.value})}
                            />
                          </FormGroup>
                        </Col>
                        
                        {this.state.faltaInfo ? (
                          <Col className="pr-1" md="5">
                            <Alert
                              color="danger"
                              className="alert-with-icon"
                              isOpen={this.state.visible}
                              
                            >
                              <span
                                data-notify="icon"
                                className="now-ui-icons objects_support-17"
                              />
                              <span data-notify="message">
                              Completa la información por favor
                              </span>
                            </Alert>
                          </Col> ) : (null)}
                      </Row>
                      
                    </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegularTables;
