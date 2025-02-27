// Importar las dependencias necesarias
var express = require('express'); // Framework para crear el servidor
var cors = require('cors'); // Middleware para permitir solicitudes CORS
var multer = require('multer'); // Middleware para manejar la subida de archivos
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Crear una instancia de la aplicación Express
var app = express();

// Configurar middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configurar multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

// Ruta principal: servir el archivo HTML del formulario
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta para manejar la subida de archivos

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Verificar si se subió un archivo
  
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  // Obtener los detalles del archivo subido
  const fileDetails = {
    name: req.file.originalname, // Nombre original del archivo
    type: req.file.mimetype, // Tipo MIME del archivo
    size: req.file.size, // Tamaño del archivo en bytes
  };

  // Responder con los detalles del archivo en formato JSON
  res.json(fileDetails);
});

// Iniciar el servidor
const port = process.env.PORT || 3000; // Usar el puerto definido en .env o 3000 por defecto
app.listen(port, function () {
  console.log('Tu aplicación está escuchando en el puerto ' + port);
});