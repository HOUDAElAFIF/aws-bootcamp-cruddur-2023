# Week 1 — App Containerization 🚀
## - First we will start by adding the notifications feature to our app 
- adding the notifications's activity the the flask's services 
- adding the notifactions's page in the recat-js frontend 

![Result  --> ](./ressources/17.png)

## - creating dockerfiles for the frontend & backend
[ 👉 frontend's dockerfile  ](../backend-flask/Dockerfile)

[ 👉 backend's dockerfile ](../fronted-react-js/Dockerfile)

## - using Docker Compose to launch our multicontainer APP 
[ 👉 Docker-compose file  ](../docker-compose.yml)

![Result  --> ](./ressources/15.png) 



## - Extending the docker file to set up DynamoDB local and Postgres

[ 👉 Docker-compose file ](../docker-compose.yml)

![Result  --> ](./ressources/18.png) 

### - testing Postgres 

![Result  --> ](./ressources/19.png)

### - testing DynamoDB
```
aws dynamodb create-table \
    --table-name Music \
    --attribute-definitions \
        AttributeName=Artist,AttributeType=S \
        AttributeName=SongTitle,AttributeType=S \
    --key-schema \
        AttributeName=Artist,KeyType=HASH \
        AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD

```

![Result  --> ](./ressources/20.png)

## - Docker container security  best practices
👉 [Link to the tutorial ](https://www.youtube.com/watch?v=OjZz4D0B-cA&list=PLBfufR7vyJJ7k25byhRXJldB5AiwgNnWv&index=25)
   - image vulnerability scanning
   - use secret management services
   - keep docker & host updated to last security patches 
   - docker deamon and containers should run in a non-user mode

 🚩 **Trying -snyk- for image vulnarebility scanning**

![Result  --> ](./ressources/21.png) 

# Since we have completed the homework assignments, let's move on to tackling some homework challenges 🏆

## 1- Push and tag a image to DockerHub
-  create a dockerhub account , then -->
![DEMO  --> ](./ressources/22.png) (./ressources/23.png) 

![DEMO  --> ](./ressources/24.png)

## 2- Launch an EC2 instance that has docker installed 
