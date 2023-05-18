# Week 5 — DynamoDB and Serverless Caching

## DATA Modelling 

on this Step we've been understanding our data, selecting the appropriate database type, optimizing for access patterns, and leveraging the flexibility and scalability benefits of NoSQL technology

Pattern A: Shows the messages. Users can see the list of the messages that belong to a message group.
Pattern B: Shows the message group conversation with a specific user.
Pattern C: Create a new message in a new message group.
Pattern D: Create a new message in an exisintg group.

![screen --> ](./ressources/patterns.jpeg)

## Implementing scripts for database actions
    - drop 
    - list-tables 
    - scan  
    - schema-load
    - seed

![screen --> ](./ressources/5-2.png)


## Implement Pattern Scripts for Read and List Conversations

  - getting the conversation

   ![screen --> ](./ressources/5-7.png)

  - Listing conversations

   ![screen --> ](./ressources/5-6.png)

## Implementing the Update of  Cognito ID Script for Postgres Database
 
![screen --> ](./ressources/5-9.png)

![screen --> ](./ressources/5-10.png)

![screen --> ](./ressources/5-11.png)

## Implement (Pattern A) Listing Messages in Message Group into Application

![screen --> ](./ressources/5-13.png)

     

## 	Implement (Pattern B) Listing Messages Group into Application
     
![screen --> ](./ressources/5-16.png)

## 	Implement (Pattern C) Creating a Message for an existing Message Group into Application

![screen --> ](./ressources/5-14.png)

##  Implement (Pattern D) Creating a Message for a new Message Group into Application

![screen --> ](./ressources/5-17.png)



##  Implement (Pattern E) Updating a Message Group using DynamoDB Streams


   ![screen --> ](./ressources/5-21.png)

   ![screen --> ](./ressources/5-22.png)

   ![screen --> ](./ressources/5-23.png)
   
   ![screen --> ](./ressources/5-24.png)