[![NPM](https://nodei.co/npm/eternal-support.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nekos.life/)

# Eternal Support

Eternal-Support is a support library, which adds useful functions and requests to libraries such as nekos.life and akaneko, its objective is the optimization of work resources

## Utilities

Obtaining anime images through akaneño and nekos.life _Example:_

### Anime Images

```js
import { mobileWallpapers } from 'eternal-support';
async function getMobileWallpapers() {
  const mobileWallpapers = await mobileWallpapers();
  console.log(mobileWallpapers);
}

getMobileWallpapers();
```

### Console Style

```js
import { logWithLabel } from 'eternal-support';
logWithLabel('info', 'Hello World');
```

## Installation

```bash
npm install eternal-support
```

## Types of requests

I added a typings file and will be working to improve it. This allows editors like VSC to use *intellisense/autocomplete* to suggest functions and help out with parameters and to see what you'll be receiving as a result of function calls.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
- [MIT](https://choosealicense.com/licenses/mit/)
- [ISC](https://choosealicense.com/licenses/isc/)
- [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

## Beta Version

The project is in its first versions so it is not even 20% of what it is expected to be able to do. If you have questions about the library's requests, consult our documentation for more information [Documentation](https://docs.night-support.xyz/)

## Discord Server

If you have any questions or want to contribute to the project, join our discord server [Discord](http://discord.night-support.xyz/)