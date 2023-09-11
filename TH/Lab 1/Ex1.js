const inputURl = document.querySelector(".url");
const imgShow = document.querySelector(".img-show");
const btnSubmit = document.querySelector(".btn-submit");
const xhr = new XMLHttpRequest();
xhr.responseType = "blob";

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const url = inputURl.value;
  xhr.open("GET", url, true);
  xhr.onload = (event) => {
    if (xhr.status == 200) {
      const blob = xhr.response;
      imgShow.src = URL.createObjectURL(blob);
    }
  };
  xhr.onerror = (event) => {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  };
  xhr.send();
});
