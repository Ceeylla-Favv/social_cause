const express = require('express');
const upload = require('../middleware/upload');
const { createCause, getAllCauses, getCauseById, updateCause, deleteCause } = require('../controller/causeController');
const router = express.Router();

router.post('/create-cause', upload, createCause);
router.get('/all-causes', getAllCauses);
router.get('/get-cause/:id', getCauseById);
router.put('/update-cause/:id',upload, updateCause);
router.delete('/delete-cause/:id', deleteCause);


module.exports = router;