const http = require("http");
const axios = require("axios").default;
const fs = require("fs");
const provUrl =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const clieUrl =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

http
  .createServer(function (req, res) {
    if (req.url === "/api/proveedores") {
      fs.readFile("proveedores.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else if (req.url === "/api/clientes") {
      fs.readFile("clientes.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    } else {
      fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
    }
  })
  .listen(8081);

async function getProveedoresData() {
  let resp = await axios.get(provUrl);
  let datos = Array.from(resp.data);
  let stream = fs.createWriteStream("proveedores.html", { flags: "w" });
  let texto = `<html>
  <head>
    <meta charset="UTF-8" />
    <title>Proveedores Reto 6</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1 class="text-center">Listado de proveedores</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Contacto</th>
        </tr>
      </thead>
      <tbody>\n`;
  for (let i = 0; i < datos.length; i++) {
    let id = datos[i].idproveedor;
    let nombre = datos[i].nombrecompania;
    let contacto = datos[i].nombrecontacto;
    texto +=
      `          <tr>
              <td>` +
      id +
      `</td>
              <td>` +
      nombre +
      `</td>
              <td>` +
      contacto +
      `</td>
          </tr>\n`;
  }
  texto += `      </tbody>
    </table>
  </body>
</html>`;
  stream.write(texto);
  stream.end();
}

async function getClientesData() {
  let resp = await axios.get(clieUrl);
  let datos = Array.from(resp.data);
  let stream = fs.createWriteStream("clientes.html", { flags: "w" });
  let texto = `<html>
  <head>
    <meta charset="UTF-8" />
    <title>Clientes Reto 6</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1 class="text-center">Listado de clientes</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Contacto</th>
        </tr>
      </thead>
      <tbody>\n`;
  for (let i = 0; i < datos.length; i++) {
    let id = datos[i].idCliente;
    let nombre = datos[i].NombreCompania;
    let contacto = datos[i].NombreContacto;
    texto +=
      `          <tr>
              <td>` +
      id +
      `</td>
              <td>` +
      nombre +
      `</td>
              <td>` +
      contacto +
      `</td>
          </tr>\n`;
  }
  texto += `      </tbody>
    </table>
  </body>
</html>`;
  stream.write(texto);
  stream.end();
}

getProveedoresData();
getClientesData();
