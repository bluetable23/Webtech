const { Pool } = require('pg');

const pool = new Pool({

  //bitte hier ihr postgres passwort schreiben
  connectionString: 'postgres://postgres:webtech@localhost:5432/WebtechA'
});

pool.on('error', (err, client) => {
  console.log('Error while connecting', err)
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Connected!')
});

module.exports = {
  pool
};