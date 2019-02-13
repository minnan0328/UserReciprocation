﻿/* 必須載入外部js檔案 

html2canvas - DOM繪畫成png圖檔
** https://html2canvas.hertzen.com/dist/html2canvas.min.js

bluebird - 補齊IE瀏覽器缺少js
** https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js

jquery - 使用AJAX
** https://code.jquery.com/jquery-3.3.1.min.js

*/

class UserReciprocation {
    constructor(){
        //使用者資訊變數存取
        this.UserInfo = {
            EmployeeName: '', //員工姓名
            EmployeeID: '', //員工編號
            UserEmail: '', //Email
            LocationHost: location.host, //網址
            PageImgeURL: '', //頁面截圖URL
            UserReciprocationContent: '', //使用者問題回報
            SystemOnLine: '', //網路狀態
        
            SysteInfo: {
                SystemName: 'Omnicle', //系統名稱
                HostName: '', //主機名稱
            },
        
            // IpInfo: {
            //     HostIP: '', //主機IP
            //     ClientIP: '' //客戶IP
            // },
        
            OmnicleInfo: {
                SelectedJobRoleId: '', //ID
                SelectedJobName: '', //稱謂名稱+工作職稱
                // Department: '', //部門
                DepartmentId: 0
            },
        
            OsInfo: {
                OS: '', //作業系統
                OSVersion: '', //作業系統版本
                OSLanguage: '', //作業系統語系
                UserLanguage: '' //使用者使用語系
            },
        
            BrowserInfo: {
                Browser: '', //瀏覽器
                BrowserVersion: '', //瀏覽器版本
                BrowserLanguage: '', //瀏覽器當前語系
                isJava: '', //瀏覽器是否啟用java
                isCookie: '', //瀏覽器是否啟用Cookie
            },
        
            ScreenInfo: {
                ScreenDPI: '', //使用者螢幕解析度
                ScreenAvailDPI: '' //瀏覽頁面解析度
            },
        
        };
        /* 定義輸入字數限制條件*/
        this.MinCharacter = 9;
        this.MaxCharacter = 500;
    }
    
    /* 當DOM body建立時，將執行function UserListener() */
    UserListener(TopBarData) {
        OmnicleUserInfo(TopBarData);
        /* body建立時才動作 */
        if (document.body != null) {
            /* 抓取body裡面所有DOM元素，並建立canvas */
            html2canvas(document.querySelector('body'))
                .then(function (canvas) {
                    var canvas = document.body.appendChild(canvas);
                    this.UserInfo.PageImgeURL = canvas.toDataURL('image/png', 1);
                    // AutoDownloadImgesPNG(); //自動下載
                    UserSystem();
                    RemoveCanvas(canvas);
                    UserReciprocation();
                    console.log(this.UserInfo);
                })
        } else {
            UserListener();
        }
    };
    
    /* 存取Omnicle使用者資訊-開始，因系統使用資訊不同需個別設定 */
    OmnicleUserInfo(TopBarData) {
        TopBarData = {
            user: {
                name: '聯經測試',
                email: 'und@undgroup.com',
                employeeId: '1',
                defaultDepartmentId: '2'
            },
            selectedJobRole: '聯經經理'
        }
        if (TopBarData.user.defaultDepartmentId === null) {
            this.UserInfo.OmnicleInfo.DepartmentId = null;
        } else {
            this.UserInfo.OmnicleInfo.DepartmentId = TopBarData.user.defaultDepartmentId;
        }
        this.UserInfo.UserEmail = TopBarData.user.email;
        this.UserInfo.EmployeeName = TopBarData.user.name;
        this.UserInfo.EmployeeID = TopBarData.user.employeeId;
    
        this.UserInfo.OmnicleInfo.SelectedJobRoleId = TopBarData.selectedJobRole.JobRoleId;
        this.UserInfo.OmnicleInfo.SelectedJobName = TopBarData.selectedJobRole.PrefixName + TopBarData.selectedJobRole.JobName;
    }
    /* 存取Omnicle使用者資訊-結束 */
    
    /* 使用者資訊取得-開始 */
    UserSystem() {
        var UserAgent = navigator.userAgent.toLowerCase();
        /* 取得瀏覽器版本 */
    
        const Chrome = 'chrome/';
        const Safari = 'safari/';
        const Edge = 'edge/';
        const Firefox = 'firefox/';
        /* 取得字串總長度 */
        const UserAgentLength = UserAgent.length;
        const ChromeLength = Chrome.length;
        const SafariLength = Safari.length;
        const EdgeLength = Edge.length;
        const FirefoxLength = Firefox.length;
        /* 取得字串位置 */
        const ChromeSearch = UserAgent.search(Chrome);
        const SafariSearch = UserAgent.search(Safari);
        const EdgeSearch = UserAgent.search(Edge);
        const FirefoxSearch = UserAgent.search(Firefox);
        /* 判斷括號，去取得括號裡的資訊 */
        const StartParentheses = UserAgent.search(/\(/);
        const EndParentheses = UserAgent.search(/\)/);
        const OSList = UserAgent.slice(StartParentheses + 1, EndParentheses);
        const OSListLength = OSList.length;
        /* 判斷瀏覽器項目 */
        const macintosh = /macintosh/.test(UserAgent)
        const windows = /windows/.test(UserAgent)
        const chrome = /chrome/.test(UserAgent)
        const safari = /safari/.test(UserAgent)
        const version = /version/.test(UserAgent)
        const edge = /edge/.test(UserAgent)
        const firefox = /firefox/.test(UserAgent)
    
        //使用者螢幕解析度
        this.UserInfo.ScreenInfo.ScreenDPI = window.screen.width + '*' + window.screen.height;
        //瀏覽頁面解析度
        this.UserInfo.ScreenInfo.ScreenAvailDPI = window.screen.availWidth + '*' + window.screen.availHeight;
    
        //作業系統是否離線
        this.UserInfo.SystemOnLine = navigator.onLine;
        //瀏覽器是否啟用java
        this.UserInfo.BrowserInfo.isJava = navigator.javaEnabled();
        //瀏覽器是否啟用Cookie
        this.UserInfo.BrowserInfo.isCookie = navigator.cookieEnabled;
    
        if (navigator.systemLanguage === undefined) { //作業系統默認語言
            this.UserInfo.OsInfo.OSLanguage = '未知';
        } else {
            this.UserInfo.OSLanguage = navigator.systemLanguage;
        }
        if (navigator.userLanguage === undefined) { //作業系統自然語言設置
            this.UserInfo.OsInfo.UserLanguage = '未知';
        } else {
            UserLanguage = navigator.userLanguage;
        }
        if (navigator.browserLanguage === undefined) { //瀏覽器當前語言
            this.UserInfo.BrowserInfo.BrowserLanguage = '未知';
        } else {
            this.UserInfo.BrowserInfo.BrowserLanguage = navigator.browserLanguage;
        }
    
        /*作業系統判斷 */
        if (macintosh === true) {
            /* 取得作業系統 */
            this.UserInfo.OsInfo.OS = OSList.slice(OSList.search(/m/), OSList.search(/;/));
            /* 取得作業系統版本，並且去除所字元有空格 */
            this.UserInfo.OsInfo.OSVersion = OSList.slice(OSList.search(/intel/) + 'intel'.length, OSListLength).trim();
        } else if (windows === true) {
            /* 取得作業系統 */
            this.UserInfo.OsInfo.OS = OSList.slice(OSList.search(/w/), OSList.search(/;/)).trim();
            /* 取得作業系統版本，並且去除所字元有空格 */
            this.UserInfo.OsInfo.OSVersion = OSList.slice(OSList.search(/;/) + 1, OSListLength).trim();
        }
        /* 瀏覽器判斷-開始 */
        if (chrome === true && safari === true && version === false && edge === false && firefox === false) {
            this.UserInfo.BrowserInfo.Browser = 'Chrome';
            if (ChromeSearch > 0) { //取得瀏覽器版本
                this.UserInfo.BrowserInfo.BrowserVersion = UserAgent.slice(ChromeSearch + ChromeLength, SafariSearch).trim();
            } else {
                this.UserInfo.BrowserInfo.BrowserVersion = '';
            }
        } else if (version === true && safari === true && chrome === false && edge === false && firefox === false) {
            this.UserInfo.BrowserInfo.Browser = 'Safire';
            if (SafariSearch > 0) { //取得瀏覽器版本
                this.UserInfo.BrowserInfo.BrowserVersion = UserAgent.slice(SafariSearch + SafariLength, UserAgentLength).trim();
            } else {
                this.UserInfo.BrowserInfo.BrowserVersion = '';
            }
        } else if (chrome === true && safari === true && edge === true && version === false && firefox === false) {
            this.UserInfo.BrowserInfo.Browser = 'Edge';
            if (EdgeSearch > 0) { //取得瀏覽器版本
                this.UserInfo.BrowserInfo.BrowserVersion = UserAgent.slice(EdgeSearch + EdgeLength, UserAgentLength).trim();
            } else {
                this.UserInfo.BrowserInfo.BrowserVersion = '';
            }
        } else if (firefox === true && chrome === false && safari === true && version === false && edge === false) {
            this.UserInfo.BrowserInfo.Browser = 'Firefox';
            if (FirefoxSearch > 0) { //取得瀏覽器版本
                this.UserInfo.BrowserInfo.BrowserVersion = UserAgent.slice(FirefoxSearch + FirefoxLength, UserAgentLength).trim();
            } else {
                this.UserInfo.BrowserInfo.BrowserVersion = '';
            }
        } else {
            this.UserInfo.BrowserInfo.Browser = 'Other';
            this.UserInfo.BrowserInfo.BrowserVersion = '';
        }
        /* 瀏覽器判斷-開始 */
    };
    /* 使用者資訊取得-結束 */
    
    /* 創建回報視窗-開始 */
    UserReciprocation() {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        document.getElementsByTagName('body')[0].style.position = 'relative';
        var CardDiv = document.createElement('div');
        CardDiv.id = 'URCard';
        CardDiv.innerHTML = `\
        <div id='Cardbox'> \
            <div id='UserInfo'> \
                <div id='InfoContent'> \
                    <h1> ${this.UserInfo.SysteInfo.SystemName} 系統問題回報</h1> \
                </div> \
                <div id='ReciprocationMessage'> \
                    <label>＊請描述您的問題：<span id='ErrorMessage'></span></label> \
                    <a><span id='DisplayCharacter'> 0 </span>/ ${this.MaxCharacter}</a> \
                    <form> \
                        <textarea id='myTextarea' wrap='physical' onKeyDown='checkMaxInput(this.form)' onkeyUp='checkMaxInput(this.form)'></textarea> \
                    </form> \
                </div> \
                <div id='submit'> \
                    <button onclick='RemoveURCard()'>取消</button> \
                    <button onclick='TextareaContent()'>送出</button> \
                </div> \
            </div> \
        </div>`
        document.body.appendChild(CardDiv);
    }
    /* 創建回報視窗-結束 */
    
    /* 定義輸入字數限制條件-開始 */
    
    checkMaxInput(form) {
        if (form.myTextarea.value.length > this.MaxCharacter) {
            form.myTextarea.value = form.myTextarea.value.substring(0, this.MaxCharacter);
            document.getElementById('DisplayCharacter').innerHTML = form.myTextarea.value.length;
            var messages = '輸入內容超過500字，請精簡描述問題，感謝您的配合！';
            ErrorMessage(messages);
        } else {
            document.getElementById('DisplayCharacter').innerHTML = form.myTextarea.value.length;
        }
    }
    /* 定義輸入字數限制條件-結束 */
    /* 判斷輸入字數是否符合條件，並送出訊息-開始 */
    TextareaContent() {
        var InputReciprocationContentLength = document.getElementById('myTextarea').value.length
        if (InputReciprocationContentLength <= this.MinCharacter) {
            var messages = '*請務描述問題，至少輸入10字以上，以利問題釐清，感謝您的配合！';
            ErrorMessage(messages);
        } else {
            this.UserInfo.UserReciprocationContent = document.getElementById('myTextarea').value;
            POSTUserInfo(); //post至後端資料庫
        }
    }
    /* 判斷輸入字數是否符合條件，並送出訊息-結束 */
    
    /* POST到系統回報資料庫-開始
    url:/api/ProblemReciprocation
    成功時會回傳log訊息
    {
        'Result': 636794480511576538,
        'IsSuccess': true,
        'Message': null
    }
    查證有無成功，Result為ID
    http://10.20.51.151:5000/api/UserReciprocation/{ID}
    */
    POSTUserInfo() {
        $(document).ready(function () {
            $.ajax({
                type: 'POST',
                url: '/api/ProblemReciprocation',
                data: this.UserInfo,
                success: function (result) {
                    if (result.IsSuccess === true) {
                        var Title = '傳送成功:'
                        var Msg = '問題已送出，請靜候問題回覆。';
                        RemoveURCard();
                        ImportantMessage(Title, Msg);
                        var ID = result.Result
                        var JsonUrl = `http://10.20.51.151:5000/api/UserReciprocation/${ID}`;
                        console.log(JsonUrl);
                    } else if (result.IsSuccess === false) {
                        var Title = '發生錯誤:';
                        var Msg = `${result.Message}。`;
                        ImportantMessage(Title, Msg);
                        console.log('ERROR:', result.Message);
                    }
                }
            });
        });
    }
    /* POST到系統回報資料庫-結束 */
    
    /* 錯誤訊息顯示-開始 */
    ErrorMessage(messages) {
        document.getElementById('ErrorMessage').innerHTML = messages;
        setTimeout(function () {
            document.getElementById('ErrorMessage').innerHTML = '';
        }, 3000);
    }
    /* 錯誤訊息顯示-結束 */
    /* 移除canvas標籤-開始 */
    RemoveCanvas(canvas) {
        document.body.removeChild(canvas);
    }
    /* 移除canvas標籤-結束 */
    RemoveURCard() {
        var RemoveURCard = document.getElementById('URCard');
        document.body.removeChild(RemoveURCard);
        document.getElementsByTagName('body')[0].style.overflow = '';
        document.getElementsByTagName('body')[0].style.position = '';
    }
    /* 點擊確認後，提示訊息-開始 */
    ImportantMessage(Title, Msg) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        document.getElementsByTagName('body')[0].style.position = 'relative';
        var MagDiv = document.createElement('div');
        MagDiv.id = 'MagCard';
        MagDiv.innerHTML = `\
        <div id='magbox'> \
            <h1>${Title}</h1> \
            <p>${Msg}</p> \
            <button onclick='RemoveMagCard()'>確定</button> \
        </div>`
        document.body.appendChild(MagDiv);
    }
    /* 點擊確認後，提示訊息-結束 */
    /* 移除MagCard標籤-開始 */
    RemoveMagCard(id) {
        var RemoveMagCard = document.getElementById('MagCard');
        document.body.removeChild(RemoveMagCard);
        document.getElementsByTagName('body')[0].style.overflow = '';
        document.getElementsByTagName('body')[0].style.position = '';
    }
    /* 移除MagCard標籤-結束 */
}

export default new UserReciprocation()