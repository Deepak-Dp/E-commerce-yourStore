 1. Initialize the project
         npm init -y
 2.   Install Required Packages

          npm install express mongoose dotenv cors jsonwebtoken bcryptjs cloudinary resend
          If using nodemon (for development):


 3. npm install --save-dev nodemon

 4. Add Scripts to package.json

        "scripts": {
          "start": "node server.js",
          "dev": "nodemon server.js"
        }



5. Environment Variables (.env)
Create a .env file in the root of your project with the following content:

env

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/your-db-name

# Resend (for sending emails)
RESEND_API_KEY=your-resend-api-key

# Authentication
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# Cloudinary (for file uploads)
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
⚠ Never commit .env to GitHub. Add it to .gitignore.




run this app 
  npm run dev
  

    
