"use strict";(self.webpackChunktraders=self.webpackChunktraders||[]).push([[464],{57464:(Z,d,i)=>{i.r(d),i.d(d,{LandingModule:()=>T});var r=i(36895),g=i(64575),n=i(94650),u=i(49651),h=i(32566),l=i(18284),m=i(73325),f=i(21102),p=i(73679),z=i(47044),C=i(51971),a=i(29562);function x(e,o){if(1&e&&(n.TgZ(0,"a",11),n._uU(1),n._UZ(2,"span",12),n.qZA()),2&e){const t=n.oxw(),s=n.MAs(7);n.Q6J("nzDropdownMenu",s),n.xp6(1),n.hij(" ",t.loggedInUser.name," ")}}function v(e,o){if(1&e&&n._UZ(0,"img",18),2&e){const t=n.oxw().$implicit;n.s9C("alt",t.name)}}function _(e,o){if(1&e&&n._UZ(0,"img",19),2&e){const t=n.oxw().$implicit;n.s9C("alt",t.name)}}function U(e,o){if(1&e&&n._UZ(0,"img",19),2&e){const t=n.oxw().$implicit;n.s9C("alt",t.name)}}function I(e,o){if(1&e&&n._UZ(0,"img",20),2&e){const t=n.oxw().$implicit;n.s9C("alt",t.name)}}function y(e,o){if(1&e){const t=n.EpF();n.TgZ(0,"div",13),n.NdJ("click",function(){const O=n.CHM(t).$implicit,S=n.oxw();return n.KtG(S.selectCard(O))}),n.TgZ(1,"nz-card",14)(2,"div"),n.YNc(3,v,1,1,"img",15),n.YNc(4,_,1,1,"img",16),n.YNc(5,U,1,1,"img",16),n.YNc(6,I,1,1,"img",17),n.qZA(),n.TgZ(7,"p"),n._uU(8),n.qZA()()()}if(2&e){const t=o.$implicit;n.Q6J("nzSpan",8),n.xp6(3),n.Q6J("ngIf","Bills"===t.name),n.xp6(1),n.Q6J("ngIf","Customers"===t.name),n.xp6(1),n.Q6J("ngIf","Farmer"===t.name),n.xp6(1),n.Q6J("ngIf","Collections"===t.name),n.xp6(2),n.Oqu(t.name)}}const L=[{path:"",component:(()=>{class e{constructor(t,s,c){this.router=t,this.message=s,this.mainService=c,this.cardsList=[],this.loggedInUser=this.mainService.getLoggedInUser(),this.loggedInUser?"admin"!==this.loggedInUser.username?((this.loggedInUser.apps.customer.isEdit||this.loggedInUser.apps.customer.isView)&&this.cardsList.push({name:"Customers",link:"customer"}),(this.loggedInUser.apps.bill.isEdit||this.loggedInUser.apps.bill.isView)&&this.cardsList.push({name:"Bills",link:"bill"}),(this.loggedInUser.apps.collection.isEdit||this.loggedInUser.apps.collection.isView)&&this.cardsList.push({name:"Collections",link:"customer-collection"}),(this.loggedInUser.apps.farmer.isEdit||this.loggedInUser.apps.farmer.isView)&&this.cardsList.push({name:"Farmer",link:"farmer"})):this.cardsList=[{name:"Customers",link:"customer"},{name:"Bills",link:"bill"},{name:"Collections",link:"customer-collection"},{name:"Farmer",link:"farmer"}]:(sessionStorage.clear(),this.message.create("warning","User session expired please login"),this.router.navigateByUrl("/login"))}ngOnInit(){this.mainService.spinning.emit(!1)}logout(){this.loggedInUser?this.mainService.logout({userId:this.loggedInUser.userId,sessionId:this.loggedInUser.sessionId}).subscribe(s=>{sessionStorage.clear(),this.message.create("success","User logged out successfully"),this.router.navigateByUrl("/login")},s=>{console.log("login err ",s),this.message.create("error","invalid credentials"),sessionStorage.clear(),this.router.navigateByUrl("/login")}):(sessionStorage.clear(),this.router.navigateByUrl("/login"))}selectCard(t){this.router.navigateByUrl("/"+t.link)}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(g.F0),n.Y36(u.dD),n.Y36(h.J))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-landing"]],decls:17,vars:3,consts:[[1,"logo"],["src",".../../../../../assets/images/SST.jpg","alt","Sri Sainath Traders",1,"welcome-page-logo"],["nz-dropdown","","nzTrigger","click","class","logout",3,"nzDropdownMenu",4,"ngIf"],["menu","nzDropdownMenu"],["nz-menu",""],["nz-menu-item",""],["nz-menu-item","",3,"click"],[1,"outer-content"],[2,"padding","30px","height","300px","position","relative","top","100px"],["nz-row","","nzJustify","center","nzAlign","middle",3,"nzGutter"],["nz-col","","class","padding-15",3,"nzSpan","click",4,"ngFor","ngForOf"],["nz-dropdown","","nzTrigger","click",1,"logout",3,"nzDropdownMenu"],["nz-icon","","nzType","user","nzTheme","outline"],["nz-col","",1,"padding-15",3,"nzSpan","click"],["nzHoverable","true",1,"card-shadow","text-center","border-radius-10"],["src","../../../assets/images/bill_8685644.png","class","card-image-style",3,"alt",4,"ngIf"],["src","../../../assets/images/group_121704.png","class","card-image-style",3,"alt",4,"ngIf"],["src","../../../assets/images/money_4199686.png","class","card-image-style",3,"alt",4,"ngIf"],["src","../../../assets/images/bill_8685644.png",1,"card-image-style",3,"alt"],["src","../../../assets/images/group_121704.png",1,"card-image-style",3,"alt"],["src","../../../assets/images/money_4199686.png",1,"card-image-style",3,"alt"]],template:function(t,s){1&t&&(n.TgZ(0,"nz-layout")(1,"nz-header")(2,"div",0),n._UZ(3,"img",1),n._uU(4," Sri Sainath Traders "),n.YNc(5,x,3,2,"a",2),n.TgZ(6,"nz-dropdown-menu",null,3)(8,"ul",4)(9,"li",5),n._uU(10,"Profile"),n.qZA(),n.TgZ(11,"li",6),n.NdJ("click",function(){return s.logout()}),n._uU(12,"Logout"),n.qZA()()()()(),n.TgZ(13,"nz-content",7)(14,"div",8)(15,"div",9),n.YNc(16,y,9,6,"div",10),n.qZA()()()()),2&t&&(n.xp6(5),n.Q6J("ngIf",s.loggedInUser),n.xp6(10),n.Q6J("nzGutter",8),n.xp6(1),n.Q6J("ngForOf",s.cardsList))},dependencies:[r.sg,r.O5,l.hw,l.E8,l.OK,m.wO,m.r9,f.Ls,p.t3,p.SK,z.w,C.bd,a.cm,a.Ws,a.RR],styles:[".logo[_ngcontent-%COMP%]{width:100%;background:transparent;float:left;color:#fff}.header-menu[_ngcontent-%COMP%]{line-height:64px}.outer-content[_ngcontent-%COMP%]{padding:0 50px}nz-breadcrumb[_ngcontent-%COMP%]{margin:16px 0}.inner-layout[_ngcontent-%COMP%]{padding:24px 0}.sider-menu[_ngcontent-%COMP%]{height:100%}.inner-content[_ngcontent-%COMP%]{padding:0 24px;min-height:280px}nz-footer[_ngcontent-%COMP%]{text-align:center;position:absolute;width:100%;bottom:0;right:0}a.logout[_ngcontent-%COMP%]{float:right!important;color:#fff!important}.welcome-page-logo[_ngcontent-%COMP%]{width:50px;height:auto;margin-right:10px;border-radius:20px}@media print{nz-header[_ngcontent-%COMP%]{display:none}ul[_ngcontent-%COMP%]{display:none}}.card-shadow[_ngcontent-%COMP%]{box-shadow:0 4px 8px #0003,0 6px 20px #00000030;height:250px;font-size:25px;font-weight:700;align-content:space-around;background-color:#559043;border-color:#559043;color:#001529}.card-image-style[_ngcontent-%COMP%]{width:50px}"]}),e})()}];let M=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[g.Bz.forChild(L),g.Bz]}),e})();var w=i(4973);let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[r.ez,M,w.m,a.b1]}),e})()}}]);