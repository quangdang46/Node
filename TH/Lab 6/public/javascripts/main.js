$(".btn-folder").on("click", function () {
  var folderName = prompt("Enter folder name:");
  if (folderName) {
    $.ajax({
      method: "POST",
      url: "/create",
      data: { folderName: folderName, type: "folder" },
      success: function (response) {
        alert("Folder created successfully!");
        window.location.reload();
      },
      error: function (xhr, status, error) {
        alert("Error creating folder: " + error);
      },
    });
  }
});

$(".btn-file").on("click", function () {
  var fileName = prompt("Enter file name:");
  if (fileName) {
    $.ajax({
      method: "POST",
      url: "/create",
      data: { folderName: fileName, type: "file" },
      success: function (response) {
        alert("File created successfully!");
        window.location.reload();
      },
      error: function (xhr, status, error) {
        alert("Error creating file: " + error);
      },
    });
  }
});

const template = ({ name, type, modified, size }) => `
    <tr>
          <td>
            ${
              type === "Folder"
                ? '<i class="fa fa-folder"></i>'
                : '<i class="fa fa-file"></i>'
            }
            <a href="#">${name}</a>
          </td>
            <td>${type}</td>
            <td>${size}</td>
            <td>${modified}</td>
          <td>
            <button><i class="fa fa-download action"></i></button>
            <button><i class="fa fa-edit action"></i></button>
            <button><i class="fa fa-trash action"></i></button>
          </td>
        </tr>
`;

$(".input-search").on("input", function () {
  var searchQuery = $(this).val();

  $.ajax({
    method: "GET",
    url: "/search",
    data: { query: searchQuery },
    success: function (response) {
      const html = response.map(template).join("");
      $(".table-list").html(html);
    },
    error: function (xhr, status, error) {
      console.error("Error performing search: " + error);
    },
  });
});
