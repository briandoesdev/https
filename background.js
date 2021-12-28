chrome.webRequest.onBeforeRequest.addListener(
    function(req) {
        var url = req.url;

        // split the request by the protocol
        var urlComponents = url.split("://");

        // if our returned array is less then 2 items, we are missing a protocol 
        // so we will add the 'https' protocol by default and redirect the user
        if (urlComponents.length < 2) {
            var redirect = `https://${urlComponents[0]}`
            console.log('request missing protocol, set to https', url);
            console.log('user will be directed to:', redirect);
            
            return { redirectUrl: redirect }
        }

        // check if our protocl is http, we do not care about other protocols
        // index 0 is our protocol
        if (urlComponents[0] === "http") {
            var redirect = `https://${urlComponents[1]}`
            console.log('http detected', url);
            console.log('user will be directed to:', redirect);
            
            return { redirectUrl: redirect }
        }
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking"]
);
