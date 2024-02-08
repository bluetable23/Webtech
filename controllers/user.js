

const { pool } = require('../config/database')
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');


// GET all Users /Users
exports.getUsers = async (req, res) => {
  console.log(req.username);
  try {
    const results = await pool.query('SELECT * FROM users ORDER BY ida ASC')
    res.status(200).json(results.rows);
  }
  catch (error) {
    console.log(error);
  }
};


//register
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array()
    });
  }

  bcrypt.hash(req.body.passworda, 10)
    .then(async (hash) => {
      const user = new User(
        req.body.usernamea,
        hash,
        req.body.emaila,
        req.body.rolea
      );

      try {
        const result = await pool.query('INSERT INTO users (usernamea, passworda, emaila, rolea) VALUES ($1, $2, $3, $4) RETURNING *', [user.usernamea, user.passworda, user.emaila, user.rolea]);

        res.status(201).json((result.rows));


      } catch (error) {
        console.log(error);
        res.status(422).send(error);
      }
    });
};





exports.loginUser = async (req, res) => {
  const existingUsername = await pool.query('SELECT * FROM users WHERE usernamea = $1', [req.body.usernamea]);
  if (existingUsername.rows.length > 0) {
    const hashedPassword = existingUsername.rows[0].passworda;
    const result = await bcrypt.compare(req.body.passworda, hashedPassword);
    if (result) {
      res.status(201).json({ message: 'logged in' });
    } else {
      res.status(204).send(); // falsches Passwort
    }
  } else {
    res.status(400).json({ error: 'username does not exist' });
  }
};


exports.getUser = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE usernamea = $1';
    const values = [req.params.usernamea];
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      const user = result.rows[0];
      res.send(user);
    } else {
      res.status(404).send({ error: 'User does not exist!' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong!' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const query = 'DELETE FROM users WHERE usernamea = $1';
    const values = [req.params.usernamea];
    await pool.query(query, values);

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong!' });
  }
};




















exports.updateUser = async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [req.params.username];
    const result = await pool.query(query, values);

    if (result.rows.length > 0 && req.body.password) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (passwordMatch) {
        if (req.body.newPassword) {
          const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
          const updatePasswordQuery = 'UPDATE users SET password = $1 WHERE username = $2';
          const updatePasswordValues = [newPasswordHash, req.params.username];
          await pool.query(updatePasswordQuery, updatePasswordValues);
        }

        res.status(200).send();
      } else {
        res.status(204).send(); // falsches Passwort
      }
    } else {
      res.status(204).send(); // falscher Benutzername oder kein Passwort
    }
  } catch (error) {
    res.status(404).send({ error: 'User does not exist!' });
  }
};