# SSGModInstaller

SSGModInstaller is a mod installer for minecraft that I made cause everyone is too damn stubborn to learn how forge works

## Installation

This requires nodejs 12.18.0 (at least thats what i developed it on), as well as nwbuilder and pkg being installed globally

it also requires git to be installed and accessible from the command line (https://gitforwindows.org/)

```bash
npm i -g nw-builder
```

```bash
npm i -g pkg
```

Use npm to install the required modules for both the app and setup

app (run in the app folder):
```bash
npm i fs https rimraf appdata-path unzipper
```

setup (run in setup folder)
```bash
npm i fs rimraf unzipper https cli-cursor
```

also make sure to copy the nwjs sdk into the app folder

nwjs sdk: https://dl.nwjs.io/v0.54.0/nwjs-sdk-v0.54.0-win-x64.zip

## Usage

Just run build.bat, should create a release for the program, this applies to both the app and setup

## License
[MIT](https://choosealicense.com/licenses/mit/)
