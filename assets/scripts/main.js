jQuery(function () {
  structure.init();
});

var structure = {
  init: function () { }
};

var home = {
  init: function () {
    this.tvShow();
    this.episodes();
    this.select();
    this.aba();
    this.cast();
    this.slick();
  },

  cast: function () {
    $.ajax({
      url: 'https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json',
      dataType: 'json',
      success: function (tvshow) {
        array = tvshow.Cast.length;
        for (i = 0; i <= array.length; i++) {
          $(".tab-content").append('\
            <div class="item">\
            <div class="cast-card">\
              <div class="cast-card__character">'+ tvshow.Cast[i].Name + '</div>\
              <div class="cast-card__actor">Atriz ou Ator</div>\
            </div>\
          </div>\
            ');
        }
        $(".movie-title").html(tvshow.Title);
        $(".year").html(tvshow.Year);
        $("#synopsis").html(tvshow.Synopsis);
        $('.body-movie').attr('style', 'Background-image: linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url(' + tvshow.Images.Background + ')')
      }
    });
  },

  slick: function () {
    $('.multiple-items').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
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
      $(this).parent().find('.option-active')
        .removeClass('option-active');
      $(this).addClass('option-active');
    });

    $(document).on("click", '.header-toggle', function () {
      $(this).next('.content-toggle').slideToggle(600);
    });

    $('.temp2').click(function () {
      $('.side-bar-list').find('.episode-active').removeClass('episode-active');
      $('.side-bar-list').find('.season2').addClass('episode-active');
    })

    $('.temp1').click(function () {
      $('.side-bar-list').find('.episode-active').removeClass('episode-active');
      $('.side-bar-list').find('.season1').addClass('episode-active');
    })

    $('.scroll-btn').click(function(){
      $(this).find('i').toggleClass('fa-chevron-up fa-chevron-down')
      $('.movie-footer').toggleClass('select');
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

  aba: function () {
    $('#elenco').click(function () {

      $('#lazer').addClass('select');
    });

    $(document).click(function (e) {
      if (!$(e.target).is('.select, .select *')) {
        $(".select").removeClass('active');
      }
    });

    $(".abas li:first-child div").addClass("selected");
    $(".aba").click(function () {
      $(this).closest('.TabControl').find(".aba").removeClass("selected");
      $(this).addClass("selected");

      $(this).closest('.TabControl').find("#content .tab-content").hide();
      var indice = $(this).attr('data-slug');
      $("#" + indice).show();
    });
  },
};