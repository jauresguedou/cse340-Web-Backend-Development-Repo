import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';

import { getProjectsByOrganizationId } from '../models/projects.js';




const organizationsPage = async (req, res) => {
    const showOrganizationsPage = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

export { showOrganizationsPage };



const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

export { showOrganizationsPage, showOrganizationDetailsPage };