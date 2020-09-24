import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import api from '../../../services/api';
import './styles.css';
import { Categoria } from '../../Categorias/types'
import { Funcionario } from '../../Funcionarios/types'
import { Container } from '@material-ui/core';

interface Iprod {
    nome: string;
    descricao: string;
    qtdEstoque: number;
    valor: number;
    funcionario: Funcionario;
    categoria: Categoria;
    dataFabricacao: string;
}

const Produtos: React.FC = () => {

    
    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Iprod>({
        nome: '',
        descricao: '',
        qtdEstoque: 0,
        valor: 0,
        funcionario: {
            id:0,
            nome:'',
            cpf:''
        },
        categoria: {
            id:0,
            nome:'',
            descricao:''
        },
        dataFabricacao: '',
    });

    useEffect(() => {
        if (id !== undefined) {
            findProd(id)
        }
    }, [id]);


    async function findProd(id: string) {
        const response = await api.get(`produto/${id}`)

        setModel({
            nome: response.data.nome,
            descricao: response.data.descricao,
            qtdEstoque: response.data.qtdEstoque,
            valor: response.data.valor,
            funcionario: response.data.funcionario,
            categoria: response.data.categoria,
            dataFabricacao: response.data.dataFabricacao,
        });
    }
    function back() {
        history.goBack()
    }


    return (

        <>
            <div className="task-header">
                <h1>Cadastro de Produtos</h1>
                <Button variant="outline-primary" onClick={back}>Voltar</Button>
            </div>
            <br />
            <Container>
                <Form >
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" disabled placeholder="Nome Produto" name="nome" value={model.nome} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" disabled placeholder="Descrição" name="descricao" value={model.descricao} />
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control type="number" disabled placeholder="Estoque" name="qtdEstoque" value={model.qtdEstoque}  />
                            </Col>
                            <Col>
                                <Form.Label>Valor</Form.Label>
                                <Form.Control type="number" disabled placeholder="Valor Unitario" name="valor" value={model.valor} />
                            </Col>
                            <Col>
                                <Form.Label>Data de Fabricação</Form.Label>
                                <Form.Control type="text" disabled placeholder="YYYY-MM-DDT00:00:00Z" name="dataFabricacao" defaultValue={model.dataFabricacao} />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Nome Funcionario</Form.Label>
                                <Form.Control type="text"  disabled placeholder="Funcionario" name="id_funcionario" value={model.funcionario.nome}>
                                    
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Label id="categoria-options">Nome Categoria</Form.Label>
                                <Form.Control type="select" disabled placeholder="Categoria" name="id_categoria" value={model.categoria.nome} >   
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default Produtos;