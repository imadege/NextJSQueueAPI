
```markdown
# NestJS Queue API

## Overview

This project is a **NestJS API** that provides queue management functionality with support for **RabbitMQ** and **AWS SQS**. The queue service is dynamically configurable based on environment variables, allowing you to switch between RabbitMQ and SQS without code changes. The project is also Dockerized for easy deployment with **Docker Compose**, which includes the NestJS API, RabbitMQ, and Localstack (for emulating AWS SQS).

### Features

- Publish and subscribe to messages in **RabbitMQ** and **SQS**.
- Dynamically switch between **RabbitMQ** and **SQS** using the `QUEUE_PROVIDER` environment variable.
- **Docker Compose** setup for running the API, RabbitMQ, and Localstack.
- Unit tests for services and controllers using **Jest**.
- Persistent message queues and error handling.

---

## Requirements

- **Node.js** (>= 18.x)
- **Docker** and **Docker Compose**
- **AWS CLI** (optional, for testing SQS directly)

---

## Setup and Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/nestjs-queue-api.git
cd nestjs-queue-api
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Environment Variables

Create a `.env` file in the root directory of your project and add the following configuration:

```bash
# Use RABBITMQ or SQS as the queue provider
QUEUE_PROVIDER=RABBITMQ

# Set up AWS region (for SQS via Localstack)
AWS_REGION=us-east-1
```

### Step 4: Running the Project with Docker Compose

The project includes a **Docker Compose** setup for running **NestJS**, **RabbitMQ**, and **Localstack**. Follow these steps:

1. Build and start the services using Docker Compose:

```bash
docker-compose up --build
```

This will start the following services:
- **NestJS API** (on port 3000)
- **RabbitMQ** (on port 5672 and management UI on port 15672)
- **Localstack** (SQS emulator on port 4566)

### Step 5: Access RabbitMQ Management UI

If you are using **RabbitMQ** as the queue provider, you can access the RabbitMQ management UI at:
```
http://localhost:15672
```
Login with the default credentials:
- Username: `guest`
- Password: `guest`

---

## API Endpoints

### 1. Publish a Message

- **Endpoint**: `POST /queue/publish`
- **Description**: Publishes a message to a specified queue.
- **Request Body**:
  ```json
  {
    "queueName": "test-queue",
    "message": "Hello from the API!"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/queue/publish \
  -H "Content-Type: application/json" \
  -d '{"queueName": "test-queue", "message": "Hello from the API!"}'
  ```

### 2. Subscribe to Messages

- **Endpoint**: `GET /queue/subscribe`
- **Description**: Subscribes to a specified queue and retrieves messages.
- **Query Parameters**:
  - `queueName`: Name of the queue to subscribe to.
- **Example**:
  ```bash
  curl "http://localhost:3000/queue/subscribe?queueName=test-queue"
  ```

---

## Switching Between RabbitMQ and SQS

You can switch between **RabbitMQ** and **SQS** by updating the `QUEUE_PROVIDER` environment variable in the `.env` file or Docker Compose configuration.

- To use **RabbitMQ**:
  ```bash
  QUEUE_PROVIDER=RABBITMQ
  ```

- To use **SQS (via Localstack)**:
  ```bash
  QUEUE_PROVIDER=SQS
  ```

Rebuild and restart Docker Compose after making changes to the `.env` file:

```bash
docker-compose up --build
```

---

## Development

### Build the Project

To build the TypeScript code into JavaScript, run:

```bash
npm run build
```

The compiled code will be located in the `dist` directory.

### Running Locally without Docker

If you want to run the NestJS application without Docker, you can follow these steps:

1. Start either **RabbitMQ** or **Localstack** (depending on your `QUEUE_PROVIDER`).
2. Run the NestJS application:
   ```bash
   npm run start:dev
   ```

---

## Docker Deployment

To deploy the project using Docker, follow these steps:

1. **Build and run the Docker containers**:
   ```bash
   docker-compose up --build
   ```

2. **Shut down the containers**:
   ```bash
   docker-compose down
   ```