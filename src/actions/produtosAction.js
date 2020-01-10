import {
  CARREGA_PRODUTOS,
  CARREGA_PRODUTOS_FAIL,
  CARREGA_PRODUTOS_SUCESS,
  ADD_PRODUTOS
} from "../constantes";

import api from "../services/api";

const carregaProdutosApi = () => dispatch => {
    dispatch(carregaProdutos());
  api
    .post(
      "/oauth/access_token", // pega o tokem do usuario admin para pedidos
      "client_id=0427fb886275490194b06dd5176e1d61&granttype=password&scope=FullControl&username=admin&password=admin123",
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(r => {
      // recupera token do admin
      dispatch(carregaToken(r.state.r.data.access_token));
      // recupera produtos
      const response = api.get("/rest/listadeprodutos", {
        headers: { Authorization: token }
      });
      const data = response.data;
      // dispacha para reducer
      dispatch(carregaProdutosSuccess(data));

      console.log("token " + this.state.resToken);
      console.log(data);
    })
    .catch(e => dispatch(carregaProdutosErr(e.message)));
};

const carregaToken = token => ({
  type: CARREGA_TOKEN,
  token: token
});

const carregaProdutos = () => ({
  type: CARREGA_PRODUTOS,
  data: data
});
const carregaProdutosSuccess = data => ({
  type: CARREGA_PRODUTOS_SUCESS,
  data: data
});

const carregaProdutosErr = error => ({
  type: CARREGA_PRODUTOS_FAIL,
  error: error
});

export default carregaProdutosApi;
