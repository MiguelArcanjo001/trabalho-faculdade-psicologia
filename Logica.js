
let tentativa = 0;

// 🔤 FORÇAR MAIÚSCULO
document.querySelectorAll("input[type='text']").forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase();
  });
});

// 🎯 BOTÃO PRINCIPAL
document.querySelector(".continuarBTN").addEventListener("click", function () {

  tentativa++;

  // ❌ PRIMEIRA TENTATIVA SEMPRE FALHA
  if (tentativa === 1) {
    alert("Erro inesperado no sistema. Tente novamente.");
    document.querySelector("form").reset();
    return;
  }

  // ♿ VERIFICAR DEFICIÊNCIA
  const def = document.querySelector('input[name="deficiencia"]:checked');

  if  (def && def.value === "sim") {
    document.body.innerHTML = `
      <h1 style="color:red; text-align:center;">
        Não temos ônibus com acessibilidade disponíveis no momento.
      </h1>
    `;
    return;
  }

  // 💳 VERIFICAR PAGAMENTO
  const pag = document.querySelector('input[name="Pagamento"]:checked');

  if (!pag) {
    alert("Selecione um método de pagamento!");
    return;
  }

  // 📱 PIX BLOQUEADO
  if (pag.value === "pix") {
    alert("Este método de pagamento não é aceito.");
    return;
  }

  // 💰 DINHEIRO → fluxo irritante
  if (pag.value === "dinheiro") {
    let troco = confirm("Você vai precisar de troco?");

    if (troco) {
      let tipo = prompt("Prefere moeda ou cédula?");
      alert("Não temos essa opção disponível.");
      return;
    }
  }

  // ⏱️ TELA FINAL
  let tempo = Math.floor(Math.random() * 60);

  document.body.innerHTML = `
    <h1 style="color:red; text-align:center;">
      Seu ônibus chega em ${tempo} minutos
    </h1>
  `;
});