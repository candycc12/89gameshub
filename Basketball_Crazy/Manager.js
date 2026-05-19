var AudioCallBack = {
	muted:false,
	beforeShowAd: () => {
		Laya.timer.scale = 0;
		Laya.stage.renderingEnabled = false //停止渲染
		Laya.updateTimer && Laya.updateTimer.pause() //停止onUpdate
		Laya.physicsTimer && Laya.physicsTimer.pause() //停止物理
		AudioCallBack.muted = Laya.SoundManager.muted;
		Laya.SoundManager.muted = true;
	},
	afterShowAd: () => {
		Laya.SoundManager.muted = AudioCallBack.muted;
		window.focus();
		Laya.stage.renderingEnabled = true //恢复渲染
		Laya.timer.scale = 1;
		Laya.updateTimer && Laya.updateTimer.resume() //恢复onUpdate
		Laya.physicsTimer && Laya.physicsTimer.resume() //恢复物理
	}
};
//*-------- Show Interstitial --------*//
function ShowInter(complete) {
	window.adShowing = true;	
	AudioCallBack.beforeShowAd();
	ysdk.adv.showFullscreenAdv({
		callbacks: {
			onClose: function(wasShown) {
			// some action after close
				window.adShowing = false;			
				AudioCallBack.afterShowAd();
				if(complete)
					complete();
			},
			onError: function(error) {
			// some action on error
				window.adShowing = false;
				AudioCallBack.afterShowAd();
				if(complete)
					complete();	
			}
		}
	});
	
}

//*-------- Show Rewarded --------*//
function ShowRewarded(success, failure) {
	window.adShowing = true;
	ysdk.adv.showRewardedVideo({
		callbacks: {
			onOpen: () => {
				AudioCallBack.beforeShowAd();
				window.rewardDone = false;
			},
			onRewarded: () => {
				window.rewardDone = true;
			},
			onClose: () => {
				if(window.rewardDone)
					success();				
				AudioCallBack.afterShowAd();
				window.adShowing = false;
				
			},
			onError: (e) => {
				if(failure)failure();
				AudioCallBack.afterShowAd();
				window.adShowing = false;				
			}
		}
	})
}

YaGames
.init()
.then(ysdk => {
	console.log('Yandex SDK initialized');
	window.ysdk = ysdk;
	window.YandexPromo = 1.0;
	window.YandexPayload = ysdk.environment.payload;
	if(ysdk.environment.payload){
		YandexPayload = parseInt(YandexPayload.replace("lvl", ""));
	}
	var endPromo = new Date(2022,6,1);
	var startPromo = new Date(2022,5,12);
	var today = new Date().getTime();
	
	if(today > startPromo.getTime() && today < endPromo.getTime())
		window.YandexPromo = 0.25;
});

function Prompt(msg, duration = 3e3) {
	if (!this.prompt_) {
		this.prompt_ = document.createElement('div');
		this.prompt_.style.cssText = "font-family:siyuan;max-width:80%;min-width:320px;padding:10px 10px 10px 10px;min-height:40px;color: rgb(255, 255, 255);line-height: 20px;text-align:center;border-radius: 4px;position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
		document.body.appendChild(this.prompt_);
	}
	this.prompt_.innerHTML = msg;
	duration = isNaN(duration) ? 3e3 : duration;
	this.prompt_.style.display = "inline";
	this.prompt_.style.opacity = '1';
	setTimeout(function() {
		var d = 0.5;
		this.prompt_.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		this.prompt_.style.opacity = '0';
		this.prompt_.style.display = "none";
	}.bind(this), duration);
}