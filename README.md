# Dream Journal

Dream Journal is an online journal application that allows you to capture and store your dreams and fleeting ideas. Accessible from anywhere with an internet connection, Dream Journal ensures you never forget those precious moments of inspiration.

## Motivation

More often than not, we experience dreams or ideas that excite us, fill us with confidence, or have the potential to change the world. Unfortunately, these moments are fleeting, and we often forget them. Dream Journal was created to solve this problem by providing a convenient platform to jot down and preserve these valuable thoughts and dreams.

### Quick Start

Check the website by navigating to [Dream Journal](https://dream-journal-b5dda.web.app/), create your account and create your first dream!

## Features

- **User Authentication**: Secure login and registration to protect your journal entries.
- **Dream and Idea Entries**: Easily add, edit, and delete your dreams and ideas.
- **Cloud Storage**: Your entries are stored securely in the cloud, accessible from any device.
- **Responsive Design**: Optimized for both desktop and mobile devices, ensuring a seamless experience.

## Technologies Used

- **Frontend**:

  - **React.js**: A JavaScript library for building user interfaces.
  - **React Router**: For handling routing in the application.
  - **Material-UI (MUI)**: Material Design components for React.

- **React Redux**: A State Management solution based on Redux to let react component read data from a Redux store, and dispatch actions to the store to update state.

- **React hook**: React hook form for performant, flexible, and extensible forms with easy-to-use validation.

- **Firebase**: A Backend, Authentication, Database, and Hosting solution. Firebase as Backend-as-a-Service (BaaS).

## Installation

To get started with Dream Journal, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/KiriHans/Dream-Journal-App.git
   cd Dream-Journal-App
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory using the `.env.example` file and fill with your own data the environment variables.

4. **Start the development server**:
   Without emulators:

   ```bash
   npm run dev
   ```

   With emulators:

   ```bash
   npm run dev:emulation
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the app in action.
