"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[850],{5850:(X,_,l)=>{l.r(_),l.d(_,{StatementModule:()=>P});var s=l(6895),c=l(4575),g=l(5439),t=l(4650),x=l(2566),Z=l(9651),p=l(3679),d=l(6704),u=l(433),f=l(8231),C=l(6616),S=l(7044),z=l(1811),h=l(5259),r=l(1949);function T(e,a){if(1&e&&t._UZ(0,"nz-option",14),2&e){const n=a.$implicit;t.Q6J("nzLabel",n.name)("nzValue",n)}}function A(e,a){1&e&&(t.TgZ(0,"h3",15),t._uU(1,"No Records"),t.qZA())}function b(e,a){if(1&e&&(t.TgZ(0,"h4"),t._uU(1,"Sri Sainath Traders "),t.TgZ(2,"span",16),t._uU(3),t.ALo(4,"date"),t.qZA()()),2&e){const n=t.oxw();t.xp6(3),t.hij("Date: ",t.xi3(4,1,n.todayDate,"dd-MM-yy"),"")}}function q(e,a){if(1&e&&(t.TgZ(0,"h5"),t._uU(1),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Oqu(n.selectedCustomer.name)}}function M(e,a){if(1&e&&(t.TgZ(0,"tr")(1,"td",28),t._uU(2),t.qZA(),t.TgZ(3,"td",28),t._uU(4),t.qZA(),t.TgZ(5,"td",28),t._uU(6),t.qZA(),t.TgZ(7,"td",29),t._uU(8),t.ALo(9,"number"),t.qZA()()),2&e){const n=a.$implicit;t.xp6(2),t.Oqu(n.vegetable_name),t.xp6(2),t.Oqu(n.quantity),t.xp6(2),t.hij("",n.rate,"/-"),t.xp6(2),t.Oqu(t.xi3(9,4,n.total_amount,"1.2-2"))}}function J(e,a){if(1&e&&(t.TgZ(0,"td",24),t.YNc(1,M,10,7,"tr",27),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",n.items)}}function O(e,a){if(1&e&&(t.TgZ(0,"td",30),t._uU(1),t.ALo(2,"titlecase"),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(t.lcZ(2,1,n.type))}}function U(e,a){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(t.xi3(2,1,n.bill_amount,"1.2-2"))}}function v(e,a){1&e&&t._UZ(0,"td",24)}function Q(e,a){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(t.xi3(2,1,n.collected_amount,"1.2-2"))}}function Y(e,a){1&e&&t._UZ(0,"td",24)}function y(e,a){if(1&e&&(t.TgZ(0,"td"),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(t.xi3(2,1,n.balance_amount,"1.2-2"))}}function I(e,a){if(1&e&&(t.TgZ(0,"tr"),t.YNc(1,y,3,4,"td",12),t.qZA()),2&e){const n=a.$implicit,o=a.index,i=t.oxw(2).$implicit;t.xp6(1),t.Q6J("ngIf",n.balance_amount&&o===i.items.length-1)}}function N(e,a){if(1&e&&(t.TgZ(0,"td",24),t.YNc(1,I,2,1,"tr",27),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",n.items)}}function F(e,a){if(1&e&&(t.TgZ(0,"td",24),t._uU(1),t.ALo(2,"number"),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(t.xi3(2,1,n.customer_balance,"1.2-2"))}}function D(e,a){if(1&e&&(t.TgZ(0,"tr",18)(1,"td",24),t._uU(2),t.ALo(3,"date"),t.qZA(),t.YNc(4,J,2,1,"td",25),t.YNc(5,O,3,3,"td",26),t.YNc(6,U,3,4,"td",25),t.YNc(7,v,1,0,"td",25),t.YNc(8,Q,3,4,"td",25),t.YNc(9,Y,1,0,"td",25),t.YNc(10,N,2,1,"td",25),t.YNc(11,F,3,4,"td",25),t.qZA()),2&e){const n=a.$implicit;t.xp6(2),t.Oqu(t.xi3(3,9,n.bill_date,"dd-MM-yy")),t.xp6(2),t.Q6J("ngIf",n.items),t.xp6(1),t.Q6J("ngIf",n.type),t.xp6(1),t.Q6J("ngIf",n.bill_amount>0),t.xp6(1),t.Q6J("ngIf",!n.bill_amount),t.xp6(1),t.Q6J("ngIf",n.collected_amount),t.xp6(1),t.Q6J("ngIf",!n.collected_amount),t.xp6(1),t.Q6J("ngIf",n.items),t.xp6(1),t.Q6J("ngIf",!n.items)}}function L(e,a){if(1&e&&(t.TgZ(0,"table",17)(1,"tr",18)(2,"th",19),t._uU(3,"Date"),t.qZA(),t.TgZ(4,"th",19),t._uU(5,"Items"),t.qZA(),t.TgZ(6,"th",19),t._uU(7,"Bill Amount"),t.qZA(),t.TgZ(8,"th",19),t._uU(9,"Collected Amount"),t.qZA(),t.TgZ(10,"th",19),t._uU(11,"Balance"),t.qZA()(),t.TgZ(12,"tr")(13,"td",20),t._uU(14,"Opening Balance"),t.qZA(),t.TgZ(15,"td",21),t._uU(16),t.ALo(17,"number"),t.qZA()(),t.YNc(18,D,12,12,"tr",22),t.TgZ(19,"tr")(20,"td",23),t._uU(21,"Total"),t.qZA(),t.TgZ(22,"td",24),t._uU(23),t.ALo(24,"number"),t.qZA(),t.TgZ(25,"td",21),t._uU(26),t.ALo(27,"number"),t.qZA()(),t.TgZ(28,"tr")(29,"td",20),t._uU(30,"Balance"),t.qZA(),t.TgZ(31,"td",21),t._uU(32),t.ALo(33,"number"),t.qZA()()()),2&e){const n=t.oxw();t.xp6(16),t.Oqu(t.xi3(17,5,n.open_balance,"1.2-2")),t.xp6(2),t.Q6J("ngForOf",n.statement),t.xp6(5),t.Oqu(t.xi3(24,8,n.total_bill_amount,"1.2-2")),t.xp6(3),t.Oqu(t.xi3(27,11,n.total_collected_amount,"1.2-2")),t.xp6(6),t.Oqu(t.xi3(33,14,n.total_balance,"1.2-2"))}}const $=[{path:"",component:(()=>{class e{constructor(n,o){this.mainService=n,this.message=o,this.date=null,this.from_date="",this.to_date="",this.todayDate=new Date,this.customersData=[],this.statement=[],this.total_bill_amount=0,this.total_collected_amount=0,this.total_balance=0,this.open_balance=0}ngOnInit(){this.getCustomers()}getCustomerStatement(n){let o={customer_id:n};""!==this.from_date&&(o.from_date=this.from_date),""!==this.to_date&&(o.to_date=this.to_date),this.mainService.getStatement(o).subscribe(i=>{i&&i.statement&&i.statement.length>0?(this.statement=i.statement,this.total_bill_amount=i.total_bill_amount,this.total_collected_amount=i.total_collected_amount,this.total_balance=this.total_bill_amount-this.total_collected_amount,this.open_balance=i.open_balance):this.statement=[]},i=>{console.log("get customers err ",i),this.message.create("error",i.error.message)})}onChange(n){n&&n.length>0?(this.from_date=g(n[0]).format("YYYY-MM-DD"),this.to_date=g(n[1]).format("YYYY-MM-DD")):(this.from_date="",this.to_date="",this.date=null),this.statement=[]}getCustomers(){this.mainService.spinning.emit(!0),this.mainService.getCustomers({}).subscribe(o=>{const i=o.data;this.mainService.spinning.emit(!1),this.customersData=i},o=>{console.log("get customers err ",o),this.mainService.spinning.emit(!1),this.customersData=[]})}onCustomerSelect(n){this.statement=[]}getStatement(){this.statement=[],this.getCustomerStatement(this.selectedCustomer._id)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(x.J),t.Y36(Z.dD))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-statement"]],decls:28,vars:19,consts:[[1,"date-picker"],["nz-row","",1,"date-selection"],["nz-col","","nzSpan","6"],["nzRequired","",3,"nzSm","nzXs"],[3,"nzSm","nzXs"],[3,"ngModel","ngModelChange"],["nzShowSearch","","nzAllowClear","",3,"nzAutoFocus","ngModel","ngModelChange"],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled","click"],["style","text-align: center;",4,"ngIf"],[4,"ngIf"],["style","width: 100%;",4,"ngIf"],[3,"nzLabel","nzValue"],[2,"text-align","center"],[1,"float-right"],[2,"width","100%"],[2,"text-align","left"],[1,"text-center"],["colspan","3",1,"border-line","padding-10","text-center"],["colspan","2",1,"border-line","padding-10"],["style","text-align: left;",4,"ngFor","ngForOf"],["colspan","2",1,"border-line","padding-10","text-center"],[1,"border-line","padding-10"],["class","border-line padding-10",4,"ngIf"],["class","border-line padding-10 padding-l5",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"padding-5"],[1,"padding-5","text-right","padding-r5"],[1,"border-line","padding-10","padding-l5"]],template:function(n,o){1&n&&(t.TgZ(0,"h2"),t._uU(1,"Statement"),t.qZA(),t.TgZ(2,"div",0)(3,"div",1)(4,"div",2)(5,"nz-form-item")(6,"nz-form-label",3),t._uU(7,"Date"),t.qZA(),t.TgZ(8,"nz-form-control",4)(9,"nz-range-picker",5),t.NdJ("ngModelChange",function(m){return o.date=m})("ngModelChange",function(m){return o.onChange(m)}),t.qZA()()()(),t.TgZ(10,"div",2)(11,"nz-form-item")(12,"nz-form-label",3)(13,"span"),t._uU(14,"Customer"),t.qZA()(),t.TgZ(15,"nz-form-control",4)(16,"nz-select",6),t.NdJ("ngModelChange",function(m){return o.selectedCustomer=m})("ngModelChange",function(m){return o.onCustomerSelect(m)}),t.YNc(17,T,1,2,"nz-option",7),t.qZA()()()(),t.TgZ(18,"div",2)(19,"nz-form-item",8)(20,"nz-form-control",9)(21,"button",10),t.NdJ("click",function(){return o.getStatement()}),t._uU(22,"Submit"),t.qZA(),t._uU(23,"\xa0 "),t.qZA()()()(),t.YNc(24,A,2,0,"h3",11),t.YNc(25,b,5,4,"h4",12),t.YNc(26,q,2,1,"h5",12),t.YNc(27,L,34,17,"table",13),t.qZA()),2&n&&(t.xp6(6),t.Q6J("nzSm",6)("nzXs",24),t.xp6(2),t.Q6J("nzSm",14)("nzXs",24),t.xp6(1),t.Q6J("ngModel",o.date),t.xp6(3),t.Q6J("nzSm",6)("nzXs",24),t.xp6(3),t.Q6J("nzSm",14)("nzXs",24),t.xp6(1),t.Q6J("nzAutoFocus",!0)("ngModel",o.selectedCustomer),t.xp6(1),t.Q6J("ngForOf",o.customersData),t.xp6(3),t.Q6J("nzSpan",14)("nzOffset",6),t.xp6(1),t.Q6J("disabled",null==o.selectedCustomer||null==o.date),t.xp6(3),t.Q6J("ngIf",o.statement&&0===o.statement.length),t.xp6(1),t.Q6J("ngIf",o.statement&&o.statement.length>0),t.xp6(1),t.Q6J("ngIf",o.statement&&o.statement.length>0),t.xp6(1),t.Q6J("ngIf",o.statement&&o.statement.length>0))},dependencies:[s.sg,s.O5,p.t3,p.SK,d.Nx,d.iK,d.Fd,u.JJ,u.On,f.Ip,f.Vq,C.ix,S.w,z.dQ,h.uw,h.wS,r.Uo,r._C,r.$Z,s.JJ,s.rS,s.uU],styles:["h2[_ngcontent-%COMP%]{text-align:center;margin-top:10px}.padding-5[_ngcontent-%COMP%]{padding:5px}.border-line[_ngcontent-%COMP%]{border:1px solid #000}@media print{body[_ngcontent-%COMP%]{width:0;height:0}.date-selection[_ngcontent-%COMP%]{display:none}}.padding-r5[_ngcontent-%COMP%]{padding-right:5px}.padding-l10[_ngcontent-%COMP%]{padding-left:10px}.padding-10[_ngcontent-%COMP%]{padding:10px}.padding-l5[_ngcontent-%COMP%]{padding-left:5px}"]}),e})()}];let w=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild($),c.Bz]}),e})();var B=l(9912);let P=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,w,B.m]}),e})()}}]);