import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { LambdaInvocationType, LambdaInvoke } from '@aws-cdk/aws-stepfunctions-tasks';
import { grantLambdaTo } from './utils';

export class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });

    grantLambdaTo(hello, ['*'], [
      'managedblockchain:CreateProposal',
      'managedblockchain:VoteOnProposal',
      'managedblockchain:ListInvitations'
    ]);

    const invoke = new LambdaInvoke(this, 'invokeCreateProposal', {
      lambdaFunction: hello,
      payload: {
        type: 1, 
        value: {
          "region": 'regions',
          "networkId": 'n-8347598jdsfs',
          "memberId" : 'me-384975983',
          "awsId": '235667'
        } 
      }
    });
  }
}