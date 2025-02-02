# Airbnb Clone

This project is an Airbnb clone built with React, Redux, and Supabase, designed to mimic core features of the Airbnb platform. Users can search for listings, log in/log out, save favourite listings, book trips, and view listings with infinite scroll. The app also supports Google Sign-In for authentication and is highly responsive, providing a seamless experience across devices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

## Features

- **User Authentication:** Google Sign-In via Supabase.
- **Search Functionality:** Filter listings by city.
- **Listings:** View available listings with infinite scroll.
- **Favorite Listings:** Save and view favorite properties.
- **Bookings:** Book trips directly within the app.
- **Responsive Design:** Fully responsive for mobile and desktop.
- **Data Management:** Efficient state management using Redux.
- **Real-Time Sync:** State synchronization across tabs using `redux-state-sync`.

## Tech Stack

- **Frontend:**

  - React
  - React Router DOM
  - Redux & Redux Toolkit
  - TanStack Query (React Query)
  - CSS/Styled Components (Tailwind)
  - React Hot Toast (for notifications)

- **Backend:**

  - Supabase (PostgreSQL database and authentication)
  - Google Sign-In (OAuth)

- **Others:**
  - Stripe (for handling payments)
  - ESlint & Prettier (for code quality)

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x.x)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rajat1120/airbnb-clone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd airbnb-clone
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Known Issues

- The search functionality may not always return accurate results.

## Contributing

Feel free to open issues and submit pull requests to improve the project!

### To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## Show Your Support

If you find this project helpful, please give it a ⭐️ on GitHub! Your support is appreciated.
