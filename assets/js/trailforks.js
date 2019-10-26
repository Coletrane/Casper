$(function($) {
  $(document).ready(function() {
    // I have no fucking idea why Safari requires me to do this ???
    $(document).ready(function() {
      var style = {}
      var infoHeight = 0
      var mapZoom = 0
      if (document.body.clientWidth > 1020) {
        style.width = "90%"
        style.height = 1300
        infoHeight = 150
        mapZoom = 9
      } else if (
        document.body.clientWidth <= 1020 &&
        document.body.clientWidth > 650
      ) {
        style.width = "90%"
        style.height = 1000
        infoHeight = 150
        mapZoom = 8
      } else if (
        document.body.clientWidth <= 650 &&
        document.body.clientWidth > 400
      ) {
        style.width = "100%"
        style.height = 900
        infoHeight = 300
        mapZoom = 7
      } else if (document.body.clientWidth <= 400) {
        style.width = "100%"
        style.height = 750
        infoHeight = 270
        mapZoom = 7
      }
      var mapHeight = style.height - infoHeight
      var mapUrl =
        "https://www.trailforks.com/widgets/region_map/?rid=3159&w=100%&h=" +
        mapHeight +
        "&maptype=osm&trailstyle=difficulty&controls=1&list=0&layers=trail,labels,photo,poi,directory,region&hideunsanctioned=&z=" +
        mapZoom +
        "&lat=&lon="
      $("#regioninfo0").attr("height", infoHeight)
      $("#regioninfo0").attr(
        "src",
        "https://www.trailforks.com/widgets/region_info/?rid=3159&counts=1&stats=1&w=100%&h=" +
        infoHeight +
        "px&title=null"
      )
      $("#map0").attr("height", mapHeight)
      $("#map0").attr("src", mapUrl)
    })
  })
})
