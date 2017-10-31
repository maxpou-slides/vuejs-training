# Part 1: Playing with Vue Syntax - SOLUTION

## Step 1

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://unpkg.com/vue"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
</head>
<body>
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  <div class="ui cards">


    <div class="card">
      <div class="content">
        <div class="right floated meta">{{ hostel.price.amount }}{{ hostel.price.currency }}</div>
        <div class="header">{{ hostel.name }}</div>
      </div>
      <div class="content">
        <div class="meta">{{ hostel.location }}</div>
        <div class="description">
            {{ hostel.description }}
        </div>
      </div>
    </div>


  </div>
</div>
<script>
var app = new Vue({
  el: '#app',
  data: {
    hostel: {
      name: 'Happy Hostel',
      location: 'Berlin',
      price: {
        amount: 12,
        currency: '€'
      },
      description: 'Laboriosam est doloremque et sunt iure. Tenetur fugiat non ut autem repellat qui qui. Tempore pariatur exercitationem tempora. Laborum ut qui sed enim recusandae voluptas voluptas rerum accusantium.'
    }
  }
})
</script>
</body>
</html>
```

## Step 2

```html
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  <div class="ui cards">


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
        <div v-if="hostel.availability" class="ui orange bottom attached button">
          Book now
        </div>
        <div v-else class="ui bottom attached disabled button">
          Too late!
        </div>
      </div>


  </div>
</div>
<script>
var app = new Vue({
  el: '#app',
  data: {
    hostel: {
      name: 'Happy Hostel',
      location: 'Berlin',
      price: {
        amount: 12,
        currency: '€'
      },
      description: 'Laboriosam est doloremque et sunt iure. Tenetur fugiat non ut autem repellat qui qui. Tempore pariatur exercitationem tempora. Laborum ut qui sed enim recusandae voluptas voluptas rerum accusantium.',
      bonus: {
        hasFreeWifi: false,
        hasTv: false,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 88,
      availability: false,
      isActive: true
    }
  }
})
</script>
```

## Step 3

```html
<div id="app" class="ui container">
  <h1 class="ui center aligned header">HostelVue</h1>
  <div class="ui cards">


      <div class="card" v-for="hostel in hostels" v-show="hostel.isActive">
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
        <div v-if="hostel.availability" class="ui orange bottom attached button">
          Book now
        </div>
        <div v-else class="ui bottom attached disabled button">
          Too late!
        </div>
      </div>


  </div>
</div>
<script>
var app = new Vue({
  el: '#app',
  data: {
    hostels: [{
      name: 'Happy Hostel',
      location: 'Berlin',
      price: {
        amount: 12,
        currency: '€'
      },
      description: 'Laboriosam est doloremque et sunt iure. Tenetur fugiat non ut autem repellat qui qui. Tempore pariatur exercitationem tempora. Laborum ut qui sed enim recusandae voluptas voluptas rerum accusantium.',
      bonus: {
        hasFreeWifi: false,
        hasTv: false,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 88,
      availability: true,
      isActive: true
    },{
      name: 'WunderLand',
      location: 'Dublin',
      price: {
        amount: 24,
        currency: '€'
      },
      description: 'Nulla vero eveniet autem perferendis. Esse est itaque esse assumenda odit enim. Perspiciatis non omnis fugit officia omnis quia distinctio consequatur voluptatem. Necessitatibus ipsa sunt autem ducimus facilis.',
      bonus: {
        hasFreeWifi: true,
        hasTv: true,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 95,
      availability: true,
      isActive: true
    },{
      name: 'Unknown Hostel',
      location: 'Dublin',
      price: {
        amount: 24,
        currency: '€'
      },
      description: 'Repellat et aliquid sit ab nemo et qui veniam dignissimos. Ducimus explicabo ut. Error expedita commodi. Nihil in est voluptatem molestiae consequatur rerum ex.',
      bonus: {
        hasFreeWifi: true,
        hasTv: false,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 77,
      availability: true,
      isActive: false
    },{
      name: 'Medium Hostel',
      location: 'Berlin',
      price: {
        amount: 5,
        currency: '€'
      },
      description: 'Aliquid id ad optio dignissimos modi.',
      bonus: {
        hasFreeWifi: false,
        hasTv: true,
        hasFreeBreakfast: false,
        hasBar: false
      },
      rating: 54,
      availability: true,
      isActive: true
    }]
  }
})
</script>
```


## Step Bonus

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
    <div class="card" v-for="hostel in hostelsShown" v-show="hostel.isActive">
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
      <div v-if="hostel.availability" class="ui orange bottom attached button">
        Book now
      </div>
      <div v-else class="ui bottom attached disabled button">
        Too late!
      </div>
    </div>


  </div>
</div>
<script>
var app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    hostels: [{
      name: 'Happy Hostel',
      location: 'Berlin',
      price: {
        amount: 12,
        currency: '€'
      },
      description: 'Laboriosam est doloremque et sunt iure. Tenetur fugiat non ut autem repellat qui qui. Tempore pariatur exercitationem tempora. Laborum ut qui sed enim recusandae voluptas voluptas rerum accusantium.',
      bonus: {
        hasFreeWifi: false,
        hasTv: false,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 88,
      availability: true,
      isActive: true
    },{
      name: 'WunderLand',
      location: 'Dublin',
      price: {
        amount: 24,
        currency: '€'
      },
      description: 'Nulla vero eveniet autem perferendis. Esse est itaque esse assumenda odit enim. Perspiciatis non omnis fugit officia omnis quia distinctio consequatur voluptatem. Necessitatibus ipsa sunt autem ducimus facilis.',
      bonus: {
        hasFreeWifi: true,
        hasTv: true,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 95,
      availability: true,
      isActive: true
    },{
      name: 'Unknown Hostel',
      location: 'Dublin',
      price: {
        amount: 24,
        currency: '€'
      },
      description: 'Repellat et aliquid sit ab nemo et qui veniam dignissimos. Ducimus explicabo ut. Error expedita commodi. Nihil in est voluptatem molestiae consequatur rerum ex.',
      bonus: {
        hasFreeWifi: true,
        hasTv: false,
        hasFreeBreakfast: false,
        hasBar: true
      },
      rating: 77,
      availability: true,
      isActive: false
    },{
      name: 'Medium Hostel',
      location: 'Berlin',
      price: {
        amount: 5,
        currency: '€'
      },
      description: 'Aliquid id ad optio dignissimos modi.',
      bonus: {
        hasFreeWifi: false,
        hasTv: true,
        hasFreeBreakfast: false,
        hasBar: false
      },
      rating: 54,
      availability: true,
      isActive: true
    }]
  },
  computed: {
    hostelsShown () {
      return this.hostels.filter(hostel => hostel.name.toLowerCase().includes(this.userSearch))
    }
  }
})
</script>
```