(function () {
    function validateForm(form) {
        return (form.name.value && form._replyto.value && form.message.value);
    }
    var ajaxDiv = document.querySelector('.ajax-response');
    function handleSubmit() {
        ajaxDiv.className = 'ajax-response submitting';
        ajaxDiv.innerHTML = 'Submitting your email, please wait!'
    }
    function handleError(error) {
        ajaxDiv.className = 'ajax-response error';
        ajaxDiv.innerHTML = 'ERROR: ' + error;
    }
    function handleSuccess() {
        ajaxDiv.className = 'ajax-response success';
        ajaxDiv.innerHTML = 'Success! Your email has been sent.'
        window.setTimeout(function () {
            ajaxDiv.className = 'ajax-response';
        }, 5000);
    }
    var form = document.querySelector('.contact form');
    var email_url = form.action;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm(form)) {
            return handleError('Please fill out all form fields!');
        }
        handleSubmit();
        fetch(email_url, {
            method: 'post',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        })
        .then(function (response) { return response.json() })
        .then(function (jsonData) {
            if (jsonData.success && !jsonData.error) {
                return handleSuccess();
            }
            return handleError(jsonData.error);
        })
        .catch(function (error) {
            return handleError(error);
        });
    });
})();