# Part 3: .vue file

## Step 1: switch everything to .vue file!

```
npm install -g vue-cli
vue init webpack hostel-land
cd hostel-land
npm install

npm run dev
```

Replace the Hello.vue by `HostelList.vue`


## Step 2: split components

Separate `HostelList.vue` into 2 components:

* `HostelList.vue`
* `HostelListItem.vue`

```
├── src/components/
│   ├── HostelList.vue
│   ├── HostelListItem.vue
```
