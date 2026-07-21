import db from './db.js'

const getAllProjects = async () => {
    const query = `
      SELECT 
        p.project_id, 
        p.title, 
        p.description, 
        p.project_location, 
        p.project_date, 
        o.organization_id,
        o.name AS organization_name,
        o.contact_email,
        o.logo_filename
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
    `;

    const result = await db.query(query);
    return result.rows;
}







const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_date AS date,
        p.project_location AS location,
        p.organization_id,
        o.name AS organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
      WHERE p.project_date >= CURRENT_DATE
      ORDER BY p.project_date ASC
      LIMIT $1;
    `;

    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);

    return result.rows;
};



const getProjectDetails = async (id) => {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.project_date AS date,
        p.project_location AS location,
        p.organization_id,
        o.name AS organization_name
      FROM public.service_project p
      JOIN public.organization o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };


const createProject = async(title, description,location,date,organizationId) => {
            const query = `
                INSERT INTO project (title,description,location,date,organizationId)
                 
                VALUES($1,$2,$3,$4,$5)
                  
                RETURNING project_id;   
            
            `;

            const queryParams = [title,description,location,date,organizationId];
            const  result = await db.query(query,queryParams);

            if(result.rows.length === 0) {
               throw new Error('Failed to create project'); 
            }
            if (process.env.ENABLE_SQL_LOGGING === 'true') {
                 console.log('Created new project with ID:', result.rows[0].project_id);
            }
            return result.rows[0].project_id;
     
}

export { createProject};