# UE Hackathon

*This project needs Node.js to run. If you need to install it, we advise you to use [nvm](https://github.com/nvm-sh/nvm).*

## Getting started with the frontend

### Pull the backend

1. Clone the repository of the backend : [https://github.com/ladislas14/ue-hackathon-back](https://github.com/ladislas14/ue-hackathon-back)
2. Install dependencies :
```bash
npm i
```

> **This part is for local development only! If you just want to deploy the app, skip this part.**

### Install a PostgreSQL database on your computer (local development only)

1. Download and install docker : [https://www.docker.com/get-started](https://www.docker.com/get-started)
2. Launch Docker Desktop.
3. Pull the postgres image:
```bash
docker pull postgres
```
4. Create a folder in a known location for you:
```bash
mkdir ${HOME}/postgres-data/
```
5. Launch postgres container:
```bash
docker run -d --name dev-postgres -e POSTGRES_PASSWORD=Pass2020! -v ${HOME}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres
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