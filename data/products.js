/*
  CATÁLOGO DA DIZZY IMPORTS
  Edite somente esta lista para adicionar, alterar ou remover perfumes.
  Enquanto a lista estiver vazia, o site mostra "Catálogo sendo atualizado".

  MODELO — copie o bloco abaixo para dentro dos colchetes de DIZZY_PRODUTOS
  e preencha. Separe um perfume do outro com vírgula.

  {
    // Obrigatórios
    id: "nome-do-perfume-100",              // único, sem espaços nem acentos
    nome: "Nome do Perfume",
    ml: 100,                                // só o número
    preco: 299.9,                           // ponto nos centavos: aparece como R$ 299,90
    imagem: "assets/img/produtos/nome-do-perfume.webp",  // WebP 4:5; "" mostra "Foto em breve"
    emEstoque: true,                        // false = esgotado, com botão "Avise-me"

    // Opcionais (apague a linha ou deixe "" para não exibir)
    familia: "Amadeirado aromático",
    descricao: "Uma ou duas frases sensoriais sobre o perfume.",
    notas: {
      topo: ["Bergamota", "Pimenta rosa"],
      coracao: ["Lavanda", "Gerânio"],
      fundo: ["Cedro", "Âmbar"]
    },
    ocasiao: "Dia a dia e noite",
    fixacao: "Alta"
  }
*/
window.DIZZY_PRODUTOS = [];
