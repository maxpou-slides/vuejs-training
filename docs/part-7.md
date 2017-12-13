# Part 7: Testing with Jest

## Installation

1. Add dependencies
  ```bash
  npm i --save-dev babel-jest babel-plugin-module-resolver cross-env jest jest-vue-preprocessor vue-test-utils
  ```
2. Add jest configuration
  ```js
  // jest.config.js
  module.exports = {
    verbose: false,
    cache: true,
    moduleFileExtensions: [
      'js',
      'vue'
    ],
    transform: {
      '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
      '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor'
    },
    collectCoverageFrom: [
      'src/**/*.{js,vue}',
      '!src/main.js',
      '!**/node_modules/**'
    ],
    coverageDirectory: '<rootDir>/tests/unit/coverage',
    mapCoverage: true
  }
  ```
3. Update the .babelrc file
  ```js
  {
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
    "plugins": ["transform-runtime"],
    "env": {
      "test": {
        "presets": ["env", "stage-2"],
        "plugins": [
          "dynamic-import-node",
          ["module-resolver", {
            "root": ["./src"],
            "alias": {
              "@": "./src"
            }
          }]
        ]
      }
    }
  }
  ```
4. Add a new command in the `package.json`
  ```js
  "unit": "cross-env BABEL_ENV=test jest tests/unit/specs/**"
  ```


Optionnal requirements:

* **ESLint**: define Jest in the environment, and lint by default the test folder
  ```js
  // .eslintrc.js
  env: {
    browser: true,
    jest: true
  }
  ```

  ```js
  // package.json
  "lint": "eslint --ext .js,.vue src tests",
  ```

* **Git**: ignore the coverage folder
  ```
  .gitignore
  +tests/unit/coverage/
  ```


## Your first unit test

It's time to create our first test!
Create a new file and paste the following:

```js
// tests/unit/specs/app.spec.js
import { mount, shallow } from 'vue-test-utils'
import MainComponent from '@/App.vue'
import store from '@/store'

describe('App.vue', () => {
  it('test initial rendering', () => {
    const wrapper = mount(MainComponent, { store })
    const appTemplate = wrapper.html()

    expect(appTemplate).toMatchSnapshot()
  })

  it('test rendering with datas', () => {
    const wrapper = shallow(MainComponent, { store })
    const appTemplate = wrapper.html()

    expect(appTemplate).toMatchSnapshot()
  })
})
```

You can run this tests with: `npm run unit`.
Jest created a new file: `tests/unit/specs/__snapshots__/app.spec.js.snap`. Open this file, it contains the component's HTML.



## New commands available

```bash
# Run tests + generate coverage (available under /tests/unit/coverage)
npm run unit -- --coverage

# Run tests in watch node
npm run unit -- --watchAll

# Run tests + update snapshots if needed
npm run unit -- -u
```


## Now, let's meet the real world