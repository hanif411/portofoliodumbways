import multer from "multer";
import path from "path";

const storageProjects = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/projects");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
const storageWorks = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/works");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

export const uploadProjects = multer({
  storage: storageProjects,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("hanya boleh jpg, jpeg, dan png"), false);
    }
  },
});

export const uploadWorks = multer({
  storage: storageWorks,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("hanya boleh jpg, jpeg, dan png"), false);
    }
  },
});
