# Part 4: HTTP&Axios - SOLUTION

```js
// config/prod.env.js
 module.exports = {
  NODE_ENV: '"production"',
  SWAPI_URL: "'http://slides.maxpou.fr/vuejs-training/resources/'"
}
```

```js
// src/api/hostels.js
import axios from 'axios'

export function getAll () {
  return axios.get(process.env.API_URL + 'hostel.json').then(response => response.data)
}
```

```js
// src/component/HostelList.vue
import * as hostelApi from '../api/hostels'

export default {
  // ...
  created () {
    hostelApi.getAll().then(data => {
      this.hostels = data
    })
  }
}
```