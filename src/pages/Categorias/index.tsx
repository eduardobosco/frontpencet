import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

interface Itask {
    id: number;
    nome: string;
    descricao: string
}


const Categorias: React.FC = () => {

    const [categorias, setCategorias] = useState<Itask[]>([]);
  
    const history = useHistory();

    useEffect(() => {
        loadCategorias()
    }, [])

    async function loadCategorias() {

        const response = await api.get('/categoria')
        console.log(response)
        setCategorias(response.data)
    }

    function newFunc(){
        history.push('/cadcategoria')
    }

    function editFunc(id: number){
        history.push(`/cadcategoria/${id}`)
    }

    async function deleteFunc(id: number){
        await api.delete(`/categoria/${id}`)
        
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
            <h1>Categorias</h1>
            <Button variant="outline-dark" onClick={newFunc}>Nova Categoria</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descricao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        categorias.map(categorias => (
                            <tr key={categorias.id}>
                                <td>{categorias.id}</td>
                                <td>{categorias.nome}</td>
                                <td>{categorias.descricao}</td>
                                <td>
                                    <Button size="sm" variant="outline-primary" onClick={()=> editFunc(categorias.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={()=> deleteFunc(categorias.id)} >Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Categorias;