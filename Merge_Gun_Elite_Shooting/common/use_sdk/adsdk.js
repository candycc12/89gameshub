var _banner_height = (typeof (_bannerHeight) == "undefined" ? 50 : _bannerHeight) + 10;
var _force_loadgame_done = false;
var _cysdk_ready = false;
var _isAdReady = false;
var _hasNetWork = window.navigator.onLine;
var _messageOrgin = window.location.origin||"www.fatfishgame.com";
window.onmessage = function (e) {
    e = e || event;
    if (e.origin != _messageOrgin)
    {
        console.warn("其他消息（来自：" + e.origin + "）");
        return;
    }
    let tempData = e.data + "";
    let argArr = tempData.split('|')
    let cmd = argArr[0]
    let param = argArr.length > 1 ? argArr[1] : "";
    console.log("parent onmessage", cmd, param);
    if (cmd == "showInterstitial") {
        if (!_hasNetWork)
        {
            document.getElementById("game_frame").contentWindow.postMessage("closeInterstitial", _messageOrgin);
            return;
        }
        try {
            AdBreakManager.getInstance().showInterstitial({
                beforeShowAd: () => {
                    document.getElementById("game_frame").contentWindow.postMessage("beforeShowAd", _messageOrgin);
                },
                afterShowAd: () => {
                    document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
                },
                closeInterstitial: () => {
                    document.getElementById("game_frame").contentWindow.postMessage("closeInterstitial", _messageOrgin);
                },
                typeName: param
            });
        } catch (error) {
            console.log(error);
        }
    } else if (cmd == "showReward") {
        if (!_hasNetWork)
        {
            document.getElementById("game_frame").contentWindow.postMessage("fail", _messageOrgin);
            promptMessage("No ads temporarily, try it later");
            return;
        }


        if (!AdBreakManager.getInstance().canShowReward()) {
            document.getElementById("game_frame").contentWindow.postMessage("fail", _messageOrgin);
            promptMessage("No ads temporarily, try it later");
            return;
        }
        AdBreakManager.getInstance().showReward({
            beforeShowAd: () => {
                document.getElementById("game_frame").contentWindow.postMessage("beforeShowAd", _messageOrgin);
            },
            afterShowAd: () => {
                document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
            },
            rewardComplete: () => {
                document.getElementById("game_frame").contentWindow.postMessage("close", _messageOrgin);
            },
            rewardDismissed: () => {
                document.getElementById("game_frame").contentWindow.postMessage("fail", _messageOrgin);
            }
        });
    } else if (cmd == "showPreroll") {
        _cysdk_ready = true;
        console.log(666, 'showLoadAd showPreroll');
        AdBreakManager.getInstance().showLoadAd(()=>{
            document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
        })
    } else if (cmd == "onReady") {
        console.log(666, 'startup onReady');
        _cysdk_ready = true;
        // AdBreakManager.getInstance().startup();
    } else if (cmd == "showFloat") {
        if (!_hasNetWork)
        {
            return;
        }
        try {
            let params = param.split('_');
            let left = null;
            let top = null;
            let right = null;
            let bottom = null;
            if (params.length >= 4) {
                if (params[0] != "") {
                    top = params[0];
                }
                if (params[1] != "") {
                    left = params[1];
                }
                if (params[2] != "") {
                    bottom = params[2];
                }
                if (params[3] != "") {
                    right = params[3];
                }
            }
            window.h5sdk&&window.h5sdk.show(top, left, bottom, right);
        } catch (error) {
            console.log(error);
        }
    } else if (cmd == "hideFloat") {
        if (!_hasNetWork)
        {
            return;
        }
        window.h5sdk&&window.h5sdk.hide();
    } else if (cmd == "gaSend") {
        if (!_hasNetWork)
        {
            return;
        }
        try {
            let params = param.split('_');
            if (params.length == 1) {
                __gaSend(params[0])
            } else if (params.length >= 2) {
                __gaSend(params[0], params[1])
            }
        } catch (error) {
            console.log(error);
        }
    } else if (cmd == "gameLoadingCompleted")
    {
        try {
            if (typeof (window.h5sdk.gameLoadingCompleted) == "function") {
                window.h5sdk.gameLoadingCompleted()
            }
        }catch (error) {
            console.log(error);
        }
    }
}

function showRotateScreen() {
    let screenOrientation = (window.innerWidth > window.innerHeight) ? "horizontal" : "portrait";
    if (screenOrientation === "portrait") {
        document.getElementById("rotate").style.display = "block";
        __gaSend("turn_screen");
    } else {
        document.getElementById("rotate").style.display = "none";
        document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
        __gaSend("horizontal");
    }
}

function promptMessage(msg, duration) {
    if (!this.prompt_) {
        this.prompt_ = document.createElement('div');
        this.prompt_.style.cssText = "font-family:siyuan;max-width:80%;min-width:320px;padding:10px 10px 10px 10px;min-height:40px;color: rgb(255, 255, 255);line-height: 20px;text-align:center;border-radius: 4px;position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(this.prompt_);
    }
    this.prompt_.innerHTML = msg;
    duration = isNaN(duration) ? 2000 : duration;
    this.prompt_.style.display = "inline";
    this.prompt_.style.opacity = '1';
    setTimeout(function () {
        var d = 0.5;
        this.prompt_.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        this.prompt_.style.opacity = '0';
        this.prompt_.style.display = "none";
    }.bind(this), duration);
}

function _getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function __gaSend(myActionName, param) {
    try {
        window.h5sdk.athenaSend(myActionName, param)
    } catch (e) {
        console.log(e);
    }
}

function _append_footer_ad() {
    console.log(6666, '_append_footer_ad');
    var game_banner = document.getElementById("afc_banner_foot");
    if (game_banner) {
        var ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'display:inline-block;width:100%;height:px' + _bannerHeight + "px";
        ins.setAttribute('data-ad-client', GadAFC);
        ins.setAttribute('data-ad-slot', GadSlot);
        game_banner.appendChild(ins);
        var o = document.createElement("script");
        o.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});";
        game_banner.appendChild(o);
    }
}
$(document).ready(function () {
    document.title = gameTitle.replace(/_/, " ");
    $(window).trigger('resize');
    if (_hasNetWork)
    {
        force_load_game();

        // check_cysdk_ready();
        // setTimeout('force_cysdk_ready()', 3000);
    }
    else
    {
        force_load_game();
    }
});
function check_cysdk_ready() {
    if (_cysdk_ready) {
        AdBreakManager.getInstance().showLoadAd(()=>{
            document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
            _load_game();
        })
        setTimeout('force_load_game()', 5000);
        return;
    } else {
        setTimeout('check_cysdk_ready()', 300);
    }
}
function force_load_game() {
    if (_force_loadgame_done == false) {
        console.log(66666,'force_load_game');
        _load_game();
        _force_loadgame_done = true;
    }
}
function force_cysdk_ready() {
    if (_cysdk_ready) {
    } else _cysdk_ready = true;
}
function _load_game() {
    if (_force_loadgame_done) {
        return;
    }
    _force_loadgame_done = true;
    let iframe_game = document.getElementById('game_frame');
    iframe_game.src = "play.html";
    iframe_game.style.Opacity = 1;
    window.postMessage("gaSend|game_start_" + document.title, "*");
    _isAdReady = true;
    if (_hasNetWork)
    {
        AdBreakManager.getInstance().startup();
    }
}
$(window).resize(function () {
    if (_isAdReady)
    {
        if (typeof _force_horizontal !== 'undefined' && _force_horizontal) {
            showRotateScreen();
        }
    }
    if (_is_show_banner) {
        document.getElementById("gameframediv").style.height = (window.innerHeight - _banner_height) + "px";
        document.getElementById("afc_banner_foot").style.top = window.innerHeight - _bannerHeight + "px";
    } else {
        document.getElementById("gameframediv").style.height = window.innerHeight + "px";
    }
});
// document.addEventListener("visibilitychange", () => {
//     if (document.hidden) {} else {
//         if (!_force_loadgame_done || !_hasNetWork)
//         {
//             return;
//         }
//         try {
//             window.postMessage("showInterstitial|browse", "*");
//         } catch (e) {}
//     }
// })
class AdBreakManager {
    constructor() {
        this.showInterstitialCount = 0;
        this.lastShowInterstitialTime = 0;
        this.lastShowRewardTime = 0;
        this.INTERSTITIAL_INTERVAL = 45;
        this.rewardOptions = null;
        this._hasShowLoad = false;
        if (typeof _interstitial_intervel !== 'undefined') {
            this.INTERSTITIAL_INTERVAL = _interstitial_intervel;
        }
        this.isReady = false;
        this.showAdFn = null;
        this.preloadRewardTimeout = -1;
        this._firstDelayLoadReward = true;
    }
    static getInstance() {
        if (!this._gInstance) {
            this._gInstance = new AdBreakManager();
        }
        return this._gInstance;
    }
    showLoadAd(callback) {
        console.log("requesting showLoadAd AD", this._hasShowLoad);
        if (this._hasShowLoad) {
            callback && callback();
            return;
        }
        this._hasShowLoad = true;
        console.log("requesting showLoadAd AD", 6666);
        let _that = this;

        if (window.h5sdk == null ||  typeof (window.h5sdk.adBreak) != "function")
        {
            console.log("showLoadAd window.h5sdk null");
            if (typeof (callback) == "function" && callback) {
                callback();
            }
            return;
        }
        window.h5sdk.adBreak({
            type: 'preroll',
            name: 'new_page',
            adBreakDone: (placementInfo) => {
                if (placementInfo.breakStatus == 'viewed') {
                    _that.lastShowInterstitialTime = new Date().getTime();
                }
                console.log("window.h5sdk.adBreak adBreakDone ... breakStatus=" + placementInfo.breakStatus);
                if (typeof (callback) == "function" && callback) {
                    callback();
                }
            }
        });
    }
    showInterstitial(options) {
        let curTime = new Date().getTime()
        if (this.lastShowInterstitialTime + this.INTERSTITIAL_INTERVAL * 1000 > curTime) {
            console.log("showInterstitial ，less than " + this.INTERSTITIAL_INTERVAL + "s, ignored :", Math.floor((curTime - this.lastShowInterstitialTime) / 1000));
            if (options && options.closeInterstitial) {
                options.closeInterstitial();
            }
            return;
        }
        this.showInterstitialCount++;
        this.lastShowInterstitialTime = curTime;
        let typename = "next";
        // if (this.showInterstitialCount == 1) {
        //     typename = "start";
        // }
        typename = typeof (options.typeName) != "undefined" ? (options.typeName == "" ? typename : options.typeName) : typename
        console.log("requesting Interstitial AD", typename);
        let _that = this;
        if (window.h5sdk == null ||  typeof (window.h5sdk.adBreak) != "function")
        {
            console.log("Interstitial window.h5sdk null");
            if (options && options.closeInterstitial) {
                options.closeInterstitial();
            }
            return;
        }
        window.h5sdk.adBreak({
            type: typename,
            name: typename,
            beforeAd: () => {
                if (options && options.beforeShowAd) {
                    options.beforeShowAd();
                    options.beforeShowAd = null;
                }
                window.blur();
            },
            afterAd: () => {
                _that.lastShowInterstitialTime = new Date().getTime();
                window.focus()
                if (options && options.afterShowAd) {
                    options.afterShowAd();
                    options.afterShowAd = null;
                }
            },
            adBreakDone: (placementInfo) => {
                console.log("showInterstitial done ", placementInfo);
                if (options && options.closeInterstitial) {
                    options.closeInterstitial();
                }
            }
        });
    }
    canShowReward() {
        return 0 == this.lastShowRewardTime || (new Date().getTime() - this.lastShowRewardTime >= 3e3);
    }
    startup() {
        console.log(666,'startup',this.isReady);
        if (this.isReady)
        {
            return
        }
        this.isReady = true;
        if (window.h5sdk == null ||  typeof (window.h5sdk.adBreak) != "function")
        {
            console.log("preLoadReward window.h5sdk null");
            return;
        }
        console.log(666,'startup true');
        let curTime = new Date().getTime()
        // if (this.lastShowInterstitialTime + this.INTERSTITIAL_INTERVAL * 1000 < curTime) {
        //     window.h5sdk.adBreak({
        //         type: "start",
        //         name: "start",
        //         beforeAd: () => {
        //             document.getElementById("game_frame").contentWindow.postMessage("beforeShowAd", _messageOrgin);
        //         },
        //         afterAd: () => {
        //             document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
        //         },
        //         adBreakDone: (placementInfo) => {
        //             console.log("startup adBreakDone 111111 ", placementInfo);
        //             if (placementInfo.breakStatus == 'notReady') {
        //                 setTimeout(() => {
        //                     window.h5sdk.adBreak({
        //                         type: "start",
        //                         name: "start",
        //                         beforeAd: () => {
        //                             document.getElementById("game_frame").contentWindow.postMessage("beforeShowAd", _messageOrgin);
        //                         },
        //                         afterAd: () => {
        //                             document.getElementById("game_frame").contentWindow.postMessage("afterShowAd", _messageOrgin);
        //                         },
        //                         adBreakDone: (placementInfo) => {
        //                             console.log("startup2 adBreakDone 222222222 ", placementInfo);
        //                         }
        //                     });
        //                 }, 3000);
        //             }
        //         }
        //     });
        // }
        // this.preLoadReward();
    }
    preLoadReward() {
        if (this.showAdFn != null)
        {
            console.log("preLoadReward exists");
            return;
        }
        let _that = this;
        if (window.h5sdk == null ||  typeof (window.h5sdk.adBreak) != "function")
        {
            console.log("preLoadReward window.h5sdk null");
            return;
        }
        window.h5sdk.adBreak({
            type: "reward",
            name: "reward",
            beforeAd: this.onRewardBeforeBreak.bind(this),
            afterAd: this.onRewardAfterBreak.bind(this),
            beforeReward:(showAdFn)=>{
                console.log(666,"preLoadReward beforeReward success");
                this.showAdFn = showAdFn;
            },
            adDismissed: this.onRewardDismissed.bind(this),
            adViewed: this.onRewardComplete.bind(this),
            adBreakDone: (placementInfo) => {
                console.log("preLoadReward adBreakDone",placementInfo);
                if (placementInfo.breakStatus =='notReady')
                {
                    if (_that._firstDelayLoadReward)
                    {
                        _that._firstDelayLoadReward = false;
                        _that.preloadRewardTimeout = setTimeout(()=>{
                            _that.preLoadReward();
                        },3000)
                    }
                }
            }
        });
    }
    showReward(options) {
        this.rewardOptions = options;
        clearTimeout(this.preloadRewardTimeout);
        this.preloadRewardTimeout = -1;
        if (this.showAdFn != null)
        {
            this.showAdFn();
            console.log("showReward preLoadReward");
            return;
        }
        console.log("showReward true");
        if (window.h5sdk == null ||  typeof (window.h5sdk.adBreak) != "function")
        {
            console.log("showReward window.h5sdk null");
            this.onRewardDismissed();
            return;
        }
        window.h5sdk.adBreak({
            type: "reward",
            name: "reward",
            beforeAd: this.onRewardBeforeBreak.bind(this),
            afterAd: this.onRewardAfterBreak.bind(this),
            beforeReward: this.onBeforeReward.bind(this),
            adDismissed: this.onRewardDismissed.bind(this),
            adViewed: this.onRewardComplete.bind(this),
            adBreakDone: (placementInfo) => {
                console.log("showReward adBreakDone", placementInfo);
                if (placementInfo && (placementInfo.breakStatus != 'dismissed' && placementInfo.breakStatus != 'viewed')) {
                    promptMessage("No ads, Pls try again later");
                    this.onRewardDismissed();
                }
            }
        });
        return true;
    }
    onBeforeReward(showAdFn) {
        showAdFn();
    }
    onRewardBeforeBreak() {
        if (this.rewardOptions) {
            this.rewardOptions.beforeShowAd && this.rewardOptions.beforeShowAd();
            this.rewardOptions.beforeShowAd = null;
        }
    }
    onRewardAfterBreak() {
        if (this.rewardOptions) {
            this.rewardOptions.afterShowAd && this.rewardOptions.afterShowAd();
            this.rewardOptions.afterShowAd = null;
        }
        this.showAdFn = null;
    }
    onRewardDismissed() {
        if (this.rewardOptions) {
            this.rewardOptions.rewardDismissed && this.rewardOptions.rewardDismissed();
            this.rewardOptions.rewardDismissed = null;
        }
    }
    onRewardComplete() {
        if (this.rewardOptions) {
            this.rewardOptions.rewardComplete && this.rewardOptions.rewardComplete();
            this.rewardOptions.rewardComplete = null;
        }
    }
}
window["AdBreakManager"] = AdBreakManager;