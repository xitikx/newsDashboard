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
        sh 'docker build -t news-fetcher .'
      }
    }

    stage('Run Fetcher Container') {
      steps {
        sh 'docker run -v $WORKSPACE/frontend:/app/frontend news-fetcher'
      }
    }

    stage('Archive News JSON') {
      steps {
        archiveArtifacts artifacts: 'frontend/news.json', fingerprint: true
      }
    }
  }
}
