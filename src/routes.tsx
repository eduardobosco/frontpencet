import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksForm from './pages/Tasks/Form';
import Produtos from './pages/Produtos';
import ProdutosForm from './pages/Produtos/Form';
import Categorias from './pages/Categorias';
import CategoriasForm from './pages/Categorias/Form';

const Routes: React.FC = () => {
  return (
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tarefas" exact component={Tasks} />
          <Route path="/cadastro" exact component={TasksForm} />
          <Route path="/cadastro/:id" exact component={TasksForm} />
          <Route path="/produto" exact component={Produtos} />
          <Route path="/produto" exact component={ProdutosForm} />
          <Route path="/produto/:id" exact component={ProdutosForm} />
          <Route path="/categoria" exact component={Categorias} />
          <Route path="/cadcategoria" exact component={CategoriasForm} />
          <Route path="/cadcategoria/:id" exact component={CategoriasForm} />
      </Switch>
  );
}

export default Routes;