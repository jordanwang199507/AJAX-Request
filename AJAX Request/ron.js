var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
var quote = document.querySelector("#quote");
var xhrBtn = document.querySelector("#xhr");
var fetchBtn = document.querySelector("#fetch");
var axiosBtn = document.querySelector("#axios");

// XHR
xhrBtn.addEventListener("click", function(){
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function(){
        if(XHR.readyState ==4 && XHR.status == 200){
            var data = JSON.parse(XHR.responseText);
            quote.innerText = data;
        }
    }
    XHR.open("GET", url);
    XHR.send();
});

// FETCH
fetchBtn.addEventListener("click", function(){
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(function(data){
        quote.innerText = data[0];
    })
    .catch(function(){
        alert("ERROR!");
    })
});

function handleErrors(res){
    if(!res.ok){
        throw Error(res.status);
    }
    return res;
}

function parseJSON(res){
    return res.json().then(function(parsedData){
        return parsedData;
    });
}

// jQuery
$("#jquery").click(function(){
    $.get(url)
    .done(function(data){
        $("#quote").text(data);
    })
    .fail(function(){
        console.log("something wrong");
    })
});

// Axios
axiosBtn.addEventListener("click", function(){
    axios.get(url)
    .then(addQuote)
    .catch(handleErr);
});

function addQuote(res){
    quote.innerText = res.data[0];
}

function handleErr(err){
    if(err.response){
        console.log("Problem with Response", err.response.status); //response 404 wrong address
    } else if(err.request){
        console.log("Problem with Request!"); //invalid url
    } else {
        console.log("Error", err.message);
    }
}

// axiosbtn.addEventListener("click",function(){
//     axios.get(url)
//     .then(function(res){
//         quote.innerText = res.data[0];
//     })
//     .catch(function(){
//         alert("ERROR!");
//     })
// });