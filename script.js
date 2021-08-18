//hide zipcode form
$(document).ready(function () {
    $("form").hide();
});

//run IP locater function on page load
$(document).ready(function () {
    getIP();
});

// get location info from ip address
function getIP() {
    $.getJSON('http://ipinfo.io', function (ip) {
        var city = ip.city + "," + ip.country;
        weatherGen(city);
    });
};

//get weather API
function weatherGen(location) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=1f2d35e2721d8383689cd5d848e1c5fa";
    $.getJSON(weatherUrl)
        .done(generate)
        .fail(error);
};

// if weather API
function generate(data) {
    $(document).ready(function () {
        $(".units").on("click", changeUnits);
    })

    var celsius = Math.round(data.main.temp - 273.15);
    var fahrenheit = Math.round(data.main.temp * 9 / 5 - 459.67);
    var units = "F";
    $(".units").html('&deg;F');

    $(".location").html(data.name + ", " + data.sys.country);
    getIcon(data.weather[0].icon);
    $(".num").html(fahrenheit);
    $(".other").html(data.weather[0].description);

    function changeUnits() {
        if (units == "F") {
            units = "C";
            $(".num").html(celsius);
            $(".units").html('&deg;C');
        } else {
            units = "F";
            $(".num").html(fahrenheit);
            $(".units").html('&deg;F');
        }
    };
};

//if !weather API
function error() {
    alert("Unfortunately we can't retrieve data right now. Please try again or come back.");
};

//gets weather icon code from API, displays alternate font weather icons
function getIcon(i) {
    switch (i) {
        case '01d':
            $(".icon").html("<i class='wi wi-day-sunny'></i>");
            break;
        case '02d':
            $(".icon").html("<i class='wi wi-day-cloudy'></i>");
            break;
        case '03d':
            $(".icon").html("<i class='wi wi-cloud'></i>");
            break;
        case '04d':
            $(".icon").html("<i class='wi wi-cloudy'></i>");
            break;
        case '09d':
            $(".icon").html("<i class='wi wi-sprinkle'></i>");
            break;
        case '10d':
            $(".icon").html("<i class='wi wi-day-sprinkle'></i>");
            break;
        case '11d':
            $(".icon").html("<i class='wi wi-thunderstorm'></i>");
            break;
        case '13d':
            $(".icon").html("<i class='wi wi-snow'></i>");
            break;
        case '50d':
            $(".icon").html("<i class='wi wi-strong-wind'></i>");
            break;
        case '01n':
            $(".icon").html("<i class='wi wi-night-clear'></i>");
            break;
        case '02n':
            $(".icon").html("<i class='wi wi-night-alt-cloudy'></i>");
            break;
        case '03n':
            $(".icon").html("<i class='wi wi-cloud'></i>");
            break;
        case '04n':
            $(".icon").html("<i class='wi wi-cloudy'></i>");
            break;
        case '09n':
            $(".icon").html("<i class='wi wi-sprinkle'></i>");
            break;
        case '10n':
            $(".icon").html("<i class='wi wi-night-sprinkle'></i>");
            break;
        case '11n':
            $(".icon").html("<i class='wi wi-thunderstorm'></i>");
            break;
        case '13n':
            $(".icon").html("<i class='wi wi-snow'></i>");
            break;
        case '50n':
            $(".icon").html("<i class='wi wi-strong-wind'></i>");
            break;
        default:
            $(".icon").html("<i class='wi wi-day-cloudy'></i>");
            break;
    }
};


//get weather from zipcode
function zipcode(zip) {
    var zipUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + zip + "&appid=1f2d35e2721d8383689cd5d848e1c5fa";
    $.getJSON(zipUrl)
        .done(generate)
        .fail(error);
    $('form').hide();
    $('.custom').show();
}

//run zipcode weather function on click or submit
$(document).ready(function () {
    $('#zipButton').click(function () {
        zipcode($('#formValueId').val());
    });
});

//hide "enter zip" on click and open form
$(document).ready(function () {
    $('.custom').click(function () {
        $('.custom').hide();
        $('form').show();
    });
});

//my location click - hide form if open, run ip weather function
$(document).ready(function () {
    $('.my-location').click(function () {
        $('form').hide();
        $('.custom').show();
        getIP();
    });
});
