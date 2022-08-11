
This PR is used to experiment with CriticalCSS and [CompiledCSS](https://github.com/atlassian-labs/compiled). It's no where near production-ready.

The idea is to inline “CriticalCSS” for the rendered view on the server, and then loading all the styles async.

## Install
```bash
    npm install
    npm start
```

## Usage
http://localhost:3000/ is stylesheet extraction enabled.

http://localhost:3000/ is critical css extraction enabled.
