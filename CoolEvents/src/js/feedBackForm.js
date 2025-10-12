(() => {
    'use strict';

    // Email format validation:
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    emailInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailPattern.test(emailInput.value)) {
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });

    // Save form data to local storage
    document.getElementById('saveButton').addEventListener('click', () => {
        const name = document.getElementById('name').value
        if (name) {
            localStorage.setItem('name', name)
        }
        const email = document.getElementById('email').value
        if (email) {
            localStorage.setItem('email', email)
        }
        const comment = document.getElementById('comment').value
        if (comment) {
            localStorage.setItem('comment', comment)
        }
        const highlights = document.getElementById('highlights').value
        if (highlights) {
            localStorage.setItem('highlights', highlights)
        }
        const improvement = Array.from(document.getElementById('improvement').selectedOptions).map(option => option.value)
        if (improvement && improvement.length > 0) {
            localStorage.setItem('improvement', improvement)
        }
        const otherText = document.getElementById('otherText').value
        if (otherText) {
            localStorage.setItem('otherText', otherText)
        }
        const tos = document.getElementById('tos').checked
        if (tos) {
            localStorage.setItem('tos', tos)
        }
        alert('Form data saved!');
    });

    // Load form data from local storage on page load
    window.addEventListener('load', () => {
        const name = localStorage.getItem('name')
        if (name) {
            document.getElementById('name').value = name
        }
        const email = localStorage.getItem('email')
        if (email) {
            document.getElementById('email').value = email
        }
        const comment = localStorage.getItem('comment')
        if (comment) {
            document.getElementById('comment').value = comment
        }
        const highlights = localStorage.getItem('highlights')
        if (highlights) {
            document.getElementById('highlights').value = highlights
        }
        const improvement = localStorage.getItem('improvement')

        if (improvement && improvement !== 'null') {
            const improvementSelect = document.getElementById('improvement');
            const improvementArray = improvement.split(',')
            improvementArray.forEach(value => {
                const option = Array.from(improvementSelect.options).find(opt => opt.value === value);
                if (option) {
                    option.selected = true;
                }
            });
        }
        const otherText = localStorage.getItem('otherText')
        if (otherText) {
            document.getElementById('otherText').value = otherText
        }
        const tos = localStorage.getItem('tos')
        if (tos) {
            document.getElementById('tos').checked = true
        }
        // Trigger the toggle for "Others" textarea if needed
        toggleOtherTextarea();
    });

    // Clear form data from local storage and reset the form
    document.getElementById('clearButton').addEventListener('click', () => {
        const userConfirmed = confirm('Are you sure you want to clear the form progress? This action cannot be undone.');
        if (userConfirmed) {
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('comment')
            localStorage.removeItem('highlights')
            localStorage.removeItem('improvement')
            localStorage.removeItem('otherText')
            localStorage.removeItem('tos')
            document.getElementById('feedbackForm').reset();
            document.getElementById('otherTextContainer').style.display = 'none'; // Hide "Others" textarea
            alert('Form progress cleared!');
        }
    });
})()
// 
// toggle text area for others:
function toggleOtherTextarea() {
    const improvementSelect = document.getElementById('improvement');
    const otherTextContainer = document.getElementById('otherTextContainer');
    const selectedOptions = Array.from(improvementSelect.selectedOptions).map(option => option.value);
    otherTextContainer.style.display = selectedOptions.includes('others') ? 'block' : 'none';
}

function submitForm(){
    return confirm('Do you really want to submit the form?')
}