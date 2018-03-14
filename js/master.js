/**
 * Created by zhaoyige on 2017/9/26.
 */
var schoolDistrict = [
  {name:'柳东区',val:'0'},
  {name:'柳南区',val:'1'},
  {name:'柳北区',val:'2'},
  {name:'城中区',val:'3'},
  {name:'鱼峰区',val:'4'},
  {name:'柳江区',val:'5'}];
var schoolDate =[
  [{sname:'柳东中心小学',sid:'001'},{sname:'潭中小学',sid:'002'}],
  [{sname:'柳南小学一',sid:'003'},{sname:'柳南小学二',sid:'004'}],
  [{sname:'柳北小学',sid:'004'}],
  [{sname:'城中小学',sid:'005'}],
  [{sname:'鱼峰小学',sid:'006'}],
  [{sname:'柳江小学',sid:'007'}]
];
var allSchool = {
  '柳东中心小学':'001','潭中小学':'002','柳南小学一':'003'
};

var frag = '';
var schoolFrag = '';
function createDistrict(){
  return function(){
    frag = '';
    schoolFrag = '';
    for(var i = 0 ; i< schoolDistrict.length ; i++){//生成区县名称DOM节点
      frag += "<li class='modal-section-list' val='"+schoolDistrict[i].val+"'>"+schoolDistrict[i].name+"</li>";
    }
  }
}

var cDistrict = new createDistrict();
  $('.modal').on('click','*',function(e){
    e.stopPropagation();
    if(this==$('.close-tier')[0]){ //点击遮罩层其他处关闭遮罩层
      $('.modal').fadeOut(300);
      $('.modal-section').empty();
      $('.js-autoSearch').val('');
      CloseMask();
    };
    if($(this)[0].tagName=="LI"){
      var index = parseInt($(this).attr('val'));
      if(!isNaN(index)){  //学校使用的是sid所以index都为NAN
        for( var j = 0 ; j < schoolDate[index].length; j++){
          schoolFrag +='<li class="modal-section-list" sid="'+schoolDate[index][j].sid+'">'+schoolDate[index][j].sname+'</li>';
        }
      }else{
        var str =encodeURI($(this).text())
        console.log(str)
        window.location.href='login.html?'+str+''
      }
      $('.modal-section').empty();
      $('.modal-section').append(schoolFrag);
    }
  }),
    $('.clear-modal').on('click',function(){
      $('.modal').fadeOut(400);
      $('.modal-section').empty();
      $('.js-autoSearch').val('');
      CloseMask();
    })
$('header').load('data/header.php')
$('footer').load('data/footer.php')

var handler = function () {
  event.preventDefault();
  event.stopPropagation();
};

var OpenMask = function()
    {
      document.body.addEventListener('touchmove',handler,false);
      document.body.addEventListener('wheel',handler,false);
};

var CloseMask = function()
{
  document.body.removeEventListener('touchmove',handler,false);
  document.body.removeEventListener('wheel',handler,false);
};

$.ready(
    
    $('.js-show-schoolList').on('click',function(){
      $('.modal').fadeIn(400);
      cDistrict();
      $('.modal-section').append(frag)
      OpenMask();
    }),
    $('header').on('click','li',function(){
      if($(this).attr('class')=='link-menu js-link-menu'){
        $('.mobil-search').slideToggle(500);
      }
     
    }),
    $('.js-tab').on('click','a',function(){
      $(this).addClass('active').siblings().removeClass('active');
      $($(this).attr('href')).addClass('active').siblings().removeClass('active');
    }),
    $('.clear-btn').on('click',function(){
      ($('#notice').is(':checked'))&&$('.modal').fadeOut(400)
    }),
    $('.js-autoSearch').on('input propertychange',function () {
      var kw = jQuery.trim($(this).val())
      if(kw==''){
        $('.modal-section').empty();
        cDistrict()
        $('.modal-section').append(frag);
      }
      if (/^[\u4e00-\u9fa5]+$/i.test(kw)) {
        console.log('kw:'+kw)
        var html = "";
        for(key in allSchool){
          console.log(key);
          if (key.indexOf(kw) >= 0) {
            $('.modal-section').empty();
            html += '<li class="modal-section-list" sid="'+allSchool[key]+'">'+key+'</li>'
          }
        }
        
        $('.modal-section').append(html);
        //获取form-msg-box子元素class状态
       
      }
    })
)

