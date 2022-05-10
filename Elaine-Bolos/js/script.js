function abrirNav() {
  const form = document.getElementsByTagName("nav")[0];

  if (form.style.display == "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
}
function efetuarEnvio() {
  const nome = document.getElementsByTagName("input")[0];
  const email = document.getElementsByTagName("input")[1];
  const telefone = document.getElementsByTagName("input")[2];
  const assunto = document.getElementsByTagName("select")[0];
  const mensagem = document.getElementsByTagName("textarea")[0];

  fetch("http://localhost:5000/api/formulario/envio", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      telefone: telefone.value,
      assunto: assunto.value,
      mensagem: mensagem.value,
    }),
  })
    .then((resultado) => resultado.json())
    .then((dados) => {
      alert(dados.output);
      nome.value = "";
      email.value = "";
      telefone.value = "";
      assunto.value = "";
      mensagem.value = "";
    })
    .catch((erro) => console.error(`Erro na api -> ${erro}`));
}
