import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { AppData } from '../../providers/app-data';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';

declare var cordova: any;

@Component({
  selector: 'page-Release',
  templateUrl: 'Release.html'
})
export class ReleasePage {
  lastImage: string = null;
  loading: Loading;
  statusContent: string;
  url:string = "http://39.108.156.146:8060/api/dynamic/UploadImage";
  constructor(public navCtrl: NavController,public data: AppData,public userData: UserData, public actionSheetCtrl: ActionSheetController, 
  public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) { }

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
    // Create options for the Camera Dialog
    var options = {
      quality: 20,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
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
    }, error => {
      this.presentToast('存储文件时出错.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // 始终获取准确的路径到您的应用程序文件夹
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  getUseridandRedynamic() {
    if(this.lastImage != null || this.statusContent != undefined)
    {
      this.userData.getUserid().then((userid) => {
      this.Redynamic(userid);
       });
    }
    else
    {
       this.presentToast('不能全空！');   
    }  
  }
  Redynamic(id){
      let personID = id;
      let content = this.statusContent; 
      let fileName = this.lastImage; 
      let data = JSON.stringify({personID, content,fileName});  
      this.data.postDynamic(data).then(res => { 
          let date :any = res;
          if(date.success)
          {
            if(this.lastImage != null)
               this.uploadImage();
               else
               {
                 this.navCtrl.push(TabsPage);
               }
          }
          else
          this.presentToast('分享失败！');
        }, err => {
          this.presentToast('网络错误！');
      })
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
      this.presentToast('分享成功！');
      this.navCtrl.push(TabsPage);
  }, err => {
    this.loading.dismissAll()
    console.log(JSON.stringify(err));
    this.presentToast('分享失败！');
  });
}
}
