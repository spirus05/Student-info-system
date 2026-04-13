let isEditing = false;
let currentEditIndex = null;

// Load data when page opens
window.onload = function() {
    displayStudents();
};

function addStudent() {
    // Get values from input
    let name = document.getElementById('name').value;
    let section = document.getElementById('section').value;
    let age = document.getElementById('age').value;
    let gender = document.getElementById('gender').value;
    let course = document.getElementById('course').value;
    let yearLevel = document.getElementById('yearLevel').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;

    // Validation
    if(name === "" || section === "" || age === "" || gender === "" || course === "" || yearLevel === "" || address === "" || contact === "") {
        alert("Please fill up all fields!");
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];

    if(isEditing) {
        // UPDATE MODE
        students[currentEditIndex] = { name, section, age, gender, course, yearLevel, address, contact };
        isEditing = false;
        currentEditIndex = null;
        document.getElementById('submitBtn').innerText = "Add";
    } else {
        // ADD MODE
        students.push({ name, section, age, gender, course, yearLevel, address, contact });
    }

    // Save and Refresh
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    clearFields();
}

function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.section}</td>
                <td>${student.age}</td>
                <td>${student.gender}</td>
                <td>${student.course}</td>
                <td>${student.yearLevel}</td>
                <td>${student.address}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students[index];

    // Put data in textboxes
    document.getElementById('name').value = student.name;
    document.getElementById('section').value = student.section;
    document.getElementById('age').value = student.age;
    document.getElementById('gender').value = student.gender;
    document.getElementById('course').value = student.course;
    document.getElementById('yearLevel').value = student.yearLevel;
    document.getElementById('address').value = student.address;
    document.getElementById('contact').value = student.contact;

    // Change button to Update
    document.getElementById('submitBtn').innerText = "Update";
    isEditing = true;
    currentEditIndex = index;
}

function deleteStudent(index) {
    if(confirm("Are you sure you want to delete this record?")) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}

function searchStudent() {
    let input = document.getElementById('search').value.toLowerCase();
    let rows = document.querySelectorAll('#studentTable tr');

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        if(text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function clearFields() {
    document.getElementById('name').value = "";
    document.getElementById('section').value = "";
    document.getElementById('age').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('course').value = "";
    document.getElementById('yearLevel').value = "";
    document.getElementById('address').value = "";
    document.getElementById('contact').value = "";
}