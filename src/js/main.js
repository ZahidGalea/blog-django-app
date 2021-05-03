function CheckTriggerHorarioBox() {

    if ($(this).attr("value") === "1") {
        $(".HorarioBox").hide('slow');
    }
    if ($(this).attr("value") === "2") {
        $(".HorarioBox").show('slow');
    }
}

function validarHorarioBox() {
    // Si el día esta marcado, validar las horas
    let atLeastOne;
    atLeastOne = false
    $diasHorario = document.querySelectorAll(".diaHorario")
    $diasHorario.forEach(function (currentValue, currentIndex, listObj) {
        $dia = $(currentValue).children('.dia');

        $horaApertura = $(currentValue).children('.horaApertura')
        $horaCierre = $(currentValue).children('.horaCierre')

        $diaForm = $dia.children('.diaForm');
        $input = $diaForm.children('.form-check-input')[0];


        if ($input.checked) {
            atLeastOne = true
            $form = $horaApertura.children('.horaAperturaForm')
            $horaAperturaValue = moment($form.children('input')[0].value, 'hh:mm')

            $form = $horaCierre.children('.horaCierreForm')
            $horaCierreValue = moment($form.children('input')[0].value, 'hh:mm')

            if ($horaCierreValue._i === '' || $horaAperturaValue._i === '') {
                // Must show alerta for field not completed
                console.log('Hora no llena')
                $("#msgErrorHorario").show()
            }
            $("#msgErrorHorario").hide()

            if ($horaAperturaValue > $horaCierreValue) {
                // Must show alerta for Apertura < Cierre
                console.log('Error de hora apertura mala')
                $("#msgAperturaMayor").show()
            }
            $("#msgAperturaMayor").hide()
        }
    });
    if (atLeastOne === false) {
        console.log('Porfavor elige al menos una opción')
        $("#msgSinOpcionElegida").show()
    }
    $("#msgSinOpcionElegida").hide()
}

function mapAddress(mapElement, address) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var mapOptions = {
                zoom: 16,
                center: results[0].geometry.location,
                disableDefaultUI: true
            };
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


$(document).ready(function () {
    console.log("Hello World -- Main executed")

    // HORARIO
    // Check if horario exists and load script
    if ($('.horario')[0]) {
        $("#opcionHorario1").trigger('click');
        // CHECK IF HORARIO MUST BE TRIGGERED
        $(".opcionHorario").click(CheckTriggerHorarioBox);
    }

    // ON INSCRIBIR O MODIFICAR PUNTO ............
    $("#inscribir").click(function () {
        //  Valida el HorarioBox

        if ($("#opcionHorario2")[0].checked) {
            validarHorarioBox()
        }
    });

    // GOOGLE MAPS ON INICIATIVAS PAGE
    $puntoContent = document.querySelectorAll(".punto_content")
    $puntoContent.forEach(function (currentValue, currentIndex, listObj) {

        $puntoInformation = $(currentValue).children('.punto_information');
        $puntoInformationBody = $puntoInformation.children('.card-body')
        $cardText = $puntoInformationBody.children('.card-text')
        $direccionPuntoRerciclag = $cardText.children('.direccionPuntoReciclag').text()
        console.log($direccionPuntoRerciclag)
        mapAddress($(currentValue).children('.map_canvas')[0], $direccionPuntoRerciclag.concat(" Santiago de chile"));
    });
});