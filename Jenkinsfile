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
  }
}
