"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[850],{5850:(B,c,i)=>{i.r(c),i.d(c,{StatementModule:()=>$});var l=i(6895),g=i(4575),_=i(5439),t=i(4650),S=i(2566),p=i(3679),s=i(6704),u=i(433),f=i(8231),z=i(6616),C=i(7044),Z=i(1811),h=i(5259),d=i(1949);function x(e,o){if(1&e&&t._UZ(0,"nz-option",14),2&e){const n=o.$implicit;t.Q6J("nzLabel",n.name)("nzValue",n)}}function T(e,o){1&e&&(t.TgZ(0,"h3",15),t._uU(1,"No Records"),t.qZA())}function A(e,o){if(1&e&&(t.TgZ(0,"h4"),t._uU(1,"Sri Sainath Traders "),t.TgZ(2,"span",16),t._uU(3),t.ALo(4,"date"),t.qZA()()),2&e){const n=t.oxw();t.xp6(3),t.hij("Date: ",t.xi3(4,1,n.todayDate,"dd-MM-yy"),"")}}function M(e,o){if(1&e&&(t.TgZ(0,"h5"),t._uU(1),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.Oqu(n.selectedCustomer.name)}}function v(e,o){if(1&e&&(t.TgZ(0,"tr")(1,"td",25),t._uU(2),t.qZA(),t.TgZ(3,"td",25),t._uU(4),t.qZA(),t.TgZ(5,"td",25),t._uU(6),t.qZA(),t.TgZ(7,"td",26),t._uU(8),t.qZA()()),2&e){const n=o.$implicit;t.xp6(2),t.Oqu(n.vegetable_name),t.xp6(2),t.Oqu(n.quantity),t.xp6(2),t.Oqu(n.rate),t.xp6(2),t.hij("",n.total_amount,".00")}}function J(e,o){if(1&e&&(t.TgZ(0,"td",21),t.YNc(1,v,9,4,"tr",24),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",n.items)}}function b(e,o){if(1&e&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(n.type)}}function U(e,o){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.hij("",n.bill_amount,".00")}}function y(e,o){1&e&&t._UZ(0,"td",27)}function Q(e,o){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.hij("",n.collected_amount,".00")}}function Y(e,o){1&e&&t._UZ(0,"td",27)}function q(e,o){if(1&e&&(t.TgZ(0,"td",27),t._uU(1),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.hij("",n.balance,".00")}}function O(e,o){1&e&&t._UZ(0,"td",27)}function I(e,o){if(1&e&&(t.TgZ(0,"tr",18)(1,"td",21),t._uU(2),t.ALo(3,"date"),t.qZA(),t.YNc(4,J,2,1,"td",22),t.YNc(5,b,2,1,"td",22),t.YNc(6,U,2,1,"td",23),t.YNc(7,y,1,0,"td",23),t.YNc(8,Q,2,1,"td",23),t.YNc(9,Y,1,0,"td",23),t.YNc(10,q,2,1,"td",23),t.YNc(11,O,1,0,"td",23),t.qZA()),2&e){const n=o.$implicit;t.xp6(2),t.Oqu(t.xi3(3,9,n.bill_date,"dd-MM-yy")),t.xp6(2),t.Q6J("ngIf",n.items),t.xp6(1),t.Q6J("ngIf",n.type),t.xp6(1),t.Q6J("ngIf",n.bill_amount>0),t.xp6(1),t.Q6J("ngIf",!n.bill_amount),t.xp6(1),t.Q6J("ngIf",n.collected_amount),t.xp6(1),t.Q6J("ngIf",!n.collected_amount),t.xp6(1),t.Q6J("ngIf",n.balance),t.xp6(1),t.Q6J("ngIf",!n.balance)}}function N(e,o){if(1&e&&(t.TgZ(0,"table",17)(1,"tr",18)(2,"th",19),t._uU(3,"Date"),t.qZA(),t.TgZ(4,"th",19),t._uU(5,"Items"),t.qZA(),t.TgZ(6,"th",19),t._uU(7,"Bill Amount"),t.qZA(),t.TgZ(8,"th",19),t._uU(9,"Collected Amount"),t.qZA(),t.TgZ(10,"th",19),t._uU(11,"Balance"),t.qZA()(),t.YNc(12,I,12,12,"tr",20),t.qZA()),2&e){const n=t.oxw();t.xp6(12),t.Q6J("ngForOf",n.statement)}}const F=[{path:"",component:(()=>{class e{constructor(n){this.mainService=n,this.date=null,this.from_date="",this.to_date="",this.todayDate=new Date,this.customersData=[],this.statement=[]}ngOnInit(){this.getCustomers()}getCustomerStatement(n){this.mainService.getStatement({customer_id:n,from_date:this.from_date,to_date:this.to_date}).subscribe(m=>{this.statement=m&&m.length>0?m:[]},m=>(console.log("get customers err ",m),m))}onChange(n){this.from_date=_(n[0]).format("YYYY-MM-DD"),this.to_date=_(n[1]).format("YYYY-MM-DD")}getCustomers(){this.mainService.spinning.emit(!0),this.mainService.getCustomers({}).subscribe(a=>{const m=a.data;this.mainService.spinning.emit(!1),this.customersData=m},a=>{console.log("get customers err ",a),this.mainService.spinning.emit(!1),this.customersData=[]})}onCustomerSelect(n){}getStatement(){this.statement=[],this.getCustomerStatement(this.selectedCustomer._id)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(S.J))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-statement"]],decls:28,vars:18,consts:[[1,"date-picker"],["nz-row","",1,"date-selection"],["nz-col","","nzSpan","6"],["nzRequired","",3,"nzSm","nzXs"],[3,"nzSm","nzXs"],[3,"ngModel","ngModelChange"],["nzShowSearch","","nzAllowClear","",3,"nzAutoFocus","ngModel","ngModelChange"],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"click"],["style","text-align: center;",4,"ngIf"],[4,"ngIf"],["style","width: 100%;",4,"ngIf"],[3,"nzLabel","nzValue"],[2,"text-align","center"],[1,"float-right"],[2,"width","100%"],[2,"text-align","left"],[1,"text-center"],["style","text-align: left;",4,"ngFor","ngForOf"],[1,"border-line"],["class","border-line",4,"ngIf"],["class","border-line text-right padding-r5",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"padding-5"],[1,"padding-5","text-right","padding-r5"],[1,"border-line","text-right","padding-r5"]],template:function(n,a){1&n&&(t.TgZ(0,"h2"),t._uU(1,"Statement"),t.qZA(),t.TgZ(2,"div",0)(3,"div",1)(4,"div",2)(5,"nz-form-item")(6,"nz-form-label",3),t._uU(7,"Date"),t.qZA(),t.TgZ(8,"nz-form-control",4)(9,"nz-range-picker",5),t.NdJ("ngModelChange",function(r){return a.date=r})("ngModelChange",function(r){return a.onChange(r)}),t.qZA()()()(),t.TgZ(10,"div",2)(11,"nz-form-item")(12,"nz-form-label",3)(13,"span"),t._uU(14,"Customer"),t.qZA()(),t.TgZ(15,"nz-form-control",4)(16,"nz-select",6),t.NdJ("ngModelChange",function(r){return a.selectedCustomer=r})("ngModelChange",function(r){return a.onCustomerSelect(r)}),t.YNc(17,x,1,2,"nz-option",7),t.qZA()()()(),t.TgZ(18,"div",2)(19,"nz-form-item",8)(20,"nz-form-control",9)(21,"button",10),t.NdJ("click",function(){return a.getStatement()}),t._uU(22,"Submit"),t.qZA(),t._uU(23,"\xa0 "),t.qZA()()()(),t.YNc(24,T,2,0,"h3",11),t.YNc(25,A,5,4,"h4",12),t.YNc(26,M,2,1,"h5",12),t.YNc(27,N,13,1,"table",13),t.qZA()),2&n&&(t.xp6(6),t.Q6J("nzSm",6)("nzXs",24),t.xp6(2),t.Q6J("nzSm",14)("nzXs",24),t.xp6(1),t.Q6J("ngModel",a.date),t.xp6(3),t.Q6J("nzSm",6)("nzXs",24),t.xp6(3),t.Q6J("nzSm",14)("nzXs",24),t.xp6(1),t.Q6J("nzAutoFocus",!0)("ngModel",a.selectedCustomer),t.xp6(1),t.Q6J("ngForOf",a.customersData),t.xp6(3),t.Q6J("nzSpan",14)("nzOffset",6),t.xp6(4),t.Q6J("ngIf",a.statement&&0===a.statement.length),t.xp6(1),t.Q6J("ngIf",a.statement&&a.statement.length>0),t.xp6(1),t.Q6J("ngIf",a.statement&&a.statement.length>0),t.xp6(1),t.Q6J("ngIf",a.statement&&a.statement.length>0))},dependencies:[l.sg,l.O5,p.t3,p.SK,s.Nx,s.iK,s.Fd,u.JJ,u.On,f.Ip,f.Vq,z.ix,C.w,Z.dQ,h.uw,h.wS,d.Uo,d._C,d.$Z,l.uU],styles:["h2[_ngcontent-%COMP%]{text-align:center;margin-top:10px}.padding-5[_ngcontent-%COMP%]{padding:5px}.border-line[_ngcontent-%COMP%]{border:1px solid #000}@media print{body[_ngcontent-%COMP%]{width:0;height:0}.date-selection[_ngcontent-%COMP%]{display:none}}.padding-r5[_ngcontent-%COMP%]{padding-right:5px}"]}),e})()}];let D=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[g.Bz.forChild(F),g.Bz]}),e})();var w=i(9912);let $=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[l.ez,D,w.m]}),e})()}}]);