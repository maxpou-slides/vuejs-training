# Part 3: .vue files

## Step 1: setup a vue project

```bash
npm install -g vue-cli
vue init webpack hostel-vue
cd hostel-vue
npm install

npm run dev
```

## Step 2: switch everything to .vue files!

Rename the `Hello.vue` by `HostelList.vue`. Then create a `HostelListItem.vue` file.
You should have something like this:

```
src/
├── components/
│   ├── HostelList.vue
│   ├── HostelListItem.vue
```

**Tip!**: You can import a component from another one like this: `import MyComponent from './MyComponent'`. Don't need to put .vue at the end!