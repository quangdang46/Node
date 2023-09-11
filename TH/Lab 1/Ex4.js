const name = document.querySelector("#name");
const age = document.querySelector("#age");
const btnLocal = document.querySelector(".btn-local");
const btnSession = document.querySelector(".btn-session");
const tableLocal = document.querySelector(".table-local");
const tableSession = document.querySelector(".table-session");

window.addEventListener("load", () => {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  const listsSession = JSON.parse(sessionStorage.getItem("lists")) || [];
  lists.forEach((list, index) => {
    tableLocal.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>${list.nameValue}</td>
    <td>${list.ageValue}</td>
    </tr>`;
  });
  listsSession.forEach((list, index) => {
    tableSession.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>${list.nameValue}</td>
    <td>${list.ageValue}</td>
    </tr>`;
  });
});

btnLocal.addEventListener("click", () => {
  const nameValue = name.value;
  const ageValue = age.value;
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  localStorage.setItem(
    "lists",
    JSON.stringify([...lists, { nameValue, ageValue }])
  );

  tableLocal.innerHTML += `<tr>
    <td>${lists.length + 1}</td>
    <td>${nameValue}</td>
    <td>${ageValue}</td>
    </tr>`;
});

btnSession.addEventListener("click", () => {
  const nameValue = name.value;
  const ageValue = age.value;
  const lists = JSON.parse(sessionStorage.getItem("lists")) || [];
  sessionStorage.setItem(
    "lists",
    JSON.stringify([...lists, { nameValue, ageValue }])
  );

  tableSession.innerHTML += `<tr>
    <td>${lists.length + 1}</td>
    <td>${nameValue}</td>
    <td>${ageValue}</td>
    </tr>`;
});
