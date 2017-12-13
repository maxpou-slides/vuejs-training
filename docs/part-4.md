# Part 4: HTTP&Axios

## Step 1: fetch hostels from an API with AXIOS

When the HostelList component is created, fetch an API to return the hostels.
API link: http://slides.maxpou.fr/vuejs-training/resources/hostels.json

If you don't know which event is the most appropriate, checkout the [Lifecycle diagram](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).



**Tip!**: 

* You can install axios like the following:
  ```bash
  npm install axios
  ```
  (there is also some examples on the [GitHub readme](https://github.com/axios/axios#example))
* You can store variable in `config/prod.env.js` file and access to this variable with `process.env.NODE_ENV`. Check official documentation about [Environment Variables](http://vuejs-templates.github.io/webpack/env.html).
* You can use a lifecycle hook like this
  ```js
  export default {
    data () {
      return {
        // ...
      }
    },
    created () {
      console.log('I just get mounted!')
    }
  }
  ```
