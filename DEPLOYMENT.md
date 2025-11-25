# Task Manager - Deployment Guide

## Free Deployment Setup

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Deploy Backend**:
   - Connect your GitHub repository
   - Create a new Web Service
   - Select the `Backend` folder as root directory
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node
     - **Plan**: Free

3. **Environment Variables** (Add in Render dashboard):
   ```
   MONGO_URI=mongodb+srv://test:iXJrXp7bDeRBpW2R@taskmanager.sta7clb.mongodb.net/?retryWrites=true&w=majority&appName=taskManager
   JWT_SECRET=9368d28cc4306e229103514eb81295c20b2db7c5897caeceb20a9cd2c7a9f2d0f024ec4629cee4286a22c0ad5d48ac4651664062eae12052c8ef85c51e044f3e
   ADMIN_INVITE_TOKEN=4588944
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```

4. **Note your backend URL**: `https://your-app-name.onrender.com`

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Deploy Frontend**:
   - Import your GitHub repository
   - Select the `Frontend/task-manager` folder as root directory
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables** (Add in Vercel dashboard):
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

4. **Update Backend CORS**:
   - Go to your Render dashboard
   - Update `CLIENT_URL` environment variable with your Vercel domain

### Alternative: Netlify Frontend Deployment

1. **Create Netlify Account**: Sign up at [netlify.com](https://netlify.com)

2. **Deploy**:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `Frontend/task-manager`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

## Post-Deployment Steps

1. **Update API URLs**: Replace placeholder URLs with actual deployment URLs
2. **Test Authentication**: Verify login/signup functionality
3. **Test File Uploads**: Ensure image uploads work correctly
4. **Monitor Performance**: Check Render logs for any issues

## Important Notes

- **Free Tier Limitations**:
  - Render: Service sleeps after 15 minutes of inactivity
  - Vercel: 100GB bandwidth limit per month
  - MongoDB Atlas: 512MB storage limit

- **Security**: All sensitive data is properly configured with environment variables
- **CORS**: Configured to accept requests from your frontend domain
- **Health Check**: Available at `/health` endpoint

## Troubleshooting

- **Backend not responding**: Check Render logs and ensure all environment variables are set
- **CORS errors**: Verify CLIENT_URL matches your frontend domain exactly
- **Build failures**: Check package.json scripts and dependencies