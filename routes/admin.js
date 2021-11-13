// core imports
const express = require('express');

// my imports - middleware
const isAuth = require('../middleware/is-auth.js');
const isAdmin = require('../middleware/is-admin');
const uploadFunction = require('../middleware/upload-function');

// mmy imports - controllers
const adminController = require('../controllers/admin');

const router = express.Router();

// offer routes
router.post('/offer', isAuth, isAdmin, uploadFunction('images/offer-images').single('image'), adminController.postOffer);
router.patch('/offer/:offerId', isAuth, isAdmin, uploadFunction('images/offer-images').single('image'), adminController.updateOffer);
router.delete('/offer/:offerId', isAuth, isAdmin, adminController.deleteOffer);

// section routes
router.post('/section', isAuth, isAdmin, adminController.postSection);
router.patch('/section/:sectionId', isAuth, isAdmin, adminController.updateSection);
router.delete('/section/:sectionId', isAuth, isAdmin, adminController.deleteSection);

module.exports = router;