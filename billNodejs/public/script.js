$(document).ready(function(){
    $('#electricityForm').submit(function(e){
        e.preventDefault();
        var units = parseFloat($('#units').val());
        var bill = calculateBill(units);
        $('#result').html('Your Electricity Bill: Rs. ' + bill.toFixed(2));
    });

    function calculateBill(units) {
        var bill = 0;
        if(units <= 50) {
            bill = units * 3.50;
        } else if(units <= 150) {
            bill = 50 * 3.50 + (units - 50) * 4.00;
        } else if(units <= 250) {
            bill = 50 * 3.50 + 100 * 4.00 + (units - 150) * 5.20;
        } else {
            bill = 50 * 3.50 + 100 * 4.00 + 100 * 5.20 + (units - 250) * 6.50;
        }
        return bill;
    }
});
