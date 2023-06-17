**Cow Hut API Documentation**

This documentation provides an overview of the Cow Hut API endpoints and their usage. The base URL for all requests is: `https://cow-hut-kamrul-hasan01.vercel.app/`

## User Operations

### User Signup

- **Route:** `/api/v1/auth/signup` (POST)

### Get All Users

- **Route:** `/api/v1/users` (GET)

### Get Specific User by ID

- **Route:** `/api/v1/users/:id` (GET)

### Update Specific User by ID

- **Route:** `/api/v1/users/:id` (PATCH)

### Delete Specific User by ID

- **Route:** `/api/v1/users/:id` (DELETE)

Note: When a user is deleted, the associated cow data referred to by the user ID is also deleted.

## Cow Operations

### Create a Cow

- **Route:** `/api/v1/cows` (POST)

### Get All Cows

- **Route:** `/api/v1/cows` (GET)

Query Parameters (Case Insensitive):

- `page`: e.g., `?page=1`
- `limit`: e.g., `?limit=10`
- `sortBy`: e.g., `?sortBy=price`
- `sortOrder`: e.g., `?sortOrder=asc`
- `minPrice`: e.g., `?minPrice=1000`
- `maxPrice`: e.g., `?maxPrice=5000`
- `location`: e.g., `?location=chattogram`
- `searchTerm`: e.g., `?query=Dhaka` (Search fields: location, breed, and category)

### Get Specific Cow by ID

- **Route:** `/api/v1/cows/:id` (GET)

### Update Specific Cow by ID

- **Route:** `/api/v1/cows/:id` (PATCH)

### Delete Specific Cow by ID

- **Route:** `/api/v1/cows/:id` (DELETE)

## Order Operations

### Create a New Order

- **Route:** `/api/v1/orders` (POST)

### Get All Orders

- **Route:** `/api/v1/orders` (GET)

Please note that the routes mentioned above are examples. Replace `:id` with the actual ID of the resource you want to interact with.

For any further assistance, please refer to the API documentation or contact the support team.
