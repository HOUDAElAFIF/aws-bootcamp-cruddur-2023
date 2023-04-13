# Week 4 — Postgres and RDS

##  Create RDS Postgres Instance on AWS and Locally 

To create an RDS instance on aws , we will use a CLI command.

```bash
aws rds create-db-instance \
  --db-instance-identifier cruddur-db-instance \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version  14.6 \
  --master-username "" \
  --master-user-password ""\
  --allocated-storage 20 \
  --availability-zone us-east-1a \
  --backup-retention-period 0 \
  --port 5432 \
  --no-multi-az \
  --db-name cruddur \
  --storage-type gp2 \
  --publicly-accessible \
  --storage-encrypted \
  --enable-performance-insights \
  --performance-insights-retention-period 7 \
  --no-deletion-protection

```
![DEMO --> ](./ressources/4-1.png)

 To create a local insatance we'll use the following command 
 ```bash

psql -U postgres -h localhost
DROP database cruddur; #drop it if it exist.
CREATE database cruddur;  
 ```

 ### some usfel command on postgres
  ``` 
  \l # list all databases 
  \c database_name -- Connect to a specific database
  \dt -- List all tables in the current database
  \x on -- expanded display when looking at data
  \q -- Quit PSQL

  ```

  ## - Generate UUIDs

  We will use an extension called uuid-ossp  This will generate  string that will  be used as an ID instead of a number. 
 ##  - schema.sql
  this file will be used to define the database tables when creating a database
 
    - we will add the following 

    ```CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   ```

    - To load the `schema.sql`file use the following command 

    ```bash
    psql cruddur < db/schema.sql -h localhost -U postgres
    ```

 ##  - Connection URL
 we can connect to our instance using a connection url that we will be setting as an env variable for both local and proudction env 

 ```bash
#Local
export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
gp env CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
```

```bash

#production
export PROD_CONNECTION_URL="postgresql://cruddurroot:<password>@<DB_endpoint>:5432/cruddur"
gp env PROD_CONNECTION_URL="postgresql://cruddurroot:<password>@<DB_endpoint>:5432/cruddur"
```


## Bash scripting for  common database actions

- create a /bin folder inside the backend folder , it will contains the following files :
```
-rwxr-xr-x 1  db_connect # to connect to the database.
-rwxr-xr-x 1  db_create   # to create a database.
-rwxr-xr-x 1  db_drop # to drop a database
-rwxr-xr-x 1  db_schema_load # to load the schema script.
-rwxr-xr-x 1  db_setup # to run all the scripts 
```
***NB : don't forget to give Give the scipts the required permissions " chmod 744"***

## Connection to RDS
   
   -get the gitpod-id ip address using the following
    ```
    curl ifconfig.ma
    ```
   -Edit security group to accept traffic comming from gitpod ID.
   -Add the prod connection url to your bakend env var in docker-compose


## Configure SQL Driver "psycopg"
 - start by adding the follwing to requirements.txt
```
psycopg[binary]
psycopg[pool]

```

- create  db.py file  inside /lib
 we will be using pool connection it allows the reuse of existing database connections instead of creating new ones for every request

 -- > example of getting data 

```py

  # When we want to return an array of json objects
  def query_object_json(self,sql,params={}):

    self.print_sql('json',sql)
    self.print_params(params)
    wrapped_sql = self.query_wrap_object(sql)

    with self.pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(wrapped_sql,params)
        json = cur.fetchone()
        if json == None:
          "{}"
        else:
          return json[0]
  def query_wrap_object(self,template):
    sql = f"""
    (SELECT COALESCE(row_to_json(object_row),'{{}}'::json) FROM (
    {template}
    ) object_row);
    """
    return sql
  def query_wrap_array(self,template):
    sql = f"""
    (SELECT COALESCE(array_to_json(array_agg(row_to_json(array_row))),'[]'::json) FROM (
    {template}
    ) array_row);
    """
    return sql
```
##  Configure Lambda function and Create AWS Cognito trigger to insert user

 - create a lambda function  so that the user will be inserted in our database  after cognito confirmation 
```py
import json
import psycopg2
import os

def lambda_handler(event, context):
    user = event['request']['userAttributes']
    print('userAttributes')
    print(user)

    user_display_name  = user['name']
    user_email         = user['email']
    user_handle        = user['preferred_username']
    user_cognito_id    = user['sub']
    try:
      print('entered-try')
      sql = f"""
         INSERT INTO public.users (
          display_name, 
          email,
          handle, 
          cognito_user_id
          ) 
        VALUES(
        '{user_display_name}',
        '{user_email}',
        '{user_handle}',
        '{user_cognito_id}')
      """
      print('SQL Statement ----')
      print(sql)
      conn = psycopg2.connect(os.getenv('CONNECTION_URL'))
      cur = conn.cursor()
      cur.execute(sql)
      conn.commit() 

    except (Exception, psycopg2.DatabaseError) as error:
      print(error)
    finally:
      if conn is not None:
          cur.close()
          conn.close()
          print('Database connection closed.')
    return event

```

- add the psycopg layer using the following ARN 
```
arn:aws:lambda:us-east-1:898466741470:layer:psycopg2-py38:2
```
- configure Cognito Lambda Trigger
   -Set the Trigger type to Sign-up.
   -Set the Sign-up trigger to Post confirmation.
   -Assign Lambda function that was just created.


![DEMO --> ](./ressources/4-3.png)   
![DEMO --> ](./ressources/4-5.png)


## Implement and Create Activity & Link it with RDS

![DEMO --> ](./ressources/4-6.png) 

- actvities table results 

![DEMO --> ](./ressources/4-7.png)     


