
var url     = require('url');
var util    = require('util');
var request = require('request');
var twurl   = require('./lib/twitterurl');
var ejs     = require('ejs');

var fs      = require('fs');
var tmpl    = fs.readFileSync(__dirname + '/tweet.ejs', 'utf8');

var retrieve = exports.retrieve = function(URL, done) {
    var parsed = twurl.parse(URL);
    //util.log(util.inspect(parsed));
    
    if (parsed.status) {
        request({
            method: 'GET',
            uri: 'http://api.twitter.com/1/statuses/show/'+parsed.status.code+'.json?include_entities=true'
        }, function(error, response, body) {
            if (error) { done(error); }
            if (response.statusCode == 200 || response.statusCode == 201) {
                var tweet = JSON.parse(body);
                var ret = {
                    twurl: parsed,
                    id: tweet.id,
                    id_str: tweet.id_str,
                    tweet: tweet.text,
                    screen_name: tweet.user.screen_name,
                    name: tweet.user.name,
                    user_url: tweet.user.url,
                    user_statuses_count: tweet.user.statuses_count,
                    user_name: tweet.user.name,
                    profile_image_url: tweet.user.profile_image_url,
                    user_description: tweet.user.description,
                    user_verified: tweet.user.verified,
                    user_time_zone: tweet.user.time_zone,
                    user_created_at: tweet.user.created_at,
                    user_screen_name: tweet.user.screen_name,
                    user_location: tweet.user.location,
                    user_friends_count: tweet.user.friends_count,
                    user_followers_count: tweet.user.followers_count,
                    user_listed_count: tweet.user.listed_count,
                    user_id: tweet.user.id,
                    id_str: tweet.id_str,
                    source: tweet.source,
                    truncated: tweet.truncated,
                    retweeted: tweet.retweeted,
                    created_at: tweet.created_at,
                    mentions: [ ],
                    urls: [ ],
                    hashtags: [ ]
                };
                for (var i = 0; i < tweet.entities.user_mentions.length; i++) {
                    ret.mentions.push(tweet.entities.user_mentions[i]);
                }
                for (var i = 0; i < tweet.entities.hashtags.length; i++) {
                    ret.hashtags.push(tweet.entities.hashtags[i]);
                }
                for (var i = 0; i < tweet.entities.urls.length; i++) {
                    ret.urls.push(tweet.entities.urls[i]);
                }
                // in_reply_to_user_id_str
                // in_reply_to_user_id
                // contributors
                // in_reply_to_status_id
                // in_reply_to_screen_name
                // in_reply_to_status_id_str
                // favorited
                // geo
                // coordinates
                // place
                done(null, ret);
            } else {
                done({
                    reason: 'request error: '+ response.statusCode,
                    response: response,
                    body: body
                });
            }
        });
    }
}

var formatTweet = exports.formatTweet = function(URL, done) {
    retrieve(URL, function(error, data) {
        if (error) { throw error; }
        var ret = ejs.render(tmpl, {
          locals: { tweet: data }
        });
        done(ret);
    });
}

/*var printresult = function(error, data) {
    if (error) {
        util.log(util.inspect(error));
        throw error;
    }
    util.log(util.inspect(data));
};*/

// retrieve('http://twitter.com/#!/gemswinc/status/94934714867138560', printresult    );
// retrieve('http://twitter.com/#!/CAUSECAST/status/127807709692170240', printresult);
// formatTweet('http://twitter.com/#!/CAUSECAST/status/127807709692170240');
