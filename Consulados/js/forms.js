$(document).ready(function(){
    $('#consu').click(function(){
        $('#l_cons').attr('disabled', false);
        $('#l_edo').attr('disabled',true);
    });

    $('#edo').click(function(){
        $('#l_edo').attr('disabled', false);
        $('#l_cons').attr('disabled',true);
    });

})