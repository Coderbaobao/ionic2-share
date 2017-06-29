//页面
import { HomePage } from '../pages/home/home';
import { MessagePage } from "../pages/chat/message/message";
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { AccountPage} from "../pages/account/account";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ReleasePage } from '../pages/release/release';
import { ChatPage } from '../pages/chat/chat';
import { HomeDetailPage } from '../pages/home-detail/home-detail';
import { PersonDetailsPage } from '../pages/person-details/person-details';
import { SettingPage } from '../pages/setting/setting';
import { AccountDataPage } from '../pages/account-data/account-data';
import { AccountManagementPage } from '../pages/account-management/account-management';
import { AboutPage } from '../pages/about/about';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ConcernPage } from '../pages/concern/concern';

//插件
import {StatusBar} from '@ionic-native/status-bar';
import {AppVersion} from '@ionic-native/app-version';
import {Toast} from '@ionic-native/toast';
import {File} from '@ionic-native/file';
import {Transfer} from '@ionic-native/transfer';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Network} from '@ionic-native/network';
import {AppMinimize} from '@ionic-native/app-minimize';
import {SplashScreen} from '@ionic-native/splash-screen';
import {JPush} from "../../typings/modules/jpush/index";

//全局
import { AppState } from './app.global';
//数据
import { UserData } from '../providers/user-data';
import { AppData } from '../providers/app-data';
import { Helper } from '../providers/helper';
import { NativeService } from '../providers/nativeService';

//组件
import { GalleryModal } from '../components/gallery-modal/gallery-modal/gallery-modal';
import { ZoomableImage } from '../components/gallery-modal/zoomable-image/zoomable-image';

// Pipes

export const Pages = [
    HomePage,
    TabsPage,
    WelcomePage,
    MessagePage,
    AccountPage,
    LoginPage,
    ReleasePage,
    HomeDetailPage,
    SettingPage,
    AccountDataPage,
    AccountManagementPage,
    AboutPage,
    PersonDetailsPage,
    ChatPage,
    SignupPage,
    ChangePasswordPage,
    ConcernPage,
    GalleryModal,
    ZoomableImage
]
export const Providers = [
    UserData,
    AppData,
    AppState,
    Helper,
    NativeService,

    StatusBar,
    AppVersion,
    Toast,
    File,
    Transfer,
    InAppBrowser,
    Network,
    AppMinimize,
    SplashScreen,
    JPush
]
export const Directives = [

]
export const Pipes = [
   
]
