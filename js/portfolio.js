$(function() {
    $('#BusTracker').on('click', 'a', function(e) {
        e.preventDefault(); // prevent browser from opening url
        $('#mainContent').load(this.href);
    });
});