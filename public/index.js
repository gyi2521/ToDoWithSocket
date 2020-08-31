$(function () {

    function render(html) {
        $("#date").html("");
        $("#date").html(html);
    }
    const socket = io.connect();
    let $frmSendToDo = $('#frmSendToDo');
    let $inputTask = $('#inputTask');
    let $toDoList = $('#toDoList');

    const day = moment().format('ddd');
    const month = moment().format('MMM D');
    const year = moment().format('YYYY');

    render(`<div class="day">${day}</div><div><div class="month">${month}</div><div class="year">${year}</div></div>`);

    $frmSendToDo.submit(function (event) {
        event.preventDefault();
        socket.emit('send-task', $inputTask.val())
        $inputTask.val('');
    })

    socket.on('load old msg', function (docs) {
        for (let i = 0; i < docs.length; i++) {
            displayMsg(`<p class="uppercase"><span ${docs[i].done ? 'class="grayout"' : 'class=""'}> ${docs[i].task} </span><button id="${docs[i]._id}" class="remove"><i ${docs[i].done ? 'class="far fa-times-circle btn-style iBtn"' : 'class = "far fa-circle btn-style"'}></i></button></p>`);
        }
    })

    socket.on('new-task', function (data) {
        displayMsg(`<p class="uppercase"><span> ${data.task} </span><button id="${data._id}" class="remove"><i ${data.done ? 'class="far fa-times-circle btn-style"' : 'class = "far fa-circle btn-style"'}></i></button></p>`);
    })

    socket.on('update-task', function (data) {
        let updatedTask = $("#" + data._id).parent();
        $(updatedTask).find('span').addClass('grayout');
        let chk = $(updatedTask).find('.fa-circle');
        chk.removeClass('fa-circle');
        chk.addClass('fa-times-circle iBtn');
    })

    socket.on('delete-task', function (data) {
        $("#" + data._id).parent().remove();
    })

    $(document).on('click', '.remove', function () {
        let taskId = $(this).attr("id");
        let chk = $(this).find('.fa-circle');
        if (chk.length > 0) {
            chk.removeClass('fa-circle');
            chk.addClass('fa-times-circle iBtn');
            $(this).closest('p').find('span').addClass('grayout');
            socket.emit('complete-task', taskId)
        }
        else {
            $(this).parent().remove();
            socket.emit('delete-task', taskId);
        }
    })


    function displayMsg(data) {
        $toDoList.append(data);
    }
})




