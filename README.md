# donation-notification

Notify [donation-tracker]()'s donation with listening websocket.

Only implemented notify to discord webhook now, but still possible to extend by add implementation [Notification.ts](./src/interfaces/Notification.ts).

## Requirements

- Node.js 12.x or newer

## Installation

- Install dependencies

```bash
npm install --production
```

- Make environment configuration file

``` bash
cp ./config/default.json ./config/[environment].json
# Or use local configuration file
cp ./config/default.json ./config/local.json
```

`[environment]` is environment name references $NODE_ENV environment variable.

More information about config is available at official document for [node-config](https://github.com/lorenwest/node-config/wiki).

Then edit configuration file. Example is available at [here](./config.default.json). And schema of typescript at [here](./src/types/donation.d.ts).

## Usage

```bash
npm start
```