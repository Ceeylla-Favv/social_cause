const Cause = require('../model/Cause');
const cloudinary = require('../config/cloudinary');

const createCause = async(req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required!' });
        }

        const uploadImage = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: 'Causes'},
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(fileBuffer);
            });
        };

        const uploadResult = await uploadImage(req.file.buffer);

        const cause = new Cause({
            title,
            description,
            imageUrl: uploadResult.secure_url
        });
        await cause.save();

        return res.status(201).json(cause);
     } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getAllCauses = async (req, res) => {
    try {
        const causes = await Cause.find();
        return res.status(200).json(causes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getCauseById = async (req, res) => {
    try {
        const { id } = req.params;
        const cause = await Cause.findById(id);

        if (!cause) {
            return res.status(404).json({ message: 'Cause not found' });
        }
        return res.status(200).json(cause);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const updateCause = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const cause = await Cause.findById(id);

        if (!cause) {
            return res.status(404).json({ message: 'Cause not found!' });
        }

        if (title) {
            cause.title = title;
        }

        if (description) {
            cause.description = description;
        }

        if (req.file) {
            if (cause.imageUrl) {
                const publicId = cause.imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`Causes/${publicId}`);
            }

            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'Causes'},
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            });

            cause.imageUrl = uploadResult.secure_url;
        }

        await cause.save();

        return res.status(200).json(cause);
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

const deleteCause = async (req, res) => {
    try {
        const { id } = req.params;
        const cause = await Cause.findByIdAndDelete(id);

        if(!cause) {
            return res.status(404).json({ message: 'Cause not found' });
        }
        return res.status(200).json({ message: 'Cause deleted successfully'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = {createCause, getAllCauses, getCauseById, updateCause, deleteCause};