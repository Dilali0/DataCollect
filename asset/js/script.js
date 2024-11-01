
const bar = document.getElementById("progress");
const sections = document.querySelectorAll(".tab-pane"); 
const navLinks = document.querySelectorAll(".nav-link"); 
let currentSection = 1;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;  
    return phoneRegex.test(phone);
}

// Function to validate fields in each section
function validateCurrentSection(sectionIndex) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = ""; 

    let isValid = true;

    if (sectionIndex === 1) { 
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const gender = document.getElementById("gender").value;

        if (!name || !age || !gender) {
            isValid = false;
            alertContainer.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Please fill in all personal info fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        }
    } else if (sectionIndex === 2) {
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const position = document.getElementById("position").value.trim();

        if (!email || !isValidEmail(email) || !phone || !isValidPhone(phone) || !position) {
            isValid = false;
            alertContainer.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Please enter a valid email phone numbe  and position .
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        }
    }

    return isValid;
}


function nextSection() {
    if (currentSection < 3) {
        if (validateCurrentSection(currentSection)) { 
            currentSection++;
            showSection(currentSection);
        }
    }
}

function previousSection() {
    if (currentSection > 1) { 
        currentSection--;
        showSection(currentSection);
    }
}


function showSection(sectionIndex) {
    sections.forEach((section, index) => {
        if (sectionIndex === index + 1) {
            section.classList.add("show", "active"); 
        } else {
            section.classList.remove("show", "active"); 
        }
    });

    navLinks.forEach((link, index) => {
        if (sectionIndex === index + 1) {
            link.classList.add("active"); 
        } else {
            link.classList.remove("active"); 
        }
    });
    ProgressBar(sectionIndex);
}


function Saveinfo() {
    localStorage.clear();

    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = ""; 

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const position = document.getElementById("position").value.trim();
    const satisfaction = document.getElementById("satisfaction").value;
    const feedback = document.getElementById("feedback").value.trim();

    if (!name || !age || !gender || !email || !phone || !position || !satisfaction || !feedback) {
        alertContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Please fill in all fields.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        return; 
    }

    let id = parseInt(localStorage.getItem("id")) || 1; 
    const Data = {
        id: id,
        name: name,
        age: age,
        gender: gender,
        email: email,
        phone: phone,
        position: position,
        satisfaction: satisfaction,
        feedback: feedback,
    };

    localStorage.setItem("id", id + 1); 
    localStorage.setItem("Data" + Data.id, JSON.stringify(Data));

    alertContainer.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        Information saved successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    displaySavedInfo();
}

function displaySavedInfo() {
    const infoCardContainer = document.getElementById("infoCardContainer");
    infoCardContainer.innerHTML = ""; 

    const id = parseInt(localStorage.getItem("id")) || 1;

    for (let i = 1; i < id; i++) {
        const savedData = JSON.parse(localStorage.getItem("Data" + i));

        if (savedData) {
            infoCardContainer.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Employee #${savedData.id}</h5>
                        <p><strong>Name:</strong> ${savedData.name}</p>
                        <p><strong>Age:</strong> ${savedData.age}</p>
                        <p><strong>Gender:</strong> ${savedData.gender}</p>
                        <p><strong>Email:</strong> ${savedData.email}</p>
                        <p><strong>Phone:</strong> ${savedData.phone}</p>
                        <p><strong>Position:</strong> ${savedData.position}</p>
                        <p><strong>Satisfaction:</strong> ${savedData.satisfaction}</p>
                        <p><strong>Feedback:</strong> ${savedData.feedback}</p>
                    </div>
                </div>
            `;
        }
    }
}

/* Progress Bar */
function ProgressBar(sectionIndex) {
    const progress = (sectionIndex / sections.length) * 100;
    bar.style.width = `${progress}%`;
}
ProgressBar(currentSection);

/* Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const icon = document.querySelector('.darkMode i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); 
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon'); 
    }
}


