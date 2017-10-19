# Part 1: Playing with Vue Syntax - SOLUTION

## Step 1

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

## Step 2

```html

```

## Step 3

```html

```