jQuery(function () {
  structure.init();
});

var structure = {
  init: function () { }
};

var home = {
  init: function () {
    this.select();
    this.tvShow();
    this.episodes();
  },

  select: function () {
    $('.temp').click(function () {
      $(this).parent().find('.temp-active')
        .removeClass('temp-active');
      $(this).addClass('temp-active');
    });

    $('.option').click(function () {
      console.log('oi')
      $(this).parent().find('.option-active')
        .removeClass('option-active');
      $(this).addClass('option-active');
    });

    $('.header-toggle').on('click', function () {
      $(this).next('.content-toggle').slideToggle(600);
    });

  },

  tvShow: function () {
    $.ajax({
      url: 'https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json',
      dataType: 'json',
      success: function (tvshow) {
        //definir os valores a serem preenchidos
        $(".movie-title").html(tvshow.Title);
        $(".year").html(tvshow.Year);
        $("#synopsis").html(tvshow.Synopsis);
        $('.body-movie').attr('style', 'Background-image: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(' + tvshow.Images.Background + ')')
      }
    });
  },

  episodes: function () {
    $.ajax({
      url: 'https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json',
      dataType: 'json',
      success: function (episodes) {
        //definir os valores a serem preenchidos
        $(".episode .episode-num").html(episodes[0].EpisodeNumber);
        $(".episode .episode-title").html(episodes[0].Title);
        $(".content-toggle .content-toggle-img").attr('src', episodes[0].Image);
        $(".content-toggle .content-toggle-synopsis").html(episodes[0].Synopsis);


          cont = episodes;
          console.log(cont);


          $(".movie").each(function() {
            console.log('oi');
          });

        //   $("#tempList").append('\
        //   <li class="episode">\
        //   <div class="header-toggle">\
        //     <div class="info">\
        //       <p class="episode-num"></p>\
        //       <p class="episode-title"></p>\
        //     </div>\
        //     <img class="episode-img" src="../images/assets_tv_show_detail/play-small-player-w.svg" alt="">\
        //   </div>\
        //   <div class="content-toggle" style="display: none;">\
        //     <img class="content-toggle-img" alt="">\
        //     <p class="content-toggle-synopsis"></p>\
        //   </div>\
        // </li>\
        //       ');
      }
    });
  },

};