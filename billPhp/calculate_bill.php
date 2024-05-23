<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity Bill Calculator</title>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- Optional: include a custom CSS file for further customization -->
    <link rel="stylesheet" href="styles.css">
    <!-- Include jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h3 class="card-title">Electricity Bill Calculator</h3>
            </div>
            <div class="card-body">
                <form id="billForm">
                    <div class="form-group">
                        <label for="units">Enter total units consumed:</label>
                        <input type="number" class="form-control" id="units" name="units" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Calculate Bill</button>
                </form>
                <?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['units']) && is_numeric($_POST['units'])) {
    $units = floatval($_POST['units']);
    echo calculateBill($units);
} 
// else {
//     echo "Invalid input or request method.";
// }

function calculateBill($units) {
    $first_slab = 3.50;
    $second_slab = 4.00;
    $third_slab = 5.20;
    $fourth_slab = 6.50;
    $bill = 0;

    if($units <= 50) {
        $bill = $units * $first_slab;
    } else if($units > 50 && $units <= 150) {
        $bill = 50 * $first_slab + ($units - 50) * $second_slab;
    } else if($units > 150 && $units <= 250) {
        $bill = 50 * $first_slab + 100 * $second_slab + ($units - 150) * $third_slab;
    } else {
        $bill = 50 * $first_slab + 100 * $second_slab + 100 * $third_slab + ($units - 250) * $fourth_slab;
    }

    return "Total cost for $units units: Rs. " . number_format($bill, 2);
}
?>
            </div>
        </div>
        <div id="result" class="mt-3 alert alert-success" role="alert" style="display: none;"></div>
    </div>

    <!-- Include Bootstrap JS and Popper.js -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>

    <!-- jQuery for handling AJAX request -->
    <script>
    $(document).ready(function() {
        $('#billForm').on('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            var units = $('#units').val();
            $.ajax({
                type: 'POST',
                url: 'calculate_bill.php',
                data: { units: units },
                success: function(result) {
                    $('#result').html(result).show(); // Show only the bill result
                }
            });
        });
    });
</script>

</body>
</html>