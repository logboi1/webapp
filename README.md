# Institutional Web Application

This is an institutional web application built using React, SCSS, Node.js, and MongoDB. It provides functionality for both students and staff members.

## Features

- Student Features:
  - Pay ASOGOV dues
  - Create course forms per school semester
  - Update profile information
  - Upload school receipt for approval
  - Print exam permit for approved receipts
  - View seat number for examinations

- Staff Features (Bursar or Registrar):
  - Update profile information
  - Manage application settings
  - Approve student receipts categorized by department

## Technologies Used

- React: A JavaScript library for building user interfaces.
- SCSS: A CSS preprocessor that extends the capabilities of CSS.
- Node.js: A JavaScript runtime environment for server-side development.
- MongoDB: A NoSQL database for storing application data.

## Installation

1. Clone the repository:

   ```shell
   git clone [<repository-url>](https://github.com/logboi1/webapp/)

2. Navigate to the project directory:

   ```shell
   cd webapp
3. Install dependencies:
   ```shell
   yarn install
   
4. Set up environment variables:
- Create a `.env` file in the root directory.
- Specify the required environment variables in the `.env` file, such as database connection details, secret keys, etc.

### Usage
1. Start the development server:
2. The application will be accessible at `http://localhost:3000` in your browser.

## Folder Structure
The project follows a specific folder structure to organize the codebase:

- `backend`: Contains server-side code using Node.js and Express.
- `frontend`: Contains client-side code using React and SCSS.
- `public`: Contains static files that will be served by the server.
- `src`: Contains the source code for both the server and client.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please submit an issue or a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

