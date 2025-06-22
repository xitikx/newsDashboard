pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = 1
    AWS_ACCESS_KEY_ID = 'your-access-key-id' // Replace with actual key or handle via Jenkins credentials securely
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key') // Use Jenkins credentials ID
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/xitikx/newsDashboard.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        bat 'docker build -t news-fetcher .'
      }
    }

    stage('Run Fetcher Container') {
      steps {
        bat '''
          docker run --rm ^
            -e NEWS_API_KEY=39cb553effd2496ca94999765f343633 ^
            -e COUNTRY=in ^
            -e CATEGORY=technology ^
            -v %cd%\\frontend:/app/news-fetcher/frontend ^
            news-fetcher
        '''
      }
    }

    stage('Archive News JSON') {
      steps {
        archiveArtifacts artifacts: 'frontend/news.json', fingerprint: true
      }
    }

    stage('Upload to S3') {
      steps {
        bat '''
          aws s3 cp frontend/news.json s3://news-dashboard-artifacts/news.json --region us-east-1 --acl public-read
        '''
      }
    }
  }
}
