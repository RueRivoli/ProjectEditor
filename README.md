# project_editor

Vue.js 2.5.2
Element ui 2.14.1
Axios 0.21.0
Vuex 3.5.1
Jest 22.0.4


I decided to use Element ui because it's a library familiar to me that helps me to organize easily a template. 
I decided to create a store to know if the user is authenticated from every part of the app.
I decided to use axios to make http requests to the Phrase API because it's quite easy to handle.
Thus, I have created a folder Service where i put my files AuthService.js and ProjectsService.js.
In AuthService.js i send a request with axios to authenticated the user and retrieve credentials that i store in the localStorage and in ProjectService.js i write requests to get the list of projects belonging to the user and to update any project. In the method defaultsHeaders, i retrieve credentials from localStorage to include it in requests.
I decided to write a single file for styling: globalstyle.css and to place css properties in the components scoped style part when necessary.
To test my components, i have used the test runner Jest.

> Project Editor 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
