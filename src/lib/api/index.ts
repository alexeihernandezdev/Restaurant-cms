import { register } from "./auth";
import { createCategory, updateCategory, deleteCategory } from "./categories";
import { createDish, updateDish, deleteDish } from "./dishes";
import { uploadImage } from "./upload";
import { updateMenuStyle } from "./menu-styles";

export * from "./auth";
export * from "./categories";
export * from "./dishes";
export * from "./upload";
export * from "./menu-styles";

export const api = {
  auth: {
    register,
  },
  categories: {
    createCategory,
    updateCategory,
    deleteCategory,
  },
  dishes: {
    createDish,
    updateDish,
    deleteDish,
  },
  upload: {
    uploadImage,
  },
  menuStyles: {
    updateMenuStyle,
  },
};
