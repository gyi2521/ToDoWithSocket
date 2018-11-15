$(function () {

    function render(html) {
        $("#date").html("");
        $("#date").html(html);
    }
    const socket = io.connect();
    let $frmSendToDo = $('#frmSendToDo');
    let $inputTask = $('#inputTask');
    let $toDoList = $('#toDoList');

    const date = moment().format('MMM D');
    const year = moment().format('YYYY');
    const day = moment().format('ddd').toUpperCase();

    render(`<div><h1>${day}</h1><h3>${date}, ${year}</h3></div>`);

    $frmSendToDo.submit(function(event){
        event.preventDefault();
        socket.emit('send-task', $inputTask.val())
        $inputTask.val('');
    })

    socket.on('load old msg', function(docs){
        for(let i=0; i<docs.length; i++){
            displayMsg(`<p class="uppercase"><span ${docs[i].done? 'class="grayout"':'class=""'}> ${docs[i].task} </span><button id="${docs[i]._id}" class="remove"><i ${docs[i].done? 'class="far fa-times-circle btn-style iBtn"':'class = "far fa-circle btn-style"'}></i></button></p>`);
        }
    })

    socket.on('new-task', function(data){
        displayMsg(`<p class="uppercase"><span> ${data.task} </span><button id="${data._id}" class="remove"><i ${data.done? 'class="far fa-times-circle btn-style"':'class = "far fa-circle btn-style"'}></i></button></p>`);
    })

    socket.on('update-task', function(data){
        let updatedTask =  $("#" + data._id).parent();
        let chk = $(updatedTask).find('.fa-circle');
        chk.removeClass('fa-circle');
        chk.addClass('fa-times-circle iBtn');
    })

    socket.on('delete-task', function(data){
        $("#" + data._id).parent().remove();
     })

    $(document).on('click', '.remove', function(){
        let taskId= $(this).attr("id");
        let chk = $(this).find('.fa-circle');
        if(chk.length > 0){
            chk.removeClass('fa-circle');
            chk.addClass('fa-times-circle iBtn');
            $(this).closest('p').find('span').addClass('grayout');
            socket.emit('complete-task', taskId)
        }
        else{           
            $(this).parent().remove();
            socket.emit('delete-task', taskId);  
        }

    })

    function displayMsg(data){
        $toDoList.append(data );
    }


})

//     const displayToDoList = () => {
//         $.ajax({ url: "/api/toDo", method: "GET" })
//             .then(function (data) {
//                 let html = "";
//                 data.forEach(e => html += `<li task-id='${e._id}'><input type='checkbox' class='update' ${e.done ? 'checked' : ''}>${e.task}<button class='remove'><i class="fas fa-times btn-style"></i></button></li>`);
//                 render(html);
//             });
//     };
//     $(document).on('click', '.remove', function () {

//         let li = $(this).closest('li');
//         let chk = $(li).find('input');
//         let okToDelete = true;
//         if (!chk.is(':checked')) {
//             let deleteConfirm = confirm('Are you sure you want to delete this task?')
//             if (!deleteConfirm) {
//                 okToDelete = false;
//             }
//         }
//         if (okToDelete) {
//             $.ajax({ url: "/api/toDo/" + li.attr('task-id'), method: "DELETE" })
//                 .then(function (data) {
//                     displayToDoList();
//                 });
//         }
//     });

//     $(document).on('click', '.update', function () {
//         let li = $(this).closest('li');
//         const updatedTask = {
//             _id: li.attr('task-id'),
//             done: $(this).is(':checked')
//         };

//         $.ajax({ url: "/api/toDo", method: "PUT", data: updatedTask })
//             .then(function (data) {
//                 displayToDoList();
//             });

//     });

//     const saveToDoList = () => {
//         const inputValue = $('#inputTask').val().trim();
//         if (inputValue != '') {
//             $.ajax({ url: '/api/toDo', method: 'POST', data: { taskItem: inputValue } })
//                 .then(function (data) {
//                     $('#inputTask').val('');
//                     $('#inputTask').focus();
//                     displayToDoList();
//                 });
//         } else {
//             alert('Please enter a task.');
//             $('#inputTask').focus();
//         }
//     };

//     displayToDoList();
//     $('#btnSubmit').on("click", saveToDoList);
// })
