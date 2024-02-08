const { pool } = require('../config/database')
const { validationResult } = require('express-validator');
const Doctor = require('../models/doctor');


// GET all dotcors /doctors
exports.getDoctors = async (req, res) => {
  console.log(req.user);
    try {
      const results = await pool.query('SELECT * FROM doctors ORDER BY arztnr ASC')
      res.status(200).json(results.rows);
    } 
    catch (error) {
      console.log(error);
    }
};





// GET one docotr by ArztNr /doctors/:ArztNr
exports.getDoctorByArztNr = async (req, res) => { 
    const arztnr = req.params.arztnr;
    try {
      const result = await pool.query('SELECT * FROM doctors WHERE arztnr = $1', [arztnr])
      res.send(result.rows[0])
    }
    catch (error) {
      console.log(error);
    }
}







// POST new doctor /doctors
// send status 201 -- success a new resource was created
// status 422 -- validation failed
exports.createDoctor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });
    }

    const doctor = new Doctor(req.body.arztnr, req.body.fullname, req.body.strasnr, 
      req.body.telenr, req.body.sprechzeiten);
    
    try {
      const result = await pool.query('INSERT INTO doctors (arztnr, fullname, strasnr, telenr, sprechzeiten) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [doctor.arztnr, doctor.fullname, doctor.strasnr,
        doctor.telenr, doctor.sprechzeiten])
      res.status(201).json(result.rows);
    }
    catch(error) {
      console.log(error);
      res.status(422);
    }
};

// PATCH - update doctor
exports.updateDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array()
    });
  }

  const doctor = new Doctor(
    req.params.arztnr,
    req.body?.fullname,
    req.body?.strasnr,
    req.body?.telenr,
    req.body?.sprechzeiten
  );

  try {
    let updateQuery = 'UPDATE doctors SET ';
    let queryParams = [];
    let paramIndex = 2;

    if (req.body.fullname) {
      updateQuery += `fullname = COALESCE($${paramIndex}, fullname), `;
      queryParams.push(doctor.fullname);
      paramIndex++;
    }
    if (req.body.strasnr) {
      updateQuery += `strasnr = COALESCE($${paramIndex}, strasnr), `;
      queryParams.push(doctor.strasnr);
      paramIndex++;
    }
    if (req.body.telenr) {
      updateQuery += `telenr = COALESCE($${paramIndex}, telenr), `;
      queryParams.push(doctor.telenr);
      paramIndex++;
    }
    if (req.body.sprechzeiten) {
      updateQuery += `sprechzeiten = COALESCE($${paramIndex}, sprechzeiten), `;
      queryParams.push(doctor.sprechzeiten);
      paramIndex++;
    }

    // Remove the trailing comma and space
    updateQuery = updateQuery.slice(0, -2);

    // Add the WHERE clause
    updateQuery += ` WHERE arztnr = $1 RETURNING *`;
    queryParams.unshift(doctor.arztnr);

    const result = await pool.query(updateQuery, queryParams);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

// DELETE doctor
exports.deleteDoctorbyarztnr= async(req,res) => {
  const arztnr = req.params.arztnr;
  try {
    const result = await pool.query('DELETE FROM doctors WHERE arztnr = $1', [arztnr])
    res.status(200).json(result.rows);
  }
  catch (error) {
    console.log(error);
  }
}