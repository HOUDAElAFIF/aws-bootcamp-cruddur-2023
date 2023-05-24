import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3' 
import * as lambda from 'aws-cdk-lib/aws-lambda' ;
import * as dotenv from 'dotenv' ;
import * as s3n from 'aws-cdk-lib/aws-s3-notifications'

// load env vars 
dotenv.config() ;


export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const BucketName: string = process.env.BUCKET_NAME as string; 
    const functionPath: string = process.env.FUNCTION_PATH as string; 
    const folderInput: string = process.env.S3_FOLDER_INPUT as string; 
    const folderOutput: string = process.env.S3_FOLDER_OUTPUT as string; 

    const bucket = this.createBucket(BucketName) ;
    const lambda = this.createLambda(functionPath,folderInput,folderOutput,BucketName) ;

    this.createS3NotifyToLambda(folderInput,lambda,bucket)
  }

  createBucket (bucketName:string):s3.IBucket{
    const bucket = new s3.Bucket(this,'thumbingBucket',{
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })
    
    return bucket 
    
  }


  createLambda(fucntionPath:string,folderIntput:string,folderOutput:string,bucketName:string):lambda.IFunction{
    const lambdaFuntion = new lambda.Function(this,'lambda',{
      runtime: lambda.Runtime.NODEJS_18_X ,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(fucntionPath,),
      environment: {
        DEST_BUCKET_NAME: bucketName,
        FOLDER_INPUT: folderIntput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH: '512',
        PROCESS_HEIGHT: '512'
      }
    
    }) 
    return lambdaFuntion ;
  }


  createS3NotifyToLambda(prefix: string, lambda: lambda.IFunction, bucket: s3.IBucket): void {
    const destination = new s3n.LambdaDestination(lambda);
      bucket.addEventNotification(
        s3.EventType.OBJECT_CREATED_PUT,
        destination,
        //{prefix: prefix}
    )
  }

}
