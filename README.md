# Dizzy Imports — catálogo de perfumes

Site estático (HTML, CSS e JavaScript puro) da Dizzy Imports, revenda de perfumes e cosméticos em Bauru/SP. Slogan: **"Fragrâncias importadas de qualidade"**. O cliente vê os perfumes e faz o pedido pelo WhatsApp.

```
index.html            página principal
404.html              página de "não encontrada"
css/styles.css        estilos (cores, fontes e espaçamentos ficam no topo, em :root)
js/main.js            monta o catálogo, o detalhe de cada perfume e os links de WhatsApp
data/products.js      LISTA DE PERFUMES (o único arquivo que você precisa editar no dia a dia)
assets/img/           logo, favicon e imagem de compartilhamento
assets/img/produtos/  fotos dos perfumes
vercel.json           configuração da Vercel
```

## Adicionar um perfume

1. Salve a foto em `assets/img/produtos/`, de preferência em **WebP**, na proporção **4:5** (ex.: 800 × 1000 px) e com nome sem espaços nem acentos (ex.: `nome-do-perfume.webp`). Para converter, use o [Squoosh](https://squoosh.app).
2. Abra `data/products.js` e cole o bloco abaixo **dentro dos colchetes** de `window.DIZZY_PRODUTOS = [ ... ];`:

```js
{
  // Obrigatórios
  id: "nome-do-perfume-100",       // único, sem espaços nem acentos
  nome: "Nome do Perfume",
  ml: 100,
  preco: 299.9,                    // ponto nos centavos; aparece como R$ 299,90
  imagem: "assets/img/produtos/nome-do-perfume.webp",  // ou "" para "Foto em breve"
  emEstoque: true,                 // false = esgotado, com botão "Avise-me"

  // Opcionais
  familia: "Amadeirado aromático",
  descricao: "Uma ou duas frases sensoriais sobre o perfume.",
  notas: {
    topo: ["Bergamota", "Pimenta rosa"],
    coracao: ["Lavanda", "Gerânio"],
    fundo: ["Cedro", "Âmbar"]
  },
  ocasiao: "Dia a dia e noite",
  fixacao: "Alta"
},
```

3. Salve, faça o commit e envie para o GitHub. A Vercel publica sozinha em cerca de 1 minuto.

O que aparece onde:
- **Card:** foto, nome, família olfativa, descrição curta, mL, preço, selo "Em estoque"/"Esgotado" e botão "Pedir no WhatsApp".
- **Detalhe** (ao tocar no card ou em "Ver detalhes"): tudo do card, mais as notas de topo, coração e fundo, a ocasião e a fixação.
- Campos opcionais vazios ou apagados simplesmente não aparecem.

Dicas:
- Separe um perfume do outro com vírgula.
- Perfumes esgotados aparecem automaticamente no fim da lista.
- Com a lista vazia (`window.DIZZY_PRODUTOS = [];`), o site mostra "Catálogo sendo atualizado" com o botão de WhatsApp.
- Para remover um perfume, apague o bloco inteiro (de `{` até `},`).
- Em perfumes inspirados em outros, use somente o nome próprio do produto e a família olfativa. Nunca cite o perfume ou a marca de referência.

## Logo

Coloque o arquivo em `assets/img/logo.png` (fundo transparente, de preferência). Ele aparece no cabeçalho e no topo da página, em qualquer proporção. Enquanto o arquivo não existir, o site mostra o nome "DIZZY IMPORTS" em texto, com o "D" dourado.

## Rodar no computador

Com o Node.js instalado, na pasta do projeto:

```bash
npx serve .
```

Abra o endereço indicado (normalmente http://localhost:3000). Também funciona abrindo o `index.html` direto no navegador.

## Publicar na Vercel

1. Envie este repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), entre com a conta do GitHub e clique em **Add New… → Project**.
3. Escolha o repositório `dizzy.imports` e clique em **Import**.
4. Em **Framework Preset**, deixe **Other**. Não é preciso comando de build nem pasta de saída.
5. Clique em **Deploy**.

A cada commit na branch principal, a Vercel publica a nova versão automaticamente.

### Depois do primeiro deploy

Em `index.html`, troque `https://dizzy-imports.vercel.app` pelo endereço real do site nas tags `og:url` e `og:image`. Assim a prévia do link (WhatsApp, Instagram) mostra a imagem correta. Se o domínio mudar, atualize essas duas linhas.

## Alterar o número do WhatsApp

O número aparece em `js/main.js` (constante `WHATSAPP_NUMERO`) e nos links `wa.me/5514988083978` do `index.html`. Use busca e substituição nos dois arquivos.
