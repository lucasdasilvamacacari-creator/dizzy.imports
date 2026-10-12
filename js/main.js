/* Dizzy Imports — catálogo
   Lê os produtos de data/products.js e monta os cards, os filtros e os links de WhatsApp. */
(function () {
  "use strict";

  var WHATSAPP_NUMERO = "5514988083978";

  var CATEGORIAS = {
    importado: { rotulo: "Importado", plural: "Importados" },
    inspirado: { rotulo: "Inspirado", plural: "Inspirados" }
  };

  var DICAS = {
    todos: "Perfumes importados originais e fragrâncias inspiradas com nome próprio.",
    importado: "Perfumes originais de marcas internacionais.",
    inspirado: "Fragrâncias de nome próprio, de famílias olfativas consagradas."
  };

  var formatoPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function linkWhatsApp(mensagem) {
    return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensagem);
  }

  function normalizarProdutos(lista) {
    if (!Array.isArray(lista)) return [];
    return lista
      .filter(function (p) {
        return p && typeof p.nome === "string" && p.nome.trim() && CATEGORIAS[p.categoria];
      })
      .map(function (p, indice) {
        return {
          id: String(p.id || indice),
          nome: p.nome.trim(),
          categoria: p.categoria,
          ml: Number(p.ml) || null,
          preco: typeof p.preco === "number" ? p.preco : Number(p.preco),
          descricao: typeof p.descricao === "string" ? p.descricao.trim() : "",
          imagem: typeof p.imagem === "string" ? p.imagem.trim() : "",
          emEstoque: p.emEstoque !== false,
          ordem: indice
        };
      })
      .sort(function (a, b) {
        // Disponíveis primeiro; dentro de cada grupo, mantém a ordem do arquivo.
        if (a.emEstoque !== b.emEstoque) return a.emEstoque ? -1 : 1;
        return a.ordem - b.ordem;
      });
  }

  function criarPlaceholder(texto) {
    var wrap = document.createElement("div");
    wrap.className = "media-placeholder";
    var mark = document.createElement("span");
    mark.className = "media-placeholder__mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "D";
    var label = document.createElement("span");
    label.className = "media-placeholder__text";
    label.textContent = texto;
    wrap.appendChild(mark);
    wrap.appendChild(label);
    return wrap;
  }

  function nomeComVolume(p) {
    return p.ml ? p.nome + " (" + p.ml + "ml)" : p.nome;
  }

  function criarCard(template, p, indice) {
    var fragmento = template.content.cloneNode(true);
    var card = fragmento.querySelector(".card");
    var media = fragmento.querySelector(".card__media");
    var badge = fragmento.querySelector("[data-badge]");
    var cta = fragmento.querySelector("[data-cta]");

    card.dataset.categoria = p.categoria;
    if (!p.emEstoque) card.classList.add("card--out");

    if (p.imagem) {
      var img = document.createElement("img");
      img.src = p.imagem;
      img.alt = p.nome;
      img.width = 800;
      img.height = 1000;
      img.decoding = "async";
      img.loading = indice < 2 ? "eager" : "lazy";
      img.addEventListener("error", function () {
        img.remove();
        media.appendChild(criarPlaceholder("Imagem indisponível"));
      }, { once: true });
      media.appendChild(img);
    } else {
      media.appendChild(criarPlaceholder("Foto em breve"));
    }

    badge.textContent = p.emEstoque ? "Em estoque" : "Esgotado";
    if (!p.emEstoque) badge.classList.add("badge--out");

    fragmento.querySelector("[data-category]").textContent = CATEGORIAS[p.categoria].rotulo;
    fragmento.querySelector("[data-name]").textContent = p.nome;

    var notas = fragmento.querySelector("[data-notes]");
    if (p.descricao) notas.textContent = p.descricao;
    else notas.remove();

    fragmento.querySelector("[data-volume]").textContent = p.ml ? p.ml + " ml" : "";
    fragmento.querySelector("[data-price]").textContent = isFinite(p.preco)
      ? formatoPreco.format(p.preco)
      : "Consulte";

    var svgNS = "http://www.w3.org/2000/svg";
    var icone = document.createElementNS(svgNS, "svg");
    icone.setAttribute("class", "icon");
    icone.setAttribute("aria-hidden", "true");
    var uso = document.createElementNS(svgNS, "use");
    var rotulo = document.createElement("span");

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
    cta.appendChild(icone);
    cta.appendChild(rotulo);

    return fragmento;
  }

  function iniciarCatalogo() {
    var grade = document.querySelector("[data-product-grid]");
    var template = document.getElementById("product-card-template");
    if (!grade || !template) return;

    var vazio = document.querySelector("[data-empty-state]");
    var tituloVazio = document.querySelector("[data-empty-title]");
    var status = document.querySelector("[data-results-status]");
    var dica = document.querySelector("[data-filter-hint]");
    var botoes = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));

    var produtos = normalizarProdutos(window.DIZZY_PRODUTOS);

    // Contagem por categoria nos botões de filtro.
    var contagem = { todos: produtos.length, importado: 0, inspirado: 0 };
    produtos.forEach(function (p) { contagem[p.categoria] += 1; });
    Object.keys(contagem).forEach(function (chave) {
      var alvo = document.querySelector('[data-count="' + chave + '"]');
      if (alvo) alvo.textContent = String(contagem[chave]);
    });

    function aplicarFiltro(filtro) {
      if (filtro !== "todos" && !CATEGORIAS[filtro]) filtro = "todos";

      botoes.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.filter === filtro));
      });

      var visiveis = produtos.filter(function (p) {
        return filtro === "todos" || p.categoria === filtro;
      });

      var fragmento = document.createDocumentFragment();
      visiveis.forEach(function (p, i) {
        fragmento.appendChild(criarCard(template, p, i));
      });
      grade.replaceChildren(fragmento);

      vazio.hidden = visiveis.length > 0;
      grade.hidden = visiveis.length === 0;
      tituloVazio.textContent = produtos.length === 0
        ? "Catálogo em atualização"
        : "Nenhum perfume nesta categoria no momento";

      dica.textContent = DICAS[filtro];

      var n = visiveis.length;
      status.textContent = n === 1 ? "1 perfume encontrado" : n + " perfumes encontrados";

      // Mantém o filtro no endereço, para compartilhar links como ?categoria=inspirado
      if (window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        if (filtro === "todos") url.searchParams.delete("categoria");
        else url.searchParams.set("categoria", filtro);
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    }

    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        aplicarFiltro(b.dataset.filter);
      });
    });

    var inicial = new URLSearchParams(window.location.search).get("categoria") || "todos";
    // Aceita também a forma no plural (?categoria=inspirados)
    inicial = inicial.replace(/s$/, "");
    aplicarFiltro(inicial === "todo" ? "todos" : inicial);
  }

  function atualizarAno() {
    var ano = document.querySelector("[data-year]");
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  iniciarCatalogo();
  atualizarAno();
})();
