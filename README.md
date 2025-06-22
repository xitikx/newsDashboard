# 🗞️ News Dashboard

A lightweight, full-stack news dashboard that fetches real-time headlines from the NewsAPI and deploys them to a publicly accessible static website using Jenkins CI/CD and AWS S3.

## 🚀 Features

- Fetches latest news based on country and category using **NewsAPI**
- Transforms and saves articles as `news.json`
- Clean, responsive frontend built with **HTML/CSS/JavaScript**
- Hosted on **AWS S3** as a static website
- Automated CI/CD pipeline using **Docker** and **Jenkins**
- Secure API key handling and automated JSON + HTML upload to S3

## 🛠️ Tech Stack

- **Backend**: Node.js, Axios, NewsAPI
- **Frontend**: HTML, CSS, JavaScript
- **DevOps**: Docker, Jenkins, AWS S3 (Static Hosting), AWS CLI

## ⚙️ CI/CD Pipeline (Jenkins)

1. **Checkout** code from GitHub
2. **Build** Docker image
3. **Run** fetcher container to generate `news.json`
4. **Upload** `news.json` and `index.html` to AWS S3
5. **Serve** as a static website via S3 (CORS & permissions configured)

## 🔐 Secrets & Configuration

- API Key stored in `config.json` or passed via environment variable.
- AWS credentials handled securely in Jenkins using Credential Store.

## 🌐 Live Preview

**🔗** [news-dashboard-artifacts.s3-website-us-east-1.amazonaws.com](http://news-dashboard-artifacts.s3-website-us-east-1.amazonaws.com)

