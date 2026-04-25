# Udaan Full-Stack EC2 Deployment

Use the repository root `docker-compose.yml` for production. It builds the FastAPI backend, builds the React app, serves the frontend with Nginx, and proxies `/api/*` to the backend container.

## EC2 Setup

- AMI: Ubuntu Server 22.04 or 24.04 LTS.
- Security group inbound rules:
  - SSH `22` from your IP.
  - HTTP `80` from anywhere for the demo.
- Instance size: `t2.micro`/`t3.micro` can work for a hackathon demo, but `t3.small` is safer if many judges test at once.

## Install Docker

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

Log out and back in after adding the user to the Docker group, or run the next commands with `sudo`.

## Configure Environment

From the repository root:

```bash
cp Udaan/.env.example Udaan/.env
nano Udaan/.env
```

Required values:

```env
GEMINI_API_KEY=your_google_ai_studio_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret_at_least_32_chars
JWT_EXPIRE_MINUTES=1440
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_MODELS=gemini-2.5-flash-lite,gemini-2.5-flash,gemini-2.0-flash
GEMINI_TIMEOUT_SECONDS=12
```

Do not commit real secrets.

## Launch

Run this from the repository root, not from `Udaan/`:

```bash
docker compose up --build -d
```

Open:

```text
http://your-ec2-public-ip/
```

The frontend calls `/api`, and Nginx routes that to the backend container.

## Verify

```bash
docker compose ps
docker compose logs -f backend
curl http://localhost/
curl http://localhost/api/
```

For updates:

```bash
git pull
docker compose up --build -d
```
