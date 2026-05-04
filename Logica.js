let modo = "ruim";
let intervaloAds = null;

document.addEventListener("DOMContentLoaded", function () {

  let tentativa = 0;

  const btnModo = document.getElementById("trocarModo");
  const css = document.getElementById("temaCSS");

  // ========================
  // 🔁 TROCA DE MODO
  // ========================

  function atualizarModo(novoModo) {
    modo = novoModo;

    if (modo === "bom") {
      css.href = "telaboa.css";
      btnModo.innerText = "Modo: BOM";
      pararAds();
    } else {
      css.href = "Telainicial.css";
      btnModo.innerText = "Modo: RUIM";
      iniciarAds();
    }
  }

  btnModo.addEventListener("click", () => {
    atualizarModo(modo === "ruim" ? "bom" : "ruim");
  });

  atualizarModo("ruim"); // estado inicial


  // ========================
  // 🔤 MAIÚSCULO (SÓ RUIM)
  // ========================

  document.querySelectorAll("input[type='text']").forEach(input => {
    input.addEventListener("input", () => {
      if (modo === "ruim") {
        input.value = input.value.toUpperCase();
      }
    });
  });


  // ========================
  // 🎯 BOTÃO PRINCIPAL
  // ========================

  document.querySelector(".continuarBTN").addEventListener("click", function () {

    // ✅ MODO BOM
    if (modo === "bom") {
      fluxoBom();
      return;
    }

    // ❌ MODO RUIM
    tentativa++;

    if (tentativa === 1) {
      mostrarTela(`
        <h1>ERRO INESPERADO</h1>
        <p>Tente novamente.</p>
        <button onclick="fecharTela()">Ok</button>
      `);
      document.querySelector("form").reset();
      return;
    }

    const def = document.querySelector('input[name="deficiencia"]:checked');

    if (def && def.value === "sim") {
      mostrarTela(`
        <h1 style="color:red;">SEM ACESSIBILIDADE</h1>
        <p>Não temos ônibus disponíveis.</p>
        <button onclick="fecharTela()">Ok</button>
      `);
      return;
    }

    const pag = document.querySelector('input[name="Pagamento"]:checked');

    if (!pag) {
      mostrarTela(`
        <h1>ERRO</h1>
        <p>Selecione um método de pagamento!</p>
        <button onclick="fecharTela()">Ok</button>
      `);
      return;
    }

    if (pag.value === "pix") {
      mostrarTela(`
        <h1>PAGAMENTO RECUSADO</h1>
        <p>PIX não é aceito.</p>
        <button onclick="fecharTela()">Voltar</button>
      `);
      return;
    }

    if (pag.value === "dinheiro") {
      mostrarTela(`
        <h1>Troco necessário?</h1>
        <button onclick="respostaTroco(true)">Sim</button>
        <button onclick="respostaTroco(false)">Não</button>
      `);
      return;
    }

    finalizarRuim();
  });

});


// ========================
// 🎭 SISTEMA DE TELAS
// ========================

function mostrarTela(html) {
  const form = document.getElementById("formTela");
  const tela = document.getElementById("telasSistema");

  form.style.display = "none";
  tela.style.display = "flex";
  tela.innerHTML = `<div class="box">${html}</div>`;
}

function fecharTela() {
  document.getElementById("telasSistema").style.display = "none";
  document.getElementById("formTela").style.display = "block";
}


// ========================
// 💰 FLUXO RUIM
// ========================

function respostaTroco(resposta) {
  if (resposta) {
    mostrarTela(`
      <h1>Tipo de troco?</h1>
      <button onclick="tipoTroco()">Moeda</button>
      <button onclick="tipoTroco()">Cédula</button>
    `);
  } else {
    finalizarRuim();
  }
}

function tipoTroco() {
  mostrarTela(`
    <h1>INDISPONÍVEL</h1>
    <p>Não temos essa opção.</p>
    <button onclick="fecharTela()">Voltar</button>
  `);
}

function finalizarRuim() {
  let tempo = Math.floor(Math.random() * 60);

  mostrarTela(`
    <h1>SEU ONIBUS JA PASSOU</h1>
    <p>Passou em ${tempo} minutos</p>
    <button onclick="fecharTela()">Ok</button>
  `);
}


// ========================
// ✅ FLUXO BOM (SEM CAOS)
// ========================

function fluxoBom() {
  const pag = document.querySelector('input[name="Pagamento"]:checked');

  if (!pag) {
    alert("Selecione um método de pagamento.");
    return;
  }

  let tempo = Math.floor(Math.random() * 10) + 1;

  mostrarTela(`
    <h2>Ônibus confirmado</h2>
    <p>Chega em ${tempo} minutos</p>
    <button onclick="fecharTela()">Ok</button>
  `);
}


// ========================
// 📢 ANÚNCIOS CONTROLADOS
// ========================



const anuncios = [
  "assets/anuncio1.jpg",
  "assets/anuncio2.jpg",
  "assets/anuncio3.jpg"
];

function iniciarAds() {
  if (intervaloAds) return;

  intervaloAds = setInterval(() => {
    mostrarAnuncioFull();
  }, 120000);
}

function pararAds() {
  clearInterval(intervaloAds);
  intervaloAds = null;
}

function mostrarAnuncioFull() {
  if (modo !== "ruim") return;

  if (document.querySelector(".anuncio-full")) return;

  const imgSrc = anuncios[Math.floor(Math.random() * anuncios.length)];

  const div = document.createElement("div");
  div.className = "anuncio-full";

  div.innerHTML = `
    <button onclick="fecharAnuncioFull()">X</button>
    <img src="${imgSrc}">
  `;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 5000);
}

function fecharAnuncioFull() {
  const ad = document.querySelector(".anuncio-full");
  if (ad) ad.remove();
}


// ========================
// 🌍 GLOBAL
// ========================

window.fecharTela = fecharTela;
window.respostaTroco = respostaTroco;
window.tipoTroco = tipoTroco;
window.fecharAnuncioFull = fecharAnuncioFull;