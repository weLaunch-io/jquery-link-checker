# jQuery (Broken) Link Checker
jQuery Link Checker checks broken links, internal links, external links and anchor links. It automatically checks all your links, adds target or nofollow attributes, add a class and more. Please see options for all available settings.

## Usage
1) Include jQuery
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```
2) Include plugin's code:
```
<script src="/assets/js/link-checker.js"></script>
```
3) Call the plugin:
```
$('a').linkChecker();
```

## Options
The hostname that will be used for checking internal links
```
hostname : new RegExp(location.host)
```

The class for internal Links
```
internalLinkClass : 'internal-link'
```

The class for external links
```
externalLinkClass : 'external-link'
```

The class for anchor links
```
anchorLinkClass : 'anchor-link'
```

The class for broken links
```
brokenLinkClass : 'broken-link'
```

Animate anchor links with a scroll to
```
animateAnchorLinks : true
```

Add the rel="nofollow" to external links
```
externalLinkNoFollow : true
```

Add a target="_blank" to external links (opens in new window)
```
externalLinkBlank : true
```

## Example with options
```
var options = {
    externalLinkClass : 'outgoing-link',
    animateAnchorLinks : false,
}

$('a').linkChecker(options);
```

## Style (CSS)
You can simple add CSS for the link classes like:
```
.broken-link, .broken-link:hover, .broken-link:active, .broken-link:focus {
    text-decoration: line-through;
}
```
