/* file: api.js
 * author: russell loewe
 * proj site: https://github.com/russloewe/WebApp
 * date: June 2019
 * desc:
 * keep all the logic that can be effected by changes to web api here
 */
 
function handlePageCards (cardList) {
	// changes to web api should be dealt with here, not in exported functions
	
	const newCards = cardList.map( card => {
		const newCard = card;
		/* add the url to the page object */
		newCard.url = pageIdtoUrl(card.id);
		return newCard;
	});
	return newCards;
}
		
function pageIdtoUrl (id) {
	// changes to web api should be dealt with here, not in exported functions
	return ("/pages/id/"+id)
}
export function getUserStatus(cb) {
	// Web api to get user status
        var tms = new XMLHttpRequest();
        tms.open('GET', '/auth/status', true);
        tms.timeout = 1000;
        tms.ontimeout = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onerror = function (e) {
            cb(new Error("Request Error"), null);
        }
        tms.onload = function (e){
            if (tms.status == 200 && tms.readyState == 4) {
                const response = JSON.parse(tms.responseText);
                cb(null, response); 
            } else if ((tms.status == 500 || tms.status == 400) && tms.readyState == 4) {
                cb(new Error("Something wack with response"), null);
            } 
        }
        tms.send(null);
 };
 
export function getPageCards(topic, cb) {
	// use web api to get array of pages, but only like title 'n junk
        var tms = new XMLHttpRequest();
        tms.open('GET', '/pages/topic/'+topic, true);
        tms.timeout = 1000;
        tms.ontimeout = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onerror = function (e) {
            cb(new Error("Request Error"), null);
        }
        tms.onload = function (e){
            if (tms.status == 200 && tms.readyState == 4) {
                const response = JSON.parse(tms.responseText);
                cb(null, handlePageCards(response)); // add urls to each card obj 
            } else if ((tms.status == 500 || tms.status == 400) && tms.readyState == 4) {
                cb(new Error("Something wack with response"), null);
            } 
        }
        tms.send(null);
    };
    
export function getPageCardsAll(cb) {
	// use web api to get array of pages, but only like title 'n junk
        var tms = new XMLHttpRequest();
        tms.open('GET', '/pages/all/topics', true);
        tms.timeout = 1000;
        tms.ontimeout = function (e) {
            cb(new Error("Timeout"), null);
        }
        tms.onerror = function (e) {
            cb(new Error("Request Error"), null);
        }
        tms.onload = function (e){
            if (tms.status == 200 && tms.readyState == 4) {
                const response = JSON.parse(tms.responseText);
                cb(null, handlePageCards(response)); // add urls to each card obj 
            } else if ((tms.status == 500 || tms.status == 400) && tms.readyState == 4) {
                cb(new Error("Something wack with response"), null);
            } 
        }
        tms.send(null);
    };
    
export function getPageData(id, cb){
	// Use web api to get page data and return as json obj
	var tms = new XMLHttpRequest();
	tms.open('GET', pageIdtoUrl(id), true);
	tms.timeout = 1000;
	tms.ontimeout = function (e) {
		cb(new Error("Timeout"), null);
	}
	tms.onerror = function (e) {
		cd(new Error("Request Error"), null);
	}
	tms.onload = function (e) {
		if (tms.status == 200 && tms.readyState == 4) {
			const response = JSON.parse(tms.responseText);
			cb(null, response);
		} else {
			cb(new Error("Something wack with response"), null);
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

