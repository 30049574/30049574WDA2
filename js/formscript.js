function handleFormSubmit(event) {
    const form = document.getElementById('enquiryForm');

    form.classList.add('was-validated');

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    event.preventDefault();

    const formData = new FormData(form);
    let dataString = '--- DiscShop Enquiry Details ---\n\n';

    for (let [key, value] of formData.entries()) {
        dataString += `${key.toUpperCase()}: ${value}\n`;
    }

    sessionStorage.setItem('userEnquiry', dataString);

    window.location.href = 'thankyou.html';
}

document.getElementById('enquiryForm').addEventListener('reset', function() {
    this.classList.remove('was-validated');
});

function downloadEnquiry() {
    const data = sessionStorage.getItem('userEnquiry');
    if (!data) return;

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My-Enquiry-Answers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}