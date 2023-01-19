## Deploy

Fly.io requires bank card credentials, which I don't want to give for them. Therefore my app isn't hosted anywhere currently. However, I would do the following to deploy:

1. Initializing the application with `fly launch`. I would select Frankfurt as my region and skip Postgres etc. When asking whether I would like to deploy now, I would select yes. Now my application is deployed and can be launched with `fly open`.
2. If I make changes to either frontend or backend I could deploy new version of my app by running `npm run deploy:full`.
