var dribbbleImages = [];
var currentImage = 0;

$(function() {
    $.ajax({
        type: 'GET',
        url: 'http://api.dribbble.com/shots/',
        dataType: 'jsonp',
        success: function(data) {
            $.each(data.shots, function(i, item) {
                var dribbbleImage = {
                    imageUrl: item.image_url,
                    imageTeaserUrl: item.image_teaser_url,
                    playerName: item.player.name,
                    playerUrl: item.player.url
                };
                dribbbleImages.push(dribbbleImage);
            });
        }
    });

    $('#go-next').click(function(event) {
        event.preventDefault();
        currentImage = currentImage < dribbbleImages.length - 1 ? ++currentImage : 0;
        renderDribbblePicker(dribbbleImages[currentImage]);
    });

    $('#go-previous').click(function(event) {
        event.preventDefault();
        currentImage = currentImage > 0 ? --currentImage : dribbbleImages.length - 1;
        renderDribbblePicker(dribbbleImages[currentImage]);
    });
});

function renderDribbblePicker(img) {
    $('#dribbble-image img').attr('src',img.imageTeaserUrl);
    var pjs = Processing.getInstanceById('loadimg');
    pjs.loadAndShow(img.imageTeaserUrl);
}
