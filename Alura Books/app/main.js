let livros = []
let endpointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
const elementoParaInserirLivros = document.getElementById('livros')
const elementoComValorTotalDeLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis') 

getBuscarLivrosDaAPI()

async function getBuscarLivrosDaAPI() {
    const res = await fetch(endpointDaAPI)
    livros = await res.json()
    let livrosComDesconto = aplicarDesconto(livros);
    exibirOsLivrosNaTela(livrosComDesconto)
}

function exibirOsLivrosNaTela (listaDeLivros) {

  elementoComValorTotalDeLivrosDisponiveis.innerHTML = ''


    elementoParaInserirLivros.innerHTML = ''
    listaDeLivros.forEach(livro => {

      let disponibilidade = livro.quantidade > 0 ? 'livro_imagens' : 'livro_imagens indisponivel'

        elementoParaInserirLivros.innerHTML += `
        
        <div class="livro">
      <img class='${disponibilidade}' src="${livro.imagem}"
        alt="${livro.alt}" />
      <h2 class="livro__titulo">
        ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>

        `
    })
}

function aplicarDesconto(livros) {
  const desconto = 0.3;
  livrosComDesconto = livros.map(livro => {
    return {...livro, preco: livro.preco - (livro.preco * desconto)}
  })

  return livrosComDesconto
}

