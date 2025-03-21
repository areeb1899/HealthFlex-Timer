# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



How to set up the project

1.Clone the repository
git clone https://github.com/areeb1899/HealthFlex-Timer.git
cd timer-app

2.Install dependencies
npm install


3.Start the development server
npm run dev


4.Open in your browser
http://localhost:5173


Assumptions made during the developing the project
1 Timers are stored in localStorage, so they won’t disappear when you refresh the page.
2 Once a timer is marked Completed, it stays that way even if you leave and come back.
3 To keep the timers ogranized i added expandable and collapsing feature
4 alert will be there when the timer reaches 50%
5 Took care of the responsivess so that mobile users can access the web app too
6 applied dark mode even the user reloads the page
7 added modal when the timer ends I found difficulty here but eventually achieved it 
8 user can download json file 

