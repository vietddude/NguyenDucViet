## Software Module Specification

### 1. Overview

**Module Name:** Live Score Board API Module  
**Version:** 1.0  
**Author:** Viet Nguyen Duc  
**Purpose:** To manage and update a live scoreboard for the top 10 users, handling score updates, authentication, and real-time updates to clients.  
**Scope:** This module covers score updates, leaderboard management, real-time updates, and authentication. It does not cover user registration or specific game mechanics.

### 2. Functional Description

**Features:**

- Update user scores securely
- Maintain a top 10 leaderboard
- Provide real-time updates to clients
- Authenticate score update requests

**Use Cases:**

1. A user completes an action and their score is updated
2. A client requests the current top 10 leaderboard
3. A user's score update changes the top 10, triggering a real-time update to all connected clients

**User Stories:**

- As a player, I want my score to update immediately after completing an action so that I can see my progress in real-time.
- As a player, I want to see the current top 10 leaderboard so that I can compare my performance to others.
- As a player, I want to receive real-time updates when the leaderboard changes so that I always have the most current information.

### 3. Interface Description

**Inputs:**

- Score update: `userId` (string), `scoreIncrease` (number)
- Authentication token: `JWT token` (string)

**Outputs:**

- Leaderboard: Array of user objects (`userId`, `username`, `score`)
- WebSocket updates: JSON object containing updated leaderboard

**API Endpoints:**

1. `POST /api/score/update`

   - Request body: `{ "userId": string, "scoreIncrease": number }`
   - Headers: `Authorization: Bearer <token>`
   - Response: 200 OK, 401 Unauthorized, or 400 Bad Request

2. `GET /api/leaderboard`
   - Response body: `{ "leaderboard": [{ "userId": string, "username": string, "score": number }] }`

**WebSocket:**

- Connect to `/ws/leaderboard` for real-time leaderboard updates

### 4. Architecture

**Class Diagram:**
![Class diagram](/src/problem6/images/class.png)

**Sequence Diagram:**
![Sequence diagram](/src/problem6/images/sequence.png)

**Flow Diagram:**
![Flow diagram](/src/problem6/images/flow.png)

### 5. Dependencies

**Internal Dependencies:**

- Authentication Module
- Database Access Layer

**External Dependencies:**

- Database (e.g., PostgreSQL)
- Redis for caching and pub/sub
- JWT library for authentication

### 6. Data Management

**Data Structures:**

- User: { userId: string, username: string, score: number }
- Leaderboard: Array of User objects

**Database Schema:**

- Users Table: userId (PK), username, score

### 7. Error Handling

**Error Conditions:**

- Invalid authentication token
- User not found
- Database connection failure
- Redis connection failure

**Error Handling Strategies:**

- Use try-catch blocks for error handling
- Log all errors with relevant context
- Return appropriate HTTP status codes and error messages

### 8. Security Considerations

**Authentication:**

- Use JWT tokens for authenticating score update requests

**Authorization:**

- Verify that the user updating the score matches the authenticated user

**Data Security:**

- Use HTTPS for all API communications
- Implement rate limiting to prevent abuse
- Sanitize all user inputs to prevent injection attacks

### 9. Performance Considerations

**Performance Requirements:**

- Score updates should be processed within 100ms
- Leaderboard retrieval should complete within 50ms
- WebSocket updates should be sent within 200ms of a leaderboard change

**Optimization Strategies:**

- Use Redis caching for frequently accessed data
- Implement database indexing for efficient queries
- Use connection pooling for database connections

### 10. Testing

**Unit Tests:**

- Test score update logic
- Test leaderboard sorting and limiting
- Test WebSocket notification logic

**Integration Tests:**

- Test API endpoints with various inputs
- Test WebSocket connections and updates
- Test authentication and authorization flows

**Acceptance Criteria:**

- All API endpoints return correct responses within specified time limits
- WebSocket updates are received by clients in real-time
- Leaderboard always contains top 10 users in correct order
- Unauthorized score updates are rejected
