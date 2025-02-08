// Selectors
let throwError = document.querySelector(".throw-error");
let nextBtn = document.querySelector(".nextBtn");

// Error message
const errors = [
  {
    msg: "Please enter correct number of courses.",
    btnValue: "Okay",
  },
  {
    msg: "Please fill all the fields correctly!",
    btnValue: "Okay",
  },
];

// handle menu

let navMenu = document.querySelector(".nav-menu ");
let menuBtn = document.querySelector("#menu-btn");

let isActive = false; // handle active state

menuBtn.addEventListener("click", function handleMenu() {
  isActive = !isActive;
  if (isActive) {
    menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
    navMenu.classList.add("nav-menu-active");
  } else {
    menuBtn.innerHTML = `<svg viewBox="0 0 18 18"><polyline stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 12, 16 12"></polyline><polyline  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 5, 16 5"></polyline></svg>`;
    navMenu.classList.remove("nav-menu-active");
    menuBtn.style.background = "black";
  }
});

// prevent default behavior of form
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// main function
nextBtn.addEventListener("click", () => {
  let noOfCourses = document.querySelector("#noOfCourses").value;

  if (noOfCourses === "" || noOfCourses < 1) {
    showError(errors[0].msg, errors[0].btnValue);
  } else {
    document.querySelector(".form-group").classList.remove("active");
    document.querySelector(".getDetails").classList.add("active");

    let formGroup = document.querySelector(".form-group");
    formGroup.innerHTML = ""; // Clear previous inputs

    for (let i = 0; i < noOfCourses; i++) {
      formGroup.innerHTML += `
          <div class="form-group">
              <label for="course${i + 1}">Course ${
        i + 1
      } <span id="required">*</span></label>
              <div class="data">
                  <input type="number" id="course${i + 1}" name="course${
        i + 1
      }" placeholder="Enter grade">
                  <input type="number" id="credit${i + 1}" name="credit${
        i + 1
      }" placeholder="Enter credit">
              </div>
          </div>
          `;
    }

    let clutter = `
    <div class="btn-container">
      <button type="button" onclick="goBack()">Go Back</button>
      <button type="button" onClick="calculate()">Calculate</button>
    </div>`;

    formGroup.innerHTML += clutter;
  }
});

function goBack() {
  while (true) {
    let flag = confirm(
      "Are you sure to go back? you will lose your all details!"
    );
    if (flag) {
      document.querySelector(".form-group").innerHTML = "";
      document.querySelector(".form-group").classList.add("active");
      document.querySelector(".getDetails").classList.remove("active");
      break;
    } else {
      break;
    }
  }
}

// check if any filed is empty

function handleInputFields() {
  let allInputsFilled = true;

  document.querySelectorAll(".data").forEach((data) => {
    const gradeInput = data.querySelector('input[name^="course"]');
    const creditInput = data.querySelector('input[name^="credit"]');

    if (gradeInput.value === "" || creditInput.value === "") {
      allInputsFilled = false;
      showError(errors[1].msg, errors[1].btnValue);
    }
  });

  if (allInputsFilled) {
    return makeCalculation();
  }
}

// main calculation function
function makeCalculation() {
  let gpa = 0;
  let totalCreditHours = 0;

  document.querySelectorAll(".data").forEach((data) => {
    const grade = parseFloat(data.querySelector('input[name^="course"]').value);
    const creditHours = parseFloat(
      data.querySelector('input[name^="credit"]').value
    );

    if (!isNaN(grade) && !isNaN(creditHours)) {
      totalCreditHours += creditHours;
      gpa += grade * creditHours;
    }
  });

  if (totalCreditHours !== 0) {
    return gpa / totalCreditHours;
  } else {
    return 0; // Avoid division by zero
  }
}

function calculate() {
  let totalGPA = handleInputFields();

  if (totalGPA !== undefined) {
    // Ensure totalGPA is defined
    document.querySelector(".form-group").classList.add("active");
    document.querySelector(".result").classList.remove("active");

    document.querySelector("#user-gpa").innerHTML = `
      <span id="gpa" style="letter-spacing: 1.5px;">Your GPA is: ${totalGPA.toFixed(
        2
      )}</span>
    `;
  }
}

function goBackToEditForm() {
  document.querySelector(".form-group").classList.remove("active");
  document.querySelector(".result").classList.add("active");
}

function showError(msg, btnValue) {
  throwError.innerHTML = `
    <div class="message" style="text-align: center; letter-spacing: 1.5px">${msg}</div>
     <button onclick="closeError()">${btnValue}</button>
    `;
  throwError.classList.add("active-error");
}

function closeError() {
  document.querySelector(".throw-error").classList.remove("active-error");
}