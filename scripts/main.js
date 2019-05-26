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
        console.log(tvshow.Images.Background);
        //definir os valores a serem preenchidos
        $("#synopsis").html(tvshow.Synopsis);
        $('.body-movie').attr('style' , 'Background-image: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url('+  tvshow.Images.Background +')')
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
      }
    });
  },

};