## How to run?

* https://billing-360-dev-1.onrender.com/
 
# Billing 360

Billing 360 is a billing software built for microenterprises and offers facilities like invoice generation, inventory management, credit management and data analytics. It has been built using MERN stack (MongoDB, Express, React, Node.js).

## IMPORTANT NOTE
The current code which is deployed on [website](https://billing-360-dev-1.onrender.com/) uses free hosting services due to which the requests sent after long time of inactivity take time upto a minute to switch on the server from hibernation mode and during this time some unexpected results may show up.

The process for running on localhost involves:

1) Cloning the repository

2) npm install to install all the dependencies.

3) cd backend to go inside the backend folder and npm install to install the dependencies.

4) cd frontend to go inside the frontend folder and npm install to install the dependencies.

5) Replacing all the occurenses of http://localhost:5050 with http://localhost:5050
6) Go inside the backend folder and perform node server.js

7) Go inside the frontend folder and perform npm start

8) Happy Billing

## Team Details:

### - under the guidance of Prof. Indranil Saha, Department of Computer Science and Engineering, IITK

Name                | Roll number | Email ID
--------------------|-------------|-------------------------------
Abhishek Khandelwal | 220040      | abhi17jan2004@gmail.com
Akula Venkatesh     | 220109      | venkateshakula042004@gmail.com
Ansh Agarwal        | 220165      | aansh7113@gmail.com
Dhruv Gupta         | 220361      | dhruvg190305@gmail.com
Kundan Kumar        | 220568      | kundan91700@gmail.com
Nipun Nohria        | 220717      | nipunnohria2016@gmail.com
Pallav Goyal        | 220747      | pallavgoyal136@gmail.com
Poojal Katiyar      | 220770      | poojalkatiyar13@gmail.com
Pragati Agrawal     | 220779      | pragr789@gmail.com
Saagar K V          | 220927      | saagarkopparam@gmail.com

## Architecture and Development process

We have a used Model-View-Controller architecture for our software. This architecture is well suited for the software since there are multiple ways to interact with same data presented in different views. Also, the data has to be changed independent of the view.

We used a plan-driven process to develop the software. All requirements and designs were properly documented prior to the start of implementation. 
During implementation, tasks were performed in a few stages. The frontend part (View) was first written, followed by the backend part (Model and Controller). In each stage, tasks were divided among team members and pair programming was used to carry out tasks. Thus, all team members are familiar with all stages of the development process as well as all aspects of the software.

## Code structure

The code structure reflects the architectural pattern used. The three components constituting the software are:

1. Model: Consists of MongoDB schemas for objects of various classes. The classes have been described in more detail in the Design document. The code for this component('models' folder) is located in the 'backend' directory. Each file within the folder contains the schema for a particular class.

1. View: Controls what the user sees and how he/she can interact with the software. The code for this component rests in the 'src' folder within the 'frontend' directory. Each Javascript file within the folder contains code that controls the view presented to the user. A corresponding CSS file, which controls the design of the webpage, has been included in each Javascript file. In addition, we have the components folder (which has files containing react components which handle user interaction) and the assets folder (which has other necessary files (like images)).

1. Controller: Consists of business logic that makes the software perform the desired tasks. The code for this component ('controllers' folder) is located in the 'backend' directory. Each file within the folder contains react components dealing with a specific functionality. 

The code is organised in accordance with the functionalities, which in turn correspond to webpages rendered before the user:

* Authentication : This is the sign-in/sign-up page that allows a user to create a new account and login to access his data and uses the software's functionalities.
* Dashboard : The home page of the user that is rendered when the user logs in.
* Invoice : In this page, the user can create a new invoice and generate a pdf of the invoice.
* Inventory : Here, the user can manage his inventory - adding, editing and deleting items or batches of an item
* Pending Transactions: The user can manage the record of customers who owe him money as well as of suppliers to who the user owes money.
* Reports: This page provides useful insights to the user by analyzing temporal data and rendering meaningful graphs.
* FAQ and Contact Us: These pages provide help to the user in using the software and in reaching out to us.

A navigation panel is available to the user at all times, enabling him to navigate between pages swiftly.

### Other important files:

* index.js and App.js : They are located in the 'src' folder within the 'frontend' directory. 'index.js' is the main file that drives the View component. It renders the App component from 'App.js'. 'App.js' maintains the authenticated user and imports most other files that constitute the frontend. It is responsible for routing between various webpages.

* server.js : It is located in the 'backend' directory. It forms the heart of the software as it connects the frontend with the backend logic. It handles requests from the web by using a corresponding router which further directs to the controller logic. Controller then interacts with the database (using the models) and performs the desired task. The response is then sent back to the fetch point.

* routes : This is a folder in the 'backend' directory. 'server.js' directs to a specific file in this folder depending on the request. Further details about the request are used by this file to reach out to the appropriate controller.
