$(function($) {
  $(document).ready(function() {
    $.getJSON('/content/images/data/instagram.json')
      .done(function(data) {
        $('.trail-area')
          .toArray()
          .forEach(function(trailArea) {
            var igPostsMatched = _.filter(data.posts, function(post) {
              if (post.locationTags.includes(
                'location-' + $(trailArea).data('location'))) {
                return post;
              }
            });
            var trailAreaCardIndex = 0;
            igPostsMatched.forEach(function(igPost, i, arr) {
              var trailAreaInstaDiv = $('<div>');
              trailAreaInstaDiv.addClass('trail-area-card');
              trailAreaInstaDiv.addClass('trail-area-card-instagram');
              trailAreaInstaDiv.append(window.createIgPost(igPost.html));
              var trailAreaCards = $(trailArea).find(
                '.trail-area-card:not(.trail-area-card-instagram)'
              ).toArray();
              $(trailAreaCards[trailAreaCardIndex]).after(trailAreaInstaDiv);
              trailAreaCardIndex += 1;
            });
            $(trailArea).slick({
              autoplay: true,
              centerMode: true,
              pauseOnHover: false,
              variableWidth: true
            });
          });
        window.instgrm.Embeds.process();
      });
  });
});