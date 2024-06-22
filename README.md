# Messaging App

This is a messaging web application. The app is built using React, Next.js, and JWT for authentication.

## Prerequisites

- Node.js (Ensure you are using the stable version)

## Setup Instructions

1. **Clone the Repository**

2. **Install NVM (Node Version Manager)**

   If you don't have NVM installed, you can install it by following the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).

3. **Use Stable Node Version**

   ```sh
   nvm use stable
   ```

4. **Install pnpm**

   If you don't have `pnpm` installed, you can install it globally using npm:

   ```sh
   npm install -g pnpm
   ```

5. **Install Dependencies**

   ```sh
   pnpm install
   ```

6. **Environment Variables**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```plaintext
   NEXT_PUBLIC_API_URL=YOUR_API
   ```

7. **Run the Development Server**

   ```sh
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **`/components`**: Contains the reusable React components used in the application.
- **`/pages`**: Contains the Next.js pages.
- **`/utils`**: Contains utility functions for authentication and API calls.

## Authentication Flow

1. **Login**:

   - POST to `/api/token/` with username and password to receive an access token and a refresh token.
   - Save tokens to local storage.

2. **Token Verification and Refresh**:
   - On each page load, check if the access token is expired.
   - If expired, use the refresh token to obtain a new access token.
   - Verify the token validity and redirect to the login page if tokens are invalid
