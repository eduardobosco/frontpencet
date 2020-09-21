import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment'
import './styles.css';

interface Itask {
    nome: string;
    usuario: string;
    cpf: string;
    dataNascimento: string;
    email: string;
//    endereco: string
}

const Clientes: React.FC = () => {

    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Itask>({
        nome: '',
        usuario: '',
        cpf: '',
        dataNascimento: '',
        email: ''
//        endereco: ''

    });

    useEffect(() => {
        if (id !== undefined) {
            findClientes(id)
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
            const response = await api.put(`/cliente/${id}`, model)
        } else {
            const response = await api.post('/cliente', model)
        }
        back()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    async function findClientes(id: string) {
        const response = await api.get(`cliente/${id}`)
        setModel({
            nome: response.data.nome,
            usuario: response.data.usuario,
            cpf: response.data.cpf,
            dataNascimento: response.data.dataNascimento,
            email: response.data.email,
//            endereco: response.data.endereco,

        });
    }

    function back() {
        history.goBack()
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Cadastro de Clientes</h1>
                <Button variant="outline-dark" onClick={back}>Voltar</Button>
            </div>
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome Produto" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" placeholder="Descrição" name="descricao" value={model.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control type="text" placeholder="Quantidade em Estoque" name="Estoque" value={model.cpf} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control type="text" placeholder="Valor Unitario" name="valor" value={model.dataNascimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>e-mail</Form.Label>
                        <Form.Control type="text" placeholder="Funcionario" name="funcionario" value={model.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control type="text" placeholder="Categoria" name="Categoria" value={model.endereco} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group> */}

                    <Button variant="outline-dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>


        </div>

    );
}

export default Clientes;