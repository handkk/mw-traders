"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[956],{73956:(I,C,i)=>{i.r(C),i.d(C,{CustomerCollectionModule:()=>Q});var c=i(36895),d=i(64575),l=i(90433),p=i(15439),e=i(94650),v=i(49651),S=i(32566),Z=i(21102),h=i(73679),u=i(36704),g=i(35635),f=i(38231),T=i(66616),x=i(47044),A=i(21811),b=i(37096),M=i(5259),m=i(44688),O=i(6497),y=i(21634);function F(s,r){if(1&s&&e._UZ(0,"nz-option",30),2&s){const n=r.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function J(s,r){if(1&s){const n=e.EpF();e.TgZ(0,"span",32),e.NdJ("click",function(){e.CHM(n);const o=e.oxw(2);return e.KtG(o.clearfield("notes"))}),e.qZA()}}function U(s,r){if(1&s&&e.YNc(0,J,1,0,"span",31),2&s){const n=e.oxw();e.Q6J("ngIf",n.validateForm.controls.notes.value)}}function P(s,r){if(1&s){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.ALo(9,"number"),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td")(13,"a",33),e.NdJ("nzOnConfirm",function(){const a=e.CHM(n).$implicit,z=e.oxw();return e.KtG(z.deleteConfirm(a._id))})("nzOnCancel",function(){e.CHM(n);const o=e.oxw();return e.KtG(o.cancel())}),e._UZ(14,"span",34),e.qZA()()()}if(2&s){const n=r.$implicit,t=r.index,o=e.oxw();e.xp6(2),e.Oqu(o.collectionsData.length-t),e.xp6(2),e.Oqu(n.collection_date),e.xp6(2),e.Oqu(n.customer_name),e.xp6(2),e.Oqu(e.xi3(9,5,n.amount,"1.2-2")),e.xp6(3),e.Oqu(n.notes)}}const D=[{path:"",component:(()=>{class s{constructor(n,t,o,a,z){this.fb=n,this.el=t,this.message=o,this.mainService=a,this.router=z,this.customers=[{name:"Srinivas",id:"c1"},{name:"Sai",id:"c2"},{name:"Raju",id:"c3"},{name:"Chandu",id:"c4"}],this.vegetablesList=[{name:"Cabage",id:"v1"},{name:"Onion",id:"v2"},{name:"Potato",id:"v3"},{name:"Tomato",id:"v4"}],this.farmersList=[{name:"Teja",id:"f1"},{name:"Ravi",id:"f2"},{name:"Venkatesh",id:"f3"},{name:"Sai",id:"f4"}],this.date=new Date,this.defaultDate=new Date,this.collectionsData=[],this.sort=["ascend"],this.listOfColumns=[{name:"Name",sortOrder:"ascend"},{item:"Item",sortOrder:null},{rate:"Rate",sortOrder:null},{quantity:"quantity",sortOrder:null}],this.index=1,this.total=0,this.pageSize=10,this.loading=!1,this.selectedCustomer=null,this.total_amount=0,this.dateFormat="dd-MM-yyyy",this.dateDisable=!1;let _=JSON.parse(sessionStorage.getItem("userinfo")||"");_||(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login")),"admin"!==_.username&&(this.dateDisable=!0)}ngOnInit(){this.validateForm=this.fb.group({customer:[null,[l.kI.required]],amount:[null,[l.kI.required]],date:[this.date,[l.kI.required]],notes:[null]}),this.getCustomers(),this.getCollections()}getCollections(){const t={skip:this.index,limit:this.pageSize,collection_date:p(new Date).format("DD-MM-YYYY")};setTimeout(()=>{document.getElementById("collectionCustomerInput")?.children[0].children[0]?.children[0].setAttribute("id","collectionCustIn"),document.getElementById("collectionCustIn")?.focus()},500),this.loading=!0,this.mainService.getCollections(t).subscribe(o=>{this.collectionsData=o.data,this.total=o.total,this.loading=!1},o=>{this.collectionsData=[],this.loading=!1,o&&o.error&&!o.error.success&&1e3===o.error.code&&(this.message.create("error",o.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}getCustomers(){this.mainService.getCustomers({}).subscribe(t=>{this.customers=t.data},t=>{console.log("get customers err ",t),this.customers=[]})}clearfield(n){this.validateForm.controls[n].reset()}submitForm(){if(this.validateForm.valid){const n=p(this.validateForm.value.date).format("DD-MM-YYYY");this.mainService.createCollection({customer_name:this.validateForm.value.customer.name,customer_id:this.validateForm.value.customer._id,notes:this.validateForm.value.notes,amount:this.validateForm.value.amount,collection_date:n}).subscribe(o=>{this.message.create("success","Collection added Successfully"),this.reset(),this.loading=!0,this.selectedCustomer=null,this.getCollections(),setTimeout(()=>{this.getCustomers()},200)},o=>{this.loading=!1,o&&o.error?!o.error.success&&1e3===o.error.code&&(this.message.create("error",o.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login")):this.getCollections()})}else Object.values(this.validateForm.controls).forEach(n=>{n.invalid&&(n.markAsDirty(),n.updateValueAndValidity({onlySelf:!0}))})}reset(){this.validateForm.controls.amount.reset(),this.validateForm.controls.notes.reset()}onChange(n){}deleteConfirm(n){this.loading=!0,this.mainService.removeCollection(n).subscribe(t=>{this.loading=!1,t&&t.success&&(this.message.create("success",t.message),this.getCollections())},t=>{t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login")),this.loading=!1})}cancel(){}onPageSizeChange(n){this.pageSize=n,this.getCollections()}onPageChange(n){this.index=n,this.getCollections()}customerSelected(n){this.selectedCustomer=n}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(l.QS),e.Y36(e.SBq),e.Y36(v.dD),e.Y36(S.J),e.Y36(d.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-customer-collection"]],decls:66,vars:41,consts:[[1,"customer-form"],["nz-row",""],["nz-col","","nzSpan","24"],[1,"text-center"],["nz-col","","nzSpan","12"],["nz-form","","appFocus","",3,"formGroup","ngSubmit"],["nzRequired","",3,"nzSm","nzXs"],[3,"nzSm","nzXs"],["formControlName","date",3,"ngModel","nzAllowClear","nzFormat","nzDisabled","ngModelChange"],[3,"nzSm","nzXs","nzExtra"],["nzShowSearch","","nzAllowClear","","formControlName","customer","id","collectionCustomerInput",3,"ngModel","ngModelChange"],["nzLabel","Select Customer","nzValue",""],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["nzFor","amountCollection","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Add amount!",3,"nzSm","nzXs"],["id","amountCollection","formControlName","amount",3,"nzMin","nzStep"],["nzFor","notes",3,"nzSm","nzXs"],["nzErrorTip","Please input your notes!",3,"nzSm","nzXs","nzValidateStatus"],[1,"ant-input-affix-wrapper-textarea-with-clear-btn",3,"nzSuffix"],["nz-input","","formControlName","notes","placeholder","Notes"],["textAreaClearNotes",""],["nz-row","",1,"register-area"],[3,"nzSpan","nzOffset"],["nz-button","","nzType","primary"],["nz-button","","nzType","default",3,"click"],[3,"nzData","nzLoading","nzShowPagination"],["basicTable",""],[4,"ngFor","ngForOf"],[1,"text-right"],[3,"nzPageIndex","nzTotal","nzShowSizeChanger","nzPageSize","nzPageIndexChange","nzPageSizeChange"],[3,"nzLabel","nzValue"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle",3,"click",4,"ngIf"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this Collection","nzPopconfirmPlacement","bottom",3,"nzOnConfirm","nzOnCancel"],["nz-icon","","nzType","delete","nzTheme","fill"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Customer Collections"),e.qZA()()(),e.TgZ(5,"div",1)(6,"div",4)(7,"form",5),e.NdJ("ngSubmit",function(){return t.submitForm()}),e.TgZ(8,"nz-form-item")(9,"nz-form-label",6),e._uU(10,"Date"),e.qZA(),e.TgZ(11,"nz-form-control",7)(12,"nz-date-picker",8),e.NdJ("ngModelChange",function(a){return t.date=a})("ngModelChange",function(a){return t.onChange(a)}),e.qZA()()(),e.TgZ(13,"nz-form-item")(14,"nz-form-label",6)(15,"span"),e._uU(16,"Customer"),e.qZA()(),e.TgZ(17,"nz-form-control",9),e.ALo(18,"number"),e.TgZ(19,"nz-select",10),e.NdJ("ngModelChange",function(a){return t.customerSelected(a)})("ngModelChange",function(a){return t.selectedCustomer=a}),e._UZ(20,"nz-option",11),e.YNc(21,F,1,2,"nz-option",12),e.qZA()()(),e.TgZ(22,"nz-form-item")(23,"nz-form-label",13)(24,"span"),e._uU(25,"Amount"),e.qZA()(),e.TgZ(26,"nz-form-control",14),e._UZ(27,"nz-input-number",15),e.qZA()(),e.TgZ(28,"nz-form-item")(29,"nz-form-label",16),e._uU(30,"Notes"),e.qZA(),e.TgZ(31,"nz-form-control",17)(32,"nz-input-group",18),e._UZ(33,"textarea",19),e.qZA(),e.YNc(34,U,1,1,"ng-template",null,20,e.W1O),e.qZA()(),e.TgZ(36,"nz-form-item",21)(37,"nz-form-control",22)(38,"button",23),e._uU(39,"Create"),e.qZA(),e._uU(40,"\xa0 "),e.TgZ(41,"button",24),e.NdJ("click",function(){return t.reset()}),e._uU(42,"Reset"),e.qZA()()()()(),e.TgZ(43,"div",4)(44,"nz-table",25,26)(46,"thead")(47,"tr")(48,"th"),e._uU(49,"S.No."),e.qZA(),e.TgZ(50,"th"),e._uU(51,"Date"),e.qZA(),e.TgZ(52,"th"),e._uU(53,"Customer Name"),e.qZA(),e.TgZ(54,"th"),e._uU(55,"Amount"),e.qZA(),e.TgZ(56,"th"),e._uU(57,"Notes"),e.qZA(),e.TgZ(58,"th"),e._uU(59,"Actions"),e.qZA()()(),e.TgZ(60,"tbody"),e.YNc(61,P,15,8,"tr",27),e.qZA()(),e.TgZ(62,"div",28),e._UZ(63,"br"),e.TgZ(64,"nz-pagination",29),e.NdJ("nzPageIndexChange",function(a){return t.onPageChange(a)})("nzPageSizeChange",function(a){return t.onPageSizeChange(a)}),e.qZA(),e._UZ(65,"br"),e.qZA()()()()),2&n){const o=e.MAs(35);e.xp6(7),e.Q6J("formGroup",t.validateForm),e.xp6(2),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("ngModel",t.date)("nzAllowClear",!1)("nzFormat",t.dateFormat)("nzDisabled",t.dateDisable),e.xp6(2),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.s9C("nzExtra",t.selectedCustomer?"Balance amount: "+e.xi3(18,38,(null==t.selectedCustomer?null:t.selectedCustomer.balance_amount)+(null==t.selectedCustomer?null:t.selectedCustomer.last_amount_updated),"1.2-2"):""),e.Q6J("nzSm",14)("nzXs",24),e.xp6(2),e.Q6J("ngModel",t.selectedCustomer),e.xp6(2),e.Q6J("ngForOf",t.customers),e.xp6(2),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzMin",1)("nzStep",1),e.xp6(2),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24)("nzValidateStatus",t.validateForm.controls.notes),e.xp6(1),e.Q6J("nzSuffix",o),e.xp6(5),e.Q6J("nzSpan",14)("nzOffset",6),e.xp6(7),e.Q6J("nzData",t.collectionsData)("nzLoading",t.loading)("nzShowPagination",!1),e.xp6(17),e.Q6J("ngForOf",t.collectionsData),e.xp6(3),e.Q6J("nzPageIndex",t.index)("nzTotal",t.total)("nzShowSizeChanger",!0)("nzPageSize",t.pageSize)}},dependencies:[c.sg,c.O5,Z.Ls,h.t3,h.SK,u.Lr,u.Nx,u.iK,u.Fd,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,g.Zp,g.gB,g.ke,f.Ip,f.Vq,T.ix,x.w,A.dQ,b._V,M.uw,m.N8,m.Uo,m._C,m.Om,m.p0,m.$Z,O.JW,y.dE,c.JJ],styles:["[nz-form][_ngcontent-%COMP%]{max-width:600px}.phone-select[_ngcontent-%COMP%]{width:70px}.register-are[_ngcontent-%COMP%]{margin-bottom:8px}.customer-form[_ngcontent-%COMP%]{margin-top:20px}nz-date-picker[_ngcontent-%COMP%]{margin:0 8px 12px 0}input[type=number][_ngcontent-%COMP%]{border:1px solid #d9d9d9!important}input[type=number][_ngcontent-%COMP%]:focus{border:1px solid #40a9ff!important}.text-center[_ngcontent-%COMP%]{text-align:center!important}.text-right[_ngcontent-%COMP%]{text-align:right!important}  .ant-select-item-option-selected:not(.ant-select-item-option-disabled){background-color:green;color:#fff}  .ant-select-item-option-active:not(.ant-select-item-option-disabled){background-color:green;color:#fff}"]}),s})()}];let N=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[d.Bz.forChild(D),d.Bz]}),s})();var q=i(4973);let Q=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[c.ez,N,q.m]}),s})()}}]);