# Amazon EC2 Deployment Guide for Udaan Backend

This guide outlines the steps to deploy your Dockerized Udaan backend to an Amazon EC2 instance.

## 1. Prepare your EC2 Instance
* **AMI:** Ubuntu Server 22.04 LTS (recommended)
* **Instance Type:** t2.micro (eligible for Free Tier) or larger.
* **Security Group Rules:**
    * SSH (Port 22): From your IP.
    * Custom TCP (Port 8000): From anywhere (or your frontend's IP).

## 2. Connect to your Instance
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

## 3. Install Docker & Docker Compose
Run the following commands on your EC2 instance:
```bash
# Update packages
sudo apt-get update

# Install Docker
sudo apt-get install -y docker.io

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group
sudo usermod -aG docker $USER
# (Log out and log back in for this to take effect)

# Install Docker Compose
sudo apt-get install -y docker-compose-v2
```

## 4. Deploy the Application

### Option A: Via Git (Recommended)
1. Clone your repository:
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>/Udaan
   ```

### Option B: Via SCP
1. Transfer files from your local machine:
   ```bash
   scp -i "your-key.pem" -r ./Udaan ubuntu@your-ec2-public-ip:~/
   ```

## 5. Configure Environment Variables
On the EC2 instance, create the `.env` file in the `Udaan` directory:
```bash
nano .env
```
Paste your production variables:
```env
GEMINI_API_KEY=your_key
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE_MINUTES=1440
```

## 6. Launch the Backend
Navigate to the folder containing `docker-compose.yml` and run:
```bash
docker compose up --build -d
```

## 7. Verification
Check if the container is running:
```bash
docker ps
```
Test the health check from your local browser or terminal:
```bash
curl http://your-ec2-public-ip:8000/
```

---
### Maintenance
* **View Logs:** `docker compose logs -f`
* **Stop Backend:** `docker compose down`
* **Update Backend:** `git pull` then `docker compose up --build -d`
