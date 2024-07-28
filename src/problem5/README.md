# 99Tech's Problem 5: A Crude Server

This project is a backend server built with ExpressJS and TypeScript. It provides a set of CRUD interfaces to allow users to manage transactions. The backend service is connected to MongoDB for data persistence using Mongoose, and Docker Compose is used for containerization. Swagger is included for API documentation.

## Features

1. **Create a transaction.**
2. **List transactions with basic filters.**
3. **Get details of a transaction.**
4. **Update transaction details.**
5. **Delete a transaction.**

## Requirements

- Docker
- Docker Compose

## Project Structure

```

problem5/
├── .vscode/
│ └── settings.json
├── mongoconfig/
├── mongodb/
│ ├── \_mdb_catalog.wt
│ ├── collection-0-3550927441867903343.wt
│ ├── collection-0-6882427745646549393.wt
│ └── ...
├── nodemon.json
├── package.json
├── README.md
├── src/
│ ├── controllers/
│ │ └── transaction.controller.ts
│ ├── models/
│ │ └── transaction.model.ts
│ ├── routes/
│ │ └── transaction.route.ts
│ ├── config/
│ │ └── config.ts
│ ├── types/
│ │ └── transaction.ts
│ ├── index.ts
│ ├── swagger.ts
├── tsconfig.json
├── .env
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .nvmrc
├── .prettierrc
├── docker-compose.yml
├── Dockerfile

```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vietddude/NguyenDucViet.git
cd NguyenDucViet/problem5
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

Make sure Docker is running on your system. Then, use Docker Compose to start the application and MongoDB:

```bash
docker-compose up --build
```

The server will start on port 3000 by default. You can access it at `http://localhost:3000`.

### 4. Commands

```bash
# compile and run
npx tsc
node dist/index.js

# run directly
npx ts-node src/index.ts

# lint
npx eslint .

# format
npx prettier --write src
```

### 5. Access Swagger API Documentation

Once the server is running, you can access the Swagger UI at `http://localhost:3000/api-docs` to explore and test the API endpoints.

## Environment Variables

- `PORT`: The port on which the server will run (default: 3000).
- `MONGO_URL`: The MongoDB connection string.

Create a `.env` file in the root of your project and add the following:

```env
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://transaction-mongodb:27017/transaction-db
```

## Docker Setup

The project includes a `docker-compose.yml` file to run the API and MongoDB using Docker.

### Build and Run with Docker

1. **Build the Docker images**:

   ```bash
   docker-compose build
   ```

2. **Run the Docker containers**:

   ```bash
   docker-compose up --build
   ```

The server will start on port 3000 by default. You can access it at `http://localhost:3000`.

### Access Swagger API Documentation

Once the server is running, you can access the Swagger UI at `http://localhost:3000/api-docs` to explore and test the API endpoints.

## API Endpoints

- Link to navigate to Postman collection: [API Document](https://documenter.getpostman.com/view/25571734/2sA3kaBJFa)
- Swagger support if `NODE_ENV=development`

## Troubleshooting

If you encounter issues connecting to MongoDB, ensure the following:

1. **MongoDB container is running**:

   ```bash
   docker ps
   ```

2. **Check MongoDB logs**:

   ```bash
   docker logs transaction-mongodb
   ```

3. **Test connectivity from the API container**:

   ```bash
   docker exec -it <transaction-api-container-id> sh
   telnet transaction-mongodb 27017
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
