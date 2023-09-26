const form = document.getElementById("form-fetch");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = e.target;
  const body = JSON.stringify({
    a: formData.a.value,
    b: formData.b.value,
    op: formData.op.value,
  });
  const headers = { "Content-Type": "application/json" };
  const method = "POST";
  fetch("/tinhtoan2", { method, body, headers })
    .then((res) => res.json())
    .then((data) => {
      result.innerHTML = data.result;
    })
    .catch((err) => {
      result.innerHTML = err.message;
    });
});
