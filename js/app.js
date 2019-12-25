'use strict';
function Picture(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns
    // Picture.all.push(this)


}
Picture.all = []
Picture.prototype.render = function () {
    let template = $('#ourHandle').html();
    let compile_template = Handlebars.compile(template);
    console.log(compile_template);
    let after_compile = compile_template(this);
    $('#output').append(after_compile);

};
let option = []

Picture.prototype.makeOption = function () {
    // collection.push(this)
    if (!(option.includes(this.keyword))) {
        option.push(this.keyword);
        let new_option = '<option>' + this.keyword + '</option>';
        $('#choice').append(new_option);
    }

};

// console.log(collection);

let deploy = function (input) {
    let check = false
    if (Picture.all = []) {
        check = true
    }
    input.forEach(element => {
        let obj = new Picture(element.image_url, element.title, element.description, element.keyword, element.horns)
        obj.render();
        if (check) {
            Picture.all.push(obj);
            obj.makeOption();
        }

    })
};

let reader = function (input) {
    let test = typeof (input)
    console.log(typeof (input))
    if (test == 'Array') {
        deploy(input)
    } else {
        Picture.all = []
        $.get(input, 'json')
            .then(data => {
                deploy(data)
                Picture.all.push(data);

            })

    }

}




reader('data/page-1.json')
// let filter_collection = []
$('#choice').change(function () {
    var new_select = $(this).children("option:selected").val();
    $('div').each(function () {
        // filter_collection = []
        if ($(this).attr('class') === new_select) {
            $(this).css('display', 'block');
            // collection.push()
        } else {
            $(this).css('display', 'none');
        }
    })
})

let clear = function () {
    option = [];
    $('main').html('');
}

$('#page1').click(() => {
    $('#choice').empty().end();
    clear();
    reader('data/page-1.json');
});
$('#page2').click(() => {
    clear();
    $('#choice').empty().end();
    reader('data/page-2.json');
});

let sort_horns = function (arr) {
    arr.sort((a, b) => {
        console.log()
        return a.horns - b.horns;
    })
    return arr
}

let sort_titles = function (arr) {
    // console.log(arr)
    arr.sort((a, b) => {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0;
    });
    return arr;
}



$('#sort').change(function () {
    var new_request = $(this).children("option:selected").val();
    console.log(Picture.all)
    // let sort_collection = Picture.all
    clear();
    $('#choice').empty().end();

    if (new_request === 'horns') {
        sort_horns(Picture.all)
        deploy(Picture.all);
    } else if (new_request === 'Title') {
        deploy(sort_titles(Picture.all));
    }
})

