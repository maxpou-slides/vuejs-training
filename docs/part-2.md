# Part 2: components

Our final goal is to create something like this:

![](../resources/workshop-2.png)

## Step 1: component separation

Rename the master component into `hostel-list` and create a sub component `hostel-list-item`.
The `hostel-list` should pass to his childrens an `hostel` property which contain an hostel object.

![](../resources/components-presentation.png)

## Step 2: create a like feature

![](../resources/components-presentation-like-feature.png)

Create a *like* feature. When a user like an hostel, he can click to the heart icon.
Then the `hostel-list-item` should raise an event to his parent.
The parent component have to store the liked hostels.

**Tip!**: HTML template for like icon

```html
<i class="heart icon"></i>
<i class="red heart icon"></i>
```

## Step 3: create a filter 'liked hostels'

Allow user to list only liked hostels