import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment'
import './styles.css';

interface Itask {
    nome: string;
    descricao: string;
    qtdEstoque: number;
    valor: number;
    nomeFuncionario: string;
    nomeCategoria: string;
    dataFabricacao: string;
    fotoLink: string
}

const Produtos: React.FC = () => {

    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Itask>({
        nome:'',
        descricao:'',
        qtdEstoque:0,
        valor:0,
        nomeFuncionario:'',
        nomeCategoria:'',
        dataFabricacao:'',
        fotoLink:''

    });

    useEffect(() => {
        if (id !== undefined) {
            findProd(id)
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
            const response = await api.put(`/produto/${id}`, model)
        } else {
            const response = await api.post('/produto', model)
        }
        back()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    async function findProd(id: string) {
        const response = await api.get(`produto/${id}`)
        setModel({
            nome: response.data.nome,
            descricao: response.data.descricao,
            qtdEstoque: response.data.qtdEstoque,
            valor: response.data.valor,
            nomeFuncionario: response.data.nomeFuncionario,
            nomeCategoria: response.data.nomeCategoria,
            dataFabricacao: response.data.dataFabricacao,
            fotoLink:response.data.fotoLink,

        });
    }

    function back() {
        history.goBack()
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Cadastro de Produtos</h1>
                <Button variant="outline-dark" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome Produto" name="nome" value={model.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control type="text" placeholder="Descrição" name="descricao" value={model.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Estoque</Form.Label>
                        <Form.Control type="text" placeholder="Quantidade em Estoque" name="Estoque" value={model.qtdEstoque} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type="text" placeholder="Valor Unitario" name="valor" value={model.valor} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nome Funcionario</Form.Label>
                        <Form.Control as="select" placeholder="Funcionario" name="funcionario" value={model.nomeFuncionario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nome Categoria</Form.Label>
                        <Form.Control as="select" placeholder="Categoria" name="Categoria" value={model.nomeCategoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Fabricação</Form.Label>
                        <Form.Control type="text" placeholder="DD/MM/YYYY" name="fabricação" value={model.dataFabricacao} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="text" placeholder="Link da imagem" name="imagem" value={model.fotoLink} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
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