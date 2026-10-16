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

1. Salve a foto em `assets/img/produtos/`, em **WebP**, na proporção **3:4** (ex.: 768 × 1024 px, o mesmo formato das artes da Dizzy) e com nome sem espaços nem acentos (ex.: `davidoff-cool-water.webp`). Para converter, use o [Squoosh](https://squoosh.app).
2. Abra `data/products.js` e cole o bloco abaixo **dentro dos colchetes** de `window.DIZZY_PRODUTOS = [ ... ];`:

```js
{
  // Obrigatórios
  id: "davidoff-cool-water-75",    // único, sem espaços nem acentos
  nome: "Cool Water",
  ml: 75,
  preco: 200,                      // à vista; ponto nos centavos (199.9 = R$ 199,90)
  imagem: "assets/img/produtos/davidoff-cool-water.webp",  // ou "" para "Foto em breve"

  // Opcionais
  marca: "Davidoff",
  caracteristicas: ["Fresco", "Aquático", "Aromático"],
  ocasiao: "Dia",                  // "Dia", "Dia e noite" ou "Noite"
  familia: "Aromático aquático",
  descricao: "Uma ou duas frases sensoriais sobre o perfume.",
  notas: {
    topo: ["Menta", "Lavanda"],
    coracao: ["Gerânio"],
    fundo: ["Cedro", "Almíscar"]
  },
  fixacao: "Moderada"
},
```

3. Salve, faça o commit e envie para o GitHub. A Vercel publica sozinha em cerca de 1 minuto.

O que aparece onde:
- **Card (catálogo):** 3 por linha no celular (foto, nome e ícone de dia/noite) e 3 ou 4 por linha no computador (com marca e características do cheiro). O card inteiro é um botão.
- **Detalhe** (ao tocar no card): foto, família olfativa, descrição, mL, preço à vista, parcelamento, notas de topo, coração e fundo, fixação e o botão "Pedir no WhatsApp".
- Campos opcionais vazios ou apagados simplesmente não aparecem.

Parcelamento: o texto "ou em até 10x no cartão (com taxa e juros da maquininha)" vale para todos os perfumes e fica no topo de `data/products.js` (`window.DIZZY_PARCELAMENTO`). Altere ali uma vez só.

Link direto para um perfume: `endereço-do-site/#id-do-perfume` (ex.: `/#davidoff-cool-water-75`) abre o catálogo já com o detalhe aberto, útil para stories e conversas.

Dicas:
- Separe um perfume do outro com vírgula.
- O catálogo é um mostruário, sem controle de estoque.
- A ordem é automática, do dia para a noite: primeiro "Dia", depois "Dia e noite", depois "Noite" (e por último os sem ocasião). Dentro de cada grupo, vale a ordem do arquivo.
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
