export const environment = {
  production: true,
  amplify: {
    Auth: {
      mandatorySignIn: true,
      identityPoolId: 'us-east-2:deb53e57-bb3c-466d-bf1a-8cb0a2a61089',
      region: 'us-east-2',
      userPoolId: 'us-east-2_v1qCZC8u5',
      userPoolWebClientId: '39f3ea0k04rudl4eusuieoi5b2'
    },
    API: {
      endpoints: [
        {
          name: 'PetStore',
          endpoint: 'https://d35hfdk5h51mf3.cloudfront.net',
          service_info: {
            service: 'execute-api',
            region: 'us-east-2'
          }
        }
      ]
    }
  }
};
