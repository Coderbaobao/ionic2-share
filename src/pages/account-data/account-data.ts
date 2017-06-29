import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Platform,ToastController,ActionSheetController,LoadingController,Loading} from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { AppData } from '../../providers/app-data';

declare var cordova: any;

@Component({
  selector: 'page-account-data',
  templateUrl: 'account-data.html'
})
export class AccountDataPage {
  public path;
  lastImage: string = null;
  username: string;
  descriptione: string;
  userpicture: string;
  currentName:string;
  loading: Loading;
  users:any;
  url:string = "http://39.108.156.146:8060/api/Account/UploadImage";
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  public storage: Storage,
  public alertCtrl: AlertController,
  public userData: UserData,
  public data: AppData,
  public platform: Platform,
  public toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  public actionSheetCtrl: ActionSheetController,) {


  }
   ionViewCanEnter(){  
       this.getUumbers();
    }  
   getUumbers() {
    this.userData.getUserid().then((userid) => {
       this.GetloginPerson(userid);
    });
  }
  GetloginPerson(userid){
    this.data.getHttpDynamicDetailsPerson(userid).then(res => {
        this.users = res; 
        }, err => {
          this.users = err;
      })
  }
public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片来源',
      buttons: [
        {
          text: '相册',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '拍照',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
public takePicture(sourceType) {
     var options = {
      quality: 20,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
    };
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);                                //只获取没有名称的图像的路径
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));  //从路径中获取图像的当前名称
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('选择图像时出错.');
    });
  }
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  //从当前路径复制到我们的应用程序并使用新名称
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.userData.getUserid().then((userid) => {
         this.PutImage(userid)
       });
      
    }, error => {
      this.presentToast('存储文件时出错.');
    });
  }
private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
 public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  PutImage(userid){
      let id = userid;
      let image = this.lastImage; 
      let data = JSON.stringify({id, image});
       this.data.ChangeImage(data).then(res => {
          let data :any  = res;     
          if(data.ischange)
             {
                 this.uploadImage();
                 this.getUumbers();
             }
             else
             {
                 this.presentToast('修改失败！');
             }
        }, err => {
           this.presentToast('网络错误！');
        });      
  }
  PutName(userid,na){
      let id = userid;
      let name = na; 
      let data = JSON.stringify({id, name});
       this.data.ChangeName(data).then(res => {
          let data :any  = res;     
          if(data.ischange)
             {
                this.presentToast('修改成功！');
                this.getUumbers();
             }
             else
             {
                this.presentToast('修改失败！');
             }
        }, err => {
           this.presentToast('网络错误！');
        });      
  }
  PutChangeDescriptione(userid,de){
     let id = userid;
      let name = de; 
      let data = JSON.stringify({id, name});
       this.data.ChangeDescriptione(data).then(res => {
          let data :any  = res;     
          if(data.ischange)
             {
                this.presentToast('修改成功！');
                this.getUumbers();
             }
             else
             {
                this.presentToast('修改失败！');
             }
        }, err => {
           this.presentToast('网络错误！');
        });      
  }
  changeDescriptione(){
    let alert = this.alertCtrl.create({
      title: '更改签名',
      buttons: ['取消'] });
    alert.addInput({
      name: 'descriptione',
      value: this.descriptione,
      placeholder: '签名'
    });
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        this.userData.getUserid().then((userid) => {
        this.PutChangeDescriptione(userid,data.descriptione);
        });
      }
    });
    alert.present();

  }
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: '更改用户名',
      buttons: ['取消'] });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: '昵称'
    });
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        this.userData.getUserid().then((userid) => {
        this.PutName(userid,data.username);
        });
      }
    });
    alert.present();
  }

public uploadImage() {
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
  // File name only
  var filename = this.lastImage;
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
  };
  const fileTransfer = new Transfer();
 
  this.loading = this.loadingCtrl.create({
    content: '请稍等...',
  });
  this.loading.present();
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, this.url, options).then(data => {
      this.loading.dismissAll();
      this.presentToast('修改成功！');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('修改失败！');
  });
 }
}

