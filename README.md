# Potluck Planner backend

## Endpoints

###

1. `POST /api/auth/register`
   - **Registers a new user**
   - Send object in body consisting of `firstName`, `lastName`, `email` and `password`
   - Returns an object with a welcome message in the `message` key
2. `POST /api/auth/login`
   - **Logs in as a user**
   - Send object in body consisting of `email` and `password`
   - Returns an object with a welcome message in the `message` and a JSON web token in the `authToken` key
3. `GET /api/users/:id`
   - **Gets information on a specific user**
   - Send blank body, a JSON Web token in the header under the `authorization` key, and the `id of the user you want to get back as the paremeter
   - Returns a user object. If you are trying to get the id of a user other than yourself, you will recieve an object with a message that you are not authorized in the `message` key.
   - The reason that this exists is to get any user object if we end up adding a site admin role to the app in the future
4. `POST /api/potlucks`
   - **Adds a potluck**
   - Send JSON web token in the header under the `authorization` key
   - Send potluck object in body consisting of `locationName`, `locationAddress`, `locationStreet`, `locationState`, `locationCity`, `locationCountry`, and `locationPostcode`. All are strings except `locationAddress` which is an integer.
   - Returns an array. Index `0` in the array is the potluck object that was added to the database. index `1` in the array is the relationship object that marks the user as attending the potluck and contains their `role` and `attendance`.
5. `GET /api/potlucks`
   - **Shows a list of potlucks you are invited to**
   - Send blank body and JSON web token in the header under the `authorization` key
   - Returns a list of all potlucks the logged in user has `role` `0` (organizer) or `1` (guest) in
6. `POST /api/potlucks/user/add`
   - **Adds a user to a potluck as a guest**
   - Send object in body consisting of `potluckId`, `role`, and `email`
7. `GET /api/potlucks/mine`
   - **Shows a list of potlucks you are the organizer of**
   - Send blank body and JSON web token in the header under the `authorization` key
   - Returns a list of all potlucks the logged in user has `role` `0` (organizer) in
8. `POST /api/potlucks/reqs/:id`
   - **Adds a food requirement to a potluck if you are an organizer of it**
   - Send:
     - A JSON web token in the header under the `authorization` key
     - The `id` of the potluck you want to add requirements to as a parameter,
     - An object consisting of `foodCategory`, `foodDescription`, `servings,`, and `fufilled`. `foodCategory` and `foodDescription` are strings, `servings` is an integer and `fufilled` is a boolean.
   - If you have `role` `0` on the potluck you passed in, returns the requirements object you added
   - If you do not, returns a `400` and an error message in the `message` key
9. `GET /api/potlucks/reqs/:id`
   - **Get a list of requirements for a potluck**
   - Send a blank body and a JSON web token in the header under the `authorization` key and the `id` of the potluck to get requirements for as the `id` parameter
   - Returns an array of requirement objects for the potluck
