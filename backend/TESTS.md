Backend tests (success-only)
=============================

This small doc explains the new success-only tests added under:

- `backend/tests/integration/success/post_get.integration.test.js` — integration tests for POST and GET happy paths (mocks TaskService)
- `backend/tests/unit/success/taskService.unit.success.test.js` — unit tests for `taskService` happy paths (mocks TaskModel)

Important notes
---------------

- The repository `backend/package.json` currently does not include test devDependencies (jest, supertest). To run these tests locally you should add them, for example:

  1. Change to the backend folder:

     cd backend

  2. Install test dependencies (example):

     npm install --save-dev jest@29 supertest@6

  3. Add a test script to `backend/package.json`:

     "scripts": {
       "start": "node src/server.js",
       "dev": "nodemon src/server.js",
       "test": "jest --runInBand"
     }

- These tests are written using Jest + Supertest patterns and rely on Jest module mocking. Because the backend is an ESM project (`type: "module"`), you may need to ensure Jest is configured for ESM. If you run into ESM-related issues, consider one of:
  - Install and configure Jest ESM support (consult Jest docs), or
  - Use a test runner with native ESM support, or
  - Convert test imports to CommonJS (not recommended for this project layout).

Running the tests
-----------------

After installing dependencies and adding the test script, run from the `backend` folder:

```powershell
npm test
```

If you want me to also add the devDependencies and a Jest config (or adapt tests for a different runner), tell me and I will update `package.json` and add a minimal Jest configuration so the tests are runnable here.
