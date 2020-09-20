import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

interface Itask {
    id: number;
    nome: string;
    cpf: string
}


const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<Itask[]>([]);
  
    const history = useHistory();

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {

        const response = await api.get('/funcionario')
        console.log(response)
        setTasks(response.data)
    }

    function newFunc(){
        history.push('/cadastro')
    }

    function editFunc(id: number){
        history.push(`/cadastro/${id}`)
    }

    async function deleteFunc(id: number){
        await api.delete(`/funcionario/${id}`)
        
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
            <h1>Funcionários</h1>
            <Button variant="outline-dark" onClick={newFunc}>Novo Funcionário</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks.map(tasks => (
                            <tr key={tasks.id}>
                                <td>{tasks.id}</td>
                                <td>{tasks.nome}</td>
                                <td>{tasks.cpf}</td>
                                <td>
                                    <Button size="sm" variant="outline-primary" onClick={()=> editFunc(tasks.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={()=> deleteFunc(tasks.id)} >Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }



                </tbody>
            </Table>

        </div>

    );
}

export default Tasks;