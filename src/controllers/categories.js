import { getAllCategories } from '../models/categories.js';

import { getAllCategoriesByProject } from '../models/categories.js';

import { getAllServiceProjectByCategory } from '../models/categories.js';

import { getCategoryById } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { updateCategoryAssignments } from '../models/categories.js';
import { updateCategory } from '../models/categories.js';
import { createCategory } from '../models/categories.js';
import { validationResult,body } from 'express-validator';




const categoryValidation = [
        body('name')
          .trim()
          .isLength({min:3,max:100})
          .withMessage('Category name must be between 3 and 100 characters')

];

export {categoryValidation};


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


const showAssignCategoriesForm = async(req,res) => {
      const projectId = req.params.projectId
      const projectDetails =  await getProjectDetails(projectId);
      const categories = await getAllCategories();
      const assignedCategories = await getAllCategoriesByProject(projectId);
      const title = "Assign Categories to Project"

      res.render('assign-categories', {title,projectId,projectDetails,categories,assignedCategories });

};


export {showAssignCategoriesForm};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export {processAssignCategoriesForm};



const showNewCategoryForm = async (req, res) =>{
           
    const title = 'Add a new Category';

    res.render('new-category', {title});


};

export {showNewCategoryForm};


const processNewCategoryForm = async (req,res) => {

        const results = validationResult(req);

        if(!results.isEmpty()) {

            results.array().forEach((error) =>{
                req.flash('error', error.msg)
            })
            return res.redirect('/new-category');
        }

        try { 
            const {name} = req.body;
            const categoryId = await createCategory(name);
            req.flash('notice','Category created successfully');
            return res.redirect('/categories');
        
        }catch(error) {
            req.flash('error', 'Failed to create category' );
             return res.redirect('/new-category');
        }





}

export {processNewCategoryForm};


const showEditCategoryForm = async(req,res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);


    const title = 'Edit Category';

    res.render('edit-category', {title,category});


}

export {showEditCategoryForm};

const processEditCategoryForm = async(req,res) => {
     const categoryId = req.params.id;

     const {name} = req.body;

      const results = validationResult(req);

     if(!results.isEmpty()) {
          results.array().forEach((error) => {
              req.flash('error', error.msg);
          })


         return res.redirect('/edit-category/' + req.params.id);   

     }

     await updateCategory(name,categoryId);

     req.flash('success', 'Category successfully updated');
     res.redirect(`/category/${categoryId}`);

    





} 

export {processEditCategoryForm};
