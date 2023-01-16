def subject_content = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER}"
def body_content = '${JELLY_SCRIPT,template="html"}'
def project_name = 'term-curation-ui'
def dev_deployment_instance = 'dev.backoffice.term.helper.scio.services'
// def stg_deployment_instance = 'stg.submission.era.scio.services'
// def prod_deployment_instance = ''

pipeline {
    agent any

    stages {
        stage('Fetching SCM repo') {
            steps {
                echo 'Fetching SCM repo'

                script {
                    checkout scm
                    sh 'git rev-parse --short HEAD > .git/commit-id'
                    commit_id = readFile('.git/commit-id').trim()
                }
            }
        }

        stage('Building & pushing docker images to DockerHub (dev)') {
            when {
                branch 'release/development'
            }
            steps {
                    echo 'Building project'

                    script {
                        echo 'Downloading from S3 bucket'
                        withAWS(region: 'us-east-2', credentials:'jenkins-aws') { \
                            // s3Download(file: '.env', bucket: 'scio-project-envs', path: "reactjs/${project_name}/dev.env", force:true)
                            s3Download(file: '.npmrc', bucket: 'scio-project-envs', path: 'reactjs/fontawesome_npmrc', force:true)
                        }

                        docker.withRegistry('https://index.docker.io/v1/', 'DockerHub') {
                            docker.build("sciohub/${project_name}:dev", '.').push()
                        }
                    }
            }
        }

        stage('Deployment (dev)') {
            when {
                branch 'release/development'
            }
            steps {
                echo "Deploying to ${dev_deployment_instance}"

                script {
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} docker login -u $USERNAME -p $PASSWORD"
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} sudo mkdir -p /var/lib/app/${project_name}-dev"
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} sudo chown -R scio:scio /var/lib/app/${project_name}-dev"
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} docker rm -f react-app" // stop container if already running under the defined container name
                            sh "scp -P 1412 -o StrictHostKeyChecking=no docker-compose.dev.yml scio@${dev_deployment_instance}:/var/lib/app/${project_name}-dev"
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} docker-compose -f /var/lib/app/${project_name}-dev/docker-compose.dev.yml pull"
                            sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${dev_deployment_instance} docker-compose -f /var/lib/app/${project_name}-dev/docker-compose.dev.yml up -d"
                        }
                    }
                }
            }
        }
    }

    // Cleaning Jenkins workspace
    post {
        always {
            sh 'docker image prune -a -f' // remove built images
            emailext(body: body_content, mimeType: 'text/html',
            replyTo: '$DEFAULT_REPLYTO', subject: subject_content,
            to: 'dev@scio.systems', attachLog: true)

            cleanWs()
        }
    }
}
