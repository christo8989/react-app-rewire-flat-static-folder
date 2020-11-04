# `react-app-rewire-flat-static-folder`
Flatten the static folder from the react build from create-react-app with react-app-rewired.

Add to your `create-react-app` app via [`react-app-rewired`](https://github.com/timarney/react-app-rewired).

## Installation
```sh
npm install --save react-app-rewire-flat-static-folder
```

## Usage

In the `config-overrides.js` you created for `react-app-rewired` add this code:

```JS
const rewireFlatStaticFolder = require('react-app-rewire-flat-static-folder');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireFlatStaticFolder(config, env);
  return config;
}
```

That's it! You're done.

NOTE: There are no options/configurations at this time.

## License

Licensed under the GNU General Public License v3, Copyright ©️ 2020 Chris Jeffery. See [LICENSE](LICENSE) for more information.
