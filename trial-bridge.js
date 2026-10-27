'use strict';
(window.DUNG_THU||[]).forEach(n=>{
 n.tiepTheo=[{ten:'Vào gói nghề của tôi',moTa:'Tiếp tục dùng năm thành phần trong cùng bản demo.',href:'index.html#tong-quan',chinh:true},{ten:'Xem gói nghề và giá',moTa:'Xem phạm vi sản phẩm và giỏ hàng mô phỏng.',href:'index.html#goi-nghe'},{ten:'Xem quản lý doanh nghiệp',moTa:'Nhân sự mẫu, kiểm duyệt và nhật ký an toàn.',href:'index.html#doanh-nghiep'}];
});
const targetOrigin=location.protocol==='file:'?'*':location.origin;
new MutationObserver(()=>document.querySelectorAll('a[href^="index.html#"]').forEach(a=>a.target='_top')).observe(document.body,{childList:true,subtree:true});
new ResizeObserver(()=>parent.postMessage({type:'aln-trial-size',height:document.body.scrollHeight},targetOrigin)).observe(document.body);
