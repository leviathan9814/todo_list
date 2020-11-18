window.addEventListener("DOMContentLoaded", () => {
    function onPageLoaded() {
        const input = document.querySelector("input[type='text']"),
            ul = document.querySelector("ul.todos"),
            saveButton = document.querySelector("button.save"),
            clearButton = document.querySelector("button.clear"),
            showTipsButton = document.querySelector("button.showTips"),
            closeTipsButton = document.querySelector("a.closeTips"),
            overlay = document.querySelector("#overlay");
    
        function createTodo() {
            const li = document.createElement("li");
            const textSpan = document.createElement("span");
            textSpan.classList.add("todo-text");
            const newTodo = input.value;
            textSpan.append(newTodo);
    
            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("todo-trash");
            const icon = document.createElement("i");
            icon.classList.add("fas", "fa-trash-alt");
            deleteBtn.appendChild(icon);
    
            ul.appendChild(li).append(textSpan, deleteBtn);
            input.value = "";
            listenDeleteTodo(deleteBtn);
        }
    
        function listenDeleteTodo(element) {
            element.addEventListener("click", (e) => {
                element.parentElement.remove();
                e.stopPropagation();
            });
        }
    
        function loadTodos() {
            const data = localStorage.getItem("todos");
            if (data) {
                ul.innerHTML = data;
            }
    
            const deleteButtons = document.querySelectorAll("span.todo-trash");
            for (const button of deleteButtons) {
                listenDeleteTodo(button);
            }
        }
    
        function onClickTodo(event) {
            if (event.target.tagName === "LI") {
                event.target.classList.toggle("checked");
            }
        }
    
        input.addEventListener("keypress", (keyPressed) => {
            const keyEnter = 13;
            if (keyPressed.which == keyEnter) {
                createTodo();
            }
        });
    
        ul.addEventListener("click", onClickTodo);
    
        saveButton.addEventListener("click", () => {
            localStorage.setItem("todos", ul.innerHTML);
        });
    
        clearButton.addEventListener("click", () => {
            localStorage.removeItem("todos", ul.innerHTML);
        });
    
        showTipsButton.addEventListener("click", () => {
            overlay.style.height = "100%";
        });
    
        closeTipsButton.addEventListener("click", () => {
            overlay.style.height = "0";
        });
    
        loadTodos();
    }

    onPageLoaded();
});
