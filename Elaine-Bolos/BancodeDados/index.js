// Impostação dos modulos
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// permitir que o servidor trabalhe com o formato JSON
app.use(express.json());

// cors permite aceitar acesso por protocolos difirentes tais como "http,https,file, smb e etc."
app.use(cors());

// Url de conexão com o banco de dados mongoDB
const urldb =
  "mongodb+srv://hiago:Hiago259@projetoback.ltkvx.mongodb.net/BancoDeDados?retryWrites=true&w=majority";

mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true });

const tabela = mongoose.Schema({
  nome: String,
  email: String,
  telefone: Number,
  assunto: String,
  mensagem: String,
});

const Formulario = mongoose.model("tbformulario", tabela);

// Rota padrão para a api
const rota = "/api/formulario";

app.get(`${rota}/listar`, (req, res) => {
  Formulario.find((erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao carregar formulario -> ${erro}` });
    res.status(200).send({ output: dados });
  });
});

app.post(`${rota}/envio`, (req, res) => {
  const form = new Formulario(req.body);

  // Comando SAVE para gravar os dados no banco de dados
  form
    .save()
    .then((dados) => {
      res.status(201).send({ output: `Formulario cadastrado`, info: dados });
    })
    .catch((erro) =>
      res
        .status(500)
        .send({ output: `Erro ao tentar cadastar formulario -> ${erro}` })
    );
});

app.put(`${rota}/atualizar/:id`, (req, res) => {
  Formulario.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro)
        return res.status(404).send({ output: `Erro ao atualizar: ${erro}` });
      res.status(200).send({ output: `Atualizado`, info: dados });
    }
  );
});

app.delete(`${rota}/apagar/:id`, (req, res) => {
  Formulario.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro)
      return res.status(500).send({ output: `Erro ao Apagar: -> ${erro}` });
    res.status(204).send({ output: "Apagou" });
  });
});
// Definir uma porta de comunicação com o servidor de aplicação
app.listen(5000, () => console.log("on line em http://localhost:5000"));
// fim do projeto
