const axios = require("axios");

const http = axios.create({
  baseURL: "https://suporte2.hifuzion.com.br",
});

const login = async () => {
  const username = process.env.BOT_USERNAME;
  const password = process.env.BOT_PASSWORD;

  console.log({ username, password });

  try {
    const { data } = await http.post("/auth/login/", { username, password });
    const { token } = data;
    delete http.defaults.headers.common["Authorization"];
    http.defaults.headers.common["Authorization"] = `Token ${token}`;
  } catch (e) {
    throw new Error(`Falha ao efetuar o login com o usuário ${username}`);
  }
};

const listar = async () => {
  try {
    const { data } = await http.get("/chamados/tickets/");

    const message = data.map(
      (m) =>
        `Chamado *${m.id}*, _${m.titulo}_ esta com status *${m.status_display}*`
    );
    return message;
  } catch (e) {
    return [e.toString()];
  }
};

module.exports = { login, listar };
