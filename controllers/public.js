// my imports - models
const User = require('../models/user');
const Offer = require('../models/offer');
const Section = require('../models/section');

exports.getAllSections = async (req, res, next) => {
    const count = req.body.count;
    const allSections = [];

    try {
        const sections = await Section.find();
        
        if (count === true) {
            sections.forEach(section => {
                const i = new Object({
                    section: section,
                    count: section.offers.length
                })
                allSections.push(i);
            });
            
        } else {
            sections.forEach(section => {
                const i = new Object({
                    section: section,
                })
                allSections.push(i);
            });
        }
        res.status(201).json({
            data: {
                message: 'Sections fetched successufully',
                sections: allSections,
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.getSingleSection = async (req, res, next) => {
    const sectionId = req.params.sectionId;

    try {
        const section = await Section.findById(sectionId);
        res.status(201).json({
            data: {
                message: 'Sections fetched successufully',
                section: section,
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.getSingleOffer = async (req, res, next) => {
    const offerId = req.params.offerId;
    
    try {
        const offer = await Offer.findById(offerId);
        res.status(201).json({
            data: {
                message: 'Sections fetched successufully',
                offer: offer,
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.getAllOffers = async (req, res, next) => {
    const authorId = req.body.authorId;
    const sectionId = req.body.sectionId;
    let offers;
    try {
        if (authorId && sectionId) {
            offers = await Offer.find({authorId: authorId, sectionId: sectionId});
            console.log("Both");
        } else if (authorId) {
            const author = await User.findById(authorId);
            offers = await Offer.find({authorId: authorId});
            console.log("Author");
        } else if (sectionId) {
            offers = await Offer.find({sectionId: sectionId});
            console.log("Section");
        } else {
            offers = await Offer.find();
            console.log("None");
        }

        res.status(201).json({
            data: {
                message: 'Offers fetched successufully',
                offers: offers,
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}
