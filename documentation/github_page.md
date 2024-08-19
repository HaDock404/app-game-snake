# GIThub Page  

How to deploy App in Github Page.  

## Install the gh-pages npm package  

```bash
npm install gh-pages --save-dev
```  

## Add a homepage property to the package.json file  

Open the package.json file in a text editor.  
Add a homepage property in this format*: https://{username}.github.io/{repo-name}  

```bash
  "name": "my-app",
  "version": "0.1.0",
+ "homepage": "https://gitname.github.io/react-gh-pages",
  "private": true,
```

## Add deployment scripts to the package.json file  

```bash
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

## Push the React app to the GitHub repository  

```bash
npm run deploy
```