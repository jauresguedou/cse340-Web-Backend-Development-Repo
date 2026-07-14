import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { getOrganizationById } from '../models/organizations.js';
import { getAllProjects } from '../models/projects.js';



const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

export { showOrganizationsPage };



const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationById(organizationId);
    const projects = await getAllProjects();
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

export { showOrganizationDetailsPage };