# UE Hackathon

*This project needs Node.js to run. If you need to install it, we advise you to use [nvm](https://github.com/nvm-sh/nvm).*

## Getting started with the backend

### Pull the backend

1. Clone the repository of the backend : [https://github.com/ladislas14/ue-hackathon-back](https://github.com/ladislas14/ue-hackathon-back)
2. Install dependencies :
```bash
npm i
```

### Local development

#### Install a PostgreSQL database on your computer (local development only)

1. Download and install docker : [https://www.docker.com/get-started](https://www.docker.com/get-started)
2. Launch Docker Desktop.
3. Pull the postgres image:
```bash
sudo docker pull postgres
```
4. Create a folder in a known location for you:
```bash
mkdir ${HOME}/postgres-data/
```
5. Launch postgres container:
```bash
sudo docker run -d --name dev-postgres -e POSTGRES_PASSWORD=Pass2020! -v ${HOME}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres
```
6. Create a new .development.env file at the root of the folder with the following information:
```
# App
NODE_ENV=development
DEBUG=1

# Jwt
JWT_SECRET_KEY=rxPhglGJWPlOW596
JWT_EXPIRATION_TIME=3600

# Database envioroment variables
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Pass2020!
DB_DATABASE=postgres
```

#### Launchg the backend (local development only)

1. Launch nodemon with the following command:
```bash
npm run watch:dev
```
2. Access the backend on [http://localhost:3000](http://localhost:3000).
3. You can also access the documentation on [http://localhost:3000/documentation](http://localhost:3000/documentation).

### Deployment

1. Create an account on [https://scalingo.com/](https://scalingo.com/).
2. Install the CLI [https://doc.scalingo.com/cli](https://doc.scalingo.com/cli).
3. Follow the prerequesites of the following page [https://doc.scalingo.com/platform/cli/features](https://doc.scalingo.com/platform/cli/features). To create an ssh key, follow this:
```bash
# Generate a ssh key using ssh-keygen
ssh-keygen

# Start the ssh-agent in the background.
# On Linux and Mac
eval "$(ssh-agent -s)"
# On Windows
eval `ssh-agent -s`

# Add you ssh key (assuming your .ssh folder is at HOME)
# On Linux and Windows
ssh-add ${HOME}/.ssh/id_rsa
# On Mac
ssh-add -K ${HOME}/.ssh/id_rsa

# Copy the content of your public key
cat ${HOME}/.ssh/id_rsa.pub
```
4. Create a new app
```bash
scalingo create hackathon
```
5. The next part could be done with CLI but it's easier with the admin panel of Scalingo. So go to your admin panel on [https://my.osc-fr1.scalingo.com/apps](https://my.osc-fr1.scalingo.com/apps) and then, access your created app.
6. Create a new PostgreSQL addons on the addons page (select sandbow version).
7. Once it's created, go to the environment page. You will be able to retrieve your PostgreSQL credentials in the SCALINGO_POSTGRESQL_URL variable. It would look like `postgres://user:password@host:port/database?sslmode=prefer`.
8. Copy and paste the following env variable and don't forget to replace the PostgreSQL credentials with yours:
```
DB_DATABASE=database
DB_HOST=host
DB_PASSWORD=password
DB_PORT=port
DB_USERNAME=user
JWT_EXPIRATION_TIME=3600
JWT_SECRET_KEY=rxPhglGJWPlOW596
NODE_ENV=production
```
9. Deploy your app
```bash
git push scalingo master
```


## Getting started with frontend

1. Pull the archive from the git repositoy : [https://github.com/ladislas14/ue-hackathon-front](https://github.com/ladislas14/ue-hackathon-front).

2. Install Expo :

```bash
npm install -g expo-cli
```

3. Install other dependencies :

```bash
npm i
```

4. Launch the project:

```bash
npm start
```

## Getting started with backend

> There is two way to run the backend : using Docker or using Node (in this case, you will need to have a runing PostgreSQL database beside).