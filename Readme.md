# Business Search Backend Service

This is a backend service built with Express that provides API for business search. The service utilizes the external API to fetch data on businesses, and returns the results in a standardized format.

## **Technologies Used**

- Node.js
- Express
- Axios
- dotenv

## **Getting Started**

To get started with the service, follow these steps:

1. Clone the repository to your local machine.
2. Run **`npm install`** to install the required dependencies.
3. Create a **`.env`** file by copying the example: **`cp .env.example .env`**
4. Run **`npm start`** to start the server.

Open **`http://localhost:8080/api`**.

### **Frontend**

The frontend of this application can be found in a separate repository located at [https://github.com/crappylime/places-ui](https://github.com/crappylime/places-ui). Follow the instructions in that repository's README to get the frontend running.

## **API Endpoints**

- **`/api`** - health check endpoint that always returns **`"OK"`**
- **`/api/places?search=<name or address>`** - search endpoint that returns an array of places matching the query or all places if no search query provided
- **`/api/places/:id`** - detail endpoint that returns the details of a specific place

## **Acknowledgements**

- Express.js documentation: **[https://expressjs.com/](https://expressjs.com/)**
- MDN Express/Node tutorial: **[https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)**
- "How to create a simple REST API using TypeScript and Node.js": **[https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/](https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/)**