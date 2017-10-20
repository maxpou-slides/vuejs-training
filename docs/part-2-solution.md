# Part 2: components - SOLUTION

## Step 1

```js
Vue.component('hostel-list-detail', {
  template: `
    <div class="card" v-show="hostel.isActive">
      <div class="content">
        <div class="right floated meta">{{ hostel.price.amount }}{{ hostel.price.currency }}</div>
        <div class="header">{{ hostel.name }}</div>
      </div>
      <div class="content">
        <div class="meta">
          {{ hostel.location }}
          <i v-if="hostel.bonus.hasFreeWifi" class="wifi icon"></i>
          <i v-if="hostel.bonus.hasFreeBreakfast" class="coffee icon"></i>
          <i v-if="hostel.bonus.hasTv" class="desktop icon"></i>
          <i v-if="hostel.bonus.hasBar" class="bar icon"></i>
        </div>
        <div class="description">
          {{ hostel.description }}
        </div>
      </div>
      <div v-if="hostel.availability" class="ui bottom attached button">
        Book now
      </div>
      <div v-else class="ui bottom attached disabled button">
        Too late!
      </div>
    </div>
  `,
  props: ['hostel']
})
```

```html
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  
  <form class="ui form">
    <div class="field">
      <input type="text" placeholder="filter by name" v-model="userSearch">
    </div>
  </form>
  <br>

  <div class="ui cards">
      <hostel-list-detail v-for="hostel in filteredHostels" :hostel="hostel"></hostel-list-detail>
  </div>

</div>
```

## Step 2

```

```