# twitter-embed: embed nice tweets as HTML in web pages

The goal of twitter-embed is to generate HTML for embedding a twitter posting on a web page. Some time ago Twitter had a web tool named Blackbird Pie that did this, but that service no longer appears to be in existence.  

There are several tools out there for this goal.  Twitter-embed is a Node.js implementation that's (currently) a command line tool.  Unlike other tools, twitter-embed creates a pure HTML representation of a tweet, rather than using JavaScript in the browser.

It is an npm module (at the moment not in the npm repositories)

Once it is installed you can write an application like so:-

   var tw = require('./twitter-embed');
   tw.formatTweet(process.argv[2], function(text) { console.log(text); } );

Internally it uses an EJS based template to format the tweet.  TBD: Allow the program to specify a template

When this script is run the HTML is printed on the console.  It's your responsibility to paste that HTML into a web page.
