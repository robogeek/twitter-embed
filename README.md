# twitter-embed: embed tweets as nice HTML in web pages

The goal of twitter-embed is to generate HTML for embedding a twitter posting on a web page. Some time ago Twitter had a web tool named Blackbird Pie that did this, but that service no longer appears to be in existence.  

There are several tools out there for this goal.  Twitter-embed is a Node.js implementation that's (currently) a command line tool.  Unlike other tools, twitter-embed creates a pure HTML representation of a tweet, rather than using JavaScript in the browser.

It is an npm module (at the moment not in the npm repositories)

Once it is installed you can write an application like so:-

    var tw = require('./twitter-embed');
    tw.formatTweet(process.argv[2], function(text) { console.log(text); } );

Internally it uses an EJS based template to format the tweet.  TBD: Allow the program to specify a template

When this script is run the HTML is printed on the console.  It's your responsibility to paste that HTML into a web page.

The module internally attempts to figure out what kind of twitter URL it is, and the intent is to provide different HTML for each kind of URL.  However at the moment only twitter status URL's are recognized.

The twitter API endpoints used are:

    https://dev.twitter.com/docs/api/1/get/statuses/show/%3Aid

An example tweet output is:

    ``` html
    <div style="border-style: solid; border-width: 10px; border-color: #222; background-color: #eee; padding: 3px;">
    <div style="style="float: left;">
    <a href="http://twitter.com/CAUSECAST">
    <img align="left" src="http://a3.twimg.com/profile_images/1125880330/twittericon_normal.jpg">
    </a>
    <a style="color: #02b9cb;" href="http://twitter.com/CAUSECAST">@CAUSECAST</a>
       Causecast.org
       <br/>
       <span style="font-size: 70%;">
       <a style="color: #02b9cb;" href="http://www.causecast.org">http://www.causecast.org</a> Los Angeles, CA
       </span>
    </div>
    <p style="font-size: 180%; padding: 4px; margin: 4px;"><a style="color: black;" href="http://twitter.com/#!/CAUSECAST/status/127807709692170240">Excited to see #socialgood corporations at @NetImpact 2011! Let’s find ways to #giveback together, @SustainableJobs!</a></p>
    <p>Sat Oct 22 18:05:07 +0000 2011 
    <a style="color: #02b9cb; font-size: 70%;" href="http://twitter.com/netimpact">Net Impact Central</a> <a style="color: #02b9cb; font-size: 70%;" href="http://twitter.com/SustainableJobs">Ellen Weinreb</a>
    <a style="color: #02b9cb; font-size: 70%;" href="http://twitter.com/search?q=#socialgood">#socialgood</a> <a style="color: #02b9cb; font-size: 70%;" href="http://twitter.com/search?q=#giveback">#giveback</a>
    </p>
    </div>
    ```
