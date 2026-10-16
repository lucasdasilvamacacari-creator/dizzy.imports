/*
  CATÁLOGO DA DIZZY IMPORTS
  Edite somente este arquivo para adicionar, alterar ou remover perfumes.
  Se a lista ficar vazia, o site mostra "Catálogo sendo atualizado".

  MODELO — copie o bloco abaixo para dentro dos colchetes de DIZZY_PRODUTOS
  e preencha. Separe um perfume do outro com vírgula.

  {
    // Obrigatórios
    id: "marca-nome-100",                   // único, sem espaços nem acentos (vira o link: site/#marca-nome-100)
    nome: "Nome do Perfume",
    ml: 100,                                // só o número
    preco: 200,                             // à vista; ponto nos centavos (199.9 = R$ 199,90)
    imagem: "assets/img/produtos/marca-nome.webp",  // WebP 3:4; "" mostra "Foto em breve"
    emEstoque: true,                        // false = esgotado, com botão "Avise-me"

    // Opcionais (apague a linha ou deixe "" para não exibir)
    marca: "Marca",
    caracteristicas: ["Fresco", "Aquático"],   // aparecem no card, abaixo da foto
    ocasiao: "Dia",                            // "Dia", "Noite" ou "Dia e noite" (mostra sol/lua)
    familia: "Aromático aquático",
    descricao: "Uma ou duas frases sensoriais sobre o perfume.",
    notas: {
      topo: ["Bergamota", "Menta"],
      coracao: ["Lavanda"],
      fundo: ["Cedro", "Almíscar"]
    },
    fixacao: "Moderada"
  }
*/

// Texto de parcelamento exibido abaixo do preço à vista, em todos os perfumes.
window.DIZZY_PARCELAMENTO = "ou em até 10x no cartão (com taxa e juros da maquininha)";

window.DIZZY_PRODUTOS = [
  {
    id: "davidoff-cool-water-75",
    marca: "Davidoff",
    nome: "Cool Water",
    ml: 75,
    preco: 200,
    imagem: "assets/img/produtos/davidoff-cool-water.webp",
    emEstoque: true,
    caracteristicas: ["Fresco", "Aquático", "Aromático"],
    ocasiao: "Dia",
    familia: "Aromático aquático",
    descricao: "Frescor marinho com menta e lavanda, sobre um fundo suave de madeiras e almíscar. Leve e limpo para o calor.",
    notas: {
      topo: ["Menta", "Lavanda", "Notas marinhas", "Coentro"],
      coracao: ["Gerânio", "Jasmim", "Sândalo"],
      fundo: ["Almíscar", "Cedro", "Âmbar", "Musgo de carvalho"]
    },
    fixacao: "Moderada"
  },
  {
    id: "jacques-bogart-silver-scent-100",
    marca: "Jacques Bogart",
    nome: "Silver Scent",
    ml: 100,
    preco: 200,
    imagem: "assets/img/produtos/jacques-bogart-silver-scent.webp",
    emEstoque: true,
    caracteristicas: ["Intenso", "Adocicado", "Amadeirado"],
    ocasiao: "Noite",
    familia: "Oriental amadeirado",
    descricao: "Flor de laranjeira e cítricos sobre um fundo quente de fava tonka e baunilha. Marcante e envolvente.",
    notas: {
      topo: ["Laranja amarga", "Flor de laranjeira"],
      coracao: ["Íris", "Cardamomo"],
      fundo: ["Fava tonka", "Baunilha", "Benjoim"]
    },
    fixacao: "Alta"
  },
  {
    id: "armaf-club-de-nuit-intense-man-105",
    marca: "Armaf",
    nome: "Club de Nuit Intense Man",
    ml: 105,
    preco: 250,
    imagem: "assets/img/produtos/armaf-club-de-nuit-intense-man.webp",
    emEstoque: true,
    caracteristicas: ["Poderoso", "Frutado", "Defumado"],
    ocasiao: "Noite",
    familia: "Amadeirado frutado",
    descricao: "Abacaxi e cítricos vibrantes abrem caminho para bétula defumada e um fundo ambarado. Presença forte e duradoura.",
    notas: {
      topo: ["Limão", "Abacaxi", "Groselha negra", "Bergamota", "Maçã"],
      coracao: ["Bétula", "Jasmim", "Rosa"],
      fundo: ["Almíscar", "Âmbar cinzento", "Patchouli", "Baunilha"]
    },
    fixacao: "Alta"
  },
  {
    id: "galaxy-lucky-millionaire",
    marca: "Galaxy Plus Concept",
    nome: "Lucky Millionaire",
    ml: null,                       // confirmar o volume do spray
    preco: 60,
    imagem: "assets/img/produtos/galaxy-lucky-millionaire.webp",
    emEstoque: true,
    caracteristicas: ["Marcante", "Adocicado", "Especiado"],
    ocasiao: "Dia e noite",
    familia: "Amadeirado especiado",
    descricao: "Perfume spray de toque adocicado e especiado sobre um fundo amadeirado. Prático para levar e usar no dia a dia."
  }
];
