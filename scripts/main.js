jQuery(function () {
  structure.init();
});

var structure = {
  init: function () { }
};

var home = {
  init: function () {
    this.slick();
    this.tvShow();
    this.episodes();
    this.select();
    this.aba();
  },

  slick: function (){
    // $('.multiple-items').slick({
    //   infinite: true,
    //   slidesToShow: 6,
    //   slidesToScroll: 1
    // });
    $('.multiple-items').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
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

    $(document).on("click", '.header-toggle', function () {
      $(this).next('.content-toggle').slideToggle(600);
    });

    $('.temp2').click(function(){
      $('.side-bar-list').find('.episode-active').removeClass('episode-active');
      $('.side-bar-list').find('.season2').addClass('episode-active');
    })

    $('.temp1').click(function(){
      $('.side-bar-list').find('.episode-active').removeClass('episode-active');
      $('.side-bar-list').find('.season1').addClass('episode-active');
    })

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
        array = episodes;
        console.log(array);
        for (i = 0; i <= array.length; i++) {
          if (episodes[i] != null) {
            maxTemp = 10;
            if (episodes[i].SeasonNumber <= maxTemp) {
              $(".side-bar-list").append('\
                 <li class="episode season' + episodes[i].SeasonNumber + '">\
                  <div class="header-toggle">\
                    <div class="info">\
                      <p class="episode-num">' + episodes[i].EpisodeNumber + '</p>\
                      <p class="episode-title">' + episodes[i].Title + '</p>\
                    </div>\
                    <img class="episode-img" src="../images/assets_tv_show_detail/play-small-player-w.svg" alt="">\
                  </div>\
                  <div class="content-toggle" style="display: none;">\
                    <img class="content-toggle-img" src="' + episodes[i].Image + '" alt="">\
                    <p class="content-toggle-synopsis">' + episodes[i].Synopsis + '</p>\
                  </div>\
                </li>\
                ');
            }
            if (episodes[i].SeasonNumber == 1) {
              $('.season1').addClass('episode-active')
            }
          }
        }
      }
    });

    $('.side-bar-list').find('.episode').addClass('side-bar-list-active');
  },

  aba: function (){
    $(document).click(function(e) {
      if (!$(e.target).is('.select, .select *')) {
        $(".select").removeClass('active');
      }
    });
    $(".abas li:first-child div").addClass("selected");
    $(".aba").click(function(){
      $(this).closest('.TabControl').find(".aba").removeClass("selected");
      $(this).addClass("selected");
    
      $(this).closest('.TabControl').find("#content .tab-content").hide();
      var indice = $(this).attr('data-slug');
      $("#"+indice).show();
    });
  },

};