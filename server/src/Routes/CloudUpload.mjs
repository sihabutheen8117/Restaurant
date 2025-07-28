import { Router } from "express";
import cloudinary from "../utils/cloudinary.mjs";
import upload from "../middlewares/multer.mjs";

const CloudUpload =Router() ;

CloudUpload.post('/upload/cloud/:folder', upload.array('images', 10) , async (req, res) => {
    try {
        const folderName = req.params.folder;

        const uploadResults = await Promise.all(
            req.files.map((file) =>
              cloudinary.uploader.upload(file.path, { folder: folderName })
            )
          );

        console.log(uploadResults)

        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: uploadResults
        });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error"
      });
    }
  });

CloudUpload.get('/images/folder/:name', async (req, res) => {
    const folderName = req.params.name;
    try {
      console.log(folderName);
      const result = await cloudinary.search
        .expression(`folder:${folderName}`)
        .sort_by('public_id', 'desc')
        .max_results(20)
        .execute();
      console.log(result)
      const images = result.resources.map(file => ({
        public_id: file.public_id,
        url: file.secure_url
      }));
      res.status(200).json({ success: true, images: images });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching images' });
    }
});


CloudUpload.post('/cloud/delete', async (req, res) => {
  try {
    const { public_id } = req.body;

    const result = await cloudinary.uploader.destroy(public_id);

    res.status(200).json({
      success: true,
      message: 'Image deleted',
      result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Deletion failed',
    });
  }
});

export default CloudUpload;