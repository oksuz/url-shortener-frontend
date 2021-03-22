# URL SHORTENER FRONTEND

frontend application uses api [url-shortener-api](https://github.com/oksuz/url-shortener-api)

### Build & Run
Apply following command in order to make a build of application

```bash
npm run build
```

the build will appear in `dist` folder.

#### Docker

Build docker image with following command. don't forget to change api url if it's different from below

```bash
docker build -t url-shortener-fe --build-arg API_URL=http://localhost:8080 .
```

after the image is created successfully, run this command for run nginx instance for frontend application

```bash
docker run --rm -p8081:80 -d url-shortener-fe
```

The app is accessible through browser with url [localhost:8081](http://localhost:8081) 

### Development 

`npm run start:dev` starts webpack dev server for development and also api url is defined in `src/config.php`

#### Some useful commands

`npm run codestyling:fix` fixes code styles automatically end show errors that not convenient for eslint rules

`npm run eslint:check` checks the code according to eslint rules

`npm run prettier:check` checks the code according to prettier rules

Last two of the commands are useful for ci/cd tools. 