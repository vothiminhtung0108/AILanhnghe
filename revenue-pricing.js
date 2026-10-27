/* Current public pricing, read from the supplied reference on 2026-10-27.
 * Keep the original arithmetic engine unchanged for historical quotes/tests.
 */
(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory(require('./assets/reference/tinh-tien.js'));
 else root.ALNRevenue=factory(root.TinhTien);
})(typeof self!=='undefined'?self:this,function(T){
 'use strict';
 const SOURCE='https://ai-lanh-nghe-app.nghoangan-bt96.workers.dev/bang-gia/';
 const VERSION='public-2026-10-27';
 const plans={
  personal:{id:'personal',name:'Cá nhân',type:'CA_NHAN',annual:690000},
  business:{id:'business',name:'Business',type:'DOANH_NGHIEP',annual:690000},
  business_plus:{id:'business_plus',name:'Business Plus',type:'DOANH_NGHIEP',annual:990000}
 };
 const services={coaching:800000,customMin:25000000,customMax:80000000};
 function plan(id){if(!Object.hasOwn(plans,id))throw Error('Chọn gói giá hợp lệ.');return plans[id]}
 function config(id){
  const p=plan(id),c=JSON.parse(JSON.stringify(T.CAU_HINH));
  c.phienBan=VERSION+':'+id;
  c.nghe=c.nghe.map(n=>({...n,goiNghe:n.id==='mua-hang'?p.annual:null,tinhChinh:n.id==='mua-hang'?services.coaching:null,tinhChinhDN:n.id==='mua-hang'?services.coaching:null}));
  // The new public page publishes no volume, multi-job or service discounts.
  c.moRongNghe=[0];c.quyMo=[[1,0]];c.tinhChinh=[[1,0]];
  return c;
 }
 function mark(result,id){
  const p=plan(id),meta={planId:id,tenGoi:p.name,pricingVersion:VERSION,pricingSource:SOURCE};
  return {...result,don:{...result.don,...meta},subscription:{...result.subscription,...meta}};
 }
 function purchase(input,id){
  const p=plan(id);
  if(input.loaiKhach!==p.type)throw Error('Gói giá không phù hợp loại khách hàng.');
  return mark(T.muaMoi(input,config(id)),id);
 }
 function current(sub){
  if(sub?.pricingVersion!==VERSION||!Object.hasOwn(plans,sub.planId))throw Error('Thuê bao này thuộc bảng giá cũ. Hãy tạo đơn mẫu mới để xem vòng đời theo bảng giá hiện tại.');
  return sub.planId;
 }
 function addon(sub,input){const id=current(sub);return mark(T.muaThem(sub,input,config(id)),id)}
 function renewal(sub){const id=current(sub);return mark(T.baoGiaGiaHan(sub,config(id)),id)}
 return {SOURCE,VERSION,plans,services,plan,config,purchase,addon,renewal};
});
