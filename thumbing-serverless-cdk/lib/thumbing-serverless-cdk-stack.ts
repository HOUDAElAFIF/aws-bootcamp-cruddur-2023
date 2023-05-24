import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const BucketName: string = process.env.BUCKET_NAME as string; 

    const bucket = this.create_Bucket(BucketName) ;
  }

  create_Bucket (bucketName:string):s3.IBucket{
    const bucket = new s3.Bucket(this,'thumbingBucket',{
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })
    
    return bucket 
    
  }
}
