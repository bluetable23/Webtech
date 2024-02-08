const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// import doctor controller
const doctorController = require('../controllers/doctor');




// GET all doctors
router.get('/', doctorController.getDoctors);

// GET one doctor by ID
router.get('/:arztnr', doctorController.getDoctorByArztNr);


// POST new doctor
router.post('/', [
    body('arztnr').isLength({min: 8, max: 8}),
    body('fullname'),
    body('strasnr'),
    body('telenr').isNumeric().isLength({ min: 8 }), 
    body('sprechzeiten'),
   
], doctorController.createDoctor);
// UPDATE doctor by ID
router.patch('/:arztnr', [
    body('arztnr').optional({ nullable: true }),
    body('fullname').optional({ nullable: true }),
    body('strasnr').optional({ nullable: true }),
    body('telenr').optional({ nullable: true }),
    body('sprechzeiten').optional({ nullable: true }),
], doctorController.updateDoctor);

// DELETE doctor by ID
router.delete('/:arztnr',doctorController.deleteDoctorbyarztnr);

// export router to use in index.js
module.exports = router;


