function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function load(dp){
    const user = getParam('user');
    fetch(`src/user/${user}/import.js`).then(r=>{return r.text()}).then(t=>{
        eval(t);
        dp(l);
    });
    return 0;
}

function display(l){
    const teams = l.teams;
    const scores = l.scores;
    const left = l.left;
    const dif = l.dif;
    const win = l.win;
    teamNum = teams.length;
    if(prev_teamNum === 0){
        prev_teamNum = teamNum;
    }else if(!(prev_teamNum === teamNum) && !(teamNum === 0)){
        location.reload();
    }
    document.getElementById(`team-num-${teamNum}`).style.setProperty('display', 'flex');
    document.querySelectorAll(`#team-num-${teamNum}`).forEach($container => {
        if (teamNum === 2) {
            $container.querySelectorAll('.score').forEach(($score, i) => {
                $score.innerText = scores[i];
            });
            $container.querySelectorAll('.team-span').forEach(($team, i) => {
                $team.innerText = teams[i];
            });
            $container.querySelectorAll('.score-dif').forEach(($dif, i) => {
                $dif.innerText = dif;
            });
            $container.querySelectorAll('.win').forEach(($win, i) => {
                $win.style.setProperty('display', win ? 'block' : 'none');
            });
            $container.querySelectorAll('.left-race').forEach(($race, i) => {
                $race.innerText = `残レース:${left}`;
            });
        } else {
            $container.querySelectorAll('.score').forEach(($score, i) => {
                $score.innerText = scores[i];
            });
            $container.querySelectorAll('.team-span').forEach(($team, i) => {
                $team.innerText = teams[i];
            });
            $container.querySelectorAll('.dif').forEach(($dif, i) => {
                $dif.innerText = `+${scores[i] - scores[i+1]}`;
            });
            $container.querySelectorAll('.left-race').forEach(($race, i) => {
                $race.innerText = `残${left}`;
            });
        }
        $container.querySelectorAll('.team-span').forEach($span => {
            var $parent = $span.parentNode;
            var scaleX = 1;
            var translateX = 0;
            if ($span.offsetWidth > ($parent.offsetWidth - 20)) {
                scaleX = ($parent.offsetWidth - 20) / $span.offsetWidth;
                translateX = 10;
            }
            $span.style.setProperty('transform', `translateX(${translateX}px) scaleX(${scaleX})`);
        });
    });
}

var teamNum = 0;
var prev_teamNum = 0;
load(display);

setInterval(function(){
    console.log('Interval');
    load(display);
}, 3000);
