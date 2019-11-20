# CIVIS FRONTEND

This app is generated from AngularStarterpack, instruction of which is given below.

STEPS TO GET STARTED:
1. Clone this repo.
2. git checkout staging
3. npm install
4. Get environment files from your colleagues and paste them in the root directory as an env folder
5. For staging api - npm run start:staging
6. For prod api - npm run start:prod

DEPLOYMENT:
This app is configured to auto trigger deployment on master and staging branches configuration of which can be found in travis.yml
1. Any push or merge to staging branch deploys this app to staging.civis.vote
2. Any push or merge to master branch deploys this app to civis.vote


# AngularStarterpack

This is app is build from Angular Boilerplate. Angular Boilerplate is a template that can be used to kickstart the development on any Angular project with speed. In the 4 years of working in a service industry, we have built numerous projects and accumulated a lot of learnings from them, that are baked into this boilerplate. Over time, we also noticed certain similarities that repeat themselves in all the projects. We did not necessarily have to re-invent the wheel everytime a new project was started. This boilerplate was all that we would need to get to writing the business logic of the project, the stuff that truly mattered. Using this boilerplate as the base for a project would also force devs to adopt a certian standard set by the boilerplate, thereby ensuring everyone is writing efficient, abstarcted and highly readable code!

The boilerplate has/will have the following- 

## Components

1. Linear loader
2. Spinner
3. Pseudo cards (In Progress)
4. Avatar (In Progress)
5. Success/Error Toast Messages
6. Action Buttons (In Progress)
7. Action Modals (In Progress)
8. Error Modals
9. Confirmations Modals

## Directives

1. Limit-to 
2. Search Input 
3. Lazy load images directive 
4. Infinite Scroll 

## Pipes

1. safeHTML 
2. moment parser 
3. join 
4. duration 
5. titlelize 

## Services

1. Authentication (basic scaffolding)
2. User Service (basic scaffolding)
3. Apollo Service
4. Error Service
5. Constants service
6. Validators (In Progress)

## Style components

1. Icon pack (In Progress)
2. Fonts & typography (In Progress)
3. Navbar (In Progress)
4. Animations/Micro interactions (In Progress)
5. Layouts (In Progress)
    1. Grids
    2. Cards
    3. Panels

## Modular Functions

1. DeepCopy 
2. makeDateTime 
3. isObjectEmpty
4. isMobile 
5. getRelativeTime
