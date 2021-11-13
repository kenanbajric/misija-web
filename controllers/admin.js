// core imports
const fs = require('fs').promises;
const slugify = require('slugify');

// my imports - models
const User = require('../models/user');
const Offer = require('../models/offer');
const Section = require('../models/section');

exports.postOffer = async (req, res, next) => {
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        next(error);
        return;
    }
    const userId = req.userId;
    const title = req.body.title;
    const introduction = req.body.introduction;
    const description = req.body.description;
    const sectionId = req.body.sectionId;
    const imageUrl = req.file.path;
    const slug = slugify(title, {
        lower: true
    })

    const offer = new Offer({
        title: title,
        introduction: introduction,
        description: description,
        sectionId: sectionId,
        imageUrl: imageUrl,
        slug: slug,
        authorId: userId
    })

    try {
        const section = await Section.findById(sectionId);
        section.offers.push(offer);

        await offer.save();
        await section.save();
        res.status(201).json({
            data: {
                message: 'Offer created successufully',
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

exports.postSection = async (req, res, next) => {
    const name = req.body.name;
    const slug = slugify(name, {
        lower: true
    });
    const isOnFront = req.body.isOnFront;
    const published = req.body.published;

    const section = new Section({
        name: name,
        slug: slug,
        isOnFront: isOnFront,
        published: published,
    })

    try {
        await section.save();
        res.status(201).json({
            data: {
                message: 'Section created successufully',
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

exports.updateSection = async (req, res, next) => {
    // kada se na frontend app klikne edit offer, frontend app povuce sve podatke iz baze i upise ih u placeholders
    // prilikom snimanja, radi se owerwrite cijelog dokumenta
    const sectionId = req.params.sectionId;

    const updatedName = req.body.name;
    const updatedPublished = req.body.published;
    const updatedIsOnFront = req.body.isOnFront;
    const updatedSlug = slugify(updatedName, {
        lower: true
    });

    try {
        const section = await Section.findById(sectionId);
        section.name = updatedName;
        section.slug = updatedSlug;
        section.published = updatedPublished;
        section.isOnFront = updatedIsOnFront;
        await section.save();
        res.status(201).json({
            data: {
                message: 'Offer updated successufully',
                section: section
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }

}

exports.updateOffer = async (req, res, next) => {
    // kada se na frontend app klikne edit offer, frontend app povuce sve podatke iz baze i upise ih u placeholders
    // prilikom snimanja, radi se owerwrite cijelog dokumenta

    const offerId = req.params.offerId;
    
    const updatedTitle = req.body.title;
    const updatedIntroduction = req.body.introduction;
    const updatedDescription = req.body.description;
    const updatedSectionId = req.body.sectionId;
    const updatedPublished = req.body.published;
    const updatedImageUrl = req.file.path;
    const updatedSlug = slugify(updatedTitle, {
        lower: true
    });

    try {
        const offer = await Offer.findById(offerId);
        await fs.unlink(offer.imageUrl);

        offer.title = updatedTitle;
        offer.introduction = updatedIntroduction;
        offer.description = updatedDescription;
        offer.sectionId = updatedSectionId;
        offer.imageUrl = updatedImageUrl;
        offer.slug = updatedSlug;
        offer.published = updatedPublished;
        offer.authorId = offer.authorId;

        await offer.save();

        res.status(201).json({
            data: {
                message: 'Offer updated successufully',
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

exports.deleteOffer = async (req, res, next) => {
    const offerId = req.params.offerId;

    try {
        const offer = await Offer.findById(offerId)
        await Offer.findByIdAndRemove(offerId); // delete from database
        await fs.unlink(offer.imageUrl); // delete image file
        res.status(201).json({
            data: {
                message: 'Offer deleted successufully'
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}

exports.deleteSection = async (req, res, next) => {
    const sectionId = req.params.sectionId;

    try {
        const section = await Section.findById(sectionId);
        await Section.findByIdAndRemove(sectionId); // delete from database
        res.status(201).json({
            data: {
                message: 'Section deleted successufully'
            }
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    }
}