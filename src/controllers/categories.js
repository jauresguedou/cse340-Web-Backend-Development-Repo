import { getAllCategories } from '../models/categories.js';

import { getAllCategoriesByProject } from '../models/categories.js';

import { getAllServiceProjectByCategory } from '../models/categories.js';

import { getCategoryById } from '../models/categories.js';





// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  
// Export any controller functions
export { showCategoriesPage };



const showCategoryByProject = async (req, res) => {
    const projectId = req.params.id;
    const categoriesByProject = await getAllCategoriesByProject(projectId);
    const title = 'Categories By Project';

    res.render('categoriesByProject', { title, categoriesByProject });
};




const showCategoryDetailsPage = async (req, res) =>{
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getAllServiceProjectByCategory(categoryId);
    const title = 'Category Details';

    res.render('category', {title, category, projects,});
};

export {  showCategoryDetailsPage, showCategoryByProject };
