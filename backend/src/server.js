require('dotenv').config({
    path: ".env"
});

const express = require('express');
const sync = require('./infra/postgres').sincronizarPostgres;
const app = express();

(async () => await sync())()

const RoutesP = require('./routes/pessoa-routes');
const RoutesA = require('./routes/agendamento-routes');
const RoutesU = require('./routes/undSaude-routes');

const pessoasRoutesPg = require('./routes/pessoas-routes-pg');
const unidadesRoutesPg = require('./routes/undSaude-routes-pg');
const agendamentosRoutesPg = require('./routes/agendamento-routes-pg');


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/', defaultRoutes);

app.use('/api/pessoas', RoutesP);
app.use('/api/agendamentos', RoutesA);
app.use('/api/unidades', RoutesU);


app.use('/api/pessoaspg', pessoasRoutesPg);
app.use('/api/unidadespg', unidadesRoutesPg);
app.use('/api/agendamentospg', agendamentosRoutesPg);


app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});