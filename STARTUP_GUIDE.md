# Project Startup Guide

To set up the environment correctly, follow this order:

## 1. Database (Docker)
First, ensure the database is running.
```bash
# In the root folder or where docker-compose.yml is located
docker-compose up -d
```

## 2. Backend (API)
Once the database is ready, start the backend.
```bash
cd riwi-sportsline
npm start
```
*The backend will run on port 3000.*

## 3. Frontend (Web Client)
In a separate terminal, start the frontend.
```bash
cd riwi-sportsline-frontend
npm start
```
*The frontend will run at http://localhost:4200.*

## 4. Data Seed (Optional)
**You only need to run this once** to populate the initial database or if you have cleared the data. It is not necessary to run it every time you start the project.
```bash
cd riwi-sportsline
npm run seed
```

---
**Important Note:** If you try to start the backend and see an error `EADDRINUSE :::3000`, it means a process is already running on that port. You must stop it before starting a new one.
