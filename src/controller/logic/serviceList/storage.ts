import multer from "multer";
import path from "path";
import { categoryType } from "../../../entity/enum/category";
import { ProductDao } from "../../../dao/serviceList/productDao";

const BASE_UPLOAD_PATH = path.resolve(__dirname, "../../../../public");
const productDaoInstance = new ProductDao();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      let folder = "shop";
      const category = req.body.category;
      if (category === categoryType.FOOD) folder = "food";
      else if (category === categoryType.LIHAMOTO) folder = "lihaMoto";

      const dest = path.join(BASE_UPLOAD_PATH, "serviceList", folder);
      cb(null, dest);
    } else if (file.fieldname === "video") {
      const dest = path.join(BASE_UPLOAD_PATH, "videos");
      cb(null, dest);
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export { upload };

const storageTenantImage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      let folder = "tenants";
      const dest = path.join(BASE_UPLOAD_PATH,folder);
      cb(null, dest);
    } else if (file.fieldname === "video") {
      const dest = path.join(BASE_UPLOAD_PATH, "tenants");
      cb(null, dest);
    } else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadTenant = multer({ storage: storageTenantImage });

export { uploadTenant };

const storageEdit = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (file.fieldname === "image") {
      let folder = "shop";
      const product = (req as any).product;

     
      console.log("product-------------",product);
      if (product?.category === categoryType.FOOD) folder = "food";
      else if (product?.category === categoryType.LIHAMOTO) folder = "lihaMoto";

      const dest = path.join(BASE_UPLOAD_PATH, "serviceList", folder);
      cb(null, dest);
    } 
    else if (file.fieldname === "video") {
      const dest = path.join(BASE_UPLOAD_PATH, "videos");
      cb(null, dest);
    }
     else {
      cb(new Error("Invalid field name"), "");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadEdit = multer({ storage: storageEdit });

export { uploadEdit };
