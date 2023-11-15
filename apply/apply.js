function apply() {
    if (emailValid && phoneValid && forenameValid && surnameValid && jobValid && introductionValid && human) {
        document.getElementById("card").classList.add("card-success");
        document.getElementById("card").inert = "true";

        document.getElementById("forename").classList.add("input-success");
        document.getElementById("forename").inert = "true";

        document.getElementById("surname").classList.add("input-success");
        document.getElementById("surname").inert = "true";

        document.getElementById("email").classList.add("input-success");
        document.getElementById("email").inert = "true";

        document.getElementById("phone").classList.add("input-success");
        document.getElementById("phone").inert = "true";

        document.getElementById("job").classList.add("input-success");
        document.getElementById("job").inert = "true";

        document.getElementById("introduction").classList.add("input-success");
        document.getElementById("introduction").inert = "true";

        document.getElementById("submit").classList.add("button-success");
        document.getElementById("submit").inert = "true";
        
        document.getElementById("submit-text").innerText = "Submitted";
        document.getElementById("submit-icon").innerText = "done";
    }

    else {
        document.getElementById("card").classList.add("card-error");
        document.getElementById("forename").classList.add("input-error");
        document.getElementById("surname").classList.add("input-error");
        document.getElementById("email").classList.add("input-error");
        document.getElementById("phone").classList.add("input-error");
        document.getElementById("job").classList.add("input-error");
        document.getElementById("introduction").classList.add("input-error");
        document.getElementById("submit").classList.add("button-error");

        setTimeout(() => {
            document.getElementById("card").classList.remove("card-error");
            document.getElementById("forename").classList.remove("input-error");
            document.getElementById("surname").classList.remove("input-error");
            document.getElementById("email").classList.remove("input-error");
            document.getElementById("phone").classList.remove("input-error");
            document.getElementById("job").classList.remove("input-error");
            document.getElementById("introduction").classList.remove("input-error");
            document.getElementById("submit").classList.remove("button-error");
        }, 1000);
    }
}

var forenameValid = false;
var surnameValid = false;
var emailValid = false;
var phoneValid = false;
var jobValid = false;
var introductionValid = false;
var human = false;
var cvUploaded = false;

function validate(data) {
    if (data == "email") {
        data = document.getElementById("email").value;

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data)) {
            document.getElementById("email").className = "input-success";
            
            emailValid = true;
        }

        else {
            document.getElementById("email").className = "input-error";

            emailValid = false;
        }

        setTimeout(() => {
            document.getElementById("email").className = "";
        }, 1000);
    }

    else if (data == "phone") {
        data = document.getElementById("phone").value;

        if (/^(?=(?:\+|0{2})?(?:(?:[\(\-\)\.\/ \t\f]*\d){7,10})?(?:[\-\.\/ \t\f]?\d{2,3})(?:[\-\s]?[ext]{1,3}[\-\.\/ \t\f]?\d{1,4})?$)((?:\+|0{2})\d{0,3})?(?:[\-\.\/ \t\f]?)(\(0\d[ ]?\d{0,4}\)|\(\d{0,4}\)|\d{0,4})(?:[\-\.\/ \t\f]{0,2}\d){3,8}(?:[\-\s]?(?:x|ext)[\-\t\f ]?(\d{1,4}))?$/.test(data)) {
            document.getElementById("phone").className = "input-success";

            phoneValid = true;
        }

        else {
            document.getElementById("phone").className = "input-error";

            phoneValid = false;
        }

        setTimeout(() => {
            document.getElementById("phone").className = "";
        }, 1000);
    }

    else if (data == "forename") {
        data = document.getElementById("forename").value;

        if (data != "") {
            forenameValid = true;
        }

        else {
            forenameValid = false;
        }
    }

    else if (data == "surname") {
        data = document.getElementById("surname").value;

        if (data != "") {
            surnameValid = true;
        }
    }

    else if (data == "job") {
        data = document.getElementById("job").value;

        if (data != "") {
            jobValid = true;
        }
    }

    else if (data == "introduction") {
        data = document.getElementById("introduction").value;

        if (data != "") {
            introductionValid = true;
        }
    }
}

function verifyHuman() {    
    document.getElementById("human").blur();
    document.getElementById("human").inert = "true";

    document.getElementById("human").className = "button-warning";
    document.getElementById("human-text").innerText = "Verifying...";
    document.getElementById("human-icon").innerText = "sensor_occupied";

    setTimeout(() => {
        human = true;

        document.getElementById("human").className = "card-success";
        document.getElementById("human-text").innerText = "Verified";
        document.getElementById("human-icon").innerText = "verified_user";

        if (cvUploaded) {
            document.getElementById("action-card").classList.remove("card");
            document.getElementById("action-card").classList.add("card-success");

            document.getElementById("submit").style.opacity = "1";
            document.getElementById("submit").style.pointerEvents = "all";
        }
    }, 2000);
}

function uploadCV() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = () => {
        let file = input.files[0]; // Get the first selected file
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                let fileURL = e.target.result;
                console.log(fileURL);

                document.getElementById("cv").className = "button-warning";
                document.getElementById("cv-text").innerText = "Uploading...";
                document.getElementById("cv-icon").innerText = "downloading";
                document.getElementById("cv").inert = "true";

                setTimeout(() => {
                    document.getElementById("cv").className = "card-success";
                    document.getElementById("cv-text").innerText = "Upload complete";
                    document.getElementById("cv-icon").innerText = "cloud_done";
                    document.getElementById("cv").inert = "true";

                    cvUploaded = true;

                    if (human) {
                        document.getElementById("action-card").classList.remove("card");
                        document.getElementById("action-card").classList.add("card-success");

                        document.getElementById("submit").style.opacity = "1";
                        document.getElementById("submit").style.pointerEvents = "all";
                    }
                }, 2500);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };
    input.click();
}

const urlParams = new URLSearchParams(location.search);
var jobTitle = urlParams.get('job');
console.log(jobTitle);
document.getElementById("job").value = jobTitle;

validate("job");