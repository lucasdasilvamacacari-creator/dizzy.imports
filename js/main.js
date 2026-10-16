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
  function lista(valor) {
    var itens = Array.isArray(valor) ? valor : typeof valor === "string" ? valor.split(",") : [];
    return itens.map(texto).filter(Boolean);
  }

  function normalizarProdutos(produtos) {
    if (!Array.isArray(produtos)) return [];
    return produtos
      .filter(function (p) {
        return p && texto(p.nome);
      })
      .map(function (p, indice) {
        var notas = p.notas || {};
        return {
          id: texto(String(p.id || "")) || "perfume-" + indice,
          nome: texto(p.nome),
          marca: texto(p.marca),
          ml: Number(p.ml) || null,
          preco: typeof p.preco === "number" ? p.preco : Number(p.preco),
          imagem: texto(p.imagem),
          familia: texto(p.familia),
          caracteristicas: lista(p.caracteristicas),
          descricao: texto(p.descricao),
          notas: {
            topo: lista(notas.topo),
            coracao: lista(notas.coracao),
            fundo: lista(notas.fundo)
          },
          ocasiao: texto(p.ocasiao),
          fixacao: texto(p.fixacao),
          ordem: indice
        };
      })
      .sort(function (a, b) {
        // Do dia para a noite; dentro de cada grupo, mantém a ordem do arquivo.
        return ordemDoDia(a.ocasiao) - ordemDoDia(b.ocasiao) || a.ordem - b.ordem;
      });
  }

  // Dia → Dia e noite → Noite → sem ocasião.
  function ordemDoDia(ocasiao) {
    var o = ocasiao.toLowerCase();
    var dia = o.indexOf("dia") !== -1;
    var noite = o.indexOf("noite") !== -1;
    if (dia && noite) return 1;
    if (dia) return 0;
    if (noite) return 2;
    return 3;
  }

  function nomeCompleto(p) {
    return p.marca ? p.marca + " " + p.nome : p.nome;
  }

  function nomeComVolume(p) {
    return p.ml ? nomeCompleto(p) + " (" + p.ml + "ml)" : nomeCompleto(p);
  }

  function temPreco(p) {
    return isFinite(p.preco) && p.preco > 0;
  }

  function criarIcone(id, classe) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "icon" + (classe ? " " + classe : ""));
    svg.setAttribute("aria-hidden", "true");
    var uso = document.createElementNS(SVG_NS, "use");
    uso.setAttribute("href", "#" + id);
    svg.appendChild(uso);
    return svg;
  }

  // Preenche um texto ou esconde o elemento quando o campo está vazio.
  function preencher(el, valor) {
    el.textContent = valor || "";
    el.hidden = !valor;
  }

  function preencherCaracteristicas(ul, itens) {
    ul.replaceChildren.apply(ul, itens.map(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      return li;
    }));
    ul.hidden = !itens.length;
  }

  // Ocasião com ícone de sol (dia) e/ou lua (noite).
  function preencherOcasiao(el, ocasiao) {
    el.replaceChildren();
    el.hidden = !ocasiao;
    if (!ocasiao) return;
    var minusculo = ocasiao.toLowerCase();
    var icones = document.createElement("span");
    icones.className = "occasion__icons";
    if (minusculo.indexOf("dia") !== -1) icones.appendChild(criarIcone("i-sun", "icon--sm"));
    if (minusculo.indexOf("noite") !== -1) icones.appendChild(criarIcone("i-moon", "icon--sm"));
    if (icones.childNodes.length) el.appendChild(icones);
    var rotulo = document.createElement("span");
    rotulo.textContent = ocasiao;
    el.appendChild(rotulo);
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
    img.alt = nomeCompleto(p);
    img.width = 768;
    img.height = 1024;
    img.decoding = "async";
    img.loading = carregamento;
    img.addEventListener("error", function () {
      img.remove();
      container.appendChild(criarPlaceholder("Imagem indisponível"));
    }, { once: true });
    container.appendChild(img);
  }

  function preencherCta(cta, p) {
    var rotulo = document.createElement("span");
    rotulo.textContent = "Pedir no WhatsApp";
    cta.classList.add("btn--primary");
    cta.href = linkWhatsApp(
      "Olá! Vi o perfume " + nomeComVolume(p) + " no site da Dizzy Imports e gostaria de fazer um pedido."
    );
    cta.setAttribute("aria-label", "Pedir no WhatsApp: " + nomeCompleto(p));
    cta.replaceChildren(criarIcone("i-chat"), rotulo);
  }

  function criarCard(template, p, indice, abrirDetalhe) {
    var fragmento = template.content.cloneNode(true);
    var detalhes = fragmento.querySelector("[data-details]");

    preencherMidia(fragmento.querySelector(".card__media"), p, indice < 2 ? "eager" : "lazy");
    preencher(fragmento.querySelector("[data-brand]"), p.marca);
    fragmento.querySelector("[data-name]").textContent = p.nome;
    preencherCaracteristicas(fragmento.querySelector("[data-traits]"), p.caracteristicas);
    preencherOcasiao(fragmento.querySelector("[data-occasion]"), p.ocasiao);

    detalhes.setAttribute("aria-label", "Ver detalhes: " + nomeCompleto(p));
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

    var $ = function (seletor) { return dialog.querySelector(seletor); };
    var media = $("[data-dialog-media]");
    var conteudo = $("[data-dialog-content]");
    var scroll = $(".product-dialog__scroll");
    var parcelamento = texto(window.DIZZY_PARCELAMENTO);
    var origem = null;

    $("[data-dialog-close]").addEventListener("click", function () {
      dialog.close();
    });

    // Toque fora do painel (no fundo escurecido) fecha o detalhe.
    dialog.addEventListener("click", function (evento) {
      if (evento.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      if (window.location.hash && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      if (origem && document.contains(origem)) origem.focus();
      origem = null;
    });

    return function abrir(p, gatilho) {
      origem = gatilho || null;
      Array.prototype.slice.call(media.querySelectorAll("img, .media-placeholder")).forEach(function (el) {
        el.remove();
      });
      preencherMidia(media, p, "eager");

      preencher($("[data-dialog-brand]"), p.marca);
      $("[data-dialog-name]").textContent = p.nome;
      preencher($("[data-dialog-family]"), p.familia);
      preencherCaracteristicas($("[data-dialog-traits]"), p.caracteristicas);
      preencher($("[data-dialog-desc]"), p.descricao);
      preencherOcasiao($("[data-dialog-occasion]"), p.ocasiao);

      var volume = p.ml ? p.ml + " ml" : "";
      var preco = temPreco(p) ? formatoPreco.format(p.preco) : "Sob consulta";
      preencher($("[data-dialog-box-volume]"), volume);
      $("[data-dialog-box-price]").textContent = preco;
      $("[data-dialog-box-label]").hidden = !temPreco(p);
      preencher($("[data-dialog-installments]"), temPreco(p) ? parcelamento : "");

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

      if (p.fixacao) conteudo.appendChild(criarSecao("Desempenho", [["Fixação", p.fixacao]]));

      $("[data-dialog-price]").textContent = preco;
      preencher($("[data-dialog-volume]"), [temPreco(p) ? "à vista" : "", volume].filter(Boolean).join(" · "));
      preencherCta($("[data-dialog-cta]"), p);

      if (window.history.replaceState) {
        window.history.replaceState(null, "", "#" + encodeURIComponent(p.id));
      }

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

    var botoes = {};
    var fragmento = document.createDocumentFragment();
    produtos.forEach(function (p, i) {
      var card = criarCard(template, p, i, abrirDetalhe);
      botoes[p.id] = card.querySelector("[data-details]");
      fragmento.appendChild(card);
    });
    grade.replaceChildren(fragmento);

    // Link direto para um perfume: site.com/#id-do-perfume abre o detalhe.
    var alvo = decodeURIComponent(window.location.hash.slice(1));
    var produto = produtos.filter(function (p) { return p.id === alvo; })[0];
    if (produto) abrirDetalhe(produto, botoes[produto.id]);
  }

  function atualizarAno() {
    var ano = document.querySelector("[data-year]");
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  iniciarCatalogo();
  atualizarAno();
})();
