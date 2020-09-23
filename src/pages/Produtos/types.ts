import {Categoria} from '../Categorias/types'
import {Funcionario} from '../Funcionarios/types'

export type Produto = {
    id: number;
  nome: string,
  descricao: string;
  qtdEstoque: number,
  valor: number,
  funcionario: Funcionario,
  categoria: Categoria,
  dataFabricacao: Date;
}
