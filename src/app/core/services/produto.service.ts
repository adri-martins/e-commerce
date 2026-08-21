import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ProdutoLoja } from "../models/produto-loja";


type ProdutoApi = {
    title : string;
    price: number;
};

@Injectable({providedIn:'root'})
export class produtosService {
    private http = inject(HttpClient);
    private  readonly API = 'https://fakestoreapi.com/products';

    buscarProdutos() {
        return this.http.get<ProdutoApi []>(this.API);
    }
    transformarProdutos( dados: ProdutoApi[] ): ProdutoLoja[] {
        return dados.map((produto) =>({
            nome: produto.title,
            preco: produto.price,
        }));
    }
}
//restauração de código