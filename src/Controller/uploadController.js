const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('../utils/firebase'); 

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Video yuklanmagan');
    }

    const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
    const storageRef = ref(storage, fileName);
    const metadata = {
      contentType: req.file.mimetype,
    };

    await uploadBytes(storageRef, req.file.buffer, metadata);
    const url = await getDownloadURL(storageRef);
    res.send({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Nimadir xatolik ketdi. Iltimos keyinroq urinib ko'ring"});
  }
};

const uploadImage = async (req, res) => {
  if (!req.file) {
      res.status(400).send('Rasm yuklanmagan');
      return;
  }

  try {
      const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
      const storageRef = ref(storage, fileName);
      const metadata = {
          contentType: req.file.mimetype,
      };
      
      

      // Storage'ga yuklash
      uploadBytes(storageRef, req.file.buffer, metadata)
          .then(() => {
              getDownloadURL(storageRef)
                  .then((url) => {
                      res.send({ url });
                  })
                  .catch((err) => {
                      console.error(err);
                      res.status(500).json({ message: "Nimadir xatolik ketdi. Iltimos keyinroq urinib ko'ring" });
                  });
          })
          .catch((err) => {
              console.error(err);
              res.status(500).json({ message: "Nimadir xatolik ketdi. Iltimos keyinroq urinib ko'ring" });
          });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server xatosi" });
  }
};

module.exports = {
  uploadVideo,
  uploadImage
};
