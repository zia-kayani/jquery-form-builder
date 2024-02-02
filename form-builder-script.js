jQuery(function ($) {
    var fbEditor = document.getElementById('build-wrap');
    var formBuilder = $(fbEditor).formBuilder();

    var buttons = document.getElementsByClassName('addFieldBtn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var type = this.dataset.type;
            var field;

            if (type === 'text' || type === 'email' || type === 'password') {
                field = {
                    type: 'text',
                    label: type.charAt(0).toUpperCase() + type.slice(1) + ' Input',
                    subtype: type
                };
            } else if (type === 'radio') {
                field = {
                    type: 'radio-group',
                    label: 'Radio Group',
                    values: ['Option 1', 'Option 2']
                };
            } else if (type === 'checkbox') {
                field = {
                    type: 'checkbox-group',
                    label: 'Checkbox Group',
                    values: ['Option 1', 'Option 2']
                };
            } else if (type === 'number') {
                field = {
                    type: 'number',
                    label: 'Numeric Input',
                    subtype: 'number'
                };
            } else if (type === 'toggle') {
                field = {
                    type: 'checkbox',
                    label: 'Toggle Switch',
                    values: ['On']
                };
            } else if (type === 'comments') {
                field = {
                    type: 'textarea',
                    label: 'Additional Comments'
                };
            }

            formBuilder.actions.addField(field);
        };
    }

    // Function to display form data
    function displayFormData() {
        // Retrieve the form data from local storage
        var storedData = localStorage.getItem('formData');

        // Check if storedData is not null, undefined, or 'undefined' before parsing
        if (storedData !== null && storedData !== undefined && storedData !== 'undefined') {
            // Parse the JSON data
            var formData = JSON.parse(storedData);

            // Display submitted data in HTML
            var submittedDataHTML = '<p>Submitted Data:</p>';

            // Loop through the properties of formData object
            for (var key in formData) {
                if (formData.hasOwnProperty(key)) {
                    var value = formData[key].value;
                    if (value !== undefined && value !== null) {
                        submittedDataHTML += '<p>' + key + ': ' + value + '</p>';
                    }
                }
            }

            // Append the HTML content to the submittedData div
            $('#submittedData').html(submittedDataHTML);
        }
    }

    // Helper function to traverse nested objects
    function traverse(obj, callback, parentKeys = []) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var currentKeys = [...parentKeys, key];
                callback.apply(currentKeys, [key, obj[key]]);
                if (obj[key] !== null && typeof obj[key] === 'object') {
                    // Recursive call for nested objects
                    traverse(obj[key], callback, currentKeys);
                }
            }
        }
    }

    // Display the form data when the page loads (if available)
    displayFormData();

    $('#submitBtn').on('click', function () {
        // Get the form data in JSON format
        var formData = formBuilder.actions.getData('json');

        // Save the form data to local storage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Display the user-provided values in the HTML
        displayFormData();

        // Optionally, you can also console.log(formData) to see the data in the console
        console.log(formData);
    });
});
