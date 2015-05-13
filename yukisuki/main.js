window.cfg = [];
window.cfg_bool = [];
window.cfg_wallpapers = [];
window.bgimages = [];

$.getJSON("config.json", function(data) {
    window.cfg = [
        data.style.heading_font,
        data.style.link_font,
        data.style.heading_font_size,
        data.style.link_font_size,
        data.style.background,
        data.style.foreground,
        data.style.heading_color,
        data.style.link_color,
        data.style.border_color,
        data.style.border_width,
        data.style.search_color,
        data.style.search_bg_color,
		data.style.link_hover_color,
        data.ext.ref,
        data.ext.bottom,
        data.ext.right,
        data.ext.height,
        data.ext.width,
        data.ext.opacity,
		data.clock.hour_format
    ];

    window.cfg_bool = [
        data.bool.borders,
        data.bool.simplesearch,
        data.bool.alwaysopen,
        data.bool.mascot,
		data.bool.wallpaper
    ];

	window.cfg_wallpapers = [
		data.wallpapers.morning,
		data.wallpapers.late_morning,
		data.wallpapers.afternoon,
		data.wallpapers.late_afternoon,
		data.wallpapers.evening,
		data.wallpapers.late_evening,
		data.wallpapers.night,
		data.wallpapers.late_night
	];

    $("span").css({
        "fontFamily": cfg[0],
        "fontSize": cfg[2],
        "color": cfg[6]
    });

    $("a").css({
        "fontFamily": cfg[1],
        "fontSize": cfg[3],
        "color": cfg[7]
    });

	$("a").hover(
		function() {
			$(this).css({
				"color": cfg[12],
				"fontWeight": "bold"
			});
		},
		function() {
			$(this).css({
				"color": cfg[7],
				"fontWeight": "normal"
			});
		}
	);

    $("body").css({
        "backgroundColor": cfg[4]
    });

    $(".sqr").css({
        "backgroundColor": cfg[5],
        "borderTop": "0 solid " + cfg[8],
        "borderBottom": "0 solid " + cfg[8]
    });

    $("#searchinput").css({
        "color": cfg[10],
        "backgroundColor": cfg[11]
    });

    if (window.cfg_bool[3]) {
        $("#bgimg").css({
            "backgroundImage": "url('" + cfg[13] + "')",
            "bottom": cfg[14],
            "right": cfg[15],
            "height": cfg[16],
            "width": cfg[17],
            "opacity": cfg[18]
        });
    }
    else {
        $("#bgimg").css({
            "backgroundImage": ""
        });
    }
}).done(function() {
	if (window.cfg_bool[4]) {
		imagePreloader(window.cfg_wallpapers);
	}

	updateClock();
});

function evenContainerHeight() {
	if (window.innerHeight % 2 == 0) {
		document.getElementById("container").style.height = window.innerHeight;
	}
    else {
		document.getElementById("container").style.height = window.innerHeight - 1;
	}
}

window.onresize = function() {
	evenContainerHeight();
};

function changeMascot(imgPath) {
	if (window.cfg_bool[3]) {
		imgPath = (imgPath == "") ? window.cfg[13] : imgPath;

		if (imgPath == window.cfg[13]) {
		    $("#bgimg").css({
		        "backgroundImage": "url('" + imgPath + "')",
		        "height": window.cfg[16],
		        "width": window.cfg[17],
		        "opacity": window.cfg[18]
		    });
		}
		else {
			$("#bgimg").css({
		        "backgroundImage": "url('" + imgPath + "')",
		        "height": "117px",
		        "width": "127px",
		        "opacity": "0.5"
		    });
		}
    }
    else {
        $("#bgimg").css({
            "backgroundImage": ""
        });
    }
}

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();

	var greeting = "";

	// Seems like it's only executing the last if-statement
	// Did I write something wrong?
	/*greeting = ((0 <= currentHours) && (currentHours < 6)) ? "Good Night" : "1";
	greeting = ((6 <= currentHours) && (currentHours < 12)) ? "Good Morning" : "2";
	greeting = ((12 <= currentHours) && (currentHours < 18)) ? "Good Afternoon" : "3";
	greeting = ((18 <= currentHours) && (currentHours < 22)) ? "Good Evening" : "4";
	greeting = ((22 <= currentHours) && (currentHours < 24)) ? "Sleep Well" : "5";*/

	if ((0 <= currentHours) && (currentHours < 6)) {
		if ((0 <= currentHours) && (currentHours < 3)) {
			changeWallpaper(window.bgimages[6]);
		}
		else changeWallpaper(window.bgimages[7]);

		switch (currentHours) {
			case 0:
				greeting = "Midnight";
				break;
			default:
				greeting = "Good Night";
				break;
		}
	}

	if ((6 <= currentHours) && (currentHours < 12)) {
		if ((6 <= currentHours) && (currentHours < 9)) {
			changeWallpaper(window.bgimages[0]);
		}
		else changeWallpaper(window.bgimages[1]);

		greeting = "Good Morning";
	}

	if ((12 <= currentHours) && (currentHours < 18)) {
		if ((12 <= currentHours) && (currentHours < 17)) {
			changeWallpaper(window.bgimages[2]);
		}
		else changeWallpaper(window.bgimages[3]);

		switch (currentHours) {
			case 12:
				greeting = "Noon";
				break;
			case 16:
				greeting = "Good Afternoon";
				changeMascot("img/waffle.png");
				break;
			default:
				greeting = "Good Afternoon";
				changeMascot(window.cfg[13]);
				break;
		}
	}

	if ((18 <= currentHours) && (currentHours < 22)) {
		if ((18 <= currentHours) && (currentHours < 20)) {
			changeWallpaper(window.bgimages[3]);
		}
		else changeWallpaper(window.bgimages[4]);

		greeting = "Good Evening";
	}

	if ((22 <= currentHours) && (currentHours < 24)) {
		changeWallpaper(window.bgimages[5]);
		greeting = "Sleep Well";
	}

	var currentMinutes = currentTime.getMinutes();
	var currentSeconds = currentTime.getSeconds();

	currentMinutes = ((currentMinutes < 10) ? "0" : "") + currentMinutes;
	currentSeconds = ((currentSeconds < 10) ? "0" : "") + currentSeconds;

	var currentTimeString = currentHours + ":" + currentMinutes;

	if (window.cfg[19] == "12") {
		var timeOfDay = (currentHours < 12) ? "am" : "pm";

		currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
		currentHours = (currentHours == 0) ? 12 : currentHours;

		currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
	}

	document.getElementById("clock").firstChild.nodeValue = currentTimeString;
	document.getElementById("greeting").firstChild.nodeValue = greeting;
}

function changeWallpaper(bgimg) {
	$("body").css({
		"backgroundImage": "url(" + bgimg.src + ")"
	});
}

function imagePreloader(images) {
	var l = images.length - 1;

	for (var i = l; i >= 0; i--) {
		var bgimg = new Image();
		bgimg.src = images[i];
		/*bgimg.onload = function() {
			$("body").css({
				"backgroundImage": "url(" + this.src + ")"
			});
		};*/

		window.bgimages[i] = bgimg;
	}
}

document.addEventListener("DOMContentLoaded", function() {
	evenContainerHeight();

	setInterval(function () {
		updateClock();
	}, 10000);

    document.getElementById("searchinput").addEventListener("keypress", function search(a) {
        var key = a.keyCode;

        if (key == 13) {
            var query = this.value;

            if (!window.cfg_bool[1]) {
                switch(query.substr(0,3)) {
                    default:
                        window.location = "https://duckduckgo.com/?q=" + query.replaceChars(" ", "+");
                        break;
                    case "-d ":
                        query = query.substr(3);
                        window.location = "http://www.donmai.us/posts?tags=" + query.replaceChars(" ", "+");
                        break;
                    case "-n ":
                        query = query.substr(3);
                        window.location = "http://www.nicovideo.jp/search/" + query.replaceChars(" ", "%20");
                        break;
                    case "-p ":
                        query = query.substr(3);
                        window.location = "http://www.pixiv.net/search.php?s_mode=s_tag&word=" + query.replaceChars(" ", "%20");
                        break;
                }
            }
            else {
                window.location = "https://www.google.com/#q=" + query.replaceChars(" ", "+");
            }
        }
    });
    
    document.addEventListener("keypress", function search(a) {
        var key = a.keyCode;

        if (key == 9) {
            var search_sqr = document.getElementById("search_sqr");
            search_sqr.style.height = (300 + 37) + "px";
            search_sqr.style.borderTop = cfg[9] + " solid " + cfg[8];
            search_sqr.style.borderBottom = cfg[9] + " solid " + cfg[8];

            document.getElementById("searchinput").focus();
        }
    
        if ([9].indexOf(key) > -1) {
            a.preventDefault();
        }
    });

    var sqr = document.querySelectorAll(".sqr");
    var i = 0;
    var lenSqr = sqr.length;

    if (!window.cfg_bool[2]) {
        for (i = 0; i < lenSqr; ++i) {
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
        }
    }
    else {
        for (i = 0; i < lenSqr; ++i) {
            var a = 0;

            for (var x = 0; x < lenSqr; ++x) {
                if (a < sqr[x].getElementsByTagName("a").length) {
                    a = sqr[x].getElementsByTagName("a").length;
                }
            }
            sqr[i].style.height = (225 + 25 * a) + "px";

            if (window.cfg_bool[0]) {
                sqr[i].style.borderTop = cfg[9] + " solid " + cfg[8];
                sqr[i].style.borderBottom = cfg[9] + " solid " + cfg[8];
            }
        }
    }
});

function expand() {
	var acount = this.getElementsByTagName("a").length;
    var icount = this.getElementsByTagName("input").length;

    if (icount >= 1) {
        this.style.height = (200 + 37 * icount) + "px";
    }
    else {
        this.style.height = (200 + 25 * acount) + "px";
    }

    if (window.cfg_bool[0]) {
        this.style.borderTop = cfg[9] + " solid " + cfg[8];
        this.style.borderBottom = cfg[9] + " solid " + cfg[8];
    }
}
function contract() {
	this.style.height = "150px";
	this.style.borderTop = "0 solid" + cfg[8];
	this.style.borderBottom = "0 solid" + cfg[8];
}

String.prototype.replaceChars = function(character, replacement) {
    var str = this;
    var a;
    var b;
    var strLen = str.length;

    for (var i = 0; i < strLen; i++){
        if (str.charAt(i) == character){
            a = str.substr(0, i) + replacement;
            b = str.substr(i + 1);
            str = a + b;
        }
    }

    return str;
};

window.onunload = function() {
    delete window.cfg;
    delete window.cfg_bool;
	delete window.cfg_wallpapers;
};
