-- Organization Table
CREATE TABLE organization (
	 organization_id SERIAL PRIMARY KEY,
	 name VARCHAR(150) NOT NULL,
	 description TEXT NOT NULL,
	 contact_Email VARCHAR(255) NOT NULL,
	 logo_filename VARCHAR(255) NOT NULL
);





-- Inserting Sample Data into organization

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects','info@brightfuturebuilders.org','brightfuture-logo.png');

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png');

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org',' unityserve-logo.png');



CREATE TABLE service_project(
  project_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_location VARCHAR(255) NOT NULL,
  project_date DATE NOT NULL,
  organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE
  
);



-- UnityServe Volunteers (organization_id = 1)
INSERT INTO service_project (organization_id, title, description, project_location, project_date)
VALUES
  (1, 'Community Food Drive', 'Collecting and distributing non-perishable food items to families in need.', 'Cotonou Central Market', '2026-08-15'),
  (1, 'Elderly Care Visits', 'Volunteers spend the day visiting and assisting elderly residents at a local care home.', 'Golden Years Home, Cotonou', '2026-08-22'),
  (1, 'School Supplies Drive', 'Gathering and distributing school supplies to underprivileged children ahead of the new school year.', 'Akpakpa Community Center', '2026-09-05'),
  (1, 'Neighborhood Cleanup', 'Volunteers clean up litter and debris in local neighborhoods to promote a healthier environment.', 'Fidjrossè Beach Area', '2026-09-19'),
  (1, 'Blood Donation Campaign', 'Partnering with local health services to organize a community blood donation event.', 'Cotonou General Hospital', '2026-10-03');

-- GreenHarvest Growers (organization_id = 2)
INSERT INTO service_project (organization_id, title, description, project_location, project_date)
VALUES
  (2, 'Urban Community Garden Setup', 'Building raised garden beds in a vacant lot to grow fresh produce for the neighborhood.', 'Sainte-Rita, Cotonou', '2026-08-10'),
  (2, 'Composting Workshop', 'Teaching residents how to compost household waste to enrich soil for local farming.', 'Abomey-Calavi Community Hall', '2026-08-28'),
  (2, 'School Garden Program', 'Establishing a vegetable garden at a local school to teach children about sustainable food production.', 'EPP Akassato Primary School', '2026-09-12'),
  (2, 'Farmers Market Support Day', 'Helping local farmers set up and sell produce directly to the community.', 'Dantokpa Market', '2026-09-26'),
  (2, 'Tree Planting Initiative', 'Planting fruit and shade trees in public spaces to improve food access and green cover.', 'Godomey Public Park', '2026-10-10');

-- BrightFuture Builders (organization_id = 4)
INSERT INTO service_project (organization_id, title, description, project_location, project_date)
VALUES
  (4, 'Playground Construction', 'Building a safe playground for children in an underserved community.', 'Zogbo Neighborhood, Cotonou', '2026-08-17'),
  (4, 'Road Pothole Repair', 'Volunteers assist in repairing damaged roads to improve safety and accessibility.', 'Akpakpa-Dodomey Road', '2026-08-31'),
  (4, 'Public Latrine Construction', 'Building sanitary public latrines to improve hygiene in a local community.', 'Sèmè-Kpodji District', '2026-09-14'),
  (4, 'Home Repair for Elderly Residents', 'Repairing roofs and structural damage in homes belonging to elderly community members.', 'Ouidah Village', '2026-09-28'),
  (4, 'Community Well Rehabilitation', 'Restoring a broken well to provide clean water access to a rural community.', 'Allada Rural Area', '2026-10-12');

CREATE TABLE category(
   category_id SERIAL PRIMARY KEY,
   category_name VARCHAR(50) NOT NULL
   
);


CREATE TABLE service_project_category(
   category_id INT NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
   project_id INT NOT NULL REFERENCES  service_project(project_id) ON DELETE CASCADE,
   PRIMARY KEY (project_id,category_id)
   
);




INSERT INTO category (category_id,category_name)
VALUES
 (1,'Healthcare'),
 (2,'Education'),
 (3,'Environment');


INSERT INTO service_project_category(project_id,category_id)

VALUES
	(1,1),
  (2,1),
	(3,2),
	(4,3),
	(5,1),
	(6,3),
	(7,3),
	(8,2),
	(8,3),
	(9,3),
	(10,3),
	(11,2),
	(12,3),
	(13,1),
	(14,1),
	(15,1);