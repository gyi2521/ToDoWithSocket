$(function () {

    function render(html) {
        $("#result").html("");
        $("#result").html(html);
    }

    const displayToDoList = () => {
        $.ajax({ url: "/api/toDo", method: "GET" })
            .then(function (data) {
                let html = "";
                data.forEach(e => html += `<li task-id='${e._id}'><input type='checkbox' class='update' ${e.done ? 'checked' : ''}>${e.task}<button class='remove'><i class="fas fa-times btn-style"></i></button></li>`);
                render(html);
            });
    };

    $(document).on('click', '.remove', function () {

        let li = $(this).closest('li');
        let chk = $(li).find('input');
        let okToDelete = true;
        if (!chk.is(':checked')) {
            let deleteConfirm = confirm('Are you sure you want to delete this task?')
            if (!deleteConfirm) {
                okToDelete = false;
            }
        }
        if (okToDelete) {
            $.ajax({ url: "/api/toDo/" + li.attr('task-id'), method: "DELETE" })
                .then(function (data) {
                    displayToDoList();
                });
        }
    });

    $(document).on('click', '.update', function () {
        let li = $(this).closest('li');
        const updatedTask = {
            _id: li.attr('task-id'),
            done: $(this).is(':checked')
        };

        $.ajax({ url: "/api/toDo", method: "PUT", data: updatedTask })
            .then(function (data) {
                displayToDoList();
            });

    });

    const saveToDoList = () => {
        const inputValue = $('#inputTask').val().trim();
        if (inputValue != '') {
            $.ajax({ url: '/api/toDo', method: 'POST', data: { taskItem: inputValue } })
                .then(function (data) {
                    $('#inputTask').val('');
                    $('#inputTask').focus();
                    displayToDoList();
                });
        } else {
            alert('Please enter a task.');
            $('#inputTask').focus();
        }
    };

    displayToDoList();
    $('#btnSubmit').on("click", saveToDoList);
})
