


!!!!!!! USE JQUERY 1.8 or ABOVE !!!!!!!


//---------------------------- General fixes for HTML tags
	function isset(object){
	  return (typeof object !=='undefined');
	}
	function pageFix(){
		// for form element conditions
			var formElements = 'input[type="text"],input[type="password"],input[type="email"],input[type="number"],textarea,.form-text';
			var placeHolder = '.use-placeholders input[type="text"],.use-placeholders input[type="password"],.use-placeholders input[type="email"],.use-placeholders input[type="number"],.use-placeholders textarea,.use-placeholders .form-text';

			if (formElements) {
				$(formElements).each(function(){
					if (!$(this).hasClass('applied')) {
						$(this).addClass('applied f-element')
							.wrap('<div class="element-wrapper"></div>')
							.parents('.element-wrapper').append('<div class="style"><div class="bar"></div><div class="bar2"></div><div class="bar3"></div></div>');
					};
					if ($(this).hasClass('error')) {
						$(this).parents('.element-wrapper').addClass('err');
					};
				});
			};
			if (placeHolder) {
			  $(placeHolder).each(function(){
			    if (!$(this).hasClass('use-placeholder')) {
			      var inputTag = $(this);
			      var parentTag = inputTag.parents('.form-item');
			      parentTag.addClass('has-placeholder');
			      inputTag.addClass('use-placeholder');
			      if (inputTag.val() == '') {
			        parentTag.removeClass('focus-label');
			      }else {
			        parentTag.addClass('focus-label');
			      }
			    };
			  });
		  };
	  // for form element conditions
    if ($('table').length) {
      $('table').each(function(){
        if (!$(this).hasClass('sticky-header') && !$(this).hasClass('js-wrapped') && !$(this).hasClass('ui-datepicker-calendar')) {
          $(this).addClass('js-wrapped').wrap('<div class="table-wrapper"><div class="padd"></div></div>');

          if ($(this).attr('border') > 0) {
            $(this).addClass('hasBorder');
          };

          if (isset($(this).attr('style')) && ($(this).attr('style').indexOf('width:100%') != -1 || $(this).attr('style').indexOf('width:100%;') != -1)) {
            nth_parent($(this),1).addClass('full-w');
          };
        };
        if (!$(this).hasClass('labeled')) {
          var th = [];
          var tdNum = 0;
          $(this).find('thead th').each(function(){
            th.push($(this).text());
          });
          $(this).find('tbody tr').each(function(){
            $(this).find('td').each(function(){
              $(this).wrapInner('<div class="td-value"></div>');
              if (isset(th[tdNum]) && th[tdNum].replace(/[^a-zA-Z0-9\.-]+/g,"") !== '') {
                $(this).prepend('<div class="td-label">'+th[tdNum]+'</div>');
              };
              tdNum++;
            });
            tdNum = 0;
          });

          $(this).addClass('labeled');
        };
      });
    };
		if ($('fieldset').length) {
			$('fieldset').each(function(){
				if (!$(this).hasClass('fieldset-div-wrapped')) {
		  		$(this).addClass('fieldset-div-wrapped');
		  		$(this).wrap('<div class="fieldset-div-wrapper"></div>');
				};
			});
		};
		if ($('p').length) {
			$('p').each(function(){
				if (!$(this).hasClass('p-break')) {
		  		str = $(this).html();
		  		str = str.replace(/\s+/g,'');
		  		str = str.replace(/&nbsp;/g,'');
		  		if (!str) {
		  			$(this).addClass('p-break');
		  		};
				};
			});
		};
	}

	// USAGE
		// Could be run multiple times.
		// Run this everytime the DOM is updated.
			pageFix();
		// for form element conditions
			if ($('.f-element').length) {
				$('.f-element').each(function(){
			    if ($(this).val() !== '') {
				  	if ($(this).hasClass('use-placeholder')) {
				    	$(this).parents('.form-item').addClass('focus-label');
				  	};
				  	if ($(this).parents('.views-exposed-form').length) {
				  		$(this).parents('.views-exposed-widget').addClass('v-focus');
				  	};
				    $(this).parents('.element-wrapper').addClass('focus');
			    }
				});
			  $(document).on('focus blur', '.f-element',function(event){
			  	if ($(this).hasClass('use-placeholder')) {
			    	$(this).parents('.form-item').addClass('focus-label');
			  	};
			  	if ($(this).parents('.views-exposed-form').length) {
			  		$(this).parents('.views-exposed-widget').addClass('v-focus');
			  	};
			    $(this).parents('.element-wrapper').addClass('focus');

			    if (event.type == 'focusout' && $(this).val() == '') {
			    	if ($(this).hasClass('use-placeholder')) {
			      	$(this).parents('.form-item').removeClass('focus-label');
			      }
				  	if ($(this).parents('.views-exposed-form').length) {
				  		$(this).parents('.views-exposed-widget').removeClass('v-focus');
				  	};
			    	$(this).parents('.element-wrapper').removeClass('focus');
			    }
			  });
			};
//---------------------------- General fixes for HTML tags

//---------------------------- Find Maximum Height
	function contentMaxH(item) {
	  var MaxH = 0;
	  $(item).each(function(){
	    tmpBlockH = $(this).outerHeight();
	    if (MaxH < tmpBlockH) {
	      MaxH = tmpBlockH;
	    };
	  });
	  return MaxH;
	}

	// USAGE
	// return the highest high of the same content;
	contentMaxH('.views-row');
//---------------------------- Find Maximum Height

//---------------------------- Animate function
    // type 1
    function animateDoc(inWhere,anchor,decreasement,dir,after,speed) {
      var ready = true;
      var ease = 0;
      var decrease = decreasement;

      if (dir !== 0) {
        decrease += winH;
      };
      if (!inWhere) {
        inWhere = 'html, body';
      };

      if (!$.isNumeric(anchor) && anchor !== '100%') {
        if ($(anchor).length) {
          ease = ($(anchor).offset().top)-decrease;
        }
        else {
          ready = false;
        }
      }else {
        if (anchor == '100%') {
          anchor = winH;
        };
        ease = anchor;
      }

      if (ready) {
        $(inWhere).stop().animate({
          scrollTop: ease,
        },
          {
            duration: speed,
            complete: function complete() {
              if (after) {
                after();
              };
            }
          }
        );
      };
    }

    // type 2
    function animateDoc(anchor,decreasement,dir,after) {
      var ready = true;
      ease = 0;
      decrease = decreasement;
      inWhere = $('html, body');

      if (dir !== 0) {
        decrease += winH;
      };
      if (!$.isNumeric(anchor) && anchor !== '100%') {
        if ($(anchor).length) {
          ease = ($(anchor).offset().top)-decrease;
        }
        else {
          ready = false;
        }
      }else {
        if (anchor == '100%') {
          anchor = winH;
        };
        ease = anchor;
      }

      if (ready) {
        inWhere.stop().animate({
          scrollTop: ease,
        },
          {
            duration: 500,
            complete: function complete() {
              if (after) {
                after();
              };
            }
          }
        );
      };
    }

  // USAGE type 1
  // inwhere = scroller target 'element'. Default is 'html, body'
  // anchor = 'class' or 'id'. Set 'integer' value. Set '100%' for vertical full height.
  // decreasement = decrease range to the targeted place
  // dir = measurement from top or bottom. 0=top | 1=bottom
  // function(){} = End event. Set 'false' for no action
  // speed = more like duration 'miliseconds'

	// USAGE type 2
	// anchor = 'class' or 'id'. Set 'integer' value. Set '100%' for vertical full height.
	// decreasement = decrease range to the targeted place
	// dir = measurement from top or bottom. 0=top | 1=bottom
	// function(){} = End event. Set 'false' for no action
	animate(anchor,decreasement,dir,function(){});
	animate(300,decreasement,dir,false);
	animate('100%',decreasement,dir,function(){
		// do some stuff
	});
//---------------------------- Animate function

//---------------------------- Map Function
	base_path = Drupal.settings.basePath;
  function getBoundsZoomLevel(bounds, mapDim) {
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
      var sin = Math.sin(lat * Math.PI / 180);
      var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }
  function mapInit(mkInfo,height,zoom,replacement,events,mapID) {
    if (zoom == '') {
      zoom = 9;
    };
    if (height == '') {
      height = 300;
    };
    zoom = zoom*1;
    height = height*1;
    $(replacement).html('<div id="'+mapID+'" class = "map" style="height:' + height + 'px; width:100%;"></div>');

    // Setup the different icons and shadows
    var mapDim = {width:$('#'+mapID).width(),height:height};
    var icon = base_path + 'images/marker.png';
    var customStyle = {
      name:'Default',
      sysname:'map_style',
    };
    var mapOptions = {
      zoom: zoom,
      center: new google.maps.LatLng(20.9932, 96.0558),
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [
          customStyle.sysname,
          google.maps.MapTypeId.SATELLITE,
        ]
      },
      streetViewControl: false,
      scrollwheel: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    };
    var map = new google.maps.Map(document.getElementById(mapID),mapOptions);
    var styleConfig = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#65b2b9"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"color":"#7f7f7f"},{"lightness":"5"}]},{"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"color":"#7f7f7f"},{"lightness":"50"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"transit.station","elementType":"geometry.fill","stylers":[{"hue":"#00eaff"}]},{"featureType":"transit.station","elementType":"geometry.stroke","stylers":[{"hue":"#00eaff"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#65b2b9"},{"lightness":"0"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"hue":"#00eaff"},{"visibility":"on"},{"lightness":"5"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#88d2a6"},{"visibility":"on"}]}];
    var styledMap = new google.maps.StyledMapType(styleConfig,{name: customStyle.name});
    map.mapTypes.set(customStyle.sysname, styledMap);
    map.setMapTypeId(customStyle.sysname);

    var infowindow = new google.maps.InfoWindow({});
    var marker;
    var markers = new Array();

    // Add the markers and infowindows to the map
    for (var i = 0; i < mkInfo.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(1*(mkInfo[i][1]), 1*(mkInfo[i][2])),
        animation:google.maps.Animation.DROP,
        draggable:false,
        map: map,
        icon : icon,
      });

      markers.push(marker);
      if (events) {
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            var infoTitle = "";
            var infoText = "";
            if (mkInfo[i][0][0] !== '') {
              infoTitle = "<h4 class='m-title'>"+mkInfo[i][0][0]+"</h4>";
            };
            if (mkInfo[i][0][1] !== '') {
              infoText = "<div class='text'><p>"+mkInfo[i][0][1]+"</p></div>";
            };

            infowindow.setContent("<div id=\'mapinfo\'>"+infoTitle+infoText+"</div>");
            infowindow.open(map, marker);
          }
        })(marker, i));
      };
    }

    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();
    //  Go through each...
    $.each(markers, function (index, marker) {
      bounds.extend(marker.position);
    });

    //  Fit these bounds to the map
    function mapReposition() {
      if (mkInfo.length > 1) {
        var fitZoom = getBoundsZoomLevel(bounds,mapDim);
        map.fitBounds(bounds);
        if (fitZoom > zoom) {
          var bounds_listener = google.maps.event.addListener( map, 'bounds_changed', function(event) {
            this.setZoom(zoom);
            google.maps.event.removeListener( bounds_listener );
          });
        };
      }
      else {
        var pos = markers[0].getPosition();

        if (mkInfo[0][3][0] !== '' && mkInfo[0][3][1] !== '') {
          pos = new google.maps.LatLng(1*(mkInfo[0][3][0]), 1*(mkInfo[0][3][1])); // shift position
        }

        map.setCenter(pos);
      }
    }

    mapReposition();

    $(window).resize(function(){
      mapReposition();
    });
  }

	// USAGE
	// MapID must be unique on each map.
  var mkbundle = [
    [
      [
        'Title','Content'
      ],
				latitude,
				longitude,
      [
				shift_latitude,
				shift_longitude,
      ],
    ],
  ];

  mapInit(mkbundle,height,zoom,replacement,events,userdefinedMapID);
//---------------------------- Map Function