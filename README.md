# Image Processing Service

A backend-focused image processing service inspired by platforms like Cloudinary.  
This project is built to demonstrate production-oriented backend engineering: secure authentication, scalable image storage, transformation pipelines, caching, and abuse prevention.

The service allows authenticated users to upload images, apply transformations, and retrieve optimized results efficiently.

---

## Tech Stack

**Backend**
- Node.js + Express (TypeScript)
- PostgreSQL + Prisma ORM
- AWS S3 (image storage)
- Sharp (image transformations)
- Redis (caching & rate limiting)
- JWT-based authentication

**Planned**
- Frontend (React + TanStack Query)
- Docker
- CI/CD
- Cloud deployment (AWS)

---

## Current Features

### Authentication
- JWT-based auth
- Protected routes
- Secure access to user-specific resources

### Image Upload & Storage
- Images uploaded via multipart/form-data
- Stored in AWS S3 (no images stored in DB)
- Metadata stored in PostgreSQL via Prisma

### Image Processing & Transformations

Image transformations are handled on the backend using **Sharp**.  
All operations are applied before the image is delivered to the client.

**Supported transformations:**

- **Resize**
  - `width`: Target width in pixels
  - `height`: Target height in pixels
- **Rotate**
  - `rotate`: Rotation angle in degrees
- **Format Conversion**
  - `format`: Output image format (`jpeg`, `png`, `webp`)
- **Compression**
  - `compress`: Compression level to reduce file size
- **Grayscale**
  - `grayscale`: Convert image to grayscale
- **Flip**
  - `flip`: Vertical flip
- **Mirror**
  - `mirror`: Horizontal flip
- **Blur**
  - `blur`: Blur intensity
- **Watermark**
  - `watermarkText`: Text watermark applied to the image

All transformations are optional and can be combined in a single request.



### Caching
- Redis used to cache processed image responses
- Reduces redundant image transformations
- Improves response times for repeated requests

### Rate Limiting
- Redis-backed rate limiting
- Prevents abuse of upload and image retrieval endpoints
- Configurable limits per route

---

## API Overview (High Level)

> Note: Endpoint details may evolve as the project progresses.

- `POST /auth/register` – Register a new user  
- `POST /auth/login` – Authenticate and receive JWT  
- `POST /images/upload` – Upload an image (authenticated)  
- `GET /images` – List user images (authenticated)  
- `GET /images/:id` – Retrieve a processed image (cached)  

---

## Architecture (Current)

- Images stored in **AWS S3**
- Image metadata stored in **PostgreSQL**
- Transformations handled via **Sharp**
- **Redis** sits in front for:
  - Caching transformed outputs
  - Rate limiting requests
- JWT used to protect all sensitive routes

---

## Environment Variables



DATABASE_URL=

JWT_SECRET=

AWS_S3_ACCESS_KEY=

AWS_S3_SECRET_KEY=

AWS_S3_BUCKET_NAME=

AWS_REGION=

REDIS_URL=



---

## Running Locally

```bash
# install dependencies
npm install

# generate prisma client
npx prisma generate

# run migrations
npx prisma migrate dev

# start server
npm run dev
