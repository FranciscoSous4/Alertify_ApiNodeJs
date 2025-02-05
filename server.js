const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alertify",
});

// Testar conexão com o MySQL
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para receber dados de GPS em tempo real
app.post("/dados_gps", (req, res) => {
  const { latitude, longitude, id_gps } = req.body;

  if (latitude == null || longitude == null || id_gps == null) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "latitude, longitude e id_gps são obrigatórios.",
      });
  }

  // Query para inserir dados no banco
  const query =
    "INSERT INTO locations (latitude, longitude, id_gps) VALUES (?, ?, ?)";

  db.query(query, [latitude, longitude, id_gps], (err, results) => {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Erro ao inserir dados no banco." });
    }

    res
      .status(200)
      .json({
        status: "ok",
        message: "Localização armazenada!",
        id: results.insertId,
      });
  });
});
// rota para ir buscar a ultima localização e a data 
app.get("/last_location", (req, res) => {
  const query = "SELECT latitude, longitude, cdate, id_gps FROM locations ORDER BY id DESC LIMIT 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar última localização:", err);
      return res.status(500).json({ status: "error", message: "Erro ao buscar dados." });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: "error", message: "Nenhuma localização encontrada." });
    }

    const location = results[0]; // Pega a última localização
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            message: `Última localização de ID ${location.id_gps}`,
            cdate: location.cdate, // Incluindo a data
          },
          geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
        },
      ],
    };

    res.json(geojson);
  });
});
// para receber a data
app.get("/last_date", (req, res) => {
  // Consulta à base de dados para pegar a última data
  const query = "SELECT cdate FROM locations ORDER BY id DESC LIMIT 1";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar data:", err);
      return res.status(500).json({ status: "error", message: "Erro ao buscar a data." });
    }

    if (results.length > 0) {
      res.json({ cdate: results[0].cdate });  // Retorna a data `cdate` da última entrada
    } else {
      res.status(404).json({ message: "Nenhuma data encontrada." });
    }
  });
});


// Rota para buscar todas as localizações (se necessário no futuro)
app.get("/locations", (req, res) => {
  const query = "SELECT name, latitude, longitude, cdate FROM locations ORDER BY id DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar localizações:", err);
      return res.status(500).json({ status: "error", message: "Erro ao buscar dados." });
    }

    const geojson = {
      type: "FeatureCollection",
      features: results.map((location) => ({
        type: "Feature",
        properties: {
          message: location.name || "Localização sem nome",
          iconSize: [64, 64],
        },
        geometry: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      })),
    };

    res.json(geojson);
  });
});

// Rota simples de teste
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo à Alertify API!" });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
