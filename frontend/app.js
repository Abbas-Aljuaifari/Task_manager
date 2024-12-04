const API_URL = "http://localhost:8080/tasks";

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const showTasksButton = document.getElementById("showTasksButton");

  // Load tasks when "Show All Tasks" button is clicked
  showTasksButton.addEventListener("click", fetchTasks);

  // Add new task on form submission
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = taskInput.value;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, done: false }),
    });

    if (response.ok) {
      fetchTasks(); // Refresh tasks after adding a new one
      taskInput.value = ""; // Clear input
    }
  });

  // Fetch tasks from the backend
  async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  }

  // Render tasks in the DOM
  function renderTasks(tasks) {
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTask(task.ID));

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Delete task from the backend
  async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks(); // Refresh tasks after deletion
  }
});
