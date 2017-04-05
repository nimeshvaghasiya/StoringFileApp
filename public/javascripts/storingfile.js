

$(function () {
    $('#fileUrl').val('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'); //'https://bitcoin.org/bitcoin.pdf'
});

function download() {
    try {
        var url = $('#fileUrl').val(); //https://bitcoin.org/bitcoin.pdf
        var urlPattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/;
        var regex = new RegExp(urlPattern);
        if (url.match(regex)) {
            var xhr = createCORSRequest('GET', url);
            //xhr.responseType = 'blob';
            //xhr.setRequestHeader("Content-type", "octet/stream");
            if (!xhr) {
                alert('CORS not supported');
                return;
            }

            // Response handlers.
            xhr.onload = function () {
                var blob = new Blob([xhr.response], { type: "octet/stream" });
                //var file = URL.createObjectURL(blob);
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    var base64data = reader.result;
                    var data = {};
                    data.title = "title";
                    data.message = "message";
                    data.file = base64data;

                    $.ajax({
                        type: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        url: 'http://localhost:3001/storingfile',
                        success: function (data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                            alert(data);
                        }
                    });

                }
            };

            xhr.onerror = function () {
                alert('Woops, there was an error making the request.');
            };

            xhr.send();
        }
        else {
            alert('please enter valid url.');
            $('#fileUrl').focus();
        }
    } catch (e) {
        console.log(e);
    }
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}