const express = require('express');
const bodyParser = require('body-parser');
const DoctorRoutes = require('./routes/doctor');
const cors = require('cors');
const userRoutes = require('./routes/user');



const app = express();
const port = 3000;
const { pool } = require("./config/database");



//Die app.get Methode überprüft, ob unser node.js mit db verbunden ist.
app.get("/test", async (req, res, next) => {
    try {
        const { rows } = await pool.query(`SELECT count(*) FROM doctors `);
        console.log(rows);
        res.status(200).send(rows);
      } catch (error) {
        console.error('listAlldoctors', error);
        res.status(500).send({
          message: "Error occured."
        });
      }
});



app.use(bodyParser.json());
app.use(cors());
app.use('/api/doctors', DoctorRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
