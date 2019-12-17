'use strict';
let templateId = '#picture-template';
function Picture(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.hrons = horns
}

console.log(templateId)
Picture.prototype.render = function () {
    // console.log(this)
    let wholeResult = $('<div> <h2></h2> <img/> <p></p> </div>').clone().addClass(this.keyword);
    wholeResult.find('h2').text(this.title);
    wholeResult.find('img').attr('src', this.image_url);
    wholeResult.find('p').text(this.description);
    $('main').append(wholeResult)
    
};
let option = []

Picture.prototype.makeOption = function () {
    // option =[]
    if (!(option.includes(this.keyword))) {
        option.push(this.keyword)
        let new_option = '<option>' + this.keyword + '</option>'
        $('#choice').append(new_option)
    }
    
};


let reader = function(file){
    $.get(file , 'json')
    .then(data => {
        data.forEach(element => {
            let obj = new Picture(element.image_url, element.title, element.description, element.keyword, element.horns)
            // console.log(obj)
            obj.makeOption();
            obj.render();
            // obj.toHtml();
            // console.log(Picture.prototype)  
        });

    })
} 
reader('data/page-1.json')
$('#choice').change(function () {
    var new_select = $(this).children("option:selected").val();
    $('div').each(function () {
        if ($(this).attr('class') === new_select) {
            $(this).css('display', 'block')
        } else {
            $(this).css('display', 'none')
        }       
    })
})

let clear = function (){
    option = []
    $('#choice').empty().end()
    
}
// // Handlebars
// let toHtml = function() {
//     let template = $(templateId).html();
//     let templateRender = Handlebars.compile(template);
//     console.log('hi')
//     return templateRender(this);
//   };

$('#page1').click(()=>{
    $('div').hide();
    clear();
    reader('data/page-1.json')
    // toHtml();
});
$('#page2').click(()=>{
    $('div').hide();
    clear();
    reader('data/page-2.json')
    // toHtml();

});
