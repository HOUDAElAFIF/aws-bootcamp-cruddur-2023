# Week 1 — App Containerization 
## First we will start by adding the notifications feature to our app 
- adding the notifications's activity the the flask's services 
- adding the notifactions's page in the recat-js frontend 

![Result  --> ](./journal/ressources/17.png)

## - creating dockerfiles for the frontend & backend
![frontend's dockerfile --> ](./backend-flask/Dockerfile)

![backend's dockerfile --> ](./fronted-react-js/Dockerfile)

## - using Docker Compose to launch our multicontainer APP 
![Docker-compose file  --> ](./docker-compose.yml)

![Result  --> ](./journal/ressources/14.png) 



## - Extending the docker file to set up DynamoDB local and Postgres

![Docker-compose file  --> ](./docker-compose.yml)

![Result  --> ](./journal/ressources/17.png) 

### testing Postgres 

![Result  --> ](./journal/ressources/19.png)

### testing DynamoDB
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

![Result  --> ](./journal/ressources/20.png)