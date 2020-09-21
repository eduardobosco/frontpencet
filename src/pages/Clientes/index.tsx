import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import '../Clientes/styles.css'

// import { Container } from './styles';

interface Itask {
  id: number;
  nome: string;
  usuario: string;
  cpf: string;
  dataNascimento: string;
  email:string;
//  endereco:string
}


const Clientes: React.FC = () => {

  const [clientes, setClientes] = useState<Itask[]>([]);

  const history = useHistory();

  useEffect(() => {
      loadClientes()
  }, [])

  async function loadClientes() {

      const response = await api.get('/cliente')
      console.log(response)
      setClientes(response.data)
  }

  function newFunc(){
      history.push('/cadcliente')
  }

  function editFunc(id: number){
      history.push(`/cadcliente/${id}`)
  }

  async function deleteFunc(id: number){
      await api.delete(`/cliente/${id}`)
      
  }

  return (

      <div className="container">
          <br />
          <div className="task-header">
          <h1>Clientes</h1>
          <Button variant="outline-dark" onClick={newFunc}>Novo Cliente</Button>
          </div>
          <br />
          <Table striped bordered hover className="text-center">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Uuario</th>
                      <th>CPF</th>
                      <th>Data de Nascimento</th>
                      <th>E-mail</th>
     
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>

                  {
                      clientes.map(clientes => (
                          <tr key={clientes.id}>
                              <td>{clientes.id}</td>
                              <td>{clientes.nome}</td>
                              <td>{clientes.usuario}</td>
                              <td>{clientes.cpf}</td>
                              <td>{clientes.dataNascimento}</td>
                              <td>{clientes.email}</td>
                              
                              <td>
                                  <Button size="sm" variant="outline-primary" onClick={()=> editFunc(clientes.id)}>Editar</Button>{' '}
                                  <Button size="sm" variant="outline-danger" onClick={()=> deleteFunc(clientes.id)} >Deletar</Button>
                              </td>
                          </tr>
                      ))
                  }
              </tbody>
          </Table>
      </div>
  );
}

export default Clientes;