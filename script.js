
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");

let students = JSON.parse(
    localStorage.getItem("students")
) || [];

// Save students in local storage
function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

// Display all students
function displayStudents(data = students) {

    studentList.innerHTML = "";

    document.getElementById("emptyMessage").hidden =
        data.length !== 0;

    data.forEach((student) => {

        const row = document.createElement("tr");

        const values = [
            student.id,
            student.name,
            student.email,
            student.phone,
            student.course,
            student.address
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => {
            editStudent(student.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => {
            deleteStudent(student.id);
        });

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
}

// Add or update student
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const editId = document.getElementById("editIndex").value;

    const student = {
        id: editId ? Number(editId) : Date.now(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        course: document.getElementById("course").value.trim(),
        address: document.getElementById("address").value.trim()
    };

    if (editId) {

        students = students.map(item =>
            item.id === Number(editId) ? student : item
        );

        alert("Student updated successfully!");

    } else {

        students.push(student);

        alert("Student added successfully!");
    }

    saveStudents();
    displayStudents();
    form.reset();

    document.getElementById("editIndex").value = "";
    document.getElementById("formTitle").textContent =
        "Add Student Details";
    document.getElementById("submitBtn").textContent =
        "Add Student";
    document.getElementById("cancelBtn").hidden = true;
});

// Search student by name
search.addEventListener("input", function() {

    const searchValue = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue)
    );

    displayStudents(filteredStudents);
});

// Edit student
function editStudent(id) {

    const student = students.find(item => item.id === id);

    if (!student) return;

    document.getElementById("editIndex").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("course").value = student.course;
    document.getElementById("address").value = student.address;

    document.getElementById("formTitle").textContent =
        "Update Student Information";

    document.getElementById("submitBtn").textContent =
        "Update Student";

    document.getElementById("cancelBtn").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Delete student
function deleteStudent(id) {

    if (confirm("Are you sure you want to delete this student?")) {

        students = students.filter(item => item.id !== id);

        saveStudents();
        displayStudents();

        alert("Student deleted successfully!");
    }
}

// Cancel editing
document.getElementById("cancelBtn").addEventListener("click", function() {

    form.reset();

    document.getElementById("editIndex").value = "";
    document.getElementById("formTitle").textContent =
        "Add Student Details";
    document.getElementById("submitBtn").textContent =
        "Add Student";
    this.hidden = true;

});

// Load students when website opens
displayStudents();
