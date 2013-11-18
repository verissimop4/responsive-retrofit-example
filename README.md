## Responsive Retrofit Example

This repo demonstates a responsive retrofit of [Hacker News](http://news.ycombinator.com) by adding a responsive header using the Foundation top-bar. In a full retrofit there would be additional design changes beyond these but this should serve to illustrate the process. The Hacker News website was chosen because:

- To demonstrate the technique on a real site.
- The HTML of Hacker News is not too small to make things too easy, but not too big to make our the code complicated.

## Demo

A live demo of the retrofit is [here](https://mishan-test211301.news.ycombinator.com.moovapp.com/).

## Before Running This

To run this project, you must have the Moovweb SDK installed on your system. Installation is easy - just go to [the download page on the Moovweb site](http://console.moovweb.com/download) to download and install.

We have lots of informative guides, videos, live help, documentation, and even a book on how to use Moovweb. You should be able to get up and running in 30 minutes if you visit [console.moovweb.com](http://console.moovweb.com).

You might find [the page about the scripts folder](http://console.moovweb.com/learn/reference/configuration/pages) useful for starting to write Tritium, and our [documents on the stylesheets folder](http://console.moovweb.com/learn/reference/configuration/stylesheet) for information on how we structure our stylesheets.

## Launching

Typically, on Mac or Linux, just browse to this project folder in a terminal and then run the following command:

    sudo moov server 


Then, just browse to [mlocal.news.ycombinator.com](http://mlocal.news.ycombinator.com) and you are ready to start developing!

## Chrome SSL Warnings

If you are running this locally you will get an SSL warning from Chrome that "The site's security certificate is not trusted!". Unlike normal SSL warnings in Chrome this one will not have a "Proceed" button that you can click. To get past this warning message, simply type the "proceed" into your browser window (there will be no on screen feedback while you type) and hit return.

## Deployment

Moovweb uses a git-based deployment system. To deploy, just type

    git add --all
    git commit -m 'New code'
    git push origin master

## More Info

See detailed documentation for Moovweb at [console.moovweb.com](http://console.moovweb.com).

## Domains
Remember to put all domains you're going to hit in your etc/hosts if you run your server with the `-auto-hosts=false` option.


    127.0.0.1   mlocal.news.ycombinator.com

## Foundation

Foundation offers a variety of tools that make it easier to build web sites. This includes grids, navigation, buttons, forms, typography, CSS components, JavaScript widgets and more.

We chose Foundation specifically because it uses Sass which means it integrates smoothly into the Moovweb SDK, but you could choose any similar 3rd party framework and use it in the same way.

## Sass

You’ll notice in the `assets/stylesheets/globals/` folder, there is a `foundation/` folder that has all the Sass styles associated with the Foundation framework.

Make changes to the Sass variables in the `foundation/_variables.scss` file to alter the theme of your Foundation widgets!

## Functions

You'll also find, in the `functions/` folder, a `foundation.ts` file that defines a number of functions related to setting up Foundation widgets and components.

Check out their inline comments to learn more.


## Media Queries

To perform media queries, we've provided you with some mixins in the `_responsive.scss` file in the `assets/stylesheets/globals/` folder.

These will allow you to quickly style content for different breakpoints depending on the browser width.

## Visibility Classes

The `_responsive.scss` file also contains visibility classes that you can add to elements to tell them on what viewport sizes you want them to be visible (note that Foundation has similar visibility classes that you can use instead).

