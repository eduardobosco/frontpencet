import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import moment from 'moment'
import {Cliente} from '../Clientes/types'
import {Produto} from '../Produtos/types'
import { Carrinho } from './types';

// import { Container } from './styles';

interface Itask {
    id: number;
    dataPedido: Date;
    pedidoStatus: string;
    cliente: Cliente;
    itens: Carrinho[];
    total: number;
}


const Pedidos: React.FC = () => {

    const [pedidos, setPedidos] = useState<Itask[]>([]);

    const history = useHistory();

    useEffect(() => {
        loadPedido()
    }, [])

    async function loadPedido() {

        const response = await api.get('/pedido');
        setPedidos(response.data);
    }

    function newPedido() {
        history.push('/cadpedido');
        
    }

    function editPedido(id: number) {
        history.push(`/pedido/${id}`);
    }
    
    function formatDate(date: Date){ 
        return moment(date).format("DD/MM/YYYY");
    }

    return (

        <>
            <div className="task-header">
                <h1>Pedidos</h1>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Numero do Pedido</th>
                        <th>Data do Pedido</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Valor Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td>{pedido.id}</td>
                                <td>{formatDate(pedido.dataPedido)}</td>
                                <td>{pedido.pedidoStatus}</td>
                                <td>{pedido.cliente.nome}</td>
                                <td>R$ {pedido.total.toFixed(2).replace(".",",")}</td>
                                <td>
                                    <Button id="action-button" size="sm" variant="outline-info" onClick={() => editPedido(pedido.id)}>Detalhes</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Pedidos;