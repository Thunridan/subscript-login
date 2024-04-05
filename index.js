let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Silva",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 14, 30),
    dataCheckIn: new Date(2024, 2, 2, 10, 15)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 17, 45),
    dataCheckIn: new Date(2024, 1, 25, 9, 30)
  },
  {
    nome: "Ana Santos",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 12, 10),
    dataCheckIn: null
  },
  {
    nome: "Paulo Lima",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 1, 28, 18, 0),
    dataCheckIn: new Date(2024, 2, 15, 8, 20)
  },
  {
    nome: "Carla Souza",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 1, 8, 21, 5),
    dataCheckIn: new Date(2024, 1, 28, 17, 10)
  },
  {
    nome: "João Pereira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 18, 11, 30),
    dataCheckIn: new Date(2024, 2, 10, 14, 0)
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 1, 3, 16, 40),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 1, 25, 20, 15),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição = loop
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do html
  document.querySelector('tbody')
  .innerHTML = output


}

atualizarLista (participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao:new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já casdastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return 
  }
  
  //encontrar participante
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participante
  atualizarLista(participantes)
}