<p align="center"><img src="https://socialify.git.ci/Straicur/AudiobookServiceFront/image?description=1&amp;descriptionEditable=Manage%20and%20share%20audiobooks&amp;font=Jost&amp;language=1&amp;name=1&amp;theme=Dark" alt="project-image"></p>

<h3>AudiobookServiceFront is the frontend of an application for managing audiobooks. This application is a graphical demonstration of what a service using AudiobookServiceBack Api can look like. It was written in React + Bootstrap, it was my first such large application in React. I learned in it more and more ways to optimize and work with React and JS.</h2>

<h2>💻 Built with</h2>

Technologies used in the project:

*   react 18.2.0
*   npm 9.1.2
*   JavaScript

<h2>🚀 Demo</h2>

[https://audiobook-service-front.vercel.app/about](https://audiobook-service-front.vercel.app/about)

<h2>🧐 Documentation (Pages and their functionalities)</h2>
<h3>The application makes heavy use of cache and local storage. Cache management is improved by react-query library, which is also used in handling queries and their errors. The zustand and jotai libraries, on the other hand, use local storage and manage the required data there. </br> </br>
To send queries we use the fetch function, the entire query handling is contained in the HandleFetch function, which contains logic related to sending the preferred language in queries, downloading blob files and most importantly throwing errors, which the system converts into classes in the Errors folder, so it knows what error was returned by the API.</h3>

<div>
  <ol>
    <li><b>Admin</b>
      <ul>
        <li><b>Navigation bar</b></li>
        <li><b>Main</b></li>
        <li><b>Categories</b></li>
        <li><b>Category</b></li>
        <li><b>Audiobook</b></li>
        <li><b>Audiobooks</b></li>
        <li><b>Users</b></li>
        <li><b>Notifications</b></li>
        <li><b>Reports</b></li>
        <li><b>Technical breaks</b></li>
        <li><b>Cache</b></li>
      </ul>
    </li>
    <li><b>User</b>
      <ul>
        <li><b>Login</b></li>
        <li><b>Register</b></li>
        <li><b>Forgot</b></li>
        <li><b>Navigation bar</b></li>
        <li><b>Main</b></li>
        <li><b>My List</b></li>
        <li><b>Account Settings</b></li>
        <li><b>Help</b></li>
        <li><b>Report</b></li>
        <li><b>My reports</b></li>
        <li><b>About</b></li>
        <li><b>Private Policy</b></li>
        <li><b>Technical Break</b></li>
      </ul>
    </li>
  </ol>
</div>

<h2>🔧 Project structure:</h2>
<h3>I divided react components into Pages, Providers and Views. If the view contains specific logic or a lot of unreadable code, a Service was created.</h3>

<p>1. <b>/@</b> <- This is a shadcn lib directory. In the future I would like to replace bootstrap with tailwind and create my own React components just in this folder. This is a better solution than overwriting bootstrap classes.</p>
<p>2. <b>/Errors</b> <- Directory where all the logic related to catching errors in the code and errors received from the API is contained</p>
<p>3. <b>/Page</b> <- Pages are the initial components that are plugged into the react-router and are responsible for the beginning of the page in which are then the providers and finally the views which are strictly responsible for showing the page.</p>
<p>4. <b>/Providers</b> <- Providers are components that manage actions on data received from the API. It is in them that I retrieve data using the GET and POST methods, and in them that I change that data using PUT, PATCH and DELETE. The data in the react-query cache is also changed</p>
<p>5. <b>/Service</b> <- Service is the breaking down of intricate or long code into smaller parts. They are used to organize code that is not very readable, for example, in Views.</p>
<p>6. <b>/Store</b> <- Store is used to create and manage local storage. It is a function that uses the zustand library. </p>
<p>7. <b>/Translates</b> <- Translations used in the application are kept here.</p>
<p>8. <b>/Util</b> <- These are the tools used throughout the application. They work on static methods, they do not require the creation of instances just feeding the relevant data to the methods.</p>
<p>9. <b>/View</b> <- They are responsible for showing graphically the data that has been received from providers and for changing them and intuiting and guiding the user through the system.</p>
<p>10. <b>App.jsx</b> <- It is after a basic function that is in every React app. I extended it with the implementation of the jotai library(responsible for displaying the modal with errors) and react-query(here the client is created).</p>
<p>11. <b>AppRouter.jsx</b> <- This is a separate function that is responsible for routing in this application.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. Install Node</p>

<p>2. Install npm and npx</p>

<p>3. Clone project and create a .env.local file and complete the file with the appropriate data based on the .env file </p>

<p>4. Do a command</p>

```
npm start
```

<h2>🛡️ License:</h2>

This project is licensed under the GNU LESSER GENERAL PUBLIC LICENSE Version 2.1 February 1999
