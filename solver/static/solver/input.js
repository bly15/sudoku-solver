$(document).ready(function() {
    $("[type=tel]").on("change", function(e) {
        $(e.target).val($(e.target).val().replace(/[^\d\.]/g, ""));
    })

    $("[type=tel]").on("keypress", function(e) {
        keys = ["1","2","3","4","5","6","7","8","9"];
        return keys.indexOf(event.key) > -1;
    })
});