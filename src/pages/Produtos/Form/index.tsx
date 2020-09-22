import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import moment from 'moment'
import './styles.css';
import Funcionarios from '../../Funcionarios';
import {Categoria} from '../../Categorias/types'
import {Funcionario} from '../../Funcionarios/types'

interface Iprod {
    nome: string;
    descricao: string;
    qtdEstoque: number;
    valor: number;
    funcionario: string;
    categoria: string;
    dataFabricacao: string;
    fotoLink: string
}

const Produtos: React.FC = () => {

    //type categoria
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
  loadCategoria()
}, [])

async function loadCategoria() {

  const response = await api.get('/categoria')
  console.log(response)
  setCategorias(response.data)
}

//type funcionario

const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
  loadFuncionario()
}, [])

async function loadFuncionario() {

  const response = await api.get('/funcionario')
  console.log(response)
  setFuncionarios(response.data)
}

    // form produto
    const history = useHistory();
    const { id } = useParams();
    const [model, setModel] = useState<Iprod>({
        nome:'',
        descricao:'',
        qtdEstoque:0,
        valor:0,
        funcionario:'',
        categoria:'',
        dataFabricacao:'',
        fotoLink:'',

    });

    useEffect(() => {
        if (id !== undefined) {
            findProd(id)
        }
    }, [id]);

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target)
        console.log(e.target.value)
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
            funcionario: response.data.funcionario,
            categoria: response.data.categoria,
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
                        <Form.Control type="text" placeholder="Estoque" name="estoque" defaultValue={model.qtdEstoque} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type="text" placeholder="Valor Unitario" name="valor" defaultValue={model.valor} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nome Funcionario</Form.Label>
                        <Form.Control as="select" placeholder="Funcionario" name="funcionario" value={model.funcionario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required>
                        {funcionarios.map((funcionario, index)=> (<option key={funcionario.nome} value={funcionario.id}>{funcionario.nome}</option>))}
                        </Form.Control>
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label id="categoria-options">Nome Categoria</Form.Label>
                        <Form.Control as="select" placeholder="Categoria" name="categoria" value={model.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required>
                        {categorias.map((categoria, index)=> (<option key={categoria.nome} value={categoria.id}>{categoria.nome}</option>))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Fabricação</Form.Label>
                        <Form.Control type="date" placeholder="DD/MM/YYYY" name="fabricação" defaultValue={model.dataFabricacao} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="text" placeholder="Link da imagem" name="imagem" value={model.fotoLink} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} required />
                    </Form.Group> */}

                    <Button variant="outline-dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>


        </div>

    );
}

export default Produtos;