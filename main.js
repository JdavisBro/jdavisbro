function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";}

function setCookie(cname, cvalue) {;
        document.cookie = cname + "=" + cvalue + ";Secure;SameSite=Lax;path=/";
    }

function getStyle(){
    theme = getCookie('theme')
    switch(theme) {
        case "1":
            document.getElementById('pagetheme').setAttribute('href','/dark.css');
            break;
        case "2":
            document.getElementById('pagetheme').setAttribute('href','/light.css');
            break;
        case "3":
            document.getElementById('pagetheme').setAttribute('href','/gay.css');
            break;
        case "4":
            document.getElementById('pagetheme').setAttribute('href','/trans.css');
            break;
        }
    checkUrlTheme()
}

function swapStyleSheet(number) {
    setCookie('theme',number)
    switch(number) {
    case 1:
        document.getElementById('pagetheme').setAttribute('href','/dark.css');
        break;
    case 2:
        document.getElementById('pagetheme').setAttribute('href','/light.css');
        break;
    case 3:
        document.getElementById('pagetheme').setAttribute('href','/gay.css');
        break;
    case 4:
        document.getElementById('pagetheme').setAttribute('href','/trans.css');
        break;
    }
}

function setJdavis(){
    document.getElementById('jdavis').value = getCookie('jdavis')
}

function changeJdavis(){
    setCookie('jdavis',document.getElementById('jdavis').value)
} 

function setJdavisBox(){
    if (getCookie('jdavisBox')==="1") {
        document.getElementById('jdavisBox2').checked = true;
    }
    else {
        document.getElementById('jdavisBox').checked = true;
    }
}

function changeJdavisBox(){
    if (getCookie('jdavisBox')==='1') {
        setCookie('jdavisBox','0')
    }
    else {
        setCookie('jdavisBox','1')
    }
}

function bigLion(size,plmi){
    var bigspeed = 25
    if (plmi == 0) {
        size = size + 1
        if (size < 0) {swapStyleSheet
            document.getElementById("biglion").style.width = size * -1 + '%';
            document.getElementById("biglion").style.transform = "scaleX(-1)";
        } else {  
            document.getElementById("biglion").style.width = size + '%';
            document.getElementById("biglion").style.transform = "scaleX(1)";
        }
    } else {
        size = size -1
        if (size < 0) {
            document.getElementById("biglion").style.width = size * -1 + '%';
            document.getElementById("biglion").style.transform = "scaleX(-1)";
        } else {
            document.getElementById("biglion").style.width = size + '%';
            document.getElementById("biglion").style.transform = "scaleX(1)";
        }
    }
    if (size > 99) {
        plmi = 1
    } else if (size < -99) {
        plmi = 0
    }
    setTimeout(bigLion,bigspeed,size,plmi)
}

function uhohfunction(size,plmi){
    var uhOhStinky = document.getElementById("uhOhStinky");
    var uhspeed = 100;
    if (plmi == 0) {
        size = size + 1
        if (size < 0) {swapStyleSheet
            document.getElementById("uhoh").style.width = size * -1 + '%';
            uhOhStinky.volume=size*-1/100;
            document.getElementById("uhoh").style.transform = "scaleX(-1)";
        } else {  
            document.getElementById("uhoh").style.width = size + '%';
            uhOhStinky.volume=size/100;
            document.getElementById("uhoh").style.transform = "scaleX(1)";
        }
    } else {
        size = size -1
        if (size < 0) {
            document.getElementById("uhoh").style.width = size * -1 + '%';
            uhOhStinky.volume=size*-1/100;
            document.getElementById("uhoh").style.transform = "scaleX(-1)";
        } else {
            document.getElementById("uhoh").style.width = size + '%';
            uhOhStinky.volume=size/100;
            document.getElementById("uhoh").style.transform = "scaleX(1)";
        }
    }
    if (size > 99) {
        plmi = 1
    } else if (size < -99) {
        plmi = 0
    }
    setTimeout(uhohfunction,uhspeed,size,plmi)
}

function checkUrlTheme()
{
    var query = window.location.search.substring(1);
    switch(query) {
        case "dark":
            swapStyleSheet(1);
            break;
        case "light":
            swapStyleSheet(2);
            break;
        case "gay":
            swapStyleSheet(3);
            break;
        case "trans":
            swapStyleSheet(4);
            break;
    }
}


function githubEmbed(embedId,githubUrl) {
    if (sessionStorage.getItem(embedId)) {
        editEmbed(embedId,JSON.parse(sessionStorage.getItem(embedId)));
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var repo = JSON.parse(xhttp.responseText)
            editEmbed(embedId,repo);
            sessionStorage.setItem(embedId,xhttp.responseText);
            sessionStorage.setItem("lastUpdate",Date.now());
            reloadFeller()
        }
    };
    xhttp.open("GET", "https://api.github.com/repos/"+githubUrl, true);
    xhttp.send();
}

function editEmbed(embedId,repo) {
    var embed = document.getElementById(embedId);
    itemsOne = embed.getElementsByClassName("repoItems")[0];
    itemsTwo = embed.getElementsByClassName("repoItems")[1];
    itemsOne.getElementsByClassName("repoLanguage")[0].innerHTML = repo.language;
    itemsOne.getElementsByClassName("repoForks")[0].innerHTML = repo.forks_count;
    itemsOne.getElementsByClassName("repoCreated")[0].innerHTML = repo.created_at.substring(0, repo.created_at.indexOf('T'));
    itemsTwo.getElementsByClassName("repoUpdated")[0].innerHTML = repo.pushed_at.substring(0, repo.pushed_at.indexOf('T'));
    itemsTwo.getElementsByClassName("repoIssues")[0].innerHTML = repo.open_issues_count;
    itemsTwo.getElementsByClassName("repoWatchers")[0].innerHTML = repo.watchers_count;
}

function reloadFeller() {
    if (sessionStorage.getItem("lastUpdate")) {
        var date = new Date(Number(sessionStorage.getItem("lastUpdate"))).toString()
        document.getElementById("reloadFeller").innerHTML = date.substring(0,date.indexOf("GMT"));
    }
}