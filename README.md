The Anonymous Reporting App is a simple web application that allows users to submit anonymous reports about incidents such as harassment,
bullying, fraud, or other concerns. Users can fill out a form to describe the incident, select a category, and optionally upload supporting
files (e.g., images, documents).The app's frontend is built with HTML, CSS, and JavaScript, providing a clean, user-friendly interface. 
The backend is powered by Node.js and MySQL, ensuring reports are securely stored in a database. The system also handles file uploads 
using Multer and gives users feedback on successful or unsuccessful submissions, all while maintaining their anonymity.This application 
can be used in organizations, schools, or communities where privacy is essential for reporting sensitive issues.

CREATE DATABASE anonymous_reports;
USE anonymous_reports;
CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  attachment VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
