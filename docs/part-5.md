# Part 4: Routing

## Step 1: setup routing

You can install vue-router like the following:

  ```bash
  npm install vue-router
  ```

Then let's configure our first route:

```js
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import HostelList from '@/components/HostelList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    }, {
      path: '/list',
      name: 'List',
      component: HostelList
    }
  ]
})
```

In the main.js, add the router to the Vue instance:

```js
// main.js
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```


## Step 2: create a new representation of hostels
