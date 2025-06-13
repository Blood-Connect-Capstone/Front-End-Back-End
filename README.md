# BloodConnect

## Prerequisites

- Node
- npm
- Git
- Supabase

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Blood-Connect-Capstone/Front-End-Back-End
cd Front-End-Back-End
```

### 2. Frontend Setup (Vue.js)

#### Masuk ke folder frontend
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Setup Environment Variables
Buat file `.env` di folder `frontend/` dan tambahkan:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Development
```bash
npm run dev
```

#### Build untuk Production
```bash
npm run build
```

### 3. Backend Setup (Hapi)

#### Masuk ke folder backend
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Setup Environment Variables
Buat file `.env` di folder `backend/` dan tambahkan:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=3000
```

#### Development
```bash
npm run dev
```

#### Production
```bash
npm start
```

## Development Workflow

1. Jalankan backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Di terminal baru, jalankan frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Akses aplikasi di `http://localhost:5173` (frontend) dan `http://localhost:3000` (backend)

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── ...
└── README.md
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - URL backend API
- `VITE_SUPABASE_URL` - URL project Supabase
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

### Backend (.env)
- `SUPABASE_URL` - URL project Supabase
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SECRET_KEY` - Supabase secret key
- `PORT` - Port server backend (default: 3001)
