const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createDir = (folder) => {
  const dir = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
};

const storage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createDir(folder));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const isValid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Faqat rasm fayllar qabul qilinadi"), false);
  }
};

const uploadCarImages = multer({
  storage: storage("cars"),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
  { name: "exterior", maxCount: 10 },
  { name: "interior", maxCount: 5 }
]);

const uploadCategoryImage = multer({
  storage: storage("categories"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single("image");

const uploadAvatar = multer({
  storage: storage("avatars"),
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single("avatar");

module.exports = { uploadCarImages, uploadCategoryImage, uploadAvatar };