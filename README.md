# Weather App - Check the current Weather around the World!

## Table of Contents

1. [About the Project](#about)
2. [Run the Project](#getting-started)
3. [App Features](#app-features)

## About the Project

![Application Screenshot](https://imgur.com/a/gnL4d53)
Weather App is a dynamic web application designed to provide real-time weather information for any city across the globe.

Key Features:

- **Global Weather Updates**: Get instant access to current weather conditions for cities anywhere in the world.
- **Search Functionality**: Simply type the name of a city into the search bar, and the site will fetch and display the latest weather data.
- **User-Friendly Interface**: Clean and intuitive interface with both **dark and light theme** available.

**Note**: This web application has been developed as part of an interview test. It is intended to showcase basic functionality and may not represent a fully polished or production-ready application.

## Run the Project

You can visit the production build via this link:
https://react-weather-app-letrantienphat.vercel.app/

Or if you want to download the sourcecode, you can follow these steps:

1. **Clone the Project Repository**

   Use Git to clone the project repository to your local machine:

   ```bash
   git clone [repository link]
   ```

2. **Install Dependencies**

   Navigate to the source folder (if you haven't already), and start installing the depenencies:

   ```bash
   npm install
   ```

   if you are using yarn

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a .env file in the root of the project directory. This file should contain the necessary environment variables for your project. You can typically find an example .env file named .env.example or similar in the project repository.

Copy the example file to .env and update the variables as needed:

```bash
cp .env.example .env
```

Open .env in a text editor and configure the necessary environment variables.

(You can get the Open Weather API Key from https://openweathermap.org/api)

4. **Start the Development Server**

   Run the development server to see the project in action:

   ```bash
   npm install
   ```

   if you are using yarn

   ```bash
   yarn install
   ```

## App Features

#### Frontend tech stack

- React
- Shadcn UI
- Tailwind CSS
- React Query + Axios (for data fetching)
- Framer Motion (for animation)

#### Data source

All the city and weather data is fetched from https://openweathermap.org/api

#### Features

- Auto-completed Search Bar (The closest matching results will be display for your selection as you are typing)
- Get the selected location's weather infomation and display it on a dynamic, animated user-friendly UI.
- Use debounced input and cached API results to optimize the number of api call per user session.
- Store all previously searched weather info inside Local Storage
- Support Light/Dark Mode
- Dynamic and Responsive UI
- Easy to navigate and easy to scale sourcebase
