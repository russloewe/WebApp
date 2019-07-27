export function getSimple(target, cb) {
        var tms = new XMLHttpRequest();
        tms.open('GET', target, true);
        tms.timeout = 1000;
        tms.ontimeout = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onerror = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onload = function (e){
            if (tms.status == 200 && tms.readyState == 4) {
                var response = JSON.parse(tms.responseText);
                cb(null, response);
            } else if ((tms.status == 500 || tms.status == 400) && tms.readyState == 4) {
                cb(new Error("Timeout"), null);
            } 
        }
        tms.send(null);
    };

export function postSimple(target, jsonData, cb){
  fetch(target, {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  }).then(function(response) {
         if(response.status == 200){
            cb(null, response);
         } else if(response.status == 404){
             cb(new Error("404 response"), null);
        }
    });
}

export function getSimpleId(id, cb) {
        var tms = new XMLHttpRequest();
        tms.open('GET', '/blog/articles'+"?id="+id, true);
        tms.timeout = 1000;
        tms.ontimeout = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onerror = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onload = function (e){
            if (tms.status == 200 && tms.readyState == 4) {
                var response = JSON.parse(tms.responseText);
                cb(null, response);
            } else if ((tms.status == 500 || tms.status == 400) && tms.readyState == 4) {
                cb(new Error("Timeout"), null);
            } 
        }
        tms.send(null);
    };
