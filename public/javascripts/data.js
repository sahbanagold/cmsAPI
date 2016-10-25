$(function() {
    var id_edit

    function insert_to_tabel(item) {
        var row = $('<tr></tr>').attr({
            id: item._id
        }).prependTo($('#datatable'))
        $('<td></td>').appendTo(row)
        var letter = $('<td></td>').text(item.letter).appendTo(row)
        var frequency = $('<td></td>').text(item.frequency).appendTo(row)
        var tdaction = $('<td></td>')
        var btnedit = $("<button class='btn btn-success' type='button'></button>&nbsp;")
        var label = $("<span class='glyphicon glyphicon-pencil'><b>Update</b></span>")
        var btndelete = $("<button class='btn btn-danger' type='button'></button>")
        var labeldelete = $("<span class='glyphicon glyphicon-trash'><b>Delete</b></span>").appendTo(btndelete)
        label.appendTo(btnedit)
        btnedit.appendTo(tdaction)
        btndelete.appendTo(tdaction)
        tdaction.appendTo(row)
        btndelete.on('click', function() {
            delete_data(item._id)
        })
        btnedit.on('click', function() {
            update_data(item._id)
        })
    }
    $('#btnadd').click(function(e) {
        $('#addform').toggle()
    })
    $('#btnsave').click(function(e) {
        e.preventDefault();
        if ($('#letter').val() != "" && $('#frequency').val() != "") {
            $.ajax({
                    type: 'POST',
                    url: '/api/data',
                    data: {
                        letter: $('#letter').val(),
                        frequency: $('#frequency').val()
                    },
                    dataType: 'json'
                })
                .done(function(result) {
                    insert_to_tabel(result)
                    $('#letter').val("")
                    $('#frequency').val("")
                })
        }
    })
})

function delete_data(itemid) {
    $.ajax({
        type: 'DELETE',
        url: `/api/data/${itemid}`,
        dataType: 'json'
    }).done(function(result) {
        if (result)
            $(`#${itemid}`).remove()
    })
}
