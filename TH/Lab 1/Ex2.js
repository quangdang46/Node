const url = "https://maivanmanh.github.io/503106/lab01/students.json";
const btnFetch = document.querySelector(".btn-fetch");
const btnAjax = document.querySelector(".btn-ajax");
const table = document.querySelector("table");

const xhr = new XMLHttpRequest();

const renderTable = (students) => {
  let html = "";
  students.forEach((student) => {
    html += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
      </tr>
    `;
  });
  table.innerHTML += html;
};

btnFetch.addEventListener("click", async (e) => {
  try {
    const response = await fetch(url);
    const students = await response.json();
    renderTable(students?.data);
  } catch (error) {
    console.log(error);
  }
});

btnAjax.addEventListener("click", (e) => {
  xhr.open("GET", url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const students = JSON.parse(xhr.response);
      renderTable(students?.data);
    }
  };
  xhr.onerror = () => {
    console.log("Error");
  };
  xhr.send();
});
