import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

interface Itask {
    nome: string;
    descricao: string
}

const Produtos: React.FC = () => {

    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Itask>({
        nome: '',
        descricao: '',

    });

    useEffect(() => {
        if (id !== undefined) {
            findFunc(id)
        }
    }, [id]);

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            const response = await api.put(`/categoria/${id}`, model)
        }else{
            const response = await api.post('/categoria', model)
        }
        back()
    }

    async function findFunc(id: string) {
        const response = await api.get(`categoria/${id}`)
        setModel({
            nome: response.data.nome,
            descricao: response.data.descricao
        })
    }

    function back() {
        history.goBack()
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Cadastro Categorias</h1>
                <Button variant="outline-dark" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome Categoria"
                            name="nome"
                            value={model.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Descrição"
                            name="descricao"
                            value={model.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            required
                        />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>


        </div>

    );
}

export default Produtos;