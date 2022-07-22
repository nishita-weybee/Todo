const addBtn = document.querySelector(".btnAdd");
const searchBtn = document.querySelector(".btnSearch");
const allBtn = document.querySelector(".btnAll");
const activeBtn = document.querySelector(".btnActive");
const completedBtn = document.querySelector(".btnCompleted");
const inputTask = document.querySelector(".input-task");
const allTask = document.querySelector(".all-task");
const noData = document.querySelector(".noData");
const action = document.getElementById("action");
const sort = document.getElementById("sort");
const todo = document.getElementsByClassName("todo");

var addedTask = [];

function add(text) {
  const todo = {
    text: text,
    checked: false,
    id: Date.now(),
  };

  addedTask.push(todo);
}

function toggle() {
  var checkboxes = document.getElementsByName("task");
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      addedTask[index].checked = true;
    } else {
      addedTask[index].checked = false;
    }
  });
}

let displayTask = function (addedTask) {
  addedTask.forEach((element) => {
    const html = `
    <div class="todo">
      <div class="left-elements">
          <input type="checkbox" name="task"  id ="${
            element.id
          }" onclick=toggle() ${element.checked == true && "checked"}>
          <input id="${
            element.id
          }-input" class= "task-added" type="text" value ="${
      element.text
    }"  disabled>
      </div>
      <div class="right-elements">
          <button class="editBtn" onclick = editTask(${
            element.id
          }) >  <i class="fas fa-edit"></i></button>
          <button class="deleteBtn" onclick = deleteTask(${
            element.id
          }) > <i class="fas fa-backspace"></i></button>
      </div>              
    </div> `;

    allTask.insertAdjacentHTML("beforeend", html);
  });
};

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!addBtn.classList.contains("focus")) addBtn.classList.add("focus");
  if (searchBtn.classList.contains("focus"))
    searchBtn.classList.remove("focus");

  if (inputTask.value !== "") {
    add(inputTask.value);

    noData.style.display = "none";
    addedTask == null
      ? displayTask(addedTask)
      : displayTask(addedTask.slice(-1));
  } else {
    console.log("enter something");
  }

  inputTask.value = "";
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (addBtn.classList.contains("focus")) addBtn.classList.remove("focus");
  if (!searchBtn.classList.contains("focus")) searchBtn.classList.add("focus");

  const filteredValue = addedTask.filter((task) =>
    task.text.toLowerCase().includes(inputTask.value.toLowerCase())
  );
  // console.log(filteredValue);
  allTask.innerHTML = "";
  displayTask(filteredValue);
});

action.addEventListener("change", function (e) {
  console.log(e.target.value);

  switch (e.target.value) {
    case "selectAll":
      if (searchBtn.classList.contains("focus")) {
        const filteredValue = addedTask.filter((task) =>
          task.text.toLowerCase().includes(inputTask.value.toLowerCase())
        );
        for (var x of filteredValue) {
          x.checked = true;
          var checkboxes = document.getElementById(x.id);
          checkboxes.checked = true;
        }
      } else if (addBtn.classList.contains("focus")) {
        addedTask.map((elem) => (elem.checked = true));
        var checkboxes = document.getElementsByName("task");
        for (var checkbox of checkboxes) {
          checkbox.checked = true;
        }
      }
      action.value = action;
      e.target.value = "action";
      break;

    case "unselectAll":
      addedTask.map((elem) => (elem.checked = false));
      var checkboxes = document.getElementsByName("task");
      for (var checkbox of checkboxes) {
        checkbox.checked = false;
      }
      action.value = action;
      e.target.value = "action";
      break;

    case "deleteAllSelected":
      const se = addedTask.filter((elem) => elem.checked === false);
      addedTask.splice(0);
      addedTask = [].concat(se);
      allTask.innerHTML = "";
      displayTask(addedTask);
      action.value = action;
      e.target.value = "action";
      break;
  }
});

sort.addEventListener("change", function (e) {
  switch (e.target.value) {
    case "A-Z":
      const azSort = addedTask
        .slice()
        .sort((a, b) =>
          a.text
            .toLowerCase()
            .localeCompare(b.text.toLowerCase(), "en", { numeric: true })
        );

      allTask.innerHTML = "";
      displayTask(azSort);
      sort.value = sort;
      e.target.value = "sort";
      break;
    case "Z-A":
      const zaSort = addedTask
      .slice()
      .sort((b, a) =>
        a.text
          .toLowerCase()
          .localeCompare(b.text.toLowerCase(), "en", { numeric: true })
      );
      allTask.innerHTML = "";
      displayTask(zaSort);
      sort.value = sort;
      e.target.value = "sort";
      break;

    case "newest":
      allTask.innerHTML = "";
      function newest(b, a) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }
      console.log(addedTask.slice().sort(newest));
      displayTask(addedTask.slice().sort(newest));
      sort.value = sort;
      e.target.value = "sort";
      break;

    case "oldest":
      allTask.innerHTML = "";
      function compare(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }
      console.log(addedTask.slice().sort(compare));
      displayTask(addedTask.slice().sort(compare));

      sort.value = sort;
      e.target.value = "sort";
      break;
  }
});

allBtn.addEventListener("click", function () {
  if (!allBtn.classList.contains("active")) allBtn.classList.add("active");
  if (activeBtn.classList.contains("active"))
    activeBtn.classList.remove("active");
  if (completedBtn.classList.contains("active"))
    completedBtn.classList.remove("active");

  allTask.innerHTML = "";
  displayTask(addedTask);
});

activeBtn.addEventListener("click", function () {
  if (!activeBtn.classList.contains("active"))
    activeBtn.classList.add("active");
  if (allBtn.classList.contains("active")) allBtn.classList.remove("active");
  if (completedBtn.classList.contains("active"))
    completedBtn.classList.remove("active");

  const checkedone = addedTask
    .slice()
    .filter((input) => input.checked === false);
  allTask.innerHTML = "";
  displayTask(checkedone);
});

completedBtn.addEventListener("click", function () {
  if (!completedBtn.classList.contains("active"))
    completedBtn.classList.add("active");
  if (allBtn.classList.contains("active")) allBtn.classList.remove("active");
  if (activeBtn.classList.contains("active"))
    activeBtn.classList.remove("active");

  const checkedone = addedTask
    .slice()
    .filter((input) => input.checked === true);
  allTask.innerHTML = "";
  displayTask(checkedone);
});

function editTask(id) {
  const letEdit = addedTask.filter((ele) => ele.id === id).map((ele) => ele.id);
  const index = addedTask.findIndex((ele) => ele.id === id);

  document.getElementById(letEdit + "-input").disabled = false;
  document.getElementById(letEdit + "-input").focus();

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const newTask = document.getElementById(letEdit + "-input").value;

      addedTask[index].text = newTask;
      document.getElementById(letEdit + "-input").disabled = true;
    }
  });
}

function deleteTask(id) {
  const index = addedTask.findIndex((x) => x.id === id);
  addedTask.splice(index, 1);
  allTask.innerHTML = "";
  displayTask(addedTask);
}

inputTask.addEventListener("keyup", function (e) {
  console.log(e);
  if (e.key === "Enter" && addBtn.classList.contains("focus")) {
    console.log(e.key);
    if (inputTask.value !== "") {
      add(inputTask.value);
      noData.style.display = "none";
      addedTask == null
        ? displayTask(addedTask)
        : displayTask(addedTask.slice(-1));
    } else {
      console.log("enter something");
    }

    inputTask.value = "";
  } else if (e.key === "Enter" && searchBtn.classList.contains("focus")) {
    e.preventDefault();
    searchBtn.classList.add("focus");
    const filteredValue = addedTask.filter((task) =>
      task.text.toLowerCase().includes(inputTask.value.toLowerCase())
    );

    allTask.innerHTML = "";
    displayTask(filteredValue);
  } else if (searchBtn.classList.contains("focus")) {
    // console.log(e, inputTask.value)
    const filteredValue = addedTask.filter((task) =>
      task.text.toLowerCase().includes(inputTask.value.toLowerCase())
    );
    allTask.innerHTML = "";
    displayTask(filteredValue);
  }
});
