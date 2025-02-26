"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[595],{31595:(P,z,o)=>{o.r(z),o.d(z,{BillModule:()=>I});var u=o(36895),g=o(64575),l=o(90433),f=o(15439),e=o(94650),S=o(49651),b=o(32566),Z=o(31883),C=o(37570),T=o(21102),p=o(73679),d=o(36704),h=o(35635),v=o(38231),A=o(66616),y=o(47044),B=o(21811),F=o(37096),x=o(5259),c=o(44688),q=o(6497),U=o(21243);function J(s,a){if(1&s&&e._UZ(0,"nz-option",37),2&s){const n=a.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function M(s,a){if(1&s&&e._UZ(0,"nz-option",37),2&s){const n=a.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function O(s,a){if(1&s&&e._UZ(0,"nz-option",37),2&s){const n=a.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function Q(s,a){if(1&s){const n=e.EpF();e.TgZ(0,"span",39),e.NdJ("click",function(){e.CHM(n);const i=e.oxw(2);return e.KtG(i.clearfield("notes"))}),e.qZA()}}function D(s,a){if(1&s&&e.YNc(0,Q,1,0,"span",38),2&s){const n=e.oxw();e.Q6J("ngIf",n.validateForm.controls.notes.value)}}function V(s,a){if(1&s&&(e.TgZ(0,"p",40)(1,"strong"),e._uU(2,"Total Quantity:"),e.qZA(),e._uU(3),e.TgZ(4,"strong"),e._uU(5,"Total Amount:"),e.qZA(),e._uU(6),e.ALo(7,"number"),e.qZA()),2&s){const n=e.oxw();e.xp6(3),e.hij(" ",n.total_quantity," \xa0\xa0 "),e.xp6(3),e.hij(" ",e.xi3(7,2,n.total_amount,"1.2-2")," \xa0\xa0\xa0")}}function N(s,a){if(1&s){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.ALo(11,"number"),e.qZA(),e.TgZ(12,"td"),e._uU(13),e.ALo(14,"number"),e.qZA(),e.TgZ(15,"td")(16,"a",41),e.NdJ("nzOnConfirm",function(){const r=e.CHM(n).$implicit,m=e.oxw();return e.KtG(m.deleteConfirm(r._id))})("nzOnCancel",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancel())}),e._UZ(17,"span",42),e.qZA()()()}if(2&s){const n=a.$implicit,t=a.index,i=e.oxw();e.xp6(2),e.Oqu(i.billsData.length-t),e.xp6(2),e.Oqu(n.customer_name),e.xp6(2),e.Oqu(n.vegetable_name),e.xp6(2),e.Oqu(n.quantity),e.xp6(2),e.Oqu(e.xi3(11,6,n.rate,"1.2-2")),e.xp6(3),e.Oqu(e.xi3(14,9,n.total_amount,"1.2-2"))}}const w=function(){return{standalone:!0}},X=[{path:"",component:(()=>{class s{constructor(n,t,i,r,m,Y){this.fb=n,this.el=t,this.message=i,this.mainService=r,this.farmerService=m,this.router=Y,this.customers=[],this.vegetablesList=[],this.farmersList=[],this.date=new Date,this.defaultDate=new Date,this.billsData=[],this.sort=["ascend"],this.listOfColumns=[{name:"Name",sortOrder:"ascend"},{item:"Item",sortOrder:null},{rate:"Rate",sortOrder:null},{quantity:"quantity",sortOrder:null}],this.index=1,this.total=0,this.pageSize=20,this.loading=!0,this.edit=!1,this.switchValue=!1,this.dateDisable=!1,this.dateFormat="dd-MM-yyyy",this.total_quantity=0,this.total_amount=0,this.userinfo=this.mainService.getLoggedInUser(),this.userinfo?"admin"!==this.userinfo.username&&((this.userinfo?.apps?.bill?.isView||this.userinfo?.apps?.bill?.isEdit)&&this.userinfo?.apps?.bill?.isView||this.router.navigateByUrl("/main")):(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login"))}ngAfterViewInit(){}ngOnInit(){this.validateForm=this.fb.group({customer:[null,[l.kI.required]],quantity:[null,[l.kI.required]],rate:[null,[l.kI.required]],vegetables:[null,[l.kI.required]],farmer:[null,[l.kI.required]],date:[this.date,[l.kI.required]],notes:[null]}),this.total=this.billsData.length;const n=sessionStorage.getItem("userinfo");"admin"!==JSON.parse(n).username&&(this.dateDisable=!0),this.getCustomers(),this.getAllFarmers(),this.getAllVegetables(),this.getBills(),this.switchValue=!1,setTimeout(()=>{document.getElementById("customerSelection")?.children[0].children[0]?.children[0].setAttribute("id","customerselect"),document.getElementById("customerselect")?.focus()},500)}clearfield(n){this.validateForm.controls[n].reset()}getBills(){this.total_amount=0,this.total_quantity=0;const t={bill_date:f(new Date).format("DD-MM-YYYY")};this.mainService.spinning.emit(!0),this.loading=!0,this.mainService.getBills(t).subscribe(i=>{this.billsData=i.data,this.total=i.total,this.mainService.spinning.emit(!1),this.loading=!1,this.billsData.forEach(m=>{this.total_quantity=this.total_quantity+m.quantity,this.total_amount=this.total_amount+m.total_amount})},i=>{console.log("get customers err ",i),this.billsData=[],this.mainService.spinning.emit(!1),this.loading=!1,i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}removeDuplicates(n,t){return[...new Map(n.map(i=>[t(i),i])).values()]}getCustomers(){this.mainService.getCustomers({}).subscribe(t=>{this.customers=t.data},t=>{console.log("get customers err ",t),this.customers=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}getAllFarmers(){this.farmerService.getFarmers({}).subscribe(t=>{this.farmersList=t.data},t=>{console.log("get farmers err ",t),this.farmersList=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}getAllVegetables(){this.mainService.getVegetables({}).subscribe(t=>{this.vegetablesList=t.data},t=>{console.log("get customers err ",t),this.vegetablesList=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}clickSwitch(){this.switchValue=!this.switchValue}submitForm(){if(this.validateForm.valid){const n=f(this.validateForm.value.date).format("DD-MM-YYYY"),t={bill_date:this.edit?this.bill_data.bill_date:n,customer_name:this.validateForm.value.customer.name,customer_id:this.validateForm.value.customer._id,vegetable_name:this.validateForm.value.vegetables.name,vegetable_id:this.validateForm.value.vegetables._id,rate:this.validateForm.value.rate,quantity:this.validateForm.value.quantity,farmer_name:this.validateForm.value.farmer.name,farmer_id:this.validateForm.value.farmer._id,unit_wise:this.switchValue,notes:this.validateForm.value.notes,customer_balance_amount:this.validateForm.value.customer.balance_amount};this.mainService.spinning.emit(!0),this.edit?(t.isCustEdited=this.bill_data.customer_id!=this.validateForm.value.customer._id,t.oldCustId=this.bill_data.customer_id,this.mainService.updateBill(this.bill_data._id,t).subscribe(i=>{this.message.create("success","Bill updated Successfully"),this.mainService.spinning.emit(!1),this.validateForm.controls.quantity.reset(),this.validateForm.controls.notes.reset(),this.index=1,this.pageSize=10,this.edit=!1,this.date=new Date,this.getBills()},i=>{console.log("get customers err ",i),this.mainService.spinning.emit(!1),i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})):this.mainService.createBill(t).subscribe(i=>{this.message.create("success","Bill added Successfully"),this.mainService.spinning.emit(!1),this.validateForm.controls.quantity.reset(),this.validateForm.controls.notes.reset(),this.index=1,this.pageSize=10,setTimeout(()=>{document.getElementById("customerSelection")?.children[0].children[0]?.children[0].setAttribute("id","customerselect"),document.getElementById("customerselect")?.focus()},500),this.getBills()},i=>{console.log("get customers err ",i),this.mainService.spinning.emit(!1),i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}else this.mainService.spinning.emit(!1),Object.values(this.validateForm.controls).forEach(n=>{n.invalid&&(n.markAsDirty(),n.updateValueAndValidity({onlySelf:!0}))})}onChange(n){}reset(){this.validateForm.controls.quantity.reset(),this.validateForm.controls.rate.reset(),this.validateForm.controls.notes.reset(),this.edit=!1,this.switchValue=!1}deleteConfirm(n){this.loading=!0,this.mainService.spinning.emit(!0),this.mainService.removeBill(n).subscribe(t=>{this.loading=!1,this.mainService.spinning.emit(!1),t&&t.success&&(this.message.create("success",t.message),this.getBills())},t=>{console.log("get customers err ",t),this.loading=!1,this.mainService.spinning.emit(!1),t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}cancel(){}onPageSizeChange(n){this.pageSize=n,this.getBills()}onPageChange(n){this.index=n,this.getBills()}editBill(n){this.edit=!0,this.bill_data=n,this.billId=n._id,this.date=n.bill_date;let t=this.customers.find(m=>m._id===n.customer_id),i=this.vegetablesList.find(m=>m._id===n.vegetable_id),r=this.farmersList.find(m=>m._id===n.farmer_id);this.validateForm.controls.customer.setValue(t),this.validateForm.controls.notes.setValue(n.notes),this.validateForm.controls.quantity.setValue(n.quantity),this.validateForm.controls.rate.setValue(n.rate),this.validateForm.controls.vegetables.setValue(i),this.validateForm.controls.farmer.setValue(r),this.switchValue=n.unit_wise,this.dateDisable=!0}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(l.QS),e.Y36(e.SBq),e.Y36(S.dD),e.Y36(b.J),e.Y36(Z.y),e.Y36(g.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-bill"]],decls:106,vars:58,consts:[[1,"customer-form"],["nz-row",""],["nz-col","","nzSpan","24"],[1,"text-center"],["nz-col","","nzSpan","12"],["nz-form","",3,"formGroup","ngSubmit"],["nz-col","","nzSpan","14"],[3,"nzSm","nzXs"],["formControlName","date",3,"ngModel","nzAllowClear","nzDisabled","nzFormat","ngModelChange"],["nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","customer","id","customerSelection",3,"nzAutoFocus"],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["nzFor","quantityNumber","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Add quantity!",3,"nzSm","nzXs"],["id","quantityNumber","formControlName","quantity",3,"nzMin","nzStep"],["nzFor","rate","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Add Rate!",3,"nzSm","nzXs"],["id","rate","formControlName","rate",3,"nzMin","nzStep"],["nz-col","","nzSpan","10"],[3,"ngModel","ngModelOptions","ngModelChange"],["nzFor","vegetables","nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","vegetables",1,"phone-selects"],["nzFor","farmer","nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","farmer",1,"phone-selects"],["nzFor","notes",3,"nzSm","nzXs"],["nzErrorTip","Please input your notes!",3,"nzSm","nzXs","nzValidateStatus"],[1,"ant-input-affix-wrapper-textarea-with-clear-btn",3,"nzSuffix"],["nz-input","","formControlName","notes","placeholder","Notes"],["textAreaClearNotes",""],["nz-col","",3,"nzSpan","nzOffset"],[1,"register-area"],["nz-button","","nzType","primary"],["nz-button","","nzType","default",3,"click"],["style","float: right;",4,"ngIf"],[3,"nzData","nzLoading","nzShowPagination"],["basicTable",""],[4,"ngFor","ngForOf"],[3,"nzLabel","nzValue"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle",3,"click",4,"ngIf"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],[2,"float","right"],["nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this Bill","nzPopconfirmPlacement","bottom","nz-tooltip","","nzTooltipTitle","Remove Bill","nzTooltipPlacement","right",3,"nzOnConfirm","nzOnCancel"],["nz-icon","","nzType","delete","nzTheme","fill"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Customer Bills"),e.qZA()()(),e.TgZ(5,"div",1)(6,"div",4)(7,"form",5),e.NdJ("ngSubmit",function(){return t.submitForm()}),e.TgZ(8,"div",1)(9,"div",6)(10,"nz-form-item")(11,"nz-form-label",7),e._uU(12,"Date"),e.qZA(),e.TgZ(13,"nz-form-control",7)(14,"nz-date-picker",8),e.NdJ("ngModelChange",function(r){return t.date=r})("ngModelChange",function(r){return t.onChange(r)}),e.qZA()()()()(),e.TgZ(15,"div",1)(16,"div",6)(17,"nz-form-item")(18,"nz-form-label",9)(19,"span"),e._uU(20,"Customer"),e.qZA()(),e.TgZ(21,"nz-form-control",7)(22,"nz-select",10),e.YNc(23,J,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(24,"div",1)(25,"div",6)(26,"nz-form-item")(27,"nz-form-label",12)(28,"span"),e._uU(29,"Quantity"),e.qZA()(),e.TgZ(30,"nz-form-control",13),e._UZ(31,"nz-input-number",14),e.qZA()()()(),e.TgZ(32,"div",1)(33,"div",6)(34,"nz-form-item")(35,"nz-form-label",15)(36,"span"),e._uU(37,"Rate"),e.qZA()(),e.TgZ(38,"nz-form-control",16),e._UZ(39,"nz-input-number",17),e.qZA()()(),e.TgZ(40,"div",18)(41,"nz-form-item")(42,"nz-form-label",7)(43,"span"),e._uU(44,"Unit wise"),e.qZA()(),e.TgZ(45,"nz-form-control",7)(46,"nz-switch",19),e.NdJ("ngModelChange",function(r){return t.switchValue=r}),e.qZA()()()()(),e.TgZ(47,"div",1)(48,"div",6)(49,"nz-form-item")(50,"nz-form-label",20)(51,"span"),e._uU(52,"Vegetables"),e.qZA()(),e.TgZ(53,"nz-form-control",7)(54,"nz-select",21),e.YNc(55,M,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(56,"div",1)(57,"div",6)(58,"nz-form-item")(59,"nz-form-label",22)(60,"span"),e._uU(61,"Farmer"),e.qZA()(),e.TgZ(62,"nz-form-control",7)(63,"nz-select",23),e.YNc(64,O,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(65,"div",1)(66,"div",6)(67,"nz-form-item")(68,"nz-form-label",24),e._uU(69,"Notes"),e.qZA(),e.TgZ(70,"nz-form-control",25)(71,"nz-input-group",26),e._UZ(72,"textarea",27),e.qZA(),e.YNc(73,D,1,1,"ng-template",null,28,e.W1O),e.qZA()()()(),e.TgZ(75,"div",1)(76,"div",29)(77,"nz-form-item",30)(78,"nz-form-control")(79,"button",31),e._uU(80),e.qZA(),e._uU(81,"\xa0 "),e.TgZ(82,"button",32),e.NdJ("click",function(){return t.reset()}),e._uU(83,"Reset"),e.qZA()()()()()()(),e.TgZ(84,"div",4),e.YNc(85,V,8,5,"p",33),e.TgZ(86,"nz-table",34,35)(88,"thead")(89,"tr")(90,"th"),e._uU(91,"S.No."),e.qZA(),e.TgZ(92,"th"),e._uU(93,"Name"),e.qZA(),e.TgZ(94,"th"),e._uU(95,"Item"),e.qZA(),e.TgZ(96,"th"),e._uU(97,"Quantity"),e.qZA(),e.TgZ(98,"th"),e._uU(99,"Rate"),e.qZA(),e.TgZ(100,"th"),e._uU(101,"Total"),e.qZA(),e.TgZ(102,"th"),e._uU(103,"Actions"),e.qZA()()(),e.TgZ(104,"tbody"),e.YNc(105,N,18,12,"tr",36),e.qZA()()()()()),2&n){const i=e.MAs(74);e.xp6(7),e.Q6J("formGroup",t.validateForm),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("ngModel",t.date)("nzAllowClear",!1)("nzDisabled",t.dateDisable)("nzFormat",t.dateFormat),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzAutoFocus",!0),e.xp6(1),e.Q6J("ngForOf",t.customers),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzMin",1)("nzStep",1),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzMin",1)("nzStep",1),e.xp6(3),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("ngModel",t.switchValue)("ngModelOptions",e.DdM(57,w)),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(2),e.Q6J("ngForOf",t.vegetablesList),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(2),e.Q6J("ngForOf",t.farmersList),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24)("nzValidateStatus",t.validateForm.controls.notes),e.xp6(1),e.Q6J("nzSuffix",i),e.xp6(5),e.Q6J("nzSpan",12)("nzOffset",6),e.xp6(4),e.Oqu(t.edit?"Update":"Create"),e.xp6(5),e.Q6J("ngIf",t.billsData&&t.billsData.length>0),e.xp6(1),e.Q6J("nzData",t.billsData)("nzLoading",t.loading)("nzShowPagination",!1),e.xp6(19),e.Q6J("ngForOf",t.billsData)}},dependencies:[u.sg,u.O5,C.SY,T.Ls,p.t3,p.SK,d.Lr,d.Nx,d.iK,d.Fd,l._Y,l.Fj,l.JJ,l.JL,l.On,l.sg,l.u,h.Zp,h.gB,h.ke,v.Ip,v.Vq,A.ix,y.w,B.dQ,F._V,x.uw,c.N8,c.Uo,c._C,c.Om,c.p0,c.$Z,q.JW,U.i,u.JJ],styles:["[nz-form][_ngcontent-%COMP%]{max-width:600px}.phone-select[_ngcontent-%COMP%]{width:70px}.register-are[_ngcontent-%COMP%]{margin-bottom:8px}.customer-form[_ngcontent-%COMP%]{margin-top:20px}nz-date-picker[_ngcontent-%COMP%]{margin:0 8px 12px 0}.text-center[_ngcontent-%COMP%]{text-align:center!important}.text-right[_ngcontent-%COMP%]{text-align:right!important}"]}),s})()}];let L=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[g.Bz.forChild(X),g.Bz]}),s})();var _=o(4973);let I=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[u.ez,L,_.m,_.m]}),s})()}}]);