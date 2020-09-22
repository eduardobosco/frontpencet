import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { Url } from 'url';
import api from '../../services/api'
import '../Produtos/styles.css'
import { Categoria } from '../Categorias/types';


interface Iprod {
  id: number;
  nome: string,
  descricao: string;
  qtdEstoque: number,
  valor: number,
  nomeFuncionario: string,
  categoria: Categoria,
  dataFabricacao: Date;
  fotoLink: Url
  
}

const Produto: React.FC = () => {

  const [produtos, setProdutos] = useState<Iprod[]>([]);

  const history = useHistory();

   useEffect(() => {
     loadProdutos()
   }, [])

  

   async function loadProdutos() {

     const response = await api.get('/produto')
     console.log(response)
     setProdutos(response.data)
   }

   function newProduto() {
     history.push('/cadproduto')
   }

   function editProduto(id: number) {
     history.push(`/produto/${id}`)
   }

   async function deleteProduto(id: number) {
     await api.delete(`/produto/${id}`)

  }

  return (

    <div className="container">
      <br />
      <div className="product-header">
        <h1>Produtos</h1>
        <Button variant="outline-dark" onClick={newProduto}>Novo Produto</Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center" size="lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>FOTO</th>
            <th>NOME</th>
            <th>CATEGORIA</th>
            <th>ESTOQUE</th>
            <th>VALOR</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>

          {
            produtos.map(produtos => (
              <tr key={produtos.id}>
                <td>{produtos.id}</td>
                <td>{produtos.fotoLink}</td>
                <td>{produtos.nome}</td>
                <td>{produtos.categoria.nome}</td>
                <td>{produtos.qtdEstoque}</td>
                <td>{produtos.valor}</td>
                <td >
                  <Button id="action-button" size="sm" variant="outline-info" onClick={() => editProduto(produtos.id)}>Detalhes</Button>{' '}
                  <Button id="action-button" size="sm" variant="outline-primary" onClick={() => editProduto(produtos.id)}>Editar</Button>{' '}
                  <Button id="action-button" size="sm" variant="outline-danger" onClick={() => deleteProduto(produtos.id)} >Deletar</Button>
                </td>
              </tr>
            ))
          }



        </tbody>
      </Table>

    </div>

  );
}

export default Produto;