(function(){
    location.searchMap = function(){
        var search = location.search;
        if (!search){
            return {};
        }

        var hashArr = search.replace('?','').split('&');
        var hashMap = {};
        for (var i = 0; i < hashArr.length; i++) {
            var tempArr = hashArr[i].split('='),
                k = tempArr[0],
                v = tempArr[1];
            if (hashMap[k]) {
                if (Array.isArray(hashMap[k])) {
                    hashMap[k].push(v);
                } else {
                    hashMap[k] = [hashMap[k], v];
                }
            } else {
                hashMap[k] = v;

            }
        }
        return hashMap;
    };
})()