import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import { UserData } from '../providers/user-data';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AppData {
  data: any;
   hostUrl: string ="http://39.108.156.146:8060/api/";
   openApi : string = "http://openapi.tuling123.com/openapi/api";
  headers = new Headers({
      'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers });
  
  constructor(public http: Http, public userData: UserData) { 
   
  }
  //获取版本
  getVersion() {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"Values").subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //动态页面
  getHttpDynamicService() {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"dynamic").subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //下拉加载新动态
    getHttpDynamicList(number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"dynamic/GetLits/" + number).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //删除动态
  DeleteDynamicbyID(dynamicId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"dynamic/"+ dynamicId).subscribe(res => {
        this.data = res.json();       
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }

  //用户信息页面
 getHttpDynamicDetailsPerson(presonId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"person/getById/"+ presonId).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
 
  //评论获取简单用户信息
  getHttpPersonSimple(presonId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"person/GetSimpleByid/"+ presonId).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
 //动态详情获取用户信息
  getHttpDynamicDetails(presonId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"dynamic/personDetailsGet/"+presonId).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //动态详情
  getHttpHomeDetailsGet(dynaimicID){
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"dynamic/HomeDetailsGet/"+dynaimicID).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //获取评论
   getHttpHomeDetailsMessageGet(dynaimicID){
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"message/getByTypeID/"+dynaimicID).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //登陆
  Login(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/login",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
  //修改密码
  ChangePassword(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/changePassword",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
  //修改昵称
  ChangeName(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/PutName",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
  //修改签名
  ChangeDescriptione(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/PutDescriptione",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
   //修改图片
  ChangeImage(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/PutImage",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
   //注册
  register(data){
      return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"account/register",data, this.options).subscribe(res=>{  
          this.data = res.json();
          resolve(this.data);        
      },err => { 
          reject(err);   
        });
     }) 
  } 
  //插入评论
  postMessage(data){
     return new Promise((resolve, reject) => {
        this.http.post(this.hostUrl+"message",data,this.options).subscribe(res=>{      
          resolve(res.json());        
      },err => { 
          reject(err);   
        });
     }) 
  }
  //发布动态
   postDynamic(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"dynamic/release",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //图灵机器人
   tuling(data) {  
    return new Promise((resolve, reject) => {
      this.http.post(this.openApi,data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //首页点赞
   postAddLikes_dy(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"dynamic/AddLikes/",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
   //首页取消点赞
   postReLikes_dy(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"dynamic/ReLikes",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
  //评论点赞
   postAddLikes_me(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"message/AddLikes/",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
   //评论取消点赞
   postReLikes_me(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"message/ReLikes",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
   //获取关注
   getConcernList(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl+"person/Concern/"+userid).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
   //关注
   postAddConcern(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"person/AddConcern",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    })
  }
   //取消关注
   postReConcern(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"person/ReConcern",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    }) 
  }
  //查询是否关注
   getConcern(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl+"person/Concern",data,this.options).subscribe(res => {
        this.data = res.json();
        resolve(this.data);
      }, err => {
        reject(err);
      });
    }) 
  }
}
