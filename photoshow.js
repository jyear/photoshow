/**
 * Created by yx on 2015/7/19. 21.10
 */
var PhotoShow=(function($){
    var defaults={
        data:"",
        renderTo:""
    };

    function _photo(opt){
        this.opt= $.extend({}, defaults, opt || {});
        this.width=$(window).width();
        this.height=$(window).height();
    }
    function _render(){
        var _me=this;
        var data=_me.opt.data;
        var o=$("#"+_me.opt.renderTo);
        var h=[];
        h.push('<ul id="photoshow">');
        for (var i= 0,len=data.length;i<len;i++){
            h.push('<li class="imglist"><img src=',data[i].url,' class="img-cont"/></li>');
        }
        h.push('</ul>');
        o.html(h.join(""));
        _bindHtmlCss.call(_me);
    }
    function _bindHtmlCss(){
        var _me=this;
        var u=$("#photoshow");
        var c= u.children(".imglist");
        var data=_me.opt.data;
        u.css({
            width:_me.width,
            height:_me.height,
            listStyle:"none",
            position:"relative"
        });
        c.css({
            width:_me.width,
            height:_me.height,
            position:"absolute",
            top:0,
            left:0,
            background:"black",
            display:"-webkit-box",
            webkitBoxAlign:"center",
            webkitBoxPack:"center"
        });
        var w= u.width();
        var Proportion=_me.width/_me.height;
        c.each(function(i){
            $(this).css("transform","translate3d("+w*i+"px,0,0)");
            data[i].width/data[i].height>Proportion?$(this).children().css("width",_me.width):$(this).children().css("height",_me.height);
        });
        _bindEvent.call(_me);
    }
    function _bindEvent(){
        var _me=this;
        var self=$("#photoshow");
        var ch=self.children();
        var startHandler=function(e){
            self.startX = e.originalEvent.targetTouches[0].pageX;
            self.offsetX = 0;
            self.startTime = new Date() * 1;
            self.target=$(e.target).closest("li");
            self.target.prevAll().css("transform","translate3d("+_me.width+"px,0,0)");
            self.target.prevAll().css("transform","translate3d("+(-(_me.width))+"px,0,0)");
        };
        var moveHandler=function(e){
            e.preventDefault();
            self.offsetX = e.originalEvent.targetTouches[0].pageX - self.startX;
            var idx=self.target.index();
            var i=idx-1;
            var m=i+3;
            for (i;i<m;i++){
                ch.eq(i).css("transform","translate3d("+(self.offsetX+((i-idx)*(_me.width)))+"px,0,0)");
            }
        };

        var endHandler=function(){
            var  m=self.offsetX;
            var idx=self.target.index();
            var i=idx-1;
            var s=i+3;
            if(m<0){
                if(idx==ch.length-1){
                   i=-2;
                   idx=-1;
                }
                for (i;i<s;i++){
                    ch.eq(i+1).css("transform","translate3d("+(i-idx)*(_me.width)+"px,0,0)");
                }
            }else if(m>0){
                for (i;i<s;i++){
                    ch.eq(i-1).css("transform","translate3d("+(i-idx)*(_me.width)+"px,0,0)");
                }

            }
        };
        self.on("touchstart",startHandler);
        self.on("touchmove",moveHandler);
        self.on("touchend",endHandler);
        _clickImg.call(self);
    }
    function _clickImg(){
        var o=$("#photoshow");
        o.on("click",function(e){
            alert("你点在第"+($(e.target).closest("li").index()+1)+"张图片上")
        });

    }
    $.extend(_photo.prototype,{
        render:_render
    });
    return _photo;
})(jQuery);