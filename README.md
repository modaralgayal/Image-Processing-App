# Image Processing App

A small full-stack image processing application built to learn job queues. The user uploads an image from the browser, the backend enqueues a resize job in Redis (via BullMQ), and one or more worker processes pick the job up and resize the image with Sharp. Running multiple workers in parallel demonstrates concurrent job processing.

## Architecture

```
React (Vite)  ──POST /upload──▶  Express + Multer  ──enqueue──▶  Redis (BullMQ)  ──▶  Worker (Sharp)
```

- **Frontend** — React + Vite single-page app on `http://localhost:5173`. Lets the user pick an image, previews it, and POSTs it to the backend.
- **Backend** — Express server on `http://localhost:3000`. Receives the upload with Multer, saves it to `backend/uploads/`, and pushes a job onto the `images` queue.
- **Queue** — Redis-backed BullMQ queue named `images`.
- **Worker** — Standalone Node process that consumes jobs from the queue and resizes the image to 800×600 (fit: outside) with Sharp.

## Project layout

```
JobQueueSystem/
├── backend/
│   ├── app.js                       # Express entry point
│   ├── routes/uploadRouter.js       # POST /upload (Multer)
│   ├── services/uploadController.js # Enqueues jobs to BullMQ
│   ├── services/worker.js           # BullMQ worker, runs Sharp
│   └── uploads/                     # Saved upload files
└── Image Processing App/            # React + Vite frontend
    └── src/
        ├── App.jsx                  # Router + nav
        └── pages/                   # Home, About, Contact, Upload
```

## Requirements

- Node.js 18+
- A running Redis instance on `localhost:6379`

Start Redis with Docker if you don't have it installed:

```bash
docker run -d --name redis -p 6379:6379 redis:7
```

## Setup

Install dependencies in both subprojects:

```bash
cd backend && npm install
cd "../Image Processing App" && npm install
```

## Running

You need **three** processes running simultaneously (in addition to Redis):

```bash
# 1. Backend API (port 3000)
cd backend
npm run dev

# 2. Worker (consumes the queue)
cd backend
npm run worker

# 3. Frontend (port 5173)
cd "Image Processing App"
npm run dev
```

Then open `http://localhost:5173`, go to the **Upload** page, pick an image, and click *Upload selected image*. The worker terminal logs `Resizing image …` followed by `Done processing …` once the job finishes.

### Running multiple workers

To see parallel processing, open additional terminals and run `npm run worker` in each. BullMQ distributes jobs across all connected workers.

## API

### `POST /upload`

Multipart form upload, field name `image`.

**Response**

```json
{
  "success": true,
  "message": "Image uploaded successfully to backend",
  "jobId": "12"
}
```

## Tech stack

- **Frontend** — React 19, React Router, Vite
- **Backend** — Express 5, Multer
- **Queue** — BullMQ, ioredis, Redis
- **Image processing** — Sharp
