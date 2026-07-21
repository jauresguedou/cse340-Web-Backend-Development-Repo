import db from './db.js'

const getAllCategories = async() => {
    const query = `
      SELECT category_id, category_name
      FROM public.category
     `;

     const result = await db.query(query);
     return result.rows;
}


const getCategoryById = async(id) => {
    const query = `
       SELECT
        category_id,
        category_name
       FROM public.category
       WHERE category_id = $1;
         
      
    
    
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0]:null;

}


const getAllCategoriesByProject = async (projectId) => {
    const query = `
      SELECT
        c.category_id,
        c.category_name
      FROM public.category c
      JOIN public.service_project_category pc ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.category_name;
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getAllServiceProjectByCategory = async (categoryId) => {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_location,
        p.project_date,
        p.organization_id
      FROM public.service_project p
      JOIN public.service_project_category pc ON p.project_id = pc.project_id
      WHERE pc.category_id = $1
      ORDER BY p.project_date, p.title;
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

export {
    getAllCategories,
    getCategoryById,
    getAllCategoriesByProject,
    getAllServiceProjectByCategory
    
};


const assignCategoryToProject = async(projectId,categoryId) => {
     const query = `
       INSERT INTO service_project_category (project_id,category_id)
       VALUES($1, $2);
       
       
     `;
     await db.query(query, [categoryId,projectId]);   
}

const updateCategoryAssignments = async (projectId,categoryIds) => {
  const deleteQuery = `
    DELETE FROM service_project_category
    WHERE project_id = $1;
  
  `;
  await db.query(deleteQuery, [projectId]);
  for (const categoryId of categoryIds) {

     await assignCategoryToProject(categoryId,projectId);
  }
}

export {assignCategoryToProject,updateCategoryAssignments};
