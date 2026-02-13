# Scalability Strategy for Drive-Service-App

## 1. Microservices Architecture
Currently, the application is a Monolith. To scale, we would decouple the **User Service** (Auth) from the **Booking Service**.
* **Auth Service:** Handles JWT generation and user validation.
* **Booking Service:** Handles vehicle inventory and reservations.
* **Benefits:** Allows us to scale the Booking Service independently during high-traffic holidays without paying for extra Auth resources.

## 2. Database Scaling (Sharding)
As the number of bookings grows, a single MongoDB replica set may become a bottleneck.
* **Strategy:** We will implement **Sharding** based on `location` (e.g., specific shards for 'Mumbai', 'Delhi', 'Bangalore').
* **Result:** Queries for cars in Mumbai will only hit the Mumbai shard, reducing load on the global database.

## 3. Caching Layer (Redis)
Frequent read operations (like "Get All Cars") are expensive.
* **Strategy:** Implement **Redis** to cache the vehicle catalog.
* **Flow:** GET request -> Check Redis -> If Miss, query MongoDB & update Redis.
* **TTL:** Set a 10-minute expiry since car details rarely change.

## 4. Load Balancing
* **Nginx / AWS ALB:** Place a Load Balancer in front of multiple instances of the backend server.
* **Horizontal Scaling:** Run 5-10 instances of the Node.js server using Docker/Kubernetes to handle concurrent requests.