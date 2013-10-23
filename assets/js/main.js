var dribbbleImages = [];
var currentImage = 0;
var uivars = {
    rectWidth: 10,
    rectHeight: 30,
    noiseDetail: 0.0075,
    renderSpeed: 100
};

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
            renderDribbblePicker(dribbbleImages[currentImage]);
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

    $("#toggle-stroke").button();

    $("#toggle-stroke").click(function() {
        var p = Processing.getInstanceById('loadimg');
        if (p) p.toggleStroke();
    });

    $('#start-stop').button();

    $('#start-stop').click(function(){
        var p = Processing.getInstanceById('loadimg');
        if (p) p.startStop();
        if(p.getIsLooping()){
            $('#start-stop').button({label:'Stop'});
        } else {
            $('#start-stop').button({label:'Start'});
        }
    });

    $('#save').click(function(){
        var canvas = document.getElementById('loadimg');
        var img = canvas.toDataURL();
        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: {
                img: img
            },
            success: function(data){
                console.log(document.URL + data);
                $('#download').show();
                $('#download a').attr('href','download.php?id=' + data);
            }
        });
    });

    $('#download a').click(function(event){
        $('#download').hide();
    });

    $('#slider-renderspeed').slider({
        value: uivars.renderSpeed,
        min: 1,
        max: 2000,
        slide: function(event, ui) {
            uivars.renderSpeed = ui.value;
        }
    });

    $('#slider-rectwidth').slider({
        value: uivars.rectWidth,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            uivars.rectWidth = ui.value;
        }
    });

    $('#slider-rectheight').slider({
        value: uivars.rectHeight,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            uivars.rectHeight = ui.value;
        }
    });

    $('#slider-noisedetail').slider({
        value: uivars.noiseDetail,
        min: 0.0005,
        max: 0.0175,
        step: 0.0001,
        slide: function(event, ui) {
            uivars.noiseDetail = ui.value;
            var p = Processing.getInstanceById('loadimg');
            p.genNoise();
        }
    });
});

function renderDribbblePicker(img) {
    $('#dribbble-image img').attr('src', img.imageTeaserUrl);
    $('#dribbble-credit').html('<p><small>Image from <a href="' + img.playerUrl + '">' + img.playerName + '</a></small></p>');
    var pjs = Processing.getInstanceById('loadimg');
    pjs.loadAndShow('proxy.php?csurl=' + img.imageTeaserUrl);
}