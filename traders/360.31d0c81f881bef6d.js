"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[360],{29360:(Y,z,a)=>{a.r(z),a.d(z,{VegetablesModule:()=>D});var d=a(36895),p=a(64575),r=a(90433),_=a(94327),c=a(80574),e=a(94650),b=a(49651),v=a(32566),x=a(37570),T=a(21102),h=a(73679),m=a(36704),u=a(35635),C=a(66616),S=a(47044),Z=a(21811),g=a(44688),V=a(6497),A=a(21634);function F(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"span",25),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(3);return e.KtG(s.clearfield("notes"))}),e.qZA()}}function N(o,i){if(1&o&&e.YNc(0,F,1,0,"span",24),2&o){const t=e.oxw(2);e.Q6J("ngIf",t.validateForm.controls.notes.value)}}function y(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"form",11),e.NdJ("ngSubmit",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.submitForm())}),e.TgZ(1,"nz-form-item")(2,"nz-form-label",12)(3,"span"),e._uU(4,"Vegetable Name"),e.qZA()(),e.TgZ(5,"nz-form-control",13),e._UZ(6,"input",14),e.qZA()(),e.TgZ(7,"nz-form-item")(8,"nz-form-label",15),e._uU(9,"Notes"),e.qZA(),e.TgZ(10,"nz-form-control",16)(11,"nz-input-group",17),e._UZ(12,"textarea",18),e.qZA(),e.YNc(13,N,1,1,"ng-template",null,19,e.W1O),e.qZA()(),e.TgZ(15,"nz-form-item",20)(16,"nz-form-control",21)(17,"button",22),e._uU(18),e.qZA(),e._uU(19,"\xa0 "),e.TgZ(20,"button",23),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.reset())}),e._uU(21,"Reset"),e.qZA()()()()}if(2&o){const t=e.MAs(14),n=e.oxw();e.Q6J("formGroup",n.validateForm),e.xp6(2),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(3),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24)("nzValidateStatus",n.validateForm.controls.notes),e.xp6(1),e.Q6J("nzSuffix",t),e.xp6(5),e.Q6J("nzSpan",14)("nzOffset",6),e.xp6(1),e.Q6J("disabled",!n.validateForm.valid),e.xp6(1),e.Oqu(n.edit?"Update":"Create")}}function P(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"a",31),e.NdJ("click",function(){e.CHM(t);const s=e.oxw().$implicit,l=e.oxw(2);return e.KtG(l.editVeg(s))}),e._UZ(1,"span",32),e.qZA()}}function J(o,i){if(1&o){const t=e.EpF();e.TgZ(0,"a",33),e.NdJ("nzOnConfirm",function(){e.CHM(t);const s=e.oxw().$implicit,l=e.oxw(2);return e.KtG(l.confirm(s._id))})("nzOnCancel",function(){e.CHM(t);const s=e.oxw(3);return e.KtG(s.cancel())}),e._UZ(1,"span",34),e.qZA()}}function O(o,i){if(1&o&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e.YNc(8,P,2,0,"a",29),e._uU(9,"\xa0\xa0 "),e.YNc(10,J,2,0,"a",30),e.qZA()()),2&o){const t=i.$implicit,n=e.oxw(2);e.xp6(2),e.Oqu(t.number),e.xp6(2),e.Oqu(t.name),e.xp6(2),e.Oqu(t.notes),e.xp6(2),e.Q6J("ngIf","admin"===n.userinfo.username||n.userinfo.apps.vegetable&&n.userinfo.apps.vegetable.isEdit),e.xp6(2),e.Q6J("ngIf","admin"===n.userinfo.username||n.userinfo.apps.vegetable&&n.userinfo.apps.vegetable.isEdit)}}function E(o,i){if(1&o&&(e.TgZ(0,"nz-table",26,27)(2,"thead")(3,"tr")(4,"th"),e._uU(5,"Number"),e.qZA(),e.TgZ(6,"th"),e._uU(7,"Name"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Notes"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Actions"),e.qZA()()(),e.TgZ(12,"tbody"),e.YNc(13,O,11,5,"tr",28),e.qZA()()),2&o){const t=e.oxw();e.Q6J("nzData",t.vegetablesData)("nzLoading",t.loading)("nzShowPagination",!1),e.xp6(13),e.Q6J("ngForOf",t.vegetablesData)}}const M=[{path:"",component:(()=>{class o{constructor(t,n,s,l){this.fb=t,this.message=n,this.mainService=s,this.router=l,this.vegetablesData=[],this.sort=["ascend"],this.listOfColumns=[{name:"Name"},{phoneNumber:"Phone Number"},{address:"Address"},{notes:"Note"}],this.index=1,this.total=0,this.pageSize=10,this.loading=!0,this.edit=!1,this.vegId="",this.userinfo=this.mainService.getLoggedInUser(),this.userinfo||(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login"))}ngOnInit(){this.validateForm=this.fb.group({name:["",[r.kI.required]],notes:[null]}),this.getAllVegetables()}getAllVegetables(){this.vegetablesData=[],this.loading=!0,this.mainService.getVegetables({skip:this.index,limit:this.pageSize}).subscribe(n=>{this.vegetablesData=n.data,this.total=n.total,this.loading=!1,document.getElementById("vegetableName")?.focus()},n=>{console.log("get customers err ",n),this.vegetablesData=[],this.loading=!1})}clearfield(t){this.validateForm.controls[t].reset()}submitForm(){if(this.validateForm.valid){const t={name:this.validateForm.value.name,notes:this.validateForm.value.notes};this.edit?this.mainService.updateVegetable(this.vegId,t).subscribe(n=>{this.message.create("success",`${this.validateForm.value.name} vegetable updated Successfully`),this.validateForm.controls.name.reset(),this.validateForm.controls.notes.reset(),this.loading=!0,this.edit=!1,this.getAllVegetables()},n=>{console.log("get customers err ",n),this.loading=!1,this.getAllVegetables()}):this.mainService.addVegetable(t).subscribe(n=>{this.message.create("success",`${this.validateForm.value.name} vegetable added Successfully`),this.validateForm.controls.name.reset(),this.validateForm.controls.notes.reset(),this.loading=!0,this.getAllVegetables()},n=>{console.log("get customers err ",n),this.loading=!1,this.getAllVegetables()})}else Object.values(this.validateForm.controls).forEach(t=>{t.invalid&&(t.markAsDirty(),t.updateValueAndValidity({onlySelf:!0}))})}reset(){this.validateForm.controls.name.setValue(null),this.validateForm.controls.name.updateValueAndValidity(),this.validateForm.controls.notes.reset()}exportJsonAsExcelFile(t,n){const l={Sheets:{data:c.P6.json_to_sheet(t)},SheetNames:["data"]},f=c.cW(l,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(f,n)}exportTableAsExcelFile(t,n){const l={Sheets:{data:c.P6.table_to_sheet(t)},SheetNames:["data"]},f=c.cW(l,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(f,n)}saveAsExcelFile(t,n){const s=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});_.saveAs(s,n+(new Date).getTime()+".xlsx")}exportToPDF(){let t=[];this.vegetablesData.forEach(n=>{t.push({Number:n.number,Name:n.name,Notes:n.notes})}),this.exportJsonAsExcelFile(t,"vegetables")}confirm(t){this.mainService.removeVegetable(t).subscribe(n=>{this.loading=!1,n&&n.success&&(this.message.create("success",n.message),this.getAllVegetables())},n=>{console.log("get customers err ",n),this.loading=!1})}cancel(){}editVeg(t){this.edit=!0,this.vegId=t._id,this.validateForm.controls.name.setValue(t.name),this.validateForm.controls.notes.setValue(t.notes)}onPageSizeChange(t){this.pageSize=t,this.getAllVegetables()}onPageChange(t){this.index=t,this.getAllVegetables()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(r.QS),e.Y36(b.dD),e.Y36(v.J),e.Y36(p.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-vegetables"]],decls:17,vars:6,consts:[[1,"customer-form"],["nz-row",""],["nz-col","","nzSpan","24"],[1,"text-center"],["nz-col","","nzSpan","12"],["nz-form","",3,"formGroup","ngSubmit",4,"ngIf"],["nz-tooltip","","nzTooltipTitle","Export as Excel",3,"click"],["nz-icon","","nzType","file-excel","nzTheme","fill"],[3,"nzData","nzLoading","nzShowPagination",4,"ngIf"],[1,"text-right"],[3,"nzPageIndex","nzTotal","nzShowSizeChanger","nzPageSize","nzPageIndexChange","nzPageSizeChange"],["nz-form","",3,"formGroup","ngSubmit"],["nzFor","vegetableName","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Please input your name!",3,"nzSm","nzXs"],["nz-input","","id","vegetableName","formControlName","name","placeholder","Name","autocomplete","off"],["nzFor","notes",3,"nzSm","nzXs"],["nzErrorTip","Please input your notes!",3,"nzSm","nzXs","nzValidateStatus"],[1,"ant-input-affix-wrapper-textarea-with-clear-btn",3,"nzSuffix"],["nz-input","","formControlName","notes","placeholder","Notes"],["textAreaClearNotes",""],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary",3,"disabled"],["nz-button","","nzType","default",3,"click"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle",3,"click",4,"ngIf"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],[3,"nzData","nzLoading","nzShowPagination"],["basicTable",""],[4,"ngFor","ngForOf"],[3,"click",4,"ngIf"],["nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this Vegetable","nzPopconfirmPlacement","bottom",3,"nzOnConfirm","nzOnCancel",4,"ngIf"],[3,"click"],["nz-icon","","nzType","edit","nzTheme","fill"],["nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this Vegetable","nzPopconfirmPlacement","bottom",3,"nzOnConfirm","nzOnCancel"],["nz-icon","","nzType","delete","nzTheme","fill"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Vegetables"),e.qZA()()(),e.TgZ(5,"div",1)(6,"div",4),e.YNc(7,y,22,15,"form",5),e.qZA(),e.TgZ(8,"div",4)(9,"div")(10,"a",6),e.NdJ("click",function(){return n.exportToPDF()}),e._UZ(11,"span",7),e.qZA()(),e.YNc(12,E,14,4,"nz-table",8),e.TgZ(13,"div",9),e._UZ(14,"br"),e.TgZ(15,"nz-pagination",10),e.NdJ("nzPageIndexChange",function(l){return n.onPageChange(l)})("nzPageSizeChange",function(l){return n.onPageSizeChange(l)}),e.qZA(),e._UZ(16,"br"),e.qZA()()()()),2&t&&(e.xp6(7),e.Q6J("ngIf","admin"===n.userinfo.username||n.userinfo.apps.vegetable&&n.userinfo.apps.vegetable.isEdit),e.xp6(5),e.Q6J("ngIf",n.vegetablesData),e.xp6(3),e.Q6J("nzPageIndex",n.index)("nzTotal",n.total)("nzShowSizeChanger",!0)("nzPageSize",n.pageSize))},dependencies:[d.sg,d.O5,x.SY,T.Ls,h.t3,h.SK,m.Lr,m.Nx,m.iK,m.Fd,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,u.Zp,u.gB,u.ke,C.ix,S.w,Z.dQ,g.N8,g.Uo,g._C,g.Om,g.p0,g.$Z,V.JW,A.dE],styles:["[nz-form][_ngcontent-%COMP%]{max-width:600px}.phone-select[_ngcontent-%COMP%]{width:70px}.register-are[_ngcontent-%COMP%]{margin-bottom:8px}.customer-form[_ngcontent-%COMP%]{margin-top:20px}.text-center[_ngcontent-%COMP%]{text-align:center!important}.text-right[_ngcontent-%COMP%]{text-align:right!important}"]}),o})()}];let w=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.Bz.forChild(M),p.Bz]}),o})();var Q=a(4973);let D=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.ez,w,Q.m]}),o})()}}]);