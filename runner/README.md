# Example

Visited in a web browser http://host.docker.internal:3000/?packages=lit-element,@adobe/lit-mobx

After approx 90 seconds user recieves a link: 

```
http://host.docker.internal:9000/bucket/949d7841?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20200316%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200316T210243Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=a6b8341d81b6c668e1308f820a6b4c9b182e83f450c0f03e04d9cce1c0bbab6c
```

Clicking it downloads this file. [./examples/949d7841.zip](./examples/949d7841.zip)

## Server Logs

```bash
app_1    | packages: lit-element,@adobe/lit-mobx
app_1    | dependencies: { 'lit-element': '', '@adobe/lit-mobx': '' }
app_1    | writing new bundle.js for 949d7841
app_1    | yarn start
app_1    | yarn install v1.10.1
app_1    |
app_1    | info No lockfile found.
app_1    |
app_1    | [1/4] Resolving packages...
app_1    |
app_1    | [2/4] Fetching packages...
app_1    |
app_1    | info fsevents@1.2.11: The platform "linux" is incompatible with this module.
app_1    | info "fsevents@1.2.11" is an optional dependency and failed compatibility check. Excluding it from installation.
app_1    |
app_1    | [3/4] Linking dependencies...
app_1    |
app_1    | [4/4] Building fresh packages...
app_1    |
app_1    | success Saved lockfile.
app_1    |
app_1    | Done in 53.65s.
app_1    |
app_1    | yarn build
app_1    | yarn run v1.10.1
app_1    |
app_1    | $ polymer build && yarn run terser
app_1    |
app_1    | info:	Clearing build/ directory...
app_1    |
app_1    | info:	(es6) Building...
app_1    |
app_1    | info:	(es5-amd) Building...
app_1    |
app_1    | info:	(es6-amd) Building...
app_1    |
app_1    | info:	(es6) Build complete!
app_1    |
app_1    | info:	(es5-amd) Build complete!
app_1    |
app_1    | info:	(es6-amd) Build complete!
app_1    |
app_1    | $ gulp
app_1    |
app_1    | [21:02:41]
app_1    | Using gulpfile /tmp/input/949d7841/gulpfile.js
app_1    |
app_1    | info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
app_1    |
app_1    | info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
app_1    |
app_1    | remove node_modules directory
app_1    | zip it
app_1    |   adding: assets/ (stored 0%)
app_1    |   adding: assets/babel-top.js
app_1    |  (deflated 65%)
app_1    |   adding: assets/upgrade-browser.html
app_1    |  (deflated 71%)
app_1    |   adding: index.html
app_1    |  (deflated 34%)
app_1    |   adding: dist/ (stored 0%)
app_1    |   adding: dist/build.html
app_1    |  (deflated 49%)
app_1    |   adding: dist/app.js
app_1    |  (deflated 16%)
app_1    |   adding: build/ (stored 0%)
app_1    |   adding: build/es6/ (stored 0%)
app_1    |   adding: build/es6/dist/ (stored 0%)
app_1    |   adding: build/es6/dist/build.html (deflated 47%)
app_1    |   adding: build/es6/dist/app.js
app_1    |  (deflated 40%)
app_1    |   adding: build/es6/node_modules/ (stored 0%)
app_1    |   adding: build/es6/node_modules/web-animations-js/ (stored 0%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations-next-lite.min.js
app_1    |  (deflated 76%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations-next-lite.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations-next.min.js
app_1    |  (deflated 76%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations.min.js
app_1    |  (deflated 75%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations.min.js.map
app_1    |  (deflated 59%)
app_1    |   adding: build/es6/node_modules/web-animations-js/web-animations-next.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es6/node_modules/lit-html/ (stored 0%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/ (stored 0%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/shady-render.js
app_1    |  (deflated 65%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/directive.js (deflated 57%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/dom.js
app_1    |  (deflated 58%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/template-factory.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/render.js
app_1    |  (deflated 55%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/parts.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/template.js
app_1    |  (deflated 65%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/template-result.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/default-template-processor.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/part.js (deflated 50%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/template-instance.js
app_1    |  (deflated 61%)
app_1    |   adding: build/es6/node_modules/lit-html/lib/modify-template.js
app_1    |  (deflated 66%)
app_1    |   adding: build/es6/node_modules/lit-html/lit-html.js
app_1    |  (deflated 61%)
app_1    |   adding: build/es6/node_modules/promise-polyfill/ (stored 0%)
app_1    |   adding: build/es6/node_modules/promise-polyfill/dist/ (stored 0%)
app_1    |
app_1    |   adding: build/es6/node_modules/promise-polyfill/dist/polyfill.min.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6/node_modules/@adobe/ (stored 0%)
app_1    |   adding: build/es6/node_modules/@adobe/lit-mobx/ (stored 0%)
app_1    |   adding: build/es6/node_modules/@adobe/lit-mobx/lit-mobx.js
app_1    |  (deflated 45%)
app_1    |   adding: build/es6/node_modules/@adobe/lit-mobx/lib/
app_1    |  (stored 0%)
app_1    |   adding: build/es6/node_modules/@adobe/lit-mobx/lib/mixin.js
app_1    |  (deflated 56%)
app_1    |   adding: build/es6/node_modules/lit-element/ (stored 0%)
app_1    |   adding: build/es6/node_modules/lit-element/lit-element.js
app_1    |  (deflated 62%)
app_1    |   adding: build/es6/node_modules/lit-element/lib/ (stored 0%)
app_1    |   adding: build/es6/node_modules/lit-element/lib/updating-element.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es6/node_modules/lit-element/lib/css-tag.js
app_1    |  (deflated 56%)
app_1    |   adding: build/es6/node_modules/lit-element/lib/decorators.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es6/node_modules/fetch-ie8/ (stored 0%)
app_1    |   adding: build/es6/node_modules/fetch-ie8/fetch.js
app_1    |  (deflated 73%)
app_1    |   adding: build/es6/node_modules/@webcomponents/ (stored 0%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/ (stored 0%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/bundles/ (stored 0%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js
app_1    |  (deflated 69%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es6/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6-amd/ (stored 0%)
app_1    |   adding: build/es6-amd/dist/ (stored 0%)
app_1    |   adding: build/es6-amd/dist/build.html
app_1    |  (deflated 58%)
app_1    |   adding: build/es6-amd/dist/app.js
app_1    |  (deflated 48%)
app_1    |   adding: build/es6-amd/node_modules/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations-next-lite.min.js
app_1    |  (deflated 76%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations-next-lite.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations-next.min.js
app_1    |  (deflated 76%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations.min.js
app_1    |  (deflated 75%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations.min.js.map
app_1    |  (deflated 59%)
app_1    |   adding: build/es6-amd/node_modules/web-animations-js/web-animations-next.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/shady-render.js
app_1    |  (deflated 66%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/directive.js
app_1    |  (deflated 59%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/dom.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/template-factory.js
app_1    |  (deflated 61%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/render.js
app_1    |  (deflated 56%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/parts.js
app_1    |  (deflated 73%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/template.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/template-result.js
app_1    |  (deflated 62%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/default-template-processor.js
app_1    |  (deflated 63%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/part.js (deflated 53%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/template-instance.js
app_1    |  (deflated 62%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lib/modify-template.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es6-amd/node_modules/lit-html/lit-html.js
app_1    |  (deflated 80%)
app_1    |   adding: build/es6-amd/node_modules/promise-polyfill/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/promise-polyfill/dist/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/promise-polyfill/dist/polyfill.min.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6-amd/node_modules/@adobe/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@adobe/lit-mobx/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@adobe/lit-mobx/lit-mobx.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es6-amd/node_modules/@adobe/lit-mobx/lib/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@adobe/lit-mobx/lib/mixin.js
app_1    |  (deflated 58%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/lit-element.js
app_1    |  (deflated 66%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/lib/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/lib/updating-element.js
app_1    |  (deflated 72%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/lib/css-tag.js
app_1    |  (deflated 59%)
app_1    |   adding: build/es6-amd/node_modules/lit-element/lib/decorators.js
app_1    |  (deflated 69%)
app_1    |   adding: build/es6-amd/node_modules/fetch-ie8/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/fetch-ie8/fetch.js
app_1    |  (deflated 73%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/bundles/ (stored 0%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js
app_1    |  (deflated 69%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es6-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es5-amd/ (stored 0%)
app_1    |   adding: build/es5-amd/dist/ (stored 0%)
app_1    |   adding: build/es5-amd/dist/build.html
app_1    |  (deflated 65%)
app_1    |   adding: build/es5-amd/dist/app.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es5-amd/node_modules/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations-next-lite.min.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations-next-lite.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations-next.min.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations.min.js
app_1    |  (deflated 68%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations.min.js.map
app_1    |  (deflated 59%)
app_1    |   adding: build/es5-amd/node_modules/web-animations-js/web-animations-next.min.js.map
app_1    |  (deflated 62%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/shady-render.js
app_1    |  (deflated 63%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/directive.js
app_1    |  (deflated 57%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/dom.js
app_1    |  (deflated 59%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/template-factory.js
app_1    |  (deflated 58%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/render.js
app_1    |  (deflated 54%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/parts.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/template.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/template-result.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/default-template-processor.js
app_1    |  (deflated 61%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/part.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/template-instance.js
app_1    |  (deflated 59%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lib/modify-template.js
app_1    |  (deflated 64%)
app_1    |   adding: build/es5-amd/node_modules/lit-html/lit-html.js
app_1    |  (deflated 76%)
app_1    |   adding: build/es5-amd/node_modules/promise-polyfill/
app_1    |  (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/promise-polyfill/dist/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/promise-polyfill/dist/polyfill.min.js
app_1    |  (deflated 64%)
app_1    |   adding: build/es5-amd/node_modules/@adobe/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/@adobe/lit-mobx/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/@adobe/lit-mobx/lit-mobx.js
app_1    |  (deflated 49%)
app_1    |   adding: build/es5-amd/node_modules/@adobe/lit-mobx/lib/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/@adobe/lit-mobx/lib/mixin.js
app_1    |  (deflated 60%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/lit-element.js
app_1    |  (deflated 64%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/lib/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/lib/updating-element.js
app_1    |  (deflated 69%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/lib/css-tag.js
app_1    |  (deflated 55%)
app_1    |   adding: build/es5-amd/node_modules/lit-element/lib/decorators.js
app_1    |  (deflated 68%)
app_1    |   adding: build/es5-amd/node_modules/fetch-ie8/
app_1    |  (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/fetch-ie8/fetch.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/ (stored 0%)
app_1    |
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js
app_1    |  (deflated 67%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
app_1    |  (deflated 50%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/bundles/ (stored 0%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js
app_1    |  (deflated 70%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js
app_1    |  (deflated 69%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-ce.js
app_1    |  (deflated 71%)
app_1    |   adding: build/es5-amd/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js
app_1    |  (deflated 70%)
app_1    |   adding: build/polymer.json
app_1    |  (deflated 74%)
app_1    |   adding: advanced.html
app_1    |  (deflated 45%)
app_1    |   adding: build.js
app_1    |  (deflated 63%)
app_1    |   adding: package.json
app_1    |  (deflated 53%)
app_1    |   adding: polymer.json (deflated 73%)
app_1    |   adding: yarn.lock
app_1    |  (deflated 62%)
app_1    |   adding: gulpfile.js (deflated 63%)
```