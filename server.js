const app = require('./config/express')();
import routes from './api/routes/index.mjs';
const port = app.get('port');

app.use('/transcribe', routes.transcribe);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

