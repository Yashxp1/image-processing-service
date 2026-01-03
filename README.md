# Image Processing Service

A backend-focused image processing service designed to demonstrate real-world backend engineering, cloud infrastructure, and performance optimisation.

This project prioritises **scalability, cost-awareness, and clean system boundaries** over visual complexity.

---

## 🧠 What This Service Does

- Authenticated users can upload images
- Images can be transformed (resize, rotate, grayscale, etc.)
- Image metadata is stored in a database
- Image files are stored privately in S3
- Images are delivered directly via a CDN (CloudFront)
- The backend is **never** in the hot path for image delivery

---

## 🏗️ High-Level Architecture

Client (React)
→
API (Express + TypeScript)
→
PostgreSQL (metadata)
→
Redis (rate limiting & caching)
→
AWS S3 (private image storage)
→
CloudFront CDN (global image delivery)


- The backend **never serves image bytes**
- Images are fetched directly from CloudFront
- S3 remains private using Origin Access Control (OAC)

---

## ✨ Features

### Core
- Image upload with validation
- Image transformations using Sharp
- Metadata storage using PostgreSQL + Prisma
- JWT-based authentication
- Per-user image isolation

### Image Delivery
- Private S3 bucket
- CloudFront CDN with OAC
- CDN-cached image delivery (no signed S3 URLs)
- Cold cache vs warm cache behavior handled by CDN

### Performance & Safety
- Redis-based rate limiting
- Redis caching for image metadata
- Backend removed from the hot path for image delivery

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express**
- **TypeScript**
- **Prisma + PostgreSQL**
- **Redis**
- **Sharp**
- **JWT Authentication**

### Infrastructure
- **AWS S3** (private bucket)
- **AWS CloudFront** (CDN with OAC)

### Frontend
- **React + TypeScript**
- **TanStack Query**
- Minimal UI by design (backend-first project)

---

## 🖼️ Image Processing

Image transformations are handled using **Sharp**

***Supported transformations:***

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

Processed images are stored in S3 and delivered via CloudFront, allowing:
- Low latency delivery
- Reduced backend load
- Automatic edge caching

---

## 🔐 Security Decisions

- JWT-based authentication for API access
- Images are **not publicly accessible via S3**
- CloudFront uses **Origin Access Control (OAC)** to securely access S3
- AWS WAF intentionally not enabled (resume project, low attack surface)

This setup balances **security, cost, and simplicity**.

---

## ⚡ Performance Notes

- First request to an image is a **cold cache miss** and fetches from S3
- Subsequent requests are served from **CloudFront edge locations**
- Typical latency improvement observed: **~2s → <300ms**

---

## 📌 Why This Project Exists

This project was built to go beyond CRUD apps and explore:
- Real backend performance constraints
- CDN-based architectures
- Practical cloud infrastructure decisions
- Production-style system design


