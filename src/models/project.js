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

export { getAllProjects }