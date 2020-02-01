exports('header', (params, done) => {
    insertHtmlModules({
        ".header .top": [
            "header/top-menu.html",
        ],
        ".header .show-menu": [
            "header/show-menu.html",
        ],
        ".header .menu": [
            "header/menu.html",
        ]
    }, () => {
        // Login and user menu handlers
        Cookies.set('logon', 'false');
        $(`[data-id=login-button]`).on('click', () => {
            console.log(Cookies.get('logon'));
            if (Cookies.get('logon') == 'true') {
                loadJsModules({
                    user_menu: { loadCSS: true, loadLanguage: false },
                });
            }
            else {
                loadJsModules({
                    login: { loadCSS: true, loadLanguage: false },
                });
            }
        });
        // clocks
        const time = $('#time');
        (function updateTime() {
            let date = new Date(),
                hh = date.getUTCHours(),
                mm = date.getUTCMinutes(),
                ss = date.getSeconds(),
                offset = date.getTimezoneOffset();
            offset /= 60;
            if (offset > 0) {
                offset = 'GMT -' + offset.toString();
            } else { offset = 'GMT +' + (-(offset.toString())); }
            if (hh < 10) hh = "0" + hh;
            if (mm < 10) mm = "0" + mm;
            if (ss < 10) ss = "0" + ss;
            time.html(`${hh}:${mm}:${ss} ${offset}`);
            setTimeout(updateTime, 1000);
        })(0); // end of time :_(

        // languages handler
        const langsBtn = $(`[data-id=lang-scroll]`);
        const dropdown = $('a.top-menu-dropdown');
        // Converting camel case to snake case
        function toSnakeCase(str) {
            let snk = str.replace(/([A-Z])/g, "-$1").toLowerCase();
            return snk;
        }
        // An jquery toggleClass analog for data attributes
        (function ($) {
            $.fn.toggleData = function (data_attr, val, alt) {
                return this.each(function () {
                    let elem = $(this);
                    if (elem.data(data_attr) == val) {
                        elem.data(data_attr, alt).attr('data-' + toSnakeCase(data_attr), alt);
                    }
                    else {
                        elem.data(data_attr, val).attr('data-' + toSnakeCase(data_attr), val);
                    }
                });
            };
        }(jQuery));
        // Langs changer
        (function languageSwitcher() {
            dropdown.on('click', () => {
                dropdown.toggleClass('not-active');
                dropdown.toggleClass('active');
                dropdown.toggleData(`status`, 'active', 'not-active');
                langsBtn.toggleClass('not-active');
                langsBtn.toggleClass('active');
                // Escape key handler
                $(document).on('keydown', (event) => {
                    if (event.keyCode === 27) {
                        dropdown.removeClass('active').addClass('not-active');
                        langsBtn.removeClass('active').addClass('not-active');
                    }
                });
                // Language click landler
                $(`[data-class=lang]`).on('click', (event) => {
                    let cur = $(event.target);
                    if (cur.data('langStatus') != 'active') {
                        $(`[data-lang-status=active]`)
                            .removeClass('active')
                            .data('langStatus', 'not-active')
                            .attr('lang-status', 'not-active');
                        cur.data('langStatus', 'active').attr('data-lang-status', 'active');
                        cur.addClass('active');
                        dropdown.text(cur.text());
                        dropdown.removeClass('active').addClass('not-active');
                        langsBtn.removeClass('active').addClass('not-active');
                    }
                    else {
                        dropdown.removeClass('active').addClass('not-active');
                        langsBtn.removeClass('active').addClass('not-active');
                    }
                });
            });
        })(0); // end of langs changer

        // Sticky navbar
        window.onscroll = function () { stick() };
        // Get the navbar
        var navbar = document.querySelector("#navbar");
        // Get the offset position of the navbar
        var sticky = navbar.offsetTop;

        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function stick() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
                document.querySelector('.slider').style.marginTop = '64px';
                if ($('.video-title').length) {
                    document.querySelector('.video-title').style.marginTop = '64px';
                }
            } else {
                navbar.classList.remove("sticky");
                document.querySelector('.slider').style.marginTop = '0';
                if ($('.video-title').length) {
                    document.querySelector('.video-title').style.marginTop = '0';
                }
            }
        }

        // Account profile redirect
        let username = 'vasya1999';
        $(`[data-id=mybets-button]`).prop('href', `#/mybets`);
        $(`[data-id=registration-button]`).prop('href', `#/registration`);
        done();
    });
});