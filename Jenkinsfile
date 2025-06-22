pipeline {
  agent any

  environment {
    DOCKER_BUILDKIT = 1
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
        withCredentials([
          usernamePassword(
            credentialsId: 'aws-cred',
            usernameVariable: 'AWS_ACCESS_KEY_ID',
            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
          )
        ]) {
          bat '''
            aws configure set aws_access_key_id %AWS_ACCESS_KEY_ID%
            aws configure set aws_secret_access_key %AWS_SECRET_ACCESS_KEY%
            aws s3 cp frontend/news.json s3://news-dashboard-artifacts/news.json --region us-east-1
          '''
        }
      }
    }
  }
}
