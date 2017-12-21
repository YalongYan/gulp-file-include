/**
 * Created by Administrator on 2017/12/11.
 */
/**
 * Created by Administrator on 2016/12/7.
 */
$(function(){


    $('#liuyan').click(function(){
        $('.mask').fadeIn();
        //console.log("ss");
        $("#liuyan_title").val("");
        $("#liuyan_phone").val("");
        $("#liuyan_content").val("");

        $('.liuyan').fadeIn();
    })
    $('.mask').click(function(){
        $('.mask').fadeOut();
        $('.liuyan').fadeOut();
        $(".hidePart").hide();

    });
    $('.login-del').click(function(){ //点击登录的叉号
        $('.mask').fadeOut();
        $('.liuyan').fadeOut();
        $(".hidePart").hide();

    });


});
function fabu(){
    var is_login=contact_login();
    if(is_login==1){
        location.href="/release.php";
    }
    else{
        $(".hidePart,.mask").show();
    }

}
function liuyan_tijiao(){
    if(liuyan_check()){
        var liuyan_title = $('#liuyan_title').val();
        var liuyan_phone = $('#liuyan_phone').val();
        var liuyan_content = $('#liuyan_content').val();
        var url = '/Liuyan/index';
        $.ajax({
            url:url,
            type:'post',
            data:{'liuyan_title':liuyan_title,'liuyan_phone':liuyan_phone,'liuyan_content':liuyan_content},
            dataType:'json',
            success:function(data){
                if(data.status == 0){
                    $('.mask').fadeOut();
                    $('.liuyan').fadeOut();
                }else{
                    alert('数据错误');
                }
            }
        })
    }
}
function liuyan_check(){
    var liuyan_title = $('#liuyan_title').val();
    var liuyan_phone = $('#liuyan_phone').val();
    var liuyan_content = $('#liuyan_content').val();
    var checked = true;
    if(liuyan_title == ''){
        $('#liuyan_title').css('border','1px solid red');
        checked = false;
    }
    if(liuyan_phone == ''){
        $('#liuyan_phone').css('border','1px solid red');
        checked = false;
    }
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(liuyan_phone))){
        $('#liuyan_phone').css('border','1px solid red');
        checked = false;
    }
    if(liuyan_content == ''){
        $('#liuyan_content').css('border','1px solid red');
        checked = false;
    }
    if(checked){
        return true;
    }else{
        return false;
    }

}