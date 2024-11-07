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
<details>
  <summary>Show</summary>
    <h3>The application makes heavy use of cache and local storage. Cache management is improved by react-query library, which is also used in handling queries and their errors. The zustand and jotai libraries, on the other hand, use local storage and manage the required data there. </br> </br>
    To send queries we use the fetch function, the entire query handling is contained in the HandleFetch function, which contains logic related to sending the preferred language in queries, downloading blob files and most importantly throwing errors, which the system converts into classes in the Errors folder, so it knows what error was returned by the API.
    </h3>
    <div>
      <ol>
        <li><h3><b>Admin</b></h3>
          <ul>
            <li><h3><b>Navigation bar</b></h3></li>
            The navigation bar is on every page so it simplifies navigating through the app. It additionally includes language change and notifications(small 0 is the latest notifications)
            <p align="center"><img src="https://github.com/user-attachments/assets/7de740c6-73b9-454c-a4b6-e1057317a81f" alt="project-image"></p>
            The list of notifications displays starting with the latest and can be further expanded to include older and older notifications. Hovering over a notification marks it as displayed.
            <p align="center"><img src="https://github.com/user-attachments/assets/6a4d2e53-4147-4150-a64c-74de4808bc69" alt="project-image"></p>
            <li><h3><b>Main</b></h3></li>
            This page displays only simple data about the application and what has happened in the last week
            <p align="center"><img src="https://github.com/user-attachments/assets/a05794aa-9b35-4034-a6ed-f8849b510a56" alt="project-image"></p>
            <li><h3><b>Categories</b></h3></li>
            The list of categories is a tree and can be expanded in depth 
            <p align="center"><img src="https://github.com/user-attachments/assets/eeb589fa-5622-4bf7-8d1a-ce111d9f8626" alt="project-image"></p>
            Adding a category
            <p align="center"><img src="https://github.com/user-attachments/assets/48d02357-0f04-4d6b-b17f-605bc739f1ac" alt="project-image"></p>
            Editing category
            <p align="center"><img src="https://github.com/user-attachments/assets/2212067b-ecac-4ac9-8dd2-0aa2d06960be" alt="project-image"></p>
            On each page, at the very bottom of the page, there is a button that displays a modal with the json data the application received from the API
            <p align="center"><img src="https://github.com/user-attachments/assets/63430b7f-7ca5-4692-af54-1bc531cf5e32" alt="project-image"></p>
            <li><h3><b>Category</b></h3></li>
            List of audiobooks that are in the category
            <p align="center"><img src="https://github.com/user-attachments/assets/b0b55971-7ec0-49c9-8bf6-fdc4e70fd7a4" alt="project-image"></p>
            Details of a particular audiobook. These are truncated details and are not the entire audiobook edition. To open the full edition, open Full Edit
            <p align="center"><img src="https://github.com/user-attachments/assets/13fe65d1-3daf-496f-b41c-1c142556101e" alt="project-image"></p>
            <li><h3><b>Audiobook</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/ba42e04c-41d7-4690-89fe-d04518b188c2" alt="project-image"></p>
            These are the full details of the audiobook with complete editing
            <p align="center"><img src="https://github.com/user-attachments/assets/33d82f99-60a3-43a8-ac41-6b89c3df4516" alt="project-image"></p>
            <li><h3><b>Audiobooks</b></h3></li>
            List of all audiobooks
            <p align="center"><img src="https://github.com/user-attachments/assets/e5a68ea3-3bfe-48d0-8166-31a073a70811" alt="project-image"></p>
            Adding an audiobook. Select the required data
            <p align="center"><img src="https://github.com/user-attachments/assets/27b7fe8c-bcfb-4dc1-8211-c1aedd9e6e28" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/72ce6edf-902c-40d2-8c75-d5d3c86f893c" alt="project-image"></p>
            Audiobook list has accurate search for audiobooks
            <p align="center"><img src="https://github.com/user-attachments/assets/5849edc0-ddf3-42f0-90e0-2287a21ed132" alt="project-image"></p>
            <li><h3><b>Users</b></h3></li>
           List of all users
            <p align="center"><img src="https://github.com/user-attachments/assets/94d1321b-839d-4564-a409-d09259a81d2a" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/4d71c216-3470-468f-ad62-f25e744ffcef" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/25feee46-54a5-4520-9d84-e6d1ebee75e0" alt="project-image"></p>
            Users list has accurate search for users
            <p align="center"><img src="https://github.com/user-attachments/assets/4d73b4c2-2a64-43b8-9e85-de91c10b8d5a" alt="project-image"></p>
            <li><h3><b>Notifications</b></h3></li>
            List of all notifications
            <p align="center"><img src="https://github.com/user-attachments/assets/99732cee-d4dc-4aa2-9b6f-2350570241c1" alt="project-image"></p>
            As you can see there is pagination in each list
            <p align="center"><img src="https://github.com/user-attachments/assets/f4190ca7-a937-4682-834f-998d316a6371" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/eb2467a9-e3e1-41ab-95bb-6166c86d67f2" alt="project-image"></p>
            Notification details and editing
            <p align="center"><img src="https://github.com/user-attachments/assets/55a18d01-ebc7-432e-aa41-efe25adf2ce4" alt="project-image"></p>
            Notification list has accurate search for notifications
            <p align="center"><img src="https://github.com/user-attachments/assets/c3d9d6e2-0137-4db2-9286-dc36dcffee6d" alt="project-image"></p>
            <li><h3><b>Reports</b></h3></li>
            List of all reports. Underlined in red are submissions that have not yet been processed by the administrator
            <p align="center"><img src="https://github.com/user-attachments/assets/5f4cae8f-2414-4545-ade2-25dd9b23fc74" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/1e4eea79-3ca1-4ec7-beab-9656280fb37f" alt="project-image"></p>
            Report list has accurate search for reports
            <p align="center"><img src="https://github.com/user-attachments/assets/cbaf3ec0-629a-4143-bc76-1f354fd2cae0" alt="project-image"></p>
            <li><h3><b>Technical breaks</b></h3></li>
            List of all technical breaks
            <p align="center"><img src="https://github.com/user-attachments/assets/271864c1-dc1f-448b-b1b4-c7a8bf02cba3" alt="project-image"></p>
            Technical break list has accurate search for technical breaks
            <p align="center"><img src="https://github.com/user-attachments/assets/00146a13-3dac-4c81-bea3-3ee91ce10794" alt="project-image"></p>
            <li><h3><b>Cache</b></h3></li>
            This page allows you to clean API cache and cache and local storage of your web application. The site was created because without these tools testing is cumbersome and heavy
            <p align="center"><img src="https://github.com/user-attachments/assets/947ff1ef-4b46-4cbc-a708-7b2f067e47c6" alt="project-image"></p>
          </ul>
        </li>
        <li><h3><b>User</b></h3>
          <ul>
            <li><h3><b>Login</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/f311645e-102e-43a6-aaad-9f4d13dd2095" alt="project-image"></p>
            <li><h3><b>Register</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/b3593e45-7d1a-44db-9b17-52fba0339900" alt="project-image"></p>
            <li><h3><b>Forgot</b></h3></li>
            Insert email to get email with reset of your password.
            <p align="center"><img src="https://github.com/user-attachments/assets/baef55ce-df6d-439c-8a2d-1d117c913996" alt="project-image"></p>
            <li><h3><b>Navigation bar</b></h3></li>
            Navigation bar is similar to the administrator but has additional settings.
            <p align="center"><img src="https://github.com/user-attachments/assets/5ad03b02-6799-45d7-b348-e03bef5ac825" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/8195eb33-715f-4fb3-8b22-2e4ee135c59f" alt="project-image"></p>
            <li><h3><b>Main</b></h3></li>
            The page displays a list of audiobooks divided into categories, audiobooks and category must be active. The proposed list is created after listening to the appropriate number of audiobooks and the next audiobooks are proposed, which are selected based on the most listened to category.
            <p align="center"><img src="https://github.com/user-attachments/assets/13e1262e-b4b0-4a66-bd2e-8d3b68c40571" alt="project-image"></p>
            The site also has an audiobook search engine. It searches by author or title of the audiobook
            <p align="center"><img src="https://github.com/user-attachments/assets/22f08611-b69e-47a5-b643-cd955ca47dcf" alt="project-image"></p>
            These are full details of the audiobook, allow you to listen to mp3 files divided into parts. After listening to enough parts, the ability to rate and comment on the audiobook is unlocked. As you can see, the details also save the last part you listened to, and when you open it again, the application will offer to start listening from the point where you left off.
            <p align="center"><img src="https://github.com/user-attachments/assets/82f9c265-7242-4044-919e-5d6c14e0dc69" alt="project-image"></p>
            <li><h3><b>My List</b></h3></li>
            This is a list of favorite audiobooks that allows better access to them 
            <p align="center"><img src="https://github.com/user-attachments/assets/cd52303b-8916-4fbf-a3c9-795af8df154d" alt="project-image"></p>
            <li><h3><b>Account Settings</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/007dd71d-5945-4ffb-9968-d5a3ca18e701" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/69beb5ab-53fc-4f26-85d1-f90776a39571" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/0339b0fb-c742-4ac6-b819-a8b3651731a3" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/79419679-3142-4d2a-bd7a-127aa4b424d0" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/9ce2ef22-f2d3-49b5-ace2-5a2b0d06120b" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/aef73bc4-1538-4b4d-becf-0eacab038bef" alt="project-image"></p>
            <li><h3><b>Help</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/998a3ea2-2070-4a67-899a-f9b45df5097e" alt="project-image"></p>
            <li><h3><b>Report</b></h3></li>
            If there is an error or problem in the application, the user has the option to add a report.
            <p align="center"><img src="https://github.com/user-attachments/assets/aa495ae3-994c-402a-893f-fd5ca2a6e9bb" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/08fc33ed-5109-4ff8-8cfb-848502cf3870" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/e3813f0b-a37c-4ba7-bb6f-78747bb638f1" alt="project-image"></p>
            <li><h3><b>My reports</b></h3></li>
            A list to get a better view of what is happening with user submissions. When accepted or rejected, the user will get a notification.
            <p align="center"><img src="https://github.com/user-attachments/assets/5a0d706c-d883-4590-b3f9-595d92ac7c90" alt="project-image"></p>
            <p align="center"><img src="https://github.com/user-attachments/assets/c729a13c-8aa7-48d3-ada9-241f8b5c544f" alt="project-image"></p>
            <li><h3><b>About</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/11530836-cf9a-4b46-aa29-40e07aa47e73" alt="project-image"></p>
            <li><h3><b>Private Policy</b></h3></li>
            <p align="center"><img src="https://github.com/user-attachments/assets/3e17df2f-c7d9-4c00-a7cf-d3dfafa184cb" alt="project-image"></p>
            <li><h3><b>Technical Break</b></h3></li>
            During a technical break, the user cannot access the application. This is the time during which the administrator can work quietly on managing the application.
            <p align="center"><img src="https://github.com/user-attachments/assets/229f2d7a-537b-48aa-a37b-41d7f57cd8ee" alt="project-image"></p>
          </ul>
        </li>
      </ol>
    </div>
</details>

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
