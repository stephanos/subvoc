$(document).ready(function(){
    $('.search-result').slick({
        'infinite': false,
        'slidesToShow': 4,
        'slidesToScroll': 4,
        'responsive': [{
            'breakpoint': 1024,
            'settings': {
                'slidesToShow': 4,
                'slidesToScroll': 4,
            }
        }, {
            'breakpoint': 600,
            'settings': {
                'slidesToShow': 3,
                'slidesToScroll': 3
            }
        }, {
            'breakpoint': 480,
            'settings': {
                'slidesToShow': 2,
                'slidesToScroll': 2
            }
        }]
    });

    $('#search').on('submit', function() {
        $('.searchbutton').replaceWith('<button class="searchbutton waiting"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></button>')
        $('.searchbar').prop('readonly', 'readonly');
    })
});
