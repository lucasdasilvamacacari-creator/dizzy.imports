/*
  CATÁLOGO DA DIZZY IMPORTS
  Edite somente esta lista para adicionar, alterar ou remover perfumes.

  Campos de cada perfume:
    id         identificador único, sem espaços (ex.: "glacier-100")
    nome       nome exibido no card
    categoria  "importado" ou "inspirado"
    ml         volume em mililitros (somente o número)
    preco      preço com ponto nos centavos (ex.: 129.90 aparece como R$ 129,90)
    descricao  família olfativa (ex.: "Amadeirado aromático")
    imagem     caminho da foto em /assets/img/produtos (WebP, proporção 4:5).
               Deixe "" para exibir o espaço "Foto em breve".
    emEstoque  true (disponível) ou false (esgotado)

  Atenção: em perfumes inspirados, use apenas o nome próprio do produto.
  Nunca cite o perfume ou a marca de referência.

  Os seis itens abaixo são exemplos fictícios para visualizar o layout.
*/
window.DIZZY_PRODUTOS = [
  {
    id: "orvane-elixir-noir",
    nome: "Orvane Élixir Noir",
    categoria: "importado",
    ml: 100,
    preco: 489.9,
    descricao: "Oriental amadeirado",
    imagem: "assets/img/produtos/orvane-elixir-noir.webp",
    emEstoque: true
  },
  {
    id: "verani-bianco-intenso",
    nome: "Verani Bianco Intenso",
    categoria: "importado",
    ml: 90,
    preco: 429.9,
    descricao: "Floral almiscarado",
    imagem: "assets/img/produtos/verani-bianco-intenso.webp",
    emEstoque: true
  },
  {
    id: "kaelis-horizon",
    nome: "Kaelis Horizon",
    categoria: "importado",
    ml: 100,
    preco: 399.9,
    descricao: "Aromático aquático",
    imagem: "assets/img/produtos/kaelis-horizon.webp",
    emEstoque: false
  },
  {
    id: "glacier",
    nome: "Glacier",
    categoria: "inspirado",
    ml: 100,
    preco: 129.9,
    descricao: "Amadeirado aromático",
    imagem: "assets/img/produtos/glacier.webp",
    emEstoque: true
  },
  {
    id: "sahara",
    nome: "Sahara",
    categoria: "inspirado",
    ml: 100,
    preco: 129.9,
    descricao: "Oriental especiado",
    imagem: "assets/img/produtos/sahara.webp",
    emEstoque: true
  },
  {
    id: "aurora",
    nome: "Aurora",
    categoria: "inspirado",
    ml: 50,
    preco: 89.9,
    descricao: "Floral frutado",
    imagem: "assets/img/produtos/aurora.webp",
    emEstoque: true
  }
];
