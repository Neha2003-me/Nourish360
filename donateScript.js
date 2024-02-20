function selectAmount(amount) {
    document.getElementById("custom-amount-input").value = amount;
}

function donateCustomAmount() {
    var customAmount = document.getElementById("custom-amount-input").value;
    if (customAmount === "") {
        alert("Please enter a valid amount");
    } else {
        alert("Donating Rs " + customAmount);
    }
}

function submitDonation() {
    var additionalInfo = document.getElementById("additional-info-input").value;
    alert("Thank you for your kindness." + additionalInfo);
}