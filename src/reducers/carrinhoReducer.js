const initialState = {
  pedidoItems: [],
  pedidoitensRemove: [],
  cont: 0,
  valorTotal: 0,
  removeItem: true,
  RChecked:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      var index;
      if (state.pedidoItems.length === 0) {
        state.pedidoItems.push({
          produto: action.payload,
          quantidade: 1,
          totalproduto: action.payload.ProdutoPreco
        });
        state.cont++;
        state.valorTotal += parseFloat(action.payload.ProdutoPreco);
      } else {
        index = state.pedidoItems.findIndex(item => {
          // acha o indice para alterar a quantidade
          return item.produto.ProdutoCodigo === action.payload.ProdutoCodigo;
        });

        if (index !== -1) {
          state.pedidoItems[index].quantidade =
            state.pedidoItems[index].quantidade + 1;

            state.pedidoItems[index].totalproduto = // add preço
          parseFloat(state.pedidoItems[index].totalproduto) +
          parseFloat(action.payload.ProdutoPreco);
            
          state.cont++;
          state.valorTotal += parseFloat(action.payload.ProdutoPreco);
        } else {
          state.pedidoItems.push({
            produto: action.payload,
            quantidade: 1,
            totalproduto: action.payload.ProdutoPreco
          });

          state.cont++; // add quantidade de itens
          state.valorTotal += parseFloat(action.payload.ProdutoPreco);
        }
      }
      return { ...state };
    case "REMOVE_FROM_CART":
      state.removeItem = !state.removeItem;

      return { ...state };

    case "ADD_DELETE_INTERN_CART": // delete seleciona qual item deve ser removido
      state.pedidoitensRemove.push(action.payload);
      //state.totalproduto -= action.payload.totalproduto
      //state.cont-
      console.log(state.pedidoitensRemove);
      return { ...state };

    case "REMOVE_DELETE_INTERN_CART": // desmarca qual elemento deve ser removido
      var index = state.pedidoitensRemove.indexOf(action.payload);
      if (index !== -1) {
        state.pedidoitensRemove.splice(index, 1);
      }
      console.log(state.pedidoitensRemove);
      return { ...state };

    case "ATUALIZA_TOTAL":
      state.valorTotal = 0;
      state.cont = 0;
      state.pedidoItems.forEach(element => {
        state.valorTotal += parseFloat(element.totalproduto);
        state.cont += parseFloat(element.quantidade);
      });
      return { ...state };

    case "ALTERA_QUANTIDADE": // Altera Quantidade de produtos
      var index = state.pedidoItems.findIndex(item => {
        // acha o indice para alterar a quantidade
        return (
          item.produto.ProdutoCodigo ===
          action.payload.produto.produto.ProdutoCodigo
        );
      });

      if (index !== -1) {
        if (action.payload.quantidade !== "") {
          if(action.payload.quantidade.includes('.',3)){
            console.log("contem . na terceira")
          }
          const quant = parseFloat(
            action.payload.quantidade.replace(/\s/g, "").replace(/-/g, "")
          )
          state.pedidoItems[index].quantidade = quant;
          state.pedidoItems[index].totalproduto =
            state.pedidoItems[index].quantidade *
            state.pedidoItems[index].produto.ProdutoPreco;

          // state.valorTotal += state.pedidoItems[index].totalproduto
        } else {
          state.pedidoItems[index].quantidade = 1;
          state.pedidoItems[index].totalproduto =
            state.pedidoItems[index].quantidade *
            state.pedidoItems[index].produto.ProdutoPreco;

        }
      }
      return { ...state };

    case "DELETE_INTERN_CART":
      var soma = 0;
      state.pedidoitensRemove.forEach(element => {
        console.log(parseFloat(element.totalproduto));
        soma += parseFloat(element.totalproduto);
        state.cont -= element.quantidade;
      });
      console.log(soma);

      state.valorTotal -= soma;
      state.pedidoItems = state.pedidoItems.filter(item => {
        return state.pedidoitensRemove.indexOf(item) === -1;
      });
      state.removeItem = !state.removeItem;
      state.pedidoitensRemove = [];

      soma = 0;

      // var index = state.pedidoitensRemove.indexOf(action.payload);
      // if (index !== -1) {
      //   state.pedidoitensRemove.splice(index, 1);
      // }
      // console.log(state.pedidoitensRemove)
      return { ...state };

    case "ADD_INTERN_CART":
      var index = state.pedidoItems.findIndex(item => {
        // acha o indece para alterar a quantidade
        console.log("id:" + item.produto.ProdutoCodigo);
        return (
          item.produto.ProdutoCodigo === action.payload.produto.ProdutoCodigo
        );
      });

      if (index !== -1) {
        state.pedidoItems[index].quantidade++; //+= parseFloat(1).toFixed(2);
        state.pedidoItems[index].totalproduto = // add preço
          parseFloat(state.pedidoItems[index].totalproduto) +
          parseFloat(action.payload.produto.ProdutoPreco);
        console.log(state.pedidoItems[index]);

        state.cont++;
        state.valorTotal += parseFloat(action.payload.produto.ProdutoPreco);
      }
      console.log("add item");
      console.log(index);
      return { ...state };
    case "REMOVE_INTERN_CART":
      var index = state.pedidoItems.findIndex(item => {
        // acha o indece para alterar a quantidade
        console.log("id:" + item.produto.ProdutoCodigo);
        return (
          item.produto.ProdutoCodigo === action.payload.produto.ProdutoCodigo
        );
      });

      if (index !== -1) {
        if (state.pedidoItems[index].quantidade > 1.0) {
          state.pedidoItems[index].quantidade =
            state.pedidoItems[index].quantidade - 1;

          state.pedidoItems[index].totalproduto = //abate o preço
            parseFloat(state.pedidoItems[index].totalproduto) -
            parseFloat(action.payload.produto.ProdutoPreco);

          state.cont--;
          state.valorTotal -= parseFloat(action.payload.produto.ProdutoPreco);

          console.log(state.pedidoItems[index]);
        }
      }
      console.log("add item");
      console.log(index);
      return { ...state };
    case "LIMPA_CARRINHO":
      return {
        ...state,
        pedidoItems: [],
        pedidoitensRemove: [],
        cont: 0,
        valorTotal: 0,
        removeItem: true
      };
    case "DISMARK_ITENS":
      return {...state, RChecked: false};
    default:
      return state;
  }
};
