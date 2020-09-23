import { Produto } from "../Produtos/types";

export type Carrinho = {
qtdItens:number;
valor:number;
produto:Produto;
subTotal:number;
}