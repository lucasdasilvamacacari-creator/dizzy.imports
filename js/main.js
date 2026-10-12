/* Dizzy Imports — catálogo
   Lê os produtos de data/products.js e monta os cards, o detalhe de cada perfume e os links de WhatsApp. */
(function () {
  "use strict";

  var WHATSAPP_NUMERO = "5514988083978";
  var SVG_NS = "http://www.w3.org/2000/svg";

  var formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function linkWhatsApp(mensagem) {
    return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensagem);
  }

  function texto(valor) {
    return typeof valor === "string" ? valor.trim() : "";
  }

  // Aceita lista (["Bergamota", "Pimenta rosa"]) ou texto separado por vírgulas.
  function listaDeNotas(valor) {
    var itens = Array.isArray(valor) ? valor : typeof valor === "string" ? valor.split(",") : [];
    return itens.map(texto).filter(Boolean);
  }

  function normalizarProdutos(lista) {
    if (!Array.isArray(lista)) return [];
    return lista
      .filter(function (p) {
        return p && texto(p.nome);
      })
      .map(function (p, indice) {
        var notas = p.notas || {};
        return {
          id: String(p.id || indice),
          nome: texto(p.nome),
          ml: Number(p.ml) || null,
          preco: typeof p.preco === "number" ? p.preco : Number(p.preco),
          imagem: texto(p.imagem),
          emEstoque: p.emEstoque !== false,
          familia: texto(p.familia),
          descricao: texto(p.descricao),
          notas: {
            topo: listaDeNotas(notas.topo),
            coracao: listaDeNotas(notas.coracao),
            fundo: listaDeNotas(notas.fundo)
          },
          ocasiao: texto(p.ocasiao),
          fixacao: texto(p.fixacao),
          ordem: indice
        };
      })
      .sort(function (a, b) {
        // Disponíveis primeiro; dentro de cada grupo, mantém a ordem do arquivo.
        if (a.emEstoque !== b.emEstoque) return a.emEstoque ? -1 : 1;
        return a.ordem - b.ordem;
      });
  }

  function nomeComVolume(p) {
    return p.ml ? p.nome + " (" + p.ml + "ml)" : p.nome;
  }

  function precoFormatado(p) {
    return isFinite(p.preco) && p.preco > 0 ? formatoPreco.format(p.preco) : "Consulte";
  }

  // Preenche um texto ou remove o elemento quando o campo está vazio.
  function preencher(el, valor) {
    if (valor) el.textContent = valor;
    else el.remove();
  }

  function criarPlaceholder(rotulo) {
    var wrap = document.createElement("div");
    wrap.className = "media-placeholder";
    var marca = document.createElement("span");
    marca.className = "media-placeholder__mark";
    marca.setAttribute("aria-hidden", "true");
    marca.textContent = "D";
    var legenda = document.createElement("span");
    legenda.className = "media-placeholder__text";
    legenda.textContent = rotulo;
    wrap.appendChild(marca);
    wrap.appendChild(legenda);
    return wrap;
  }

  function preencherMidia(container, p, carregamento) {
    if (!p.imagem) {
      container.appendChild(criarPlaceholder("Foto em breve"));
      return;
    }
    var img = document.createElement("img");
    img.src = p.imagem;
    img.alt = p.nome;
    img.width = 800;
    img.height = 1000;
    img.decoding = "async";
    img.loading = carregamento;
    img.addEventListener("error", function () {
      img.remove();
      container.appendChild(criarPlaceholder("Imagem indisponível"));
    }, { once: true });
    container.appendChild(img);
  }

  function preencherSelo(badge, p) {
    badge.textContent = p.emEstoque ? "Em estoque" : "Esgotado";
    badge.classList.toggle("badge--out", !p.emEstoque);
  }

  // Botão de WhatsApp: "Pedir" para disponíveis, "Avise-me" para esgotados.
  function preencherCta(cta, p) {
    var icone = document.createElementNS(SVG_NS, "svg");
    icone.setAttribute("class", "icon");
    icone.setAttribute("aria-hidden", "true");
    var uso = document.createElementNS(SVG_NS, "use");
    var rotulo = document.createElement("span");

    cta.classList.remove("btn--primary", "btn--outline");
    if (p.emEstoque) {
      cta.classList.add("btn--primary");
      cta.href = linkWhatsApp(
        "Olá! Vi o perfume " + nomeComVolume(p) + " no site da Dizzy Imports e gostaria de saber mais."
      );
      uso.setAttribute("href", "#i-chat");
      rotulo.textContent = "Pedir no WhatsApp";
      cta.setAttribute("aria-label", "Pedir no WhatsApp: " + p.nome);
    } else {
      cta.classList.add("btn--outline");
      cta.href = linkWhatsApp(
        "Olá! Vi que o perfume " + nomeComVolume(p) + " está esgotado no site da Dizzy Imports. Pode me avisar quando chegar?"
      );
      uso.setAttribute("href", "#i-bell");
      rotulo.textContent = "Avise-me";
      cta.setAttribute("aria-label", "Avise-me quando chegar: " + p.nome);
    }

    icone.appendChild(uso);
    cta.replaceChildren(icone, rotulo);
  }

  function criarCard(template, p, indice, abrirDetalhe) {
    var fragmento = template.content.cloneNode(true);
    var card = fragmento.querySelector(".card");
    var detalhes = fragmento.querySelector("[data-details]");

    if (!p.emEstoque) card.classList.add("card--out");

    preencherMidia(fragmento.querySelector(".card__media"), p, indice < 2 ? "eager" : "lazy");
    preencherSelo(fragmento.querySelector("[data-badge]"), p);
    preencher(fragmento.querySelector("[data-family]"), p.familia);
    fragmento.querySelector("[data-name]").textContent = p.nome;
    preencher(fragmento.querySelector("[data-desc]"), p.descricao);
    fragmento.querySelector("[data-volume]").textContent = p.ml ? p.ml + " ml" : "";
    fragmento.querySelector("[data-price]").textContent = precoFormatado(p);
    preencherCta(fragmento.querySelector("[data-cta]"), p);

    detalhes.setAttribute("aria-label", "Ver detalhes: " + p.nome);
    detalhes.addEventListener("click", function () {
      abrirDetalhe(p, detalhes);
    });

    return fragmento;
  }

  /* ---------- Detalhe do perfume ---------- */

  function criarSecao(titulo, linhas) {
    var secao = document.createElement("section");
    secao.className = "product-dialog__section";
    var h = document.createElement("h3");
    h.className = "product-dialog__heading";
    h.textContent = titulo;
    var dl = document.createElement("dl");
    dl.className = "spec-list";
    linhas.forEach(function (linha) {
      var row = document.createElement("div");
      row.className = "spec-list__row";
      var dt = document.createElement("dt");
      dt.textContent = linha[0];
      var dd = document.createElement("dd");
      dd.textContent = linha[1];
      row.appendChild(dt);
      row.appendChild(dd);
      dl.appendChild(row);
    });
    secao.appendChild(h);
    secao.appendChild(dl);
    return secao;
  }

  function iniciarDetalhe() {
    var dialog = document.querySelector("[data-dialog]");
    if (!dialog || typeof dialog.showModal !== "function") return null;

    var media = dialog.querySelector("[data-dialog-media]");
    var badge = dialog.querySelector("[data-dialog-badge]");
    var conteudo = dialog.querySelector("[data-dialog-content]");
    var familia = dialog.querySelector("[data-dialog-family]");
    var nome = dialog.querySelector("[data-dialog-name]");
    var descricao = dialog.querySelector("[data-dialog-desc]");
    var preco = dialog.querySelector("[data-dialog-price]");
    var volume = dialog.querySelector("[data-dialog-volume]");
    var cta = dialog.querySelector("[data-dialog-cta]");
    var scroll = dialog.querySelector(".product-dialog__scroll");
    var origem = null;

    dialog.querySelector("[data-dialog-close]").addEventListener("click", function () {
      dialog.close();
    });

    // Toque fora do painel (no fundo escurecido) fecha o detalhe.
    dialog.addEventListener("click", function (evento) {
      if (evento.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      if (origem && document.contains(origem)) origem.focus();
      origem = null;
    });

    return function abrir(p, gatilho) {
      origem = gatilho;
      dialog.classList.toggle("product-dialog--out", !p.emEstoque);

      Array.prototype.slice.call(media.querySelectorAll("img, .media-placeholder")).forEach(function (el) {
        el.remove();
      });
      preencherMidia(media, p, "eager");
      preencherSelo(badge, p);

      familia.textContent = p.familia;
      familia.hidden = !p.familia;
      nome.textContent = p.nome;
      descricao.textContent = p.descricao;
      descricao.hidden = !p.descricao;

      Array.prototype.slice.call(conteudo.querySelectorAll(".product-dialog__section")).forEach(function (el) {
        el.remove();
      });

      var notas = [
        ["Topo", p.notas.topo],
        ["Coração", p.notas.coracao],
        ["Fundo", p.notas.fundo]
      ]
        .filter(function (n) { return n[1].length; })
        .map(function (n) { return [n[0], n[1].join(", ")]; });
      if (notas.length) conteudo.appendChild(criarSecao("Notas olfativas", notas));

      var ficha = [];
      if (p.ocasiao) ficha.push(["Ocasião", p.ocasiao]);
      if (p.fixacao) ficha.push(["Fixação", p.fixacao]);
      if (p.ml) ficha.push(["Volume", p.ml + " ml"]);
      if (ficha.length) conteudo.appendChild(criarSecao("Características", ficha));

      preco.textContent = precoFormatado(p);
      volume.textContent = p.ml ? p.ml + " ml" : "";
      volume.hidden = !p.ml;
      preencherCta(cta, p);

      scroll.scrollTop = 0;
      dialog.showModal();
    };
  }

  /* ---------- Catálogo ---------- */

  function iniciarCatalogo() {
    var grade = document.querySelector("[data-product-grid]");
    var template = document.getElementById("product-card-template");
    var vazio = document.querySelector("[data-empty-state]");
    if (!grade || !template || !vazio) return;

    var produtos = normalizarProdutos(window.DIZZY_PRODUTOS);
    var abrirDetalhe = iniciarDetalhe() || function () {};

    if (!produtos.length) {
      grade.hidden = true;
      vazio.hidden = false;
      return;
    }

    var fragmento = document.createDocumentFragment();
    produtos.forEach(function (p, i) {
      fragmento.appendChild(criarCard(template, p, i, abrirDetalhe));
    });
    grade.replaceChildren(fragmento);
  }

  function atualizarAno() {
    var ano = document.querySelector("[data-year]");
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  iniciarCatalogo();
  atualizarAno();
})();
