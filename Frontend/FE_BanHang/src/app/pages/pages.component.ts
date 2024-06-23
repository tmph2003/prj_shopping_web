import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
    pageHtml: any;

    constructor(
      private sanitizer : DomSanitizer,
    ){}
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.pageHtml = this.sanitizer.bypassSecurityTrustHtml(`<article class="article-main">
      <div class="article-details">
                      <h1 class="article-title title_page">Chất liệu sản phẩm</h1>
        <div class="media ">
          <div class="media-body text-right">
            <div class='mt-0 '>
              <div class="d-flex align-items-center justify-content-end">
                <span class="mr-2"><svg class="icon">
<use xlink:href="#icon-user" />
</svg></span>
                <span>Manager</span>
              </div>
            </div>
            <div class='art-info text-muted font-weight-light justify-content-end '>

              <span>
                <svg class="icon">
<use xlink:href="#icon-calendar" />
</svg>											Th 4 14/06/2023
              </span>
              <span class="reading-time">
<svg class="icon">
<use xlink:href="#icon-clock" />
</svg>

4 phút đọc

</span>
            </div>

          </div>
        </div>
                      <div class="toc-wrapper">
          <div class="toc-title mb-2 open font-weight-bold">Nội dung bài viết

<svg class="icon" >
<use xlink:href="#icon-arrow" />
</svg></div>
          <div class="js-toc">

          </div>
        </div>


        <div class="article-content js-toc-content">
          <div class="rte"  id="ega-uti-editable-content" data-platform='haravan' data-id="1002005374" data-blog-id=1000835346>

<p><span style="font-size:16px;">Trung thành với định hướng đem lại những sản phẩm chất lượng đến với khách hàng, PARADOX luôn không ngừng tìm tòi và phát triển những loại vải bền, đẹp và đem lại cảm giác thoải mái nhất cho khách hàng.&nbsp;Một số loại vải chất lượng được sử dụng trong hầu hết các sản phẩm của chúng mình sẽ được liệt kê dưới đây, mời các bạn cùng&nbsp;xem qua với PARADOX nhé!</span></p><hr><h1><span style="font-size:18px;"><strong>Vải Cotton 2 chiều</strong></span></h1><p><span style="font-size:16px;">Là loại vải thường dùng nhất cho nhiều dòng áo thun và polo của PARADOX. Những đặc tính nổi bật của loại vải này đem lại trải nghiệm xịn sò cho người mặc:</span></p><ul><li><p><span style="font-size:16px;">100% cotton thân thiện với môi trường</span></p></li><li><p><span style="font-size:16px;">Định lượng 260gsm tạo nên kết cấu sợi vải bền chặt và dày dặn</span></p></li><li><p><span style="font-size:16px;">Sợi vải thiên nhiên thấm hút mồ hôi tốt và thoáng khí</span></p></li><li><p><span style="font-size:16px;">Mềm mại và không gây kích ứng là đặc điểm của bông (cotton)</span></p></li></ul>&nbsp;<p style="text-align: center;"><span style="font-size:16px;"><img width="310" height="152" src="https://lh4.googleusercontent.com/84YOyI-RJpGv7-Rdk2dNqMVtRfGQPC10f3E2A2KCpMTgHk9yK8eik1FXnZTyWutudD-pWuz09QN_193ckKvBMMmrSITEBmgmfdC9sAM3mSYYNSk4AP8LQrZnQieMPAGnNkuqGsTwB9nYFr2b6qcSf2Y"><img width="306" height="305" src="https://lh5.googleusercontent.com/2ygO7judwkaDqK0wWZeoBnkYd4lC9tzHXWYAVEDQkEdDg3jS54RwnJkn9bmbWItQ8OyrmgLCobd4_Y_AA4PnbcDqwBZru5p5zjzbNVnJ28rSFPcwyC3BfYc-CWuwp587cUJNSYoC4JuiZ78L8vUJnHc"></span></p><hr><h1><span style="font-size:18px;"><strong>Vải Dù 2 lớp cán keo</strong></span></h1><p><span style="font-size:16px;">Là loại vải được sử dụng để làm nên những chiếc áo khoác dù cá tính, rất được ưa chuộng của PARADOX. Áo khoác dù có thể nói là một dòng sản phẩm không thể thiếu trong tủ đồ của nhiều bạn trẻ, hiểu được điều đó mà chúng mình đã quyết định chọn chất vải dù năng động và thoáng khí, được may 2 lớp và cán thêm một lớp keo mỏng tạo cảm giác dày dặn và độ trượt nước nhất định.</span></p><p style="text-align: center;"><span style="font-size:16px;"><img width="292" height="291" src="https://lh3.googleusercontent.com/1oXeDkJx8LHPB1vTkNfi6OLJSBFyK7Rrhy5HXRuHbxRimF9Sxh-4gAEXjUfZm0CFYne2wEHIxrlTTOpdPyNjXv3_A5waK2pti6sUNOjvdt7PEsrgK6apl45qABLKY8WBuN1CKYpXQFRqHgX3_jj7lE0"></span></p><hr><h1><span style="font-size:18px;"><strong>Vải nỉ lót bông và Vải nỉ cotton 2 da</strong></span></h1><p><span style="font-size:16px;">Thường được dùng cho dòng sản phẩm thu đông và loại item khoác ngoài. Chất vải nỉ cao cấp của PARADOX thường có đặc điểm dày dặn và ấm áp nhờ vào lớp lót bông mỏng bên trong. Tuy nhiên, để chiều lòng những bạn có làn da nhạy cảm và lo ngại về cảm giác đổ lông thì bên cạnh chất nỉ bông, chúng mình còn có phiên bản nâng cấp chính là chất vải cotton 2 da, có ưu điểm 2 mặt nỉ như nhau tuy vẫn giữ được ưu điểm ấm áp nhưng lại rất khô thoáng và thoải mái cho người mặc.</span></p>&nbsp;<p style="text-align: center;"><span style="font-size:16px;"><img width="280" height="279" src="https://lh4.googleusercontent.com/w9Hje_FU1BEhDaNvYDl_HUbteI_Pf7Oi9bvB40QV_AAook5fWCr_4L8-nuw-aJJv3blol2wQ4qA9xKk3eKvTtgRjQDVzCt84bryJyi5_3Yayb3MKPaTmwx46MLyVYkLkEcE01-M15IhutpgxE02cfaI"></span></p><hr><p><span style="font-size:16px;">Trong năm 2023 này, lần đầu tiên PARADOX ra mắt dòng thời trang High-class hướng tới những đối tượng khách hàng trẻ muốn trải nghiệm dòng sản phẩm đẳng cấp. Vì vậy mà bên cạnh những chất liệu đem lại cảm giác thoải mái cho người dùng, PARADOX còn phát triển những loại vải khác với cách xử lý phức tạp và tinh tế tạo nên những sản phẩm sang chảnh và cao cấp:</span></p><p style="text-align: center;"><span style="font-size:16px;"><img width="358" height="239" src="https://lh6.googleusercontent.com/VrUhC2PhYCN7yQ5drDlSdlE-3gPTHxnQ1AbK0C5s1ibRd-sYy8eheQF7SAaNihvukzWIMwfoYrFQmODjVBkJ8z7JL2MPdzhla-u2wPPu3xYOFwDG9g6TS73sNORMFP-DQD63RDQ8rRBo8BPoLo6J4Cw"><img width="358" height="239" src="https://lh6.googleusercontent.com/hOJ2kgGDBFIGfiiQnzvPbyJWZan5iEU3N7cgyyF5tWs1O1jyAQZH22xViouw9whaqf7tMlDm2902JrD0lkbFvbgxcNEi8LR4RM22sFF4Ng0v0HD7QBgVRcqve7P2TUASJtMBN1_6lXx0S_LmfO_kaj0"></span></p><hr><h1><span style="font-size:18px;"><strong>Washed jeans</strong></span></h1><p><span style="font-size:16px;">Là một loại vải được biết đến như một biểu tượng của giới cao bồi Mỹ, chất vải được ưa chuộng bởi sự dày dặn và bền bỉ khó có loại vải nào vượt qua được. Đối với dòng sản phẩm High-class của PARADOX, chúng mình sử dụng chất vải jean nội địa có độ dày lên tới 11oz, xử lý chất liệu bằng phương pháp wash tiên tiến để tạo nên những sản phẩm cá tính nhưng lại mềm mại, êm dịu với làn da.</span></p><p style="text-align: center;"><span style="font-size:16px;"><img width="313" height="312" src="https://lh6.googleusercontent.com/HUo5J1mr95kwu1uDKoAzueSSA0PHI86Iq754NaEqAK5HAB38CfGRAMbqjFKmQuzSU1DCicR9wkMFo8rVHU8nkeJmstT8H2toayuD4WGNYV8fIUvw8ULwlohjc1pgfp58I2cU9BXxh2_ssJ27bCldy6I"></span></p><hr><h1><span style="font-size:18px;"><strong>Vải Kaki</strong></span></h1><p><span style="font-size:16px;">Là một loại vải đã có từ lâu, trải qua quá trình phát triển với nhiều cải tiến và xử lý, loại vải này đã trở thành một trong những loại vải được ưa chuộng và phổ biến nhất hiện nay. Nhờ vào đặc tính bền chắc, không dễ bị xù lông, thấm hút tốt và thoáng khí của vải Kaki (hay còn gọi là Khaki) được làm từ sợi cotton - Loại vải này được PARADOX nhắm đến là một trong những sự lựa chọn tối ưu và tuyệt vời cho những sản phẩm cao cấp của thương hiệu.</span></p><p style="text-align: center;"><span style="font-size:16px;"><img width="288" height="287" src="https://lh3.googleusercontent.com/w5g54PPr2h6zwK96MFxsIno-ut1Y55y_DECgnjrr_wr9SYdvnq0td5IUv4SizDg6kBz8cV9Ekr-sjwVv2nIJt8o09uV4SEisMcC-7WhrKyyjB7T_I2mvLnrIrrTzi8N-pyOm78VyzwkdtrHwQYxSGH4"><img width="282" height="281" src="https://lh4.googleusercontent.com/a2U4hNuzif9F3Km3bNF-q1gqK1Sms3gDw3w9--47ObNEXBDCo5kuSnfFT7ixJHALowsKSQ_U-Hi6TamfKUeCJgrbKg85QzbUBUgpsMLcJvmZz65RaACF1TGXBSjcEpVh4K9nJjR7S6CIBMJqONud4JA"></span></p><hr><p><span style="font-size:16px;">Trên đây là một số thông tin cơ bản có thể bạn chưa biết về những chất liệu chính trong rất nhiều loại chất liệu mà PARADOX đang sử dụng cho sản phẩm của mình. Thông qua bài viết này, chúng mình hy vọng sẽ giúp bạn hiểu rõ hơn về những sản phẩm của PARADOX mà bạn đang sở hữu hoặc quan tâm.</span></p>
                            </div>
        </div>
      </div>
      <div class="tag-share">
        <div class="row">
















<div  data-id="1002005374" data-create="14/06/2023 05:23:44" data-brand="Paradox" id="hrv-product-reviews" style="padding-top:20px;display:table;width:100%" class="hrv-product-reviews hrv-reviews-article" >



<div id="hrv-product-reviews-sub" style="width:100%">
<div class="hrv-product-reviews-summary" id="hrv-product-reviews-summary">
</div>
<div class="hrv-product-reviews-head" >
Có <span></span> bình luận trên bài viết “<strong>Chất liệu sản phẩm</strong>”
</div>

<div class="hrv-product-reviews-list" id="hrv-product-reviews-list">
</div>
<button type="submit" class="btn btn_base buycreaterating">Tạo đánh giá</button>
<div class="hrv-product-reviews-form" id="hrv-product-reviews-form">

<h3>Viết bình luận</h3>


<form id="hrv-product-reviews-frm" url="https://script.google.com/macros/s/AKfycby8k-Kusnq0R0Jo1taqljndDICZRonRG5YxgjEAQxjbMCNt-ufSbLq-OSjQCfGt1hg39g/exec" name="hrv-product-reviews-frm">

  <input name="id" type="hidden" value="1002005374">
  <input name="productname" type="hidden" value="Chất liệu sản phẩm">

  <div class="flex">
    <fieldset>
      <div id="dvName"><input name="name" required type="text"
                              placeholder="Tên của bạn (>3 ký tự và < 20 ký tự)" autocomplete="off">
      </div>
    </fieldset>
    <fieldset>
      <div id="dvEmail"><input name="email" type="email" placeholder="xinchao@gmail.com"
                               autocomplete="off">
      </div>
    </fieldset>
  </div>

<input id="dvscore" name="score" type="hidden" value="5">
  <fieldset>
    <div id="dvBody">
      <textarea name="body" required rows="5" minlength="3" maxlength="1000"
                placeholder="Viết nội dung bình luận ở đây (>3 ký tự và < 1000 ký tự)"></textarea>
    </div>
  </fieldset>

  <input type="submit" style="background:#222" id="btnSubmitReview" value="Gửi bình luận" width="80">
</form><br>
</div>
<div class="hrv-product-reviews-form" id="hrv-product-reviews-thanks" style="display:none; padding-top:20px">
<b>Cám ơn bạn đã gởi bình luận bài viết!</b>
</div><br>
</div>
</div>
<script>
function getcss(filename) {
jQuery('head').append(` + "<link href='${getcdn(filename)}' rel='stylesheet' type='text/css'  media='all'  />`)" + `
}
var getcdn = function (filename) {
var url = "https://theme.hstatic.net/1000233137/1000650361/14/",
  version = Math.floor((Math.random() * 999999999) + 999999);
sessionStorage.version != undefined ? version = sessionStorage.version : sessionStorage.version = version;
return url + filename + "?v=" + version;
}
$("#url").val(window.location.href);
$(window).load(() =>{
getcss('bigpenreview.scss.css');
const reviewjs = document.createElement("script");
reviewjs.setAttribute("type","text/javascript");
reviewjs.setAttribute("src",getcdn('bigpenreview.js'));
document.getElementsByTagName("head")[0].appendChild(reviewjs);
})
$(".buycreaterating").click(function(){
$(this).hide()
$('#hrv-product-reviews-form').attr("style","display:block !important")
})
</script>
<style>

.hrv-product-reviews{opacity:0}
#hrv-product-reviews-form
{
display:none ;
}
.buycreaterating {margin-top:20px;color:#fff}
.bigpen-brand,.buycreaterating {
background: #222;
}
.hrv-prv-detail-score .score2,	.hrv-prv-detail-score .score1{
display:none;
}
</style>






                          <div class="col-12 share_social mt-3">
            <div class="addthis_inline_share_toolbox share_add no-tag">
              <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-58589c2252fc2da4"></script>
            </div>
          </div>
                        </div>
      </div>
      <div class="section clearfix mt-3">

      </div>
    </article>`)
    }
}
