"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[595],{31595:(I,z,o)=>{o.r(z),o.d(z,{BillModule:()=>Y});var u=o(36895),g=o(64575),m=o(90433),f=o(15439),e=o(94650),Z=o(49651),b=o(32566),C=o(31883),T=o(37570),B=o(21102),p=o(73679),d=o(36704),h=o(35635),v=o(38231),A=o(66616),y=o(47044),F=o(21811),x=o(37096),q=o(5259),c=o(44688),U=o(6497),J=o(21243);function M(s,r){if(1&s&&e._UZ(0,"nz-option",36),2&s){const n=r.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function O(s,r){if(1&s&&e._UZ(0,"nz-option",36),2&s){const n=r.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function Q(s,r){if(1&s&&e._UZ(0,"nz-option",36),2&s){const n=r.$implicit;e.Q6J("nzLabel",n.name)("nzValue",n)}}function V(s,r){if(1&s){const n=e.EpF();e.TgZ(0,"span",38),e.NdJ("click",function(){e.CHM(n);const i=e.oxw(2);return e.KtG(i.clearfield("notes"))}),e.qZA()}}function D(s,r){if(1&s&&e.YNc(0,V,1,0,"span",37),2&s){const n=e.oxw();e.Q6J("ngIf",n.validateForm.controls.notes.value)}}function N(s,r){if(1&s){const n=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.ALo(11,"number"),e.qZA(),e.TgZ(12,"td"),e._uU(13),e.ALo(14,"number"),e.qZA(),e.TgZ(15,"td")(16,"a",39),e.NdJ("click",function(){const a=e.CHM(n).$implicit,l=e.oxw();return e.KtG(l.editBill(a))}),e._UZ(17,"span",40),e.qZA(),e._uU(18,"\xa0\xa0 "),e.TgZ(19,"a",41),e.NdJ("nzOnConfirm",function(){const a=e.CHM(n).$implicit,l=e.oxw();return e.KtG(l.deleteConfirm(a._id))})("nzOnCancel",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.cancel())}),e._UZ(20,"span",42),e.qZA()()()}if(2&s){const n=r.$implicit,t=r.index,i=e.oxw();e.xp6(2),e.Oqu(i.billsData.length-t),e.xp6(2),e.Oqu(n.customer_name),e.xp6(2),e.Oqu(n.vegetable_name),e.xp6(2),e.Oqu(n.quantity),e.xp6(2),e.Oqu(e.xi3(11,6,n.rate,"1.2-2")),e.xp6(3),e.Oqu(e.xi3(14,9,n.total_amount,"1.2-2"))}}const w=function(){return{standalone:!0}},X=[{path:"",component:(()=>{class s{constructor(n,t,i,a,l,S){this.fb=n,this.el=t,this.message=i,this.mainService=a,this.farmerService=l,this.router=S,this.customers=[],this.vegetablesList=[],this.farmersList=[],this.date=new Date,this.defaultDate=new Date,this.billsData=[],this.sort=["ascend"],this.listOfColumns=[{name:"Name",sortOrder:"ascend"},{item:"Item",sortOrder:null},{rate:"Rate",sortOrder:null},{quantity:"quantity",sortOrder:null}],this.index=1,this.total=0,this.pageSize=20,this.loading=!0,this.edit=!1,this.switchValue=!1,this.dateDisable=!1,this.dateFormat="dd-MM-yyyy",this.total_quantity=0,this.total_amount=0,this.userinfo=this.mainService.getLoggedInUser(),this.userinfo?"admin"!==this.userinfo.username&&((this.userinfo?.apps?.bill?.isView||this.userinfo?.apps?.bill?.isEdit)&&this.userinfo?.apps?.bill?.isView||this.router.navigateByUrl("/main")):(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login"))}ngAfterViewInit(){}ngOnInit(){this.validateForm=this.fb.group({customer:[null,[m.kI.required]],quantity:[null,[m.kI.required]],rate:[null,[m.kI.required]],vegetables:[null,[m.kI.required]],farmer:[null,[m.kI.required]],date:[this.date,[m.kI.required]],notes:[null]}),this.total=this.billsData.length;const n=sessionStorage.getItem("userinfo");"admin"!==JSON.parse(n).username&&(this.dateDisable=!0),this.getCustomers(),this.getAllFarmers(),this.getAllVegetables(),this.getBills(),this.switchValue=!1}clearfield(n){this.validateForm.controls[n].reset()}getBills(){const t={bill_date:f(new Date).format("DD-MM-YYYY")};this.mainService.spinning.emit(!0),this.mainService.getBills(t).subscribe(i=>{this.billsData=i.data,this.total=i.total,this.mainService.spinning.emit(!1),this.loading=!1,this.billsData.forEach(l=>{this.total_quantity=this.total_quantity+l.quantity,this.total_amount=this.total_amount+l.total_amount}),this.getCustomers(),setTimeout(()=>{document.getElementById("customerSelection")?.children[0].children[0]?.children[0].setAttribute("id","customerselect"),document.getElementById("customerselect")?.focus()},500)},i=>{console.log("get customers err ",i),this.billsData=[],this.mainService.spinning.emit(!1),this.loading=!1,i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}removeDuplicates(n,t){return[...new Map(n.map(i=>[t(i),i])).values()]}getCustomers(){this.mainService.getCustomers({}).subscribe(t=>{this.customers=t.data},t=>{console.log("get customers err ",t),this.customers=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}getAllFarmers(){this.farmerService.getFarmers({}).subscribe(t=>{this.farmersList=t.data},t=>{console.log("get farmers err ",t),this.farmersList=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}getAllVegetables(){this.mainService.getVegetables({}).subscribe(t=>{this.vegetablesList=t.data},t=>{console.log("get customers err ",t),this.vegetablesList=[],t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}clickSwitch(){this.switchValue=!this.switchValue}submitForm(){if(this.validateForm.valid){const n=f(this.validateForm.value.date).format("DD-MM-YYYY"),t={bill_date:this.edit?this.bill_data.bill_date:n,customer_name:this.validateForm.value.customer.name,customer_id:this.validateForm.value.customer._id,vegetable_name:this.validateForm.value.vegetables.name,vegetable_id:this.validateForm.value.vegetables._id,rate:this.validateForm.value.rate,quantity:this.validateForm.value.quantity,farmer_name:this.validateForm.value.farmer.name,farmer_id:this.validateForm.value.farmer._id,unit_wise:this.switchValue,notes:this.validateForm.value.notes,customer_balance_amount:this.validateForm.value.customer.balance_amount};this.mainService.spinning.emit(!0),this.edit?(t.isCustEdited=this.bill_data.customer_id!=this.validateForm.value.customer._id,t.oldCustId=this.bill_data.customer_id,this.mainService.updateBill(this.bill_data._id,t).subscribe(i=>{this.message.create("success","Bill updated Successfully"),this.mainService.spinning.emit(!1),this.validateForm.controls.quantity.reset(),this.validateForm.controls.notes.reset(),this.index=1,this.pageSize=10,this.edit=!1,this.date=new Date,this.getBills()},i=>{console.log("get customers err ",i),this.mainService.spinning.emit(!1),i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})):this.mainService.createBill(t).subscribe(i=>{this.message.create("success","Bill added Successfully"),this.mainService.spinning.emit(!1),this.validateForm.controls.quantity.reset(),this.validateForm.controls.notes.reset(),this.index=1,this.pageSize=10,this.getBills()},i=>{console.log("get customers err ",i),this.mainService.spinning.emit(!1),i&&i.error&&!i.error.success&&1e3===i.error.code&&(this.message.create("error",i.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}else this.mainService.spinning.emit(!1),Object.values(this.validateForm.controls).forEach(n=>{n.invalid&&(n.markAsDirty(),n.updateValueAndValidity({onlySelf:!0}))})}onChange(n){}reset(){this.validateForm.controls.quantity.reset(),this.validateForm.controls.rate.reset(),this.validateForm.controls.notes.reset(),this.edit=!1,this.switchValue=!1}deleteConfirm(n){this.loading=!0,this.mainService.spinning.emit(!0),this.mainService.removeBill(n).subscribe(t=>{this.loading=!1,this.mainService.spinning.emit(!1),t&&t.success&&(this.message.create("success",t.message),this.getBills())},t=>{console.log("get customers err ",t),this.loading=!1,this.mainService.spinning.emit(!1),t&&t.error&&!t.error.success&&1e3===t.error.code&&(this.message.create("error",t.error.message),sessionStorage.clear(),this.router.navigateByUrl("/login"))})}cancel(){}onPageSizeChange(n){this.pageSize=n,this.getBills()}onPageChange(n){this.index=n,this.getBills()}editBill(n){this.edit=!0,this.bill_data=n,this.billId=n._id,this.date=n.bill_date;let t=this.customers.find(l=>l._id===n.customer_id),i=this.vegetablesList.find(l=>l._id===n.vegetable_id),a=this.farmersList.find(l=>l._id===n.farmer_id);this.validateForm.controls.customer.setValue(t),this.validateForm.controls.notes.setValue(n.notes),this.validateForm.controls.quantity.setValue(n.quantity),this.validateForm.controls.rate.setValue(n.rate),this.validateForm.controls.vegetables.setValue(i),this.validateForm.controls.farmer.setValue(a),this.switchValue=n.unit_wise,this.dateDisable=!0}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(m.QS),e.Y36(e.SBq),e.Y36(Z.dD),e.Y36(b.J),e.Y36(C.y),e.Y36(g.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-bill"]],decls:116,vars:62,consts:[[1,"customer-form"],["nz-row",""],["nz-col","","nzSpan","24"],[1,"text-center"],["nz-col","","nzSpan","12"],["nz-form","",3,"formGroup","ngSubmit"],["nz-col","","nzSpan","14"],[3,"nzSm","nzXs"],["formControlName","date",3,"ngModel","nzAllowClear","nzDisabled","nzFormat","ngModelChange"],["nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","customer","id","customerSelection",3,"nzAutoFocus"],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["nzFor","quantityNumber","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Add quantity!",3,"nzSm","nzXs"],["id","quantityNumber","formControlName","quantity",3,"nzMin","nzStep"],["nzFor","rate","nzRequired","",3,"nzSm","nzXs"],["nzErrorTip","Add Rate!",3,"nzSm","nzXs"],["id","rate","formControlName","rate",3,"nzMin","nzStep"],["nz-col","","nzSpan","10"],[3,"ngModel","ngModelOptions","ngModelChange"],["nzFor","vegetables","nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","vegetables",1,"phone-selects"],["nzFor","farmer","nzRequired","",3,"nzSm","nzXs"],["nzShowSearch","","nzAllowClear","","formControlName","farmer",1,"phone-selects"],["nzFor","notes",3,"nzSm","nzXs"],["nzErrorTip","Please input your notes!",3,"nzSm","nzXs","nzValidateStatus"],[1,"ant-input-affix-wrapper-textarea-with-clear-btn",3,"nzSuffix"],["nz-input","","formControlName","notes","placeholder","Notes"],["textAreaClearNotes",""],["nz-col","",3,"nzSpan","nzOffset"],[1,"register-area"],["nz-button","","nzType","primary"],["nz-button","","nzType","default",3,"click"],[3,"nzData","nzLoading","nzShowPagination"],["basicTable",""],[4,"ngFor","ngForOf"],[3,"nzLabel","nzValue"],["nz-icon","","class","ant-input-clear-icon","nzTheme","fill","nzType","close-circle",3,"click",4,"ngIf"],["nz-icon","","nzTheme","fill","nzType","close-circle",1,"ant-input-clear-icon",3,"click"],["nz-tooltip","","nzTooltipTitle","Edit Bill","nzTooltipPlacement","left",3,"click"],["nz-icon","","nzType","edit","nzTheme","fill"],["nz-popconfirm","","nzPopconfirmTitle","Are you sure delete this Bill","nzPopconfirmPlacement","bottom","nz-tooltip","","nzTooltipTitle","Remove Bill","nzTooltipPlacement","right",3,"nzOnConfirm","nzOnCancel"],["nz-icon","","nzType","delete","nzTheme","fill"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2",3),e._uU(4,"Customer Bills"),e.qZA()()(),e.TgZ(5,"div",1)(6,"div",4)(7,"form",5),e.NdJ("ngSubmit",function(){return t.submitForm()}),e.TgZ(8,"div",1)(9,"div",6)(10,"nz-form-item")(11,"nz-form-label",7),e._uU(12,"Date"),e.qZA(),e.TgZ(13,"nz-form-control",7)(14,"nz-date-picker",8),e.NdJ("ngModelChange",function(a){return t.date=a})("ngModelChange",function(a){return t.onChange(a)}),e.qZA()()()()(),e.TgZ(15,"div",1)(16,"div",6)(17,"nz-form-item")(18,"nz-form-label",9)(19,"span"),e._uU(20,"Customer"),e.qZA()(),e.TgZ(21,"nz-form-control",7)(22,"nz-select",10),e.YNc(23,M,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(24,"div",1)(25,"div",6)(26,"nz-form-item")(27,"nz-form-label",12)(28,"span"),e._uU(29,"Quantity"),e.qZA()(),e.TgZ(30,"nz-form-control",13),e._UZ(31,"nz-input-number",14),e.qZA()()()(),e.TgZ(32,"div",1)(33,"div",6)(34,"nz-form-item")(35,"nz-form-label",15)(36,"span"),e._uU(37,"Rate"),e.qZA()(),e.TgZ(38,"nz-form-control",16),e._UZ(39,"nz-input-number",17),e.qZA()()(),e.TgZ(40,"div",18)(41,"nz-form-item")(42,"nz-form-label",7)(43,"span"),e._uU(44,"Unit wise"),e.qZA()(),e.TgZ(45,"nz-form-control",7)(46,"nz-switch",19),e.NdJ("ngModelChange",function(a){return t.switchValue=a}),e.qZA()()()()(),e.TgZ(47,"div",1)(48,"div",6)(49,"nz-form-item")(50,"nz-form-label",20)(51,"span"),e._uU(52,"Vegetables"),e.qZA()(),e.TgZ(53,"nz-form-control",7)(54,"nz-select",21),e.YNc(55,O,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(56,"div",1)(57,"div",6)(58,"nz-form-item")(59,"nz-form-label",22)(60,"span"),e._uU(61,"Farmer"),e.qZA()(),e.TgZ(62,"nz-form-control",7)(63,"nz-select",23),e.YNc(64,Q,1,2,"nz-option",11),e.qZA()()()()(),e.TgZ(65,"div",1)(66,"div",6)(67,"nz-form-item")(68,"nz-form-label",24),e._uU(69,"Notes"),e.qZA(),e.TgZ(70,"nz-form-control",25)(71,"nz-input-group",26),e._UZ(72,"textarea",27),e.qZA(),e.YNc(73,D,1,1,"ng-template",null,28,e.W1O),e.qZA()()()(),e.TgZ(75,"div",1)(76,"div",29)(77,"nz-form-item",30)(78,"nz-form-control")(79,"button",31),e._uU(80),e.qZA(),e._uU(81,"\xa0 "),e.TgZ(82,"button",32),e.NdJ("click",function(){return t.reset()}),e._uU(83,"Reset"),e.qZA()()()()()()(),e.TgZ(84,"div",4)(85,"nz-table",33,34)(87,"thead")(88,"tr")(89,"th"),e._uU(90,"S.No."),e.qZA(),e.TgZ(91,"th"),e._uU(92,"Name"),e.qZA(),e.TgZ(93,"th"),e._uU(94,"Item"),e.qZA(),e.TgZ(95,"th"),e._uU(96,"Quantity"),e.qZA(),e.TgZ(97,"th"),e._uU(98,"Rate"),e.qZA(),e.TgZ(99,"th"),e._uU(100,"Total"),e.qZA(),e.TgZ(101,"th"),e._uU(102,"Actions"),e.qZA()()(),e.TgZ(103,"tbody"),e.YNc(104,N,21,12,"tr",35),e.TgZ(105,"tr"),e._UZ(106,"td")(107,"td")(108,"td"),e.TgZ(109,"td"),e._uU(110),e.qZA(),e._UZ(111,"td"),e.TgZ(112,"td"),e._uU(113),e.ALo(114,"number"),e.qZA(),e._UZ(115,"td"),e.qZA()()()()()()),2&n){const i=e.MAs(74);e.xp6(7),e.Q6J("formGroup",t.validateForm),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("ngModel",t.date)("nzAllowClear",!1)("nzDisabled",t.dateDisable)("nzFormat",t.dateFormat),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzAutoFocus",!0),e.xp6(1),e.Q6J("ngForOf",t.customers),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzMin",1)("nzStep",1),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("nzMin",1)("nzStep",1),e.xp6(3),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(1),e.Q6J("ngModel",t.switchValue)("ngModelOptions",e.DdM(61,w)),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(2),e.Q6J("ngForOf",t.vegetablesList),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(3),e.Q6J("nzSm",14)("nzXs",24),e.xp6(2),e.Q6J("ngForOf",t.farmersList),e.xp6(4),e.Q6J("nzSm",6)("nzXs",24),e.xp6(2),e.Q6J("nzSm",14)("nzXs",24)("nzValidateStatus",t.validateForm.controls.notes),e.xp6(1),e.Q6J("nzSuffix",i),e.xp6(5),e.Q6J("nzSpan",12)("nzOffset",6),e.xp6(4),e.Oqu(t.edit?"Update":"Create"),e.xp6(5),e.Q6J("nzData",t.billsData)("nzLoading",t.loading)("nzShowPagination",!1),e.xp6(19),e.Q6J("ngForOf",t.billsData),e.xp6(6),e.Oqu(t.total_quantity),e.xp6(3),e.Oqu(e.xi3(114,58,t.total_amount,"1.2-2"))}},dependencies:[u.sg,u.O5,T.SY,B.Ls,p.t3,p.SK,d.Lr,d.Nx,d.iK,d.Fd,m._Y,m.Fj,m.JJ,m.JL,m.On,m.sg,m.u,h.Zp,h.gB,h.ke,v.Ip,v.Vq,A.ix,y.w,F.dQ,x._V,q.uw,c.N8,c.Uo,c._C,c.Om,c.p0,c.$Z,U.JW,J.i,u.JJ],styles:["[nz-form][_ngcontent-%COMP%]{max-width:600px}.phone-select[_ngcontent-%COMP%]{width:70px}.register-are[_ngcontent-%COMP%]{margin-bottom:8px}.customer-form[_ngcontent-%COMP%]{margin-top:20px}nz-date-picker[_ngcontent-%COMP%]{margin:0 8px 12px 0}.text-center[_ngcontent-%COMP%]{text-align:center!important}.text-right[_ngcontent-%COMP%]{text-align:right!important}"]}),s})()}];let L=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[g.Bz.forChild(X),g.Bz]}),s})();var _=o(4973);let Y=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[u.ez,L,_.m,_.m]}),s})()}}]);