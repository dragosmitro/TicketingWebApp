# TicketingWebApp
 
The Tickeing/Task Planning Web Application is a robust, intuitive tool designed to streamline the process of task management and team collaboration. Engineered using the latest technologies including React and TailwindCSS for the front-end, and Node.js coupled with Express for the back-end, this application is not just a task manager; it's a comprehensive solution for project planning and execution.

Adopting a Single Page Application (SPA) architecture, the application offers a seamless user experience, ensuring that tasks are managed efficiently, without the need for constant page reloads. Whether you are on a desktop, tablet, or mobile device, this application adjusts to your needs, providing a consistent experience 

# Key Features
- User Roles and Management: The application supports different user roles, including administrators, managers, and executing users, each with specific permissions and capabilities. Administrators can add users, defining their roles as either managers or executing users.

- Task Creation and Allocation: Managers have the privilege to create tasks with detailed descriptions, setting them initially to an OPEN state. They can then allocate these tasks to executing users, changing the state to PENDING.

- Task Monitoring and Status Management: Executing users can view their allocated tasks and mark them as COMPLETED once done. Managers have the overview of all tasks, being able to monitor their statuses and eventually mark COMPLETED tasks as CLOSED.

- Historical Task Views: All users can view their historical tasks, ensuring that they have a complete overview of their contributions and progress. Managers have an additional capability to view the task histories of their executing users.

# Advanced Security Features:

- JWT-Based Authentication: The application integrates JWT for secure and reliable authentication, ensuring that every session is protected.
- Persistent Sessions: Users won't have to worry about losing their session after leaving the site. The application intelligently maintains active sessions, automatically logging users back in when they return.
- Encrypted Password Storage: Security is a top priority, and the application ensures that all user passwords are encrypted and stored securely in the database.
