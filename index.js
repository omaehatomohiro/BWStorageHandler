var BWStorageHandler = (function(){
    
    var setItem =  function(key, value, hour = null){
        localStorage.setItem(key, value);
        sessionStorage.setItem(key, value);
        var cookieString = key + "=" + value + ";path=/;SameSite=None;secure;";
        if(typeof hour === "number"){
            cookieString += ";max-age=" + hour * 60 * 60;
        }
        document.cookie = cookieString;
    }

    var getItem = function(key){
        var val = null;
        val = localStorage.getItem(key);
        if( val !== null && val !== ''){
            return val;
        }
        val = sessionStorage.getItem(key);
        if( val !== null && val !== '' ){
            return val;
        }
        var cookies = document.cookie.split('; ');
        for(var i=0,len=cookies.length;i<len;i++){
            var cookie = cookies[i].split('=');
            if(cookie[0] === key){
                return cookie[1];
            }
        }
        return null;
    }

    return {
        setItem: setItem,
        getItem: getItem
    }

})();
