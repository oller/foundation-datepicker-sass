# foundation-datepicker-sass

Forked version of Eternicode's [original code](https://github.com/eternicode/bootstrap-datepicker) to support Zurb Foundation 5, or as a standalone datepicker.

Taking some time to manually remove all the bootstrap dependencies, and any other bloat, I intend to keep the JS files up to date with the master branch.

Versions are incremented according to [semver](http://semver.org/).

## Installation

This package is best managed through [bower](http://bower.io).  It can be installed via

    bower install foundation-datepicker-sass --save

If you're using this with Foundation and compiling the .scss, I'd suggest you duplicate the `scss/settings.scss` file into your own `scss` folder, customise it there and update the `@import` reference ot the `datepicker.scss` file which remains in the `bower_components` folder.

This will allow you to customise the datepicker's theme whilst maintaining the ability to update the library

## Dependencies

This datepicker, uses some of foundation's dropdown classes to style the datepicker container.  So you want to make sure you're including

    foundation/scss/foundation/components/_dropdown.scss

The datepicker doesn't have any javascript requirements from Foundation.

## Development

Once you cloned the repo, you'll need to install [grunt](http://gruntjs.com/) and the development dependencies using [npm](https://npmjs.org/).

    npm install -g grunt-cli
    npm install

You can then use grunt to compile any changes you make to the scss to create new minified css.
