import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sendError from "http-errors";
import MimeTypes from "../utils/MimeTypes";

const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname + ".jpg");
    },
  }),
  // dest: "./uploads",
  limits: { fileSize: 1 * 1000000 },
  fileFilter: (req, file, cb) => {
    const supportedFormats = [MimeTypes[".webp"], MimeTypes[".jpeg"]];
    const isSupportedFormat = supportedFormats.includes(file.mimetype);

    if (isSupportedFormat) return cb(null, true);

    cb(new sendError.UnsupportedMediaType("file format is not supported"));
  },
};

function uploadFile(formField: string) {
  const upload = multer(multerConfig).single(formField);

  return function (req: Request, res: Response, next: NextFunction) {
    upload(req, res, (err) => {
      const file = req.file as Express.Multer.File;

      if (!file) {
        next(new sendError.BadRequest("file not sent"));
      }

      if (err) {
        return next(err);
      }

      next();
    });
  };
}

export default uploadFile;
