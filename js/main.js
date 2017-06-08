$(document).ready(function() {
    // Inicializando efeitos nav materialize
    $(".button-collapse").sideNav();
    // Inicializando Carousel 
    $('#carousel1').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: false,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                nav: false,
                loop: true
            }
        }
    });
    $('#carousel2').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: false,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                nav: false,
                loop: true
            }
        }
    });
    // Scroll na pagina ao clicar no bot�o no footer
    $( ".btnFooter" ).click(function() {
        $('html,body').animate({scrollTop: 600},'slow');
    });

    // Inializando Variaveis de controle do Filtro
    var canoAlto = false;
    var canoBaixo = false;
    var categoria = false;
    var cano = false;
    var catCampo = false;
    var catSociety = false;

    // Verificando ap�s altera��es no select - Cano Alto
    $('.FilterAlto').change(function() {
        if (this.checked) {
            canoAlto = true;
            cano = true;
            listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
        } else if (!this.checked) {
            canoAlto = false;
            cano = false;
            listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
        }
    });
    // Verificando ap�s altera��es no select - Cano baixo
    $('.FilterBaixo').change(function() {
        if (this.checked) {
            canoBaixo = true;
            cano = false;
            $("#produto").empty();
            canoAlto = $('.FilterAlto').is(':checked');
            listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
        } else if (!this.checked) {
            cano = true;
            canoBaixo = false;
            $("#produto").empty();
            listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
        }
    });
    $('.FilterCampo').change(function() {
        if (this.checked) {
            categoria = "campo";
            catCampo = true;
        } else if (!this.checked) {
            categoria = "";
            catCampo = false;
        }
        $("#produto").empty();
        listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
    });

    $('.FilterSociety').change(function() {
        if (this.checked) {
            categoria = "society";
            catSociety = true;
        } else if (!this.checked) {
            categoria = "";
            catSociety = false;
        }
        $("#produto").empty();
        listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
    });

    // Fun��o Principal Filter
    function listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety) {
        var cond1;
        $.getJSON('data.json', �function(obj) {
            if (!((catCampo && catSociety) || (!catCampo && !catSociety) || (canoAlto && canoBaixo) || (!canoAlto && !canoBaixo))) { // tipo de cano marcado os dois ou nenhum
                if ((canoAlto && canoBaixo)) {
                    var releases = $(obj["releases"]).filter(function(i, n) {
                        return (n['high-top'] == true) || (n['high-top'] == false);
                    });
                    var sellers = $(obj["best-seller"]).filter(function(i, n) {
                        return (n['high-top'] == true) || (n['high-top'] == false);

                    });
                } else if ((!canoAlto && !canoBaixo)) {
                    var releases = $(obj["releases"]).filter(function(i, n) {
                        return (n['high-top'] == true) || (n['high-top'] == false);
                    });
                    var sellers = $(obj["best-seller"]).filter(function(i, n) {
                        return (n['high-top'] == true) || (n['high-top'] == false);
                    });
                } else if ((catCampo && catSociety)) {
                    var releases = $(obj["releases"]).filter(function(i, n) {
                        return n;
                    });
                    var sellers = $(obj["best-seller"]).filter(function(i, n) {
                        return n;
                    });
                } else if ((!catCampo && !catSociety)) {
                    var releases = $(obj["releases"]).filter(function(i, n) {
                        return n;
                    });
                    var sellers = $(obj["best-seller"]).filter(function(i, n) {
                        return n;
                    });
                }
            } else {
                if (categoria == "") {

                    if ((canoAlto && canoBaixo) || (!canoAlto && !canoBaixo)) {
                        var releases = $(obj["releases"]).filter(function(i, n) {
                            return (n['high-top'] == true || n['high-top'] == false);
                        });
                        var sellers = $(obj["best-seller"]).filter(function(i, n) {
                            return (n['high-top'] == true || n['high-top'] == false);
                        });
                    } else {
                        var releases = $(obj["releases"]).filter(function(i, n) {
                            return (n['high-top'] == cano);
                        });
                        var sellers = $(obj["best-seller"]).filter(function(i, n) {
                            return (n['high-top'] == cano);
                        });

                    }
                } else {
                    if ((canoAlto && canoBaixo) || (!canoAlto && !canoBaixo)) {
                        var releases = $(obj["releases"]).filter(function(i, n) {
                            return (n.category == categoria) && (n['high-top'] == true || n['high-top'] == false);
                        });
                        var sellers = $(obj["best-seller"]).filter(function(i, n) {
                            return (n.category == categoria) && (n['high-top'] == true || n['high-top'] == false);
                        });
                    } else {
                        var releases = $(obj["releases"]).filter(function(i, n) {
                            return (n.category == categoria) && (n['high-top'] == cano);
                        });
                        var sellers = $(obj["best-seller"]).filter(function(i, n) {
                            return (n.category == categoria) && (n['high-top'] == cano);
                        });
                    }
                }
            }
            // Montando Div p/ inser��o no primeiro Carousel
            for (var i = 0; i < releases.length; i++) {

                if(releases[i].price != 0){
                   var value = releases[i].price;
                    value = (value/10);
                    value = (value).toFixed(2);
                    releases[i].price = ( releases[i].price).toFixed(2);
                }

                $("<div class='col s12 m6 l3 center product item'> </div>")
                $('#carousel2')
                    .owlCarousel('add',
                        "<div class='col s12 m6 l3 center product item'>" +
                        "<div class='container center details-product'>" +
                        " <img  class='responsive-img imgProd' src='" + releases[i].image + "'> " +
                        " <div class='icon-personalize'> " +
                        " <img  class='responsive-img' src='http://www.raphaelfabeni.com.br/rv/images/personalize.jpg'>" +
                        "<span class='titPers'>PERSONALIZE </span>" +
                        "</div>" +
                        " <h2>" + releases[i].title + "</h2>" +
                        "<span>" + releases[i].category + "</span> " +
                        "<span class='titPrice'>R$" + releases[i].price + " </span>" +
                        "<span class='titParc'> ou 10 x "+value+" sem juros </span>" +
                        "<div class='center'><a class='waves-effect waves-light btn'>COMPRAR</a> </div>" +
                        " </div>" +
                        " </div>"
                    )
                    .owlCarousel('update');
            }
            // Montando Div p/ inser��o no segundo Carousel
            for (var i = 0; i < sellers.length; i++) {
                $("<div class='col s12 m6 l3 center product item'> </div>")
                $('#carousel1')
                    .owlCarousel('add',
                        "<div class='col s12 m6 l3 center product item'>" +
                        "<div class='container center details-product'>" +
                        " <img  class='responsive-img imgProd' src='" + sellers[i].image + "'> " +
                        " <div class='icon-personalize'> " +
                        " <img  class='responsive-img' src='http://www.raphaelfabeni.com.br/rv/images/personalize.jpg'>" +
                        "<span class='titPers'>PERSONALIZE </span>" +
                        "</div>" +
                        " <h2>" + sellers[i].title + "</h2>" +
                        "<span>" + sellers[i].category + "</span> " +
                        "<span class='titPrice'>R$" + sellers[i].price + " </span>" +
                        "<span class='titParc'> ou 10 x "+value+" sem juros </span>" +
                        "<div class='center'><a class='waves-effect waves-light btn'>COMPRAR</a> </div>" +
                        " </div>" +
                        " </div>"
                    )
                    .owlCarousel('update');
            }
        });
    }
    // Evento Click - Btn Listar Todos os produtos
    $(".btnAll").click(function() {
        categoria = "";
        catSociety = false;
        $("#produto").empty();
        listarProd(canoAlto, canoBaixo, categoria, cano, catCampo, catSociety);
    });
    $(".btnAll").click();


});