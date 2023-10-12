
const template = (name, url) => {
  return `
        <div class="col-sm-3 d-flex justify-content-around">
            <div class="card text-center" style="width: 100%;">
                <img src="${url}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                </div>
            </div>
        </div>
    `;
};

document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.querySelector(".row");

  fetch("/user-images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.userImages) {
        data.userImages.forEach((image) => {
          const card = template(image.name, image.url);
          imageContainer.insertAdjacentHTML("beforeend", card);
        });
      } else {
        console.log("No user images found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user images: " + error);
    });
});
