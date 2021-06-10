# SSGModInstaller

SSGModInstaller is a mod installer for minecraft that I made cause everyone is too damn stubborn to learn how forge works

## Installation

This requires nodejs 12.18.0 (at least thats what i developed it on), as well as nwbuilder and pkg being installed globally

```bash
npm i -g nw-builder
```

```bash
npm i -g pkg
```

Use npm to install the required modules for both the app and setup

```bash
npm i package-lock.json
```

also make sure to copy the nwjs sdk into the app folder, as well as extracting the java runtime into the "jre" folder

nwjs sdk: https://dl.nwjs.io/v0.54.0/nwjs-sdk-v0.54.0-win-x64.zip

java runtime: https://fs.kcgdnetwork.net:2028/file/36pszaoeSyR-P19b1DUpunNXjjw9/jre.7z (can also get this by copying the contents of java's "bin" folder, reccomended to use java 1.8.0_291)

## Usage

Just run build.bat, should create a release for the program, this applies to both the app and setup

## License
[MIT](https://choosealicense.com/licenses/mit/)