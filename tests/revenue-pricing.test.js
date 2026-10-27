const test=require('node:test');
const assert=require('node:assert/strict');
const R=require('../revenue-pricing.js');
const input=(type,seats=10,custom=[])=>type==='CA_NHAN'
 ?{loaiKhach:type,ngayBatDau:'2026-10-27',nghe:['mua-hang'],ngheChinh:'mua-hang',tinhChinh:custom}
 :{loaiKhach:type,ngayBatDau:'2026-10-27',nhomSeat:[{ma:'N1',ten:'Mua hàng',seat:seats,nghe:['mua-hang'],ngheChinh:'mua-hang'}],tinhChinh:custom};
test('Cá nhân: 690.000/năm + 800.000/lần, gia hạn không gồm tinh chỉnh',()=>{
 const r=R.purchase(input('CA_NHAN',1,['mua-hang']),'personal');
 assert.equal(r.don.tongThanhToan,1490000);assert.equal(r.don.giaHanDuKien,690000);
 assert.equal(R.renewal(r.subscription).don.tongThanhToan,690000);
});
test('Business: 40 người đúng giá niêm yết, không giữ giảm 10% từ bảng cũ',()=>{
 const r=R.purchase(input('DOANH_NGHIEP',40),'business');
 assert.equal(r.don.tongThanhToan,27600000);assert.equal(r.don.tongUuDai,0);
});
test('Business Plus: 10 người + 1 buổi = 10.700.000; không nhân phí buổi theo người',()=>{
 const r=R.purchase(input('DOANH_NGHIEP',10,['mua-hang']),'business_plus');
 assert.equal(r.don.phiGoiNghe,9900000);assert.equal(r.don.phiMotLan,800000);
 assert.equal(r.don.tongThanhToan,10700000);assert.equal(r.don.giaHanDuKien,9900000);
 assert.equal(r.subscription.planId,'business_plus');
 assert.equal(R.renewal(r.subscription).don.tongThanhToan,9900000);
});
test('Mua thêm giữa kỳ giữ giá Business Plus và không thay số tiền đơn cũ',()=>{
 const r=R.purchase(input('DOANH_NGHIEP',10),'business_plus');
 const oldTotal=r.don.tongThanhToan;
 const added=R.addon(r.subscription,{ngayHieuLuc:'2026-10-27',themSeat:[{maNhom:'N1',soSeat:5}]});
 assert.equal(added.don.tongThanhToan,4950000);assert.equal(r.don.tongThanhToan,oldTotal);
 assert.equal(added.subscription.planId,'business_plus');
});
test('Hai nhóm Business Plus tính theo tổng người; cùng một dịch vụ vẫn tính một lần',()=>{
 const i=input('DOANH_NGHIEP',5,['mua-hang']);
 i.nhomSeat.push({ma:'N2',ten:'Nhóm 2',seat:5,nghe:['mua-hang'],ngheChinh:'mua-hang'});
 assert.equal(R.purchase(i,'business_plus').don.tongThanhToan,10700000);
});
test('Không báo giá nghề chưa niêm yết hoặc gói sai loại khách',()=>{
 const i=input('CA_NHAN');i.nghe=['ke-toan'];i.ngheChinh='ke-toan';
 assert.throws(()=>R.purchase(i,'personal'));
 assert.throws(()=>R.purchase(input('CA_NHAN'),'business_plus'));
 assert.throws(()=>R.plan('__proto__'));
});
test('Thuê bao cũ không tự đổi giá; báo giá mới đòi hỏi xác nhận gói hiện tại',()=>{
 assert.throws(()=>R.renewal({planId:'business'}),/bảng giá cũ/);
});
test('Custom báo giá riêng và phí AI không được tự cộng vào tổng thuê bao',()=>{
 const r=R.purchase(input('CA_NHAN'),'personal');
 assert.equal(r.don.tongThanhToan,690000);assert.equal(r.don.phiMotLan,0);
 assert.equal(R.services.customMin,25000000);assert.equal(R.services.customMax,80000000);
});
