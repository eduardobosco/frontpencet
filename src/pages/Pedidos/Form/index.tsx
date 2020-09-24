import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api'
import './styles.css'
import moment from 'moment'
import { Cliente } from '../../Clientes/types';
import { Carrinho } from '../types';

// import { Container } from './styles';

interface Itask {
    id: number;
    dataPedido: string;
    pedidoStatus: string;
    cliente: Cliente;
    itens: Carrinho[];
    total: number;
}


const Pedidos: React.FC = () => {

    const [pedidos, setPedidos] = useState<Itask>();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        loadPedidos()
    }, [])

    async function loadPedidos() {

        const response = await api.get(`pedido/${id}`);
        console.log(response)
        setPedidos(response.data);
    }

    function formatDate(date: Date) {
        return moment(date).format("DD/MM/YYYY");
    }

    function back() {
        history.goBack()
    }

    return (

        <>
            <div className="task-header">
                <h1>Pedidos</h1>
                <Button variant="outline-primary" onClick={back}>Voltar</Button>
            </div>
            <br />
            <Container>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Numero do Pedido</Form.Label>
                                <Form.Control type="text" disabled name="id" value={pedidos?.id} />
                            </Col>

                            <Col>
                                <Form.Label>Data do Pedido</Form.Label>
                                <Form.Control type="text" disabled name="dataPedido" value={pedidos?.dataPedido} />
                            </Col>
                            <Col>
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" disabled name="pedidoStatus" value={pedidos?.pedidoStatus} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control type="text" disabled name="cliente" value={pedidos?.cliente.nome} />
                            </Col>

                            <Col>
                                <Form.Label>Valor Total</Form.Label>
                                <Form.Control type="text" disabled name="total" value={pedidos?.total.toFixed(2).replace(".",",")}/>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
            <div>
                <br />
                <h1>Produtos</h1>
                <br />
            </div>

            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Valor Unitario</th>
                        <th>Quantidade</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                {
                        pedidos?.itens.map(pedido => (
                            <tr key={pedido.produto.id}>
                                <td>{pedido.produto.nome}</td>
                                <td>{pedido.produto.descricao}</td>
                                <td>R$ {pedido.produto.valor.toFixed(2).replace(".",",")}</td>
                                <td>{pedido.qtdItens}</td>
                                <td>R$ {pedido.subTotal.toFixed(2).replace(".",",")}</td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Pedidos;