// core imports
const express = require('express');

// mmy imports - controllers
const publicController = require('../controllers/public');

const router = express.Router();

// offer routes
router.get('/offers', publicController.getAllOffers);
router.get('/offer/:offerId', publicController.getSingleOffer);

// section
router.get('/sections', publicController.getAllSections);
router.get('/section/:sectionId', publicController.getSingleSection);

module.exports = router;