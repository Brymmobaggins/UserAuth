const form = document.querySelector('form');
const input = document.querySelector('input')

form.addEventListener('submit', function (e) {
    e.preventDefault();
});


function addTodo() {
    const todoText = input.value
    const taskList = document.querySelector('ul');

    if (!todoText) {
        alert('Please add a task')
    } else {
        // create list item for todo task
        const todoEl = document.createElement('li');
        todoEl.textContent = todoText;
        taskList.append(todoEl)


        // this complete button with checkmark icon
        const completeButon = document.createElement('button');
        completeButon.setAttribute("id", "mark")
        completeButon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" class="show"/></svg>`
        todoEl.appendChild(completeButon)
        completeButon.addEventListener("click", function () {
            todoEl.classList.toggle("completed")

        })


        // this is delete button with delete icon
        const deleteButton = document.createElement('button');
        // deleteButton.setAttribute("id", "delete")
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill="#FF0000" class="show" /></svg>`;
        // append delete Button to list item
        todoEl.appendChild(deleteButton)

        // delete button event listener
        deleteButton.addEventListener("click", function () {
            todoEl.remove()
        })
        // this is edit button with edit icon
        const editButton = document.createElement("button")
        editButton.setAttribute("id", "edit")
        editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" fill="#16a34a" class="show"/></svg>`

        // append edit button to list item
        todoEl.appendChild(editButton)

        // edit button event listener
        editButton.addEventListener("click", function () {
            const newText = prompt("Enter new task", todoText);
            todoEl.textContent = newText;
        })

        // div for icons
        const iconDiv = document.createElement("div")
        iconDiv.setAttribute("class", "icons")
        todoEl.appendChild(iconDiv)

        // append icon to delete button
        iconDiv.appendChild(deleteButton)

        // append edit button to list item
        iconDiv.appendChild(editButton)

        iconDiv.appendChild(completeButon)


    }

    input.value = "";
    input.focus();
}



// function editTask(li) {
//     let liContent = li.querySelector("span")

//     let input = document.createElement("input")
//     input.type = "text"
//     input.value = li.textContent
//     li.appendChild(input)

//     input.addEventListener("blur", () => {
//         liContent.innerHTML = input.value;
//         input.remove();
//     })

// }