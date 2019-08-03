window.onload = function() {
    setInputFilter(document.getElementById("intLimit"), function(value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) >= 1 && parseInt(value) <= 9);
    });
}

/**
 * Restricts input for the given textbox to the given inputFilter
 * @param {textbox} textbox HTML input form
 * @param {input} inputFilter User input to HTML input form
 */
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}