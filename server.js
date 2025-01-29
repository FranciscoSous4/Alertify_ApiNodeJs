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
    const { latitude, longitude } = req.body;
  
    // Verifica se os valores foram enviados
    if (latitude== null || longitude == null) {
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
    const query = "UPDATE gps SET latitude=?, longitude=? WHERE id_gps=?;";
  
    db.query(query, [latitude, longitude, id_gps], (err, results) => {
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
                'message': 'CALDINHAS',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-8.481917, 41.369111]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'SANTO TIRSO',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-8.472306, 41.344083]
            }
        },
     {
            'type': 'Feature',
            'properties': {
              'message': 'MONTE CORDOBA',
                'iconSize': [64, 64]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-8.462167, 41.332111]
            }
        },
        {
          'type': 'Feature',
          'properties': {
            'message': 'MONTE CORDOBA',
              'iconSize': [64, 64]
          },
          'geometry': {
              'type': 'Point',
              'coordinates': [-8.451167, 41.336750]
          }
      },
      {
        'type': 'Feature',
        'properties': {
            'message': 'MONTE CORDOBA',
            'iconSize': [64, 64]
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [-8.429139, 41.317972]
        }
    },
    {
      'type': 'Feature',
      'properties': {
          'message': 'RIBA DE AVE',
          'iconSize': [64, 64]
      },
      'geometry': {
          'type': 'Point',
          'coordinates': [-8.425333, 41.316667]
      }
  },
  {
    'type': 'Feature',
    'properties': {
        'message': 'MEIXOMIL',
        'iconSize': [64, 64]
    },
    'geometry': {
        'type': 'Point',
        'coordinates': [-8.415194, 41.310306]
    }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'MEIXOMIL',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.402667, 41.294528]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'EIRIZ',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.388028, 41.307361]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'EIRIZ',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.377861, 41.312361]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'SANFINS',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.374778, 41.314528]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'SANFINS',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.372028, 41.318750]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'SANFINS',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.363278, 41.317778]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'LAMOSO',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.354556, 41.320083]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'FIGUEIRO',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.340194, 41.312833]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'FIGUEIRO',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.347583, 41.309361]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'CARVALHOSA',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.360833, 41.301889]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'CARVALHOSA',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.362778, 41.301111]
  }
},
{
  'type': 'Feature',
  'properties': {
      'message': 'PENAMAIOR',
      'iconSize': [64, 64]
  },
  'geometry': {
      'type': 'Point',
      'coordinates': [-8.401778, 41.283472]
  }
},
    ]
});
});

// quais as routes que precisas para :

// arduino enviar/receber ?
app.post('/gps', (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias' });
  }
  
  console.log(`Recebido: Latitude = ${latitude}, Longitude = ${longitude}`);
  res.json({ message: 'Dados recebidos com sucesso', latitude, longitude });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

/*// Rota para o Arduino enviar dados
app.post("/locations", (req, res) => {
  const { id, status, message } = req.body;

  // Verifica se os valores foram enviados
  if (id == null || status == null || message == null) {
    return res.status(400).json({ status: "error", message: "id, status e message são obrigatórios." });
  }

  // Query para inserir ou atualizar os dados no banco de dados
  const query = "INSERT INTO locations (id, status, message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status=?, message=?";

  db.query(query, [id, status, message, status, message], (err, results) => {
    if (err) {
      console.error("Erro ao processar os dados enviados pelo Arduino:", err);
      return res.status(500).json({ status: "error", message: "Erro ao processar dados no banco." });
    }

    // Retorna sucesso
    res.status(200).json({ status: "ok", message: "Dados enviados pelo Arduino processados com sucesso!" });
  });
});
*/


// app utilizadores : enviar/receber
app.post("/utilizadores", (req, res) => {
  const { id_utilizador, nome, email, get_all_location } = req.body;

  // Verifica se os valores foram enviados
  if (!id_utilizador || !nome|| !email || !get_all_locationlocation) {
    return res.status(400).json({ status: "error", message: "Campos obrigatórios: id, nome, email, localização" });
  }

  // Query para inserir ou atualizar dados
  const query = `
    INSERT INTO utilizadores (id_utilizador, nome, email, get_all_location) 
    VALUES (1, Toze Mario, tozemario@gmai.com, Escola) 
    ON DUPLICATE KEY UPDATE name=?, email=?, location=?;
  `;

  db.query(query, [id_utilizador, nome, email, get_all_locationlocation, nome, email, get_all_locationlocation], (err, results) => {
    if (err) {
      console.error("Erro ao inserir/atualizar dados dos utilizadores:", err);
      return res.status(500).json({ status: "error", message: "Erro ao processar dados no banco." });
    }

    res.status(200).json({ status: "ok", message: "Dados enviados com sucesso!" });
  });
});




// set port, listen for requests
const PORT = process.env.PORT || 8079;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

