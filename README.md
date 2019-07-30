# gwd

This is a library for Google Web Designer Templates and Utils

## Getting Started

Use these templates for an easy start on GWD projects. Currently mainly focused on the Google Poly 3D Expandable projects.

### Prerequisites

Get Google Web Designer: https://webdesigner.withgoogle.com/


### Installation

#### Custom Templates

You can use the templates located in src/custom_templates directly by opening them in Google Web Designer. And you can put the templates in your personal gwd custom templates folder. Should be located here on Windows:

```sh
C:\Users\[username]\Documents\Google Web Designer\templates
```

Open a template by opening the index.html file. 
For example, open src/custom_templates/300x250_fullscreen_3dmodel_expandable/index.html and save it somewhere on your computer.

##### 300x250_fullscreen_3dmodel_expandable

This one has been designed to work with the new 3d Model Component in a fullscreen mobile expandable creative in portrait mode. It includes animation and user events and workarounds for scrolling. 

* **settings.js** - Contains all the settings of the creative. Define the width and height of the collapsed size, 3d model animation keyframes etc.
* **logic.js** - Contains all the logic of the creative, including 3d model animation and user events
* **animation.js** - Contains all the animation of the creative, setup with the greensock library
* **scroll.html** - Available to display your creative with scrollbars and scrolling events.

#### Utils

##### zip-folder
A workaround for uploading your single-page fullscreen expandable zips into DV360 after publishing them locally as zips. It basically replaces some Enabler fullscreen functions to prevent DV360 not accepting the custom setup.

Install the mandatory node_modules in cmd with:	
```sh
npm install
```

Run in cmd with:
```sh
node zip-a-folder [absolute path of folder containing all the .zip]
```

It replaces in the main .html file:
```sh
"Expandable 3.0.0" with "Banner 3.0.0"
Enabler.requestFullscreenExpand() to Enabler["requestFull" + "screenExpand"]()
Enabler.queryFullscreenSupport() to Enabler["queryFull" + "screenSupport"]()
Enabler.queryFullscreenDimensions() to Enabler["queryFull" + "screenDimensions"]()
Enabler.finishFullscreenExpand() to Enabler["finishFull" + "screenExpand"]()
Enabler.requestFullscreenCollapse() to Enabler["requestFull" + "screenCollapse"]()
Enabler.finishFullscreenCollapse() to Enabler["finishFull" + "screenCollapse"]()
```


## Contribute

View [CONTRIBUTING.md](./CONTRIBUTING.md)


## Changelog

View [CHANGELOG.md](./CHANGELOG.md)


## Authors

View [AUTHORS.md](./AUTHORS.md)


## LICENSE

[MIT](./LICENSE) © MediaMonks




