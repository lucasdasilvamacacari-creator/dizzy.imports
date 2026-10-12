# Dizzy Imports — catálogo de perfumes

Site estático (HTML, CSS e JavaScript puro) da Dizzy Imports, revenda de perfumes e cosméticos em Bauru/SP. O cliente vê os perfumes e faz o pedido pelo WhatsApp.

```
index.html            página principal
404.html              página de "não encontrada"
css/styles.css        estilos (cores, fontes e espaçamentos ficam no topo, em :root)
js/main.js            monta o catálogo, os filtros e os links de WhatsApp
data/products.js      LISTA DE PERFUMES (o único arquivo que você precisa editar no dia a dia)
assets/img/           logo, favicon e imagem de compartilhamento
assets/img/produtos/  fotos dos perfumes
vercel.json           configuração da Vercel
```

## Adicionar um perfume

1. Salve a foto em `assets/img/produtos/`, de preferência em **WebP**, na proporção **4:5** (ex.: 800 × 1000 px) e com nome sem espaços nem acentos (ex.: `glacier.webp`). Para converter, use o [Squoosh](https://squoosh.app).
2. Abra `data/products.js` e copie um bloco existente, colando-o dentro da lista:

```js
{
  id: "glacier",
  nome: "Glacier",
  categoria: "inspirado",          // "importado" ou "inspirado"
  ml: 100,
  preco: 129.9,                    // ponto nos centavos; aparece como R$ 129,90
  descricao: "Amadeirado aromático",
  imagem: "assets/img/produtos/glacier.webp",  // ou "" para "Foto em breve"
  emEstoque: true                  // false = esgotado, com botão "Avise-me"
},
```

3. Salve, faça o commit e envie para o GitHub. A Vercel publica sozinha em cerca de 1 minuto.

Dicas:
- Cada bloco termina com vírgula, exceto o último da lista.
- Perfumes esgotados aparecem automaticamente no fim da lista.
- **Inspirados:** use somente o nome próprio do produto e a família olfativa. Nunca cite o perfume ou a marca de referência.
- Para remover um perfume, apague o bloco inteiro (de `{` até `},`).
- Para abrir o catálogo já filtrado (ex.: em um story), use `?categoria=inspirados` ou `?categoria=importados` no fim do endereço.

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
