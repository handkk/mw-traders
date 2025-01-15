"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[620],{88620:(G,u,o)=>{o.r(u),o.d(u,{DayCollectionsModule:()=>Y});var d=o(36895),h=o(64575),r=o(90433),y=o(15439),z=o(96166),_=o(4159),v=o.n(_),n=o(94650),Z=o(49651),x=o(32566),T=o(21102),f=o(73679),c=o(36704),M=o(66616),O=o(47044),P=o(21811),B=o(5259),p=o(44688),D=o(21634);const S=["dayBillTable"];function A(e,a){if(1&e){const t=n.EpF();n.TgZ(0,"a",22),n.NdJ("click",function(){n.CHM(t);const l=n.oxw();return n.KtG(l.downloadPDF())}),n._UZ(1,"span",23),n.qZA()}}function b(e,a){if(1&e){const t=n.EpF();n.TgZ(0,"a",24),n.NdJ("click",function(){n.CHM(t);const l=n.oxw();return n.KtG(l.printTable())}),n._UZ(1,"span",25),n.qZA()}}function L(e,a){if(1&e&&(n.TgZ(0,"tr",31)(1,"td"),n._uU(2),n.qZA(),n.TgZ(3,"td"),n._uU(4),n.ALo(5,"number"),n.qZA(),n.TgZ(6,"td"),n._uU(7),n.ALo(8,"number"),n.qZA(),n._UZ(9,"td",32),n.qZA()),2&e){const t=a.$implicit;n.xp6(2),n.Oqu(t.name),n.xp6(2),n.Oqu(n.xi3(5,3,t.bill_amount,"1.2-2")),n.xp6(3),n.Oqu(n.xi3(8,6,t.balance_amount,"1.2-2"))}}function U(e,a){if(1&e&&(n.TgZ(0,"table",30)(1,"tr",31)(2,"th"),n._uU(3,"Customer Name"),n.qZA(),n.TgZ(4,"th"),n._uU(5,"Today Bill"),n.qZA(),n.TgZ(6,"th"),n._uU(7,"Balance"),n.qZA(),n.TgZ(8,"th",32),n._uU(9,"Paid"),n.qZA()(),n.YNc(10,L,10,9,"tr",33),n.qZA()),2&e){const t=n.oxw(2);n.xp6(10),n.Q6J("ngForOf",t.dayBillsList1)}}function J(e,a){if(1&e&&(n.TgZ(0,"tr",31)(1,"td"),n._uU(2),n.qZA(),n.TgZ(3,"td"),n._uU(4),n.qZA(),n.TgZ(5,"td"),n._uU(6),n.qZA(),n._UZ(7,"td",32),n.qZA()),2&e){const t=a.$implicit;n.xp6(2),n.Oqu(t.name),n.xp6(2),n.Oqu(t.bill_amount),n.xp6(2),n.Oqu(t.balance_amount)}}function F(e,a){if(1&e&&(n.TgZ(0,"div",27)(1,"table",30)(2,"tr",31)(3,"th"),n._uU(4,"Customer Name"),n.qZA(),n.TgZ(5,"th"),n._uU(6,"Today Bill"),n.qZA(),n.TgZ(7,"th"),n._uU(8,"Balance"),n.qZA(),n.TgZ(9,"th",32),n._uU(10,"Paid"),n.qZA()(),n.YNc(11,J,8,3,"tr",33),n.qZA()()),2&e){const t=n.oxw(2);n.xp6(11),n.Q6J("ngForOf",t.dayBillsList2)}}function q(e,a){if(1&e&&(n.TgZ(0,"div",26)(1,"div",27),n.YNc(2,U,11,1,"table",28),n.qZA(),n.YNc(3,F,12,1,"div",29),n.qZA()),2&e){const t=n.oxw();n.Q6J("nzGutter",16),n.xp6(2),n.Q6J("ngIf",t.dayBillsList1&&t.dayBillsList1.length>0),n.xp6(1),n.Q6J("ngIf",t.dayBillsList2&&t.dayBillsList2.length>0)}}function I(e,a){1&e&&(n.TgZ(0,"h3",3),n._uU(1,"No Bills"),n.qZA())}const N=[{path:"",component:(()=>{class e{constructor(t,i,l,s,g){this.fb=t,this.el=i,this.message=l,this.mainService=s,this.router=g,this.customers=[],this.vegetablesList=[],this.farmersList=[],this.date=new Date,this.defaultDate=new Date,this.collectionsData=[],this.sort=["ascend"],this.listOfColumns=[{name:"Name",sortOrder:"ascend"},{item:"Item",sortOrder:null},{rate:"Rate",sortOrder:null},{quantity:"quantity",sortOrder:null}],this.index=1,this.total=0,this.pageSize=10,this.loading=!1,this.dayBillsList=[],this.dayBillsList1=[],this.dayBillsList2=[],sessionStorage.getItem("userinfo")||(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login"))}ngOnInit(){this.dayCollectionForm=this.fb.group({customer:[null],date:[this.date,[r.kI.required]]})}downloadPDF(){v()(this.dayBillTable.nativeElement,{}).then(t=>{const i=t.toDataURL("image/png"),g=208*t.height/t.width,C=new z.default("p","mm","a4");C.addImage(i,"PNG",0,0,208,g),C.save("today_bills.pdf")})}clearfield(t){this.dayCollectionForm.controls[t].reset()}submitForm(){if(this.dayCollectionForm.valid){let i={skip:0,limit:1e3,bill_date:y(this.dayCollectionForm.value.date).format("DD-MM-YYYY")};this.mainService.spinning.emit(!0),this.mainService.getDayBills(i).subscribe(l=>{if(this.dayBillsList=[],this.mainService.spinning.emit(!1),l&&l.length>0)if(this.dayBillsList=l,this.dayBillsList.length<=28)this.dayBillsList1=this.dayBillsList;else if(this.dayBillsList.length>28){let s=this.dayBillsList,g=s.slice(0,28);console.log("first: ",g);let m=s.slice(28);console.log("second: ",m),this.dayBillsList1=g,this.dayBillsList2=m}},l=>{console.log("get customers err ",l),this.loading=!1,this.mainService.spinning.emit(!1)})}else Object.values(this.dayCollectionForm.controls).forEach(t=>{t.invalid&&(t.markAsDirty(),t.updateValueAndValidity({onlySelf:!0}))})}reset(){this.dayCollectionForm.controls.amount.reset(),this.dayCollectionForm.controls.notes.reset()}onChange(t){}deleteConfirm(t){this.loading=!0,this.mainService.removeCollection(t).subscribe(i=>{this.loading=!1,i&&i.success&&this.message.create("success",i.message)},i=>{console.log("get customers err ",i),this.loading=!1})}cancel(){}onPageSizeChange(t){this.pageSize=t}onPageChange(t){this.index=t}printTable(){window.print()}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(r.QS),n.Y36(n.SBq),n.Y36(Z.dD),n.Y36(x.J),n.Y36(h.F0))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-day-collections"]],viewQuery:function(t,i){if(1&t&&n.Gf(S,5),2&t){let l;n.iGM(l=n.CRH())&&(i.dayBillTable=l.first)}},decls:33,vars:17,consts:[[1,"customer-form"],["nz-row","",1,"page-header1"],["nz-col","","nzSpan","24"],[1,"text-center"],["nz-row","",1,"page-header2"],["nz-form","","appFocus","",3,"formGroup","ngSubmit"],["nz-row",""],["nz-col","","nzSpan","8"],["nzRequired","",3,"nzSm","nzXs"],[3,"nzSm","nzXs"],["formControlName","date",3,"ngModel","nzAllowClear","ngModelChange"],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary"],["class","align-right margin-right25",3,"click",4,"ngIf"],["class","align-right margin-right10",3,"click",4,"ngIf"],[1,"print-container"],["dayBillTable",""],["nz-row","",3,"nzGutter",4,"ngIf"],["class","text-center",4,"ngIf"],[1,"text-right"],[3,"nzPageIndex","nzTotal","nzShowSizeChanger","nzPageSize","nzPageIndexChange","nzPageSizeChange"],[1,"align-right","margin-right25",3,"click"],["nz-icon","","nzType","file-pdf","nzTheme","fill"],[1,"align-right","margin-right10",3,"click"],["nz-icon","","nzType","printer","nzTheme","fill"],["nz-row","",3,"nzGutter"],["nz-col","","nzSpan","12"],["style","width: 100%;",4,"ngIf"],["nz-col","","nzSpan","12",4,"ngIf"],[2,"width","100%"],[2,"text-align","left"],[2,"width","100px"],["style","text-align: left;",4,"ngFor","ngForOf"]],template:function(t,i){1&t&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),n._uU(4,"Day-wise Bills"),n.qZA()()(),n.TgZ(5,"div",4)(6,"div",2)(7,"form",5),n.NdJ("ngSubmit",function(){return i.submitForm()}),n.TgZ(8,"div",6)(9,"div",7)(10,"nz-form-item")(11,"nz-form-label",8),n._uU(12,"Date"),n.qZA(),n.TgZ(13,"nz-form-control",9)(14,"nz-date-picker",10),n.NdJ("ngModelChange",function(s){return i.date=s})("ngModelChange",function(s){return i.onChange(s)}),n.qZA()()()(),n.TgZ(15,"div",7)(16,"nz-form-item",11)(17,"nz-form-control",12)(18,"button",13),n._uU(19,"Submit"),n.qZA(),n._uU(20,"\xa0 "),n.qZA()()()()()()(),n.TgZ(21,"div",6)(22,"div",2),n.YNc(23,A,2,0,"a",14),n.YNc(24,b,2,0,"a",15),n.TgZ(25,"div",16,17),n.YNc(27,q,4,3,"div",18),n.YNc(28,I,2,0,"h3",19),n.qZA(),n.TgZ(29,"div",20),n._UZ(30,"br"),n.TgZ(31,"nz-pagination",21),n.NdJ("nzPageIndexChange",function(s){return i.onPageChange(s)})("nzPageSizeChange",function(s){return i.onPageSizeChange(s)}),n.qZA(),n._UZ(32,"br"),n.qZA()()()()),2&t&&(n.xp6(7),n.Q6J("formGroup",i.dayCollectionForm),n.xp6(4),n.Q6J("nzSm",6)("nzXs",24),n.xp6(2),n.Q6J("nzSm",14)("nzXs",24),n.xp6(1),n.Q6J("ngModel",i.date)("nzAllowClear",!1),n.xp6(3),n.Q6J("nzSpan",14)("nzOffset",6),n.xp6(6),n.Q6J("ngIf",i.dayBillsList&&i.dayBillsList.length>0),n.xp6(1),n.Q6J("ngIf",i.dayBillsList&&i.dayBillsList.length>0),n.xp6(3),n.Q6J("ngIf",i.dayBillsList&&i.dayBillsList.length>0),n.xp6(1),n.Q6J("ngIf",i.dayBillsList&&0===i.dayBillsList.length),n.xp6(3),n.Q6J("nzPageIndex",i.index)("nzTotal",i.total)("nzShowSizeChanger",!0)("nzPageSize",i.pageSize))},dependencies:[d.sg,d.O5,T.Ls,f.t3,f.SK,c.Lr,c.Nx,c.iK,c.Fd,r._Y,r.JJ,r.JL,r.sg,r.u,M.ix,O.w,P.dQ,B.uw,p.Uo,p._C,p.$Z,D.dE,d.JJ],styles:[".margin-right10[_ngcontent-%COMP%]{margin-right:10px}.margin-right20[_ngcontent-%COMP%]{margin-right:20px}.margin-right25[_ngcontent-%COMP%]{margin-right:25px}.phone-select[_ngcontent-%COMP%]{width:70px}.register-are[_ngcontent-%COMP%]{margin-bottom:8px}.customer-form[_ngcontent-%COMP%]{margin-top:20px}nz-date-picker[_ngcontent-%COMP%]{margin:0 8px 12px 0}input[type=number][_ngcontent-%COMP%]{border:1px solid #d9d9d9!important}input[type=number][_ngcontent-%COMP%]:focus{border:1px solid #40a9ff!important}.text-center[_ngcontent-%COMP%]{text-align:center!important}.text-right[_ngcontent-%COMP%]{text-align:right!important}.print-container[_ngcontent-%COMP%]{padding:25px}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid #000;padding:5px;background-color:#d3d3d3;font-size:12px}td[_ngcontent-%COMP%]{border:1px solid #000;padding:5px;font-size:12px}.align-right[_ngcontent-%COMP%]{float:right}@page{size:A4;margin:5mm 5mm 5mm -8mm}@media print{body[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{visibility:hidden;width:0;height:0}.print-container[_ngcontent-%COMP%], .print-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{visibility:visible}.page-header1[_ngcontent-%COMP%], .page-header2[_ngcontent-%COMP%], button[_ngcontent-%COMP%], .ant-menu[_ngcontent-%COMP%], a[_ngcontent-%COMP%]{display:none}}"]}),e})()}];let Q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[h.Bz.forChild(N),h.Bz]}),e})();var w=o(4973);let Y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.ez,Q,w.m]}),e})()}}]);