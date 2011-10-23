
var url     = require('url');
var util    = require('util');
var assert  = require('assert');

/**
 * parse - return object describing the URL by examining and extracting bits from the URL
 */
var parse = exports.parse = function(URL) {
    var ret = {
        url: URL,
    };
    // Remove the #! so that normal URL parsing works correctly
    // Sometimes the #! is represented as #%21
    // If twitter.com is given a URL lacking the #! it redirects the browser to the #! equivalent
    var removeHash = /^([^#]*)\/#!|\/#%21(.*)$/;
    ret.URLnoHash = URL.replace(removeHash, '$1$2');
    ret.parsed = url.parse(ret.URLnoHash, true);

    // Fail for anything but twitter.com URL's
    assert.equal(ret.parsed.hostname, "twitter.com");
    
    if (ret.parsed.pathname.match(/^\/search$/)) {
        ret.search = ret.parsed.query.q;
    } else if (ret.parsed.pathname.match(/^\/messages|who_to_follow|download/)) {
        ret.adminURL = ret.parsed.pathname.replace(/^\/(messages|who_to_follow|download)/, '$1');
    } else if (ret.parsed.pathname.match(/^\/[^\/]*\/status/)) {
        ret.status = { 
            user: ret.parsed.pathname.replace(/^\/([^\/]*)\/status.*$/, '$1'),
            code: ret.parsed.pathname.replace(/^\/[^\/]*\/status\/(.*$)/, '$1')
        };
    } else if (ret.parsed.pathname.match(/^\/[^\/]*\/following|followers/)) {
    }
    return ret;
    
//    http://twitter.com/#!/gemswinc/status/94934714867138560
//    
//    http://twitter.com/#!/gemswinc
//    
//    http://twitter.com/#!/7genblogger/following
//    
//    http://twitter.com/#!/7genblogger/followers
//    
//    http://twitter.com/#%21/search?q=%23fuckyouwashington
//    
//    http://twitter.com/#!/messages
//    
//    http://twitter.com/#!/who_to_follow
//    
//    http://twitter.com/#!/who_to_follow/suggestions
//    
//    http://twitter.com/#!/download
}

