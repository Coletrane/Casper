$(function($) {
  window.toggleMenu = function() {
    var body = $('body');
    var overlay = $('#mtbva-overlay');
    var menu = $('#mtbva-menu');
    if (menu.data('hidden')) {
      menu.data('hidden', false);
      body.css('overflow-y', 'hidden');
      menu.addClass('mtbva-menu-open');
      overlay.addClass('mtbva-overlay-active');
    } else {
      menu.data('hidden', true);
      body.css('overflow-y', 'auto');
      menu.removeClass('mtbva-menu-open');
      overlay.removeClass('mtbva-overlay-active');
    }
  };

  var images = document.querySelectorAll('.kg-gallery-image img');
  images.forEach(function(image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  //TODO: make this work with 12 posts per page and multiple pages
  var nabbers = [
    {
      url: 'https://viralstyle.com/store/angelo-wash/Sketchcollect',
      img: '/content/images/sponsors/nabber/sketch-collect-banner.jpg'
    },
    {
      url: 'https://www.visitroanokeva.com/',
      img: '/content/images/sponsors/nabber/virginias-blue-ridge.jpg'
    },
    {
      url: 'https://www.deschutesbrewery.com/',
      img: '/content/images/sponsors/nabber/deschutes.jpg'
    },
    {
      url: 'http://jackmasonstavern.com/',
      img: '/content/images/sponsors/nabber/jack-masons-tavern.jpg'
    }

  ];

  function createNabber(i) {
    var singleSponsor = $('<div class="sponsor-single">');
    var link = $('<a>').attr('href', nabbers[i].url);
    var img = $('<img>').attr('src', nabbers[i].img);
    link.append(img);
    singleSponsor.append(link);
    return singleSponsor;
  }

  window.createIgPost = function(postHtml) {
    var article = $('<article class="post-card ig-post-card">');
    var igContainer = $('<div class="ig-container">');
    igContainer.append(postHtml);
    article.append(igContainer);
    return article;
  };

  window.initHomeBetweenPosts = function(
    tags,
    showNabbers,
    _igStart,
    _igPostsFactor,
    _igPostsBetween
  ) {

    var nabberFactor = 3;
    var igPostsFactor = _igPostsFactor || 2;
    var igStart = _igStart > -1 ? _igStart : 2;
    var igPostsBetween = _igPostsBetween || 2;
    var nabberIndex = 0;
    var igPostIndex = 0;

    $.getJSON('/content/images/data/instagram.json')
      .done(function(data) {
        var igPosts = [];
        if (tags && tags.length) {
          igPosts = _.filter(data.posts, function(post) {
            return _.find(tags, function(tag) {
              var hashtags = _.find(post.hashtags, function(hashtag) {
                return hashtag === tag;
              });
              var locationTags = _.find(post.locationTags, function(locTag) {
                return locTag === tag;
              })
              return hashtags || locationTags;
            });
          });
        } else {
          igPosts = data.posts;
        }
        $('.post-card')
          .toArray()
          .forEach(function(card, i, arr) {
            if (i >= igStart) {
              // Nabbers
              if (showNabbers &&
                i % nabberFactor === 0 &&
                i < (nabbers.length * nabberFactor)) {

                if (nabberIndex === 2 &&
                  i === 6) {
                  var footerSponsors = $.clone($('.sponsors-container')[0]);
                  var sponsorsContainer = $('<div class="sponsors-middle mtbva-parallax">');
                  sponsorsContainer.append($(footerSponsors));
                  $(card).after(sponsorsContainer);
                } else {
                  $(card).after(createNabber(nabberIndex));
                  nabberIndex += 1;
                }
              }

              // Instagram posts
              function attachIgPost() {
                if (i % igPostsFactor === 0 &&
                  i < (igPosts.length * igPostsFactor) &&
                  igPosts[igPostIndex]) {
                  $(card).before(createIgPost(igPosts[igPostIndex].html));
                  igPostIndex += 1;
                }
              }

              for (var i = 0; i < igPostsBetween; i++) {
                attachIgPost();
              }
            }
          });

        window.instgrm.Embeds.process();
      });
  };

  window.initRideWithGpsSwitcher = function(id, routes) {
    if (!window.rideWithGps) {
      window.rideWithGps = {};
    }
    window.rideWithGps[id] = routes[0].name;
    $('#' + id + ' button')
      .each(function(i, button) {
        $(button).click(function() {
          var buttonRoute = $(button).attr('data-route');
          if (window.rideWithGps[id] === buttonRoute) {
            return;
          }

          $('#' + id + ' iframe').css('visibility', 'hidden');

          var attachedIframe;
          $('#' + id + ' iframe').toArray().forEach(function(iframe) {
            if ($(iframe).attr('data-route') === buttonRoute) {
              attachedIframe = iframe;
              return;
            }
          });
          if (attachedIframe) {
            // iframe is already in the DOM
            $(attachedIframe)
              .css('display', 'block')
              .css('visibility', 'visible');
          } else {
            // load new iframe into the DOM
            var routeToLoad;
            routes.forEach(function(route) {
              if (route.name === buttonRoute) {
                routeToLoad = route;
                return;
              }
            });
            $('#' + id).append(
              $('<iframe>')
                .attr('src', routeToLoad.url)
                .attr('data-route', routeToLoad.name)
            );
          }

          // update global object
          window.rideWithGps[id] = buttonRoute;

          // hide all the other iframes
          $('#' + id + ' iframe').each(function(i, iframe) {
            if ($(iframe).attr('data-route') !== buttonRoute) {
              $(iframe).css('display', 'none');
            }
          });

          setActiveButton();
        });
      });

    setActiveButton();

    function setActiveButton() {
      $('#' + id + ' button').each(function(i, button) {
        $(button).css('border', 'none');
        if ($(button).attr('data-route') === window.rideWithGps[id]) {
          $(button).css('border', '2px solid #3eb0ef');
        }
      });
    }
  };

  window.initTrailforksIframe = function(id) {
    var trailforksDiv = $('.TrailforksWidgetRoute')
      .toArray()
      .find(function(div) {
          return $(div).attr('data-id') === id;
        }
      );
    if (!trailforksDiv) {
      return;
    }
    trailforksDiv = $(trailforksDiv);

    var tabletBreak = 900;
    var elevationHeightBreak = 500;
    var iframeWidth = Math.floor($('.post-content').width()) - 20;
    var iframeHeight = $(window).height();
    var trailsBool = '0';
    var detailsBool = '0';

    var width = $(document).width();
    if (width < tabletBreak) {
      iframeHeight = Math.floor(iframeHeight * .6);
      iframeWidth = Math.floor($('.post-content').width()) - 5;
      if (iframeHeight < elevationHeightBreak) {
        iframeHeight = elevationHeightBreak;
      }
    } else {
      iframeHeight = Math.floor(iframeHeight * .8);
      if (width > tabletBreak) {
        trailsBool = '1';
        detailsBool = '1';
      }
    }
    // FIXME: TrailForks widget seems to be broken when using data-elevation=0
    // if (iframeHeight < elevationHeightBreak) {
    //   trailforksDiv.attr('data-elevation', '0');
    // }
    trailforksDiv.attr('data-trails', trailsBool);
    trailforksDiv.attr('data-details', detailsBool);
    trailforksDiv.attr('data-w', iframeWidth);
    trailforksDiv.attr('data-h', iframeHeight);

    var resizerScriptUrl = 'https://es.pinkbike.org/326/sprt/j/trailforks/iframeResizer.min.js';
    var resizerScript = $('script').filter(function(script) {
      return ($(script).attr('src') === resizerScriptUrl);
    });
    if (resizerScript.length === 0) {
      $.getScript(resizerScriptUrl);
    }
    var trailforksWidgetUrl = 'https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js';
    var widgetScript = $('script').filter(function(script) {
      return ($(script).attr('src') === trailforksWidgetUrl);
    });
    if (widgetScript.length === 0) {
      $.getScript(trailforksWidgetUrl);
    }
  };

  $(document).ready(function() {
    $('.index-yt-container').fitVids();
  });

  // Start TrailForks
  var routesWithTrailforksIframes = [
    {
      route: 'creature',
      trailforksIds: [
        '16397',
        '16201',
        '15691',
        '15706'
      ]
    }
  ];

  routesWithTrailforksIframes.forEach(function(iframeObj) {
    iframeObj.trailforksIds.forEach(function(trailforksId) {
      window.initTrailforksIframe(trailforksId);
    });
  });
  // End Trailforks
});
