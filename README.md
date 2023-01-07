# TS-expressjs-RESTAPI

## SET UP
* `npm init -y`
* `npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express`

---
* in the **tsconfig.json** modify:
```js 
"baseUrl": "./src" /* Specify the base directory to resolve non-relative module names. */,
"paths": {
            "@/resources/*": ["resources/*"],
            "@/utils/*": ["utils/*"],
            "@/middleware/*": ["middleware/*"]
         }
```

* ALso 
```js
"outDir": "dist"
```

* The **package.json** should be modified to this:
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node dist/index.js",
    "dev": "tsc-watch --onSuccess \"node ./dist/index.js\"",
    "build": "tsc",
    "postinstall": "npm run build"
  },
  
  
  "devDependencies": {
    "@types/express": "^4.17.15",
    "@types/node": "^18.11.18",
    "@typescript-eslint/eslint-plugin": "^5.48.0",
    "@typescript-eslint/parser": "^5.48.0",
    "eslint": "^8.31.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-prettier": "^4.2.1",
    "prettier": "^2.8.2",
    "tsc-watch": "^6.0.0",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "module-alias": "^2.2.2"
  },
  "_moduleAliases": {
    "@/resources": "dist/resources",
    "@/utils": "dist/utils",
    "@/middleware": "dist/middleware"
  }
```

## Create the following file (**.eslintrc.js .prettierrc.js**) and modify them as:
* for **.eslintrc.js**

```js
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin: prettier/recommended',
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};

```

* for **.prettierrc.js**
```js
module.exports = {
  tabWidth: 4,
  singleQuote: true,
  semi: true
};

```
