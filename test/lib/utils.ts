import * as lambda from '@aws-cdk/aws-lambda';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';

export function grantLambdaTo(
    lambdaFunction: lambda.Function,
    resources: string[],
    actions: string[],
  ): void {
    lambdaFunction.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: actions,
        resources: resources,
      }),
    );
};