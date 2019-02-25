# BACKEND (Express)
## Setup
Please execute `npm install` from within the backend directory.

## To start the backend

1. Switch to the backend directory
2. Execute `npm start`

## To debug the backend

Start the backend via the following command instead of `npm start`:

`set DEBUG=express:* & node index.js`

---

# FRONTEND (React)
## Setup
Please execute `npm install` from within the frontend directory.

## To start the frontend
1. Switch to the frontend directory
2. Execute `npm start`

## To execute unit tests
1. Switch to the frontend directory
2. Execute `npm test`

## To run code coverage
1. Switch to the frontend directory
2. Execute `npm test -- --coverage`

---

## Notes
If using Jest in VS Code, please open the frontend directory as the workspace instead of the root directory.

Otherwise, Jest will have to be manually launched via `View > Command Palette > Jest: Start Runner`