const ImageKit = require("imagekit");
const fs = require('fs');
const config = require('../config/config');

const imagekit = new ImageKit(config.imageKitObj);

exports.uploadImage = async (req, res) => {

    try {
        const image = req.file || null;
        if(!image){
            res.status(400).json({
                status: false,
                message: "File is required."
            });
            return;
        }
        // find size of images
        // const stats = fs.statSync(image.path)
        // const fileSizeInBytes = stats.size;
        // var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        
        const imageFile = fs.readFileSync(image.path);
        const uploadedImage = await imagekit.upload({
            file : imageFile, //required
            fileName : 'GOLENS_IMG_'+new Date().getTime() //required
        });
        fs.unlink(image.path, () => {});
        if(!uploadedImage){
            res.status(400).json({
                status: false,
                message: "Error occured during uploading file"
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Image Added Successfully !!!",
            data : uploadedImage
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }

}

exports.deleteImage = async (req, res) => {
    const fileId = req.params.id;

    try {
        imagekit.deleteFile(fileId, function(error, result) {
            if(error){
                res.status(400).json({
                    status: false,
                    message: "Error in deleting file",
                    error
                });
                return;
            }
            else {
                res.status(200).json({
                    status: true,
                    message: "Image deleted successfully !!!",
                    data : result
                });
                return;
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
}

exports.deleteImageByName = async (req, res) => {
    const imageName = req.params.name;

    try {
        imagekit.listFiles({
            name : imageName
        }, function(error, result) { 
            if(error){
                res.status(400).json({
                    status: false,
                    message: "Error in deleting file",
                    error
                });
                return;
            }
            else {
                const fileId = result && result[0] && result[0].fileId || null;
                if(!fileId){
                    res.status(400).json({
                        status: false,
                        message: "Error in deleting file",
                    });
                    return;
                }
                imagekit.deleteFile(fileId, function(error, result) {
                    if(error){
                        res.status(400).json({
                            status: false,
                            message: "Error in deleting file",
                            error
                        });
                        return;
                    }
                    else {
                        res.status(200).json({
                            status: true,
                            message: "Image deleted successfully !!!",
                            data : result
                        });
                        return;
                    }
                });
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
}