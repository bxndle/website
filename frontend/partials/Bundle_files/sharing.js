(function () {

  angular
    .module('bundle_app')
    .service('sharing', sharing);

  sharing.$inject = ['Socialshare'];

  function sharing(Socialshare) {
    var facebook = function () {
      var send = function () {
        Socialshare.share({
          'provider': 'facebook',
          'attrs': {
            'socialshareProvider' : 'facebook',
            'socialshareText' : 'Bundle',
            'socialshareSource' : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/logo_on_bg.png',
            'socialshareType' : 'send',
            'socialshareRedirectUri' : 'http://joinbundle.com',
            'socialshareVia' : '245513585960194',
            'socialshareUrl' : 'http://joinbundle.com',
          }
        });
      }

      var share = function () {
        Socialshare.share({
          'provider': 'facebook',
          'attrs': {
            'socialshareProvider' : 'facebook',
            'socialshareText' : 'Bundle',
            'socialshareSource' : 'https://s3.us-east-2.amazonaws.com/bundle-image-storage/logo_on_bg.png',
            'socialshareType' : 'share',
            'socialshareVia' : '245513585960194',
            'socialshareUrl' : 'http://joinbundle.com',
          }
        });
      }

      return {
        send : send,
        share : share
      }
    }

    var messenger = function () {
      var send = function () {
        console.log('ok');
        Socialshare.share({
          'provider': 'facebook-messenger',
          'attrs': {
            'socialshareUrl' : 'http://joinbundle.com'
          }
        });
      }

      return {
        send : send
      }
    }

    return {
      facebook : facebook,
      messenger : messenger
    }
  }

})();
