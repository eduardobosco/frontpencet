import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment'
import './styles.css';
import {Endereco} from '../types'


interface Itask {
    nome: string;
    usuario: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    rua: string,
    numero: 0,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string
}

const Clientes: React.FC = () => {

    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Itask>({
        nome: '',
        usuario: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        rua: '',
        numero: 0,
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''

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

    function formatDate(date: Date) {
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
            rua:response.data.rua,
            numero:response.data.numero,
            complemento:response.data.complemento,
            bairro:response.data.bairro,
            cidade:response.data.cidade,
            estado:response.data.estado, 
            cep:response.data.cep,
        

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
                        <Form.Control type="text" placeholder="Nome Completo" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" placeholder="Usuário" name="usuario" value={model.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control type="text" placeholder="CPF" name="cpf" value={model.cpf} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control type="text" placeholder="DD-MM-YYYY" name="data" defaultValue={model.dataNascimento} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>e-mail</Form.Label>
                        <Form.Control type="email" placeholder="email" name="email" value={model.email} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>
                    <div>
                        <br/>
                        <h1>Endereço</h1>
                        <br/>
                    </div>
                    <Form.Group>
                        <Form.Label>Rua</Form.Label>
                        <Form.Control type="text" placeholder="Rua" name="rua" value={model.rua} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Numero</Form.Label>
                        <Form.Control type="text" placeholder="Numero" name="numero" value={model.numero} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control type="text" placeholder="Complemento" name="complemento" value={model.complemento} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control type="text" placeholder="Bairro" name="bairro" value={model.bairro} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control type="text" placeholder="Cidade" name="cidade" value={model.cidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado" name="estado" value={model.estado} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CEP</Form.Label>
                        <Form.Control type="text" placeholder="CEP" name="cep" value={model.cep} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Button variant="outline-dark" type="submit">
                        Salvar
                    </Button>                    
                </Form>                
            </div>
        </div>
    );
}
export default Clientes;