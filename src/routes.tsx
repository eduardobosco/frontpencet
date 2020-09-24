import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Funcionarios from './pages/Funcionarios';
import FuncionariosForm from './pages/Funcionarios/Form';
import Produtos from './pages/Produtos';
import ProdutosForm from './pages/Produtos/Form';
import ProdutosFormDetail from './pages/Produtos/FormDetail';
import Categorias from './pages/Categorias';
import CategoriasForm from './pages/Categorias/Form';
import Clientes from './pages/Clientes';
import ClientesForm from './pages/Clientes/Form';
import ClientesFormDetail from './pages/Clientes/FormDetail';
import Pedidos from './pages/Pedidos';
import PedidosForm from './pages/Pedidos/Form';

const Routes: React.FC = () => {
  return (
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/funcionario" exact component={Funcionarios} />
          <Route path="/cadfuncionario" exact component={FuncionariosForm} />
          <Route path="/funcionario/:id" exact component={FuncionariosForm} />
          <Route path="/produto" exact component={Produtos} />
          <Route path="/cadproduto" exact component={ProdutosForm} />
          <Route path="/produto/:id" exact component={ProdutosForm} />
          <Route path="/produto_detail/:id" exact component={ProdutosFormDetail} />
          <Route path="/categoria" exact component={Categorias} />
          <Route path="/cadcategoria" exact component={CategoriasForm} />
          <Route path="/categoria/:id" exact component={CategoriasForm} />
          <Route path="/cliente" exact component={Clientes} />
          <Route path="/cadcliente" exact component={ClientesForm} />
          <Route path="/cliente/:id" exact component={ClientesForm} />
          <Route path="/cliente_detail/:id" exact component={ClientesFormDetail} />
          <Route path="/pedido" exact component={Pedidos} />
          <Route path="/cadpedido" exact component={PedidosForm} />
          <Route path="/pedido/:id" exact component={PedidosForm} />
      </Switch>
  );
}

export default Routes;