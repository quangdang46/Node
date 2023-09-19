const http = require("http");
const data = require("./data.js");

const getStudents = async () => {
  return await {
    students: data,
    message: "Students list",
    error: false,
  };
};

const getStudent = async (id) => {
  const student = await data.find((student) => student.id === id);
  if (student) {
    return {
      student,
      message: "Student found",
      error: false,
    };
  }
  return {
    student: null,
    message: "Student not found",
    error: true,
  };
};

const addStudent = async (student) => {
  const newStudent = {
    id: data.length + 1,
    ...student,
  };
  await data.push(newStudent);
  return {
    message: "Student added",
    error: false,
  };
};

const updateStudent = async (id, student) => {
  const index = await data.findIndex((student) => student.id === id);
  if (index !== -1) {
    data[index] = {
      id,
      ...student,
    };
    return {
      message: "Student updated",
      error: false,
    };
  }
  return {
    message: "Student not found",
    error: true,
  };
};

const deleteStudent = async (id) => {
  const index = await data.findIndex((student) => student.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    return {
      message: "Student deleted",
      error: false,
    };
  }
  return {
    message: "Student not found",
    error: true,
  };
};

http
  .createServer(async (req, res) => {
    // show student
    if (req.url === "/students" && req.method === "GET") {
      const students = await getStudents();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(students));

      // get student by id
    } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === "GET") {
      const id = req.url.split("/")[2];
      const student = await getStudent(parseInt(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(student));
      // delete student
    } else if (
      req.url.match(/\/students\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[2];
      const result = await deleteStudent(parseInt(id));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));

      // update student
    } else if (req.url.match(/\/students\/([0-9]+)/) && req.method === "PUT") {
      const id = req.url.split("/")[2];
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const student = JSON.parse(body);
        const result = await updateStudent(parseInt(id), student);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      });
      // add student
    } else if (req.url === "/students" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const student = JSON.parse(body);
        await addStudent(student);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(student));
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Route not found",
          error: true,
        })
      );
    }
  })
  .listen(8080);

console.log("Server running at http://localhost:8080/");
