const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: "localhost", // Altere para o endereço do seu servidor MySQL
    user: "root", // Substitua pelo seu usuário do MySQL
    password: "", // Substitua pela sua senha do MySQL
    database: "alertify", // Substitua pelo nome do seu banco de dados
  });

// Testar conexão
db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao MySQL:", err);
      return;
    }
    console.log("Conectado ao banco de dados MySQL!");
  });

  // Rota para receber dados e inserir no MySQL
  app.post("/locations", (req, res) => {
    const { lat, lng } = req.body;
  
    // Verifica se os valores foram enviados
    if (lat == null || lng == null) {
      return res.status(400).json({ status: "error", message: "lat e lng são obrigatórios." });
    }
  
    // Query para inserir os dados
    const query = "INSERT INTO locations (latitude, longitude) VALUES (?, ?)";
  
    db.query(query, [lat, lng], (err, results) => {
      if (err) {
        console.error("Erro ao inserir no banco de dados:", err);
        return res.status(500).json({ status: "error", message: "Erro ao inserir dados no banco." });
      }
  
      // Retorna sucesso
      res.status(200).json({ status: "ok", message: "Dados inseridos com sucesso!", id: results.insertId });
    });
  });


  // Rota para rfazer atualizacao do local do gps
  app.post("/gps_newlocation", (req, res) => {
    const { id_gps, lat, lng } = req.body;
  
    // Verifica se os valores foram enviados
    if (lat == null || lng == null) {
      return res.status(400).json({ status: "error", message: "lat e lng são obrigatórios." });
    }
  
    // Query para inserir os dados
    const query = "UPDATE gps SET lat=?, lng=? WHERE id_gps=?;";
  
    db.query(query, [lat, lng, id_gps], (err, results) => {
      if (err) {
        console.error("Erro ao atualizar no banco de dados:", err);
        return res.status(500).json({ status: "error", message: "Erro ao atualizar dados no banco." });
      }
  
      // Retorna sucesso
      res.status(200).json({ status: "ok", message: "Dados atualizados com sucesso!", id: results.insertId });
    });
  });  

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// route para ir buscar
app.get("/users/get_route_location", (req, res) => {
  res.json({
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-8.571609, 41.462187]
            }
        }/*,
        {
            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.2158203125, -15.97189158092897]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-63.29223632812499, -18.28151823530889]
            }
        }*/
    ]
});
});

// quais as routes que precisas para :

// arduino enviar/receber ?

// app utilizadores : enviar/receber




// set port, listen for requests
const PORT = process.env.PORT || 8079;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

