export type Endereco = {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    estado: string;
    numero: number;
    rua: string;
}

export type Cliente ={
    id: number;
    nome: string;
    usuario: string;
    cpf: string;
    dataNascimento: Date;
    email: string;
    endereco: Endereco;
}
