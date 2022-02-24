/*
 *  jQuery Link Checker 
 *  Checks broken links, internal and external links
 *  https://github.com/db-dzine
 *
 *  Made by DB-Dzine
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "linkChecker",
			defaults = {
			    hostname : new RegExp(location.host),
			    internalLinkClass : 'internal-link',
			    externalLinkClass : 'external-link',
			    anchorLinkClass : 'anchor-link',
			    brokenLinkClass : 'broken-link',

			    animateAnchorLinks : true,

			    externalLinkNoFollow : true,
			    externalLinkBlank : true,
			};

		function Plugin ( links, options ) {
			this.links = $(links);

		    this.localLinks = [];
		    this.externLinks = [];
		    this.anchorLinks = [];

			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		$.extend( Plugin.prototype, {
			init: function() {
				this.categorizeLinks();
				this.modifyInternalLinks();
				this.modifyExternalLinks();
				this.modifyAnchorLinks();

			},
			categorizeLinks: function() {

				var that = this;
				that.links.each(function() {

			    	var link = $(this);
			        var url = link.attr("href");

			        if(that.settings.hostname.test(url)){
			        	that.localLinks.push(link);
			        }
			        else if(url.slice(0, 1) == "#"){
			        	that.anchorLinks.push(link);
			        }
			        else {
		    	   		that.externLinks.push(link);            
			        }
				});
			},
			modifyInternalLinks: function() {

				var that = this;
				$(that.localLinks).each(function(i, value) {

					var link = $(this);
					var href = link.attr('href');

					link.addClass(that.settings.internalLinkClass);

					that.UrlExists(href, function(status){
					    if(status !== 200){
					    	link.addClass(that.settings.brokenLinkClass);
					    	link.on('click', function(e) {
					    		e.preventDefault();
					    	});
					    }
					});
				});
			},
			modifyExternalLinks: function() {

				var that = this;
				$(that.externLinks).each(function(i, value) {

					var link = $(this);

					link.addClass(that.settings.externalLinkClass);

					if(that.settings.externalLinkBlank === true) {
						link.attr('target','_blank');
					}
					if(that.settings.externalLinkNoFollow === true) {
						link.attr('rel','nofollow');
					}
				});
			},
			modifyAnchorLinks: function() {

				var that = this;
				$(that.anchorLinks).each(function(i, value) {

					var link = $(this);
			    	link.addClass(that.settings.anchorLinkClass);

			    	if(that.settings.animateAnchorLinks === true) {
				    	link.on('click', function(e) {

							var href = link.attr('href');
							var str = href.split("#")[1];

							$('html,body').animate({
					  			scrollTop: $('#' + str).offset().top - 80
							}, 100);
						});
					}
				});
			},
			UrlExists: function(url, cb){
			    jQuery.ajax({
			        url:      url,
			        type:     'HEAD',
			        complete:  function(xhr){
			            if(typeof cb === 'function')
			               cb.apply(this, [xhr.status]);
			        }
			    });
			}
		} );

		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
