exports('wsocket', (params, done) => {
  insertHtmlModules({}, () => {
    // let curID = params.sportId;

    // let urlInplay = 'http://bestline.bet/inplay/',
    //   urlGames = 'http://212.8.249.162:81/inplay.php',
    //   urlBets = 'http://bestline.bet/event/?FI=';

    // Fetch API request
    /* function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            if (curID === undefined) {
              ID = parseInt(data.DATA[0].ID);
            }
            else {
              ID = curID;
            }
            renderTable(data, ID);
          }
          else if (name == 'games') {
            console.log(data);
          }
          else if (name == 'bets') {
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } */

    const conn = new Connection({
      webSocket: "wss://echo.websocket.org",
      httpURL: "http://bestline.bet/api2/?key=inplay",
    });

    // const
    //   topicsList = document.querySelector("#topics"),
    //   topicName = document.querySelector("#topic-name"),
    //   messagesList = document.querySelector("#messages");

    // topicName.addEventListener("keydown", function (event) {
    //   if (event.key === "Enter") {
    //     event.preventDefault();

    //     const topic = topicName.value;
    //     subscribe(topic);

    //     const item = createChild(topicsList, "div"); {
    //       const cross = createChild(item, "button");
    //       cross.style.marginRight = "8px";
    //       cross.style.float = "left";
    //       cross.innerHTML = "X";
    //       cross.addEventListener("click", (ev) => {
    //         topicsList.removeChild(item);
    //         unsubscribe(topic);
    //       });

    //       const name = createChild(item, "p");
    //       name.innerHTML = topicName.value;
    //       topicName.value = "";
    //     }

    //     // scroll topics to bottom
    //     topicsList.scrollTop = topicsList.scrollHeight;
    //   }
    // });

    // function subscribe(topic) {
    //   conn.subscribe(topic, `S#${topic}#1`, (msg) => {
    //     const messageItem = createChild(messagesList, "div");
    //     messageItem.innerHTML = topic + ": " + msg;
    //   });
    // }

    // function unsubscribe(topic) {
    //   conn.unsubscribeAll(topic);
    // }

    // function createChild(parent, tagName) {
    //   const child = document.createElement(tagName);
    //   parent.appendChild(child);
    //   return child;
    // }

    // function createTimerInplay(tm, ts) {
    //   let tm_, ts_;

    //   if (tm < 10) {
    //     tm_ = '0' + tm;
    //   } else {
    //     tm_ = tm;
    //   }

    //   if (ts < 10) {
    //     ts_ = '0' + ts;
    //   } else {
    //     ts_ = ts;
    //   }

    //   return tm_ + ':' + ts_;
    // }

    // function startTimerInplay() {
    //   let timers = $('.timer-el');
    //   let interval = setInterval(function () {
    //     for (let i = 0; i < timers.length; i++) {

    //       if ($(timers[i]).data("dc") == 1) {

    //         if ($(timers[i]).data("tt") == 0) {
    //           $(timers[i]).text("Break");
    //         } else {
    //           if ($(timers[i]).data("tm") == 0) {

    //             let tu = $(timers[i]).data("tu");
    //             let etu = tu.toString();

    //             let years = etu.substring(0, 4),
    //               month = etu.substring(4, 6),
    //               day = etu.substring(6, 8),
    //               hours = etu.substring(8, 10),
    //               minute = etu.substring(10, 12),
    //               second = etu.substring(12, 14);

    //             $(timers[i]).data("tm", minute);
    //             $(timers[i]).data("ts", second);

    //             let tm = parseInt($(timers[i]).data("tm"));
    //             let ts = parseInt($(timers[i]).data("ts"));

    //             if (ts == 59) {
    //               tm = tm + 1;
    //               ts = 0;
    //             } else {
    //               ts = ts + 1;
    //             }

    //             $(timers[i]).text(createTimerInplay(tm, ts));

    //             $(timers[i]).data("tm", tm);
    //             $(timers[i]).data("ts", ts);
    //           } else {
    //             let tm = parseInt($(timers[i]).data("tm"));
    //             let ts = parseInt($(timers[i]).data("ts"));

    //             if (ts == 59) {
    //               tm = tm + 1;
    //               ts = 0;
    //             } else {
    //               ts = ts + 1;
    //             }

    //             $(timers[i]).text(createTimerInplay(tm, ts));

    //             $(timers[i]).data("tm", tm);
    //             $(timers[i]).data("ts", ts);
    //           }
    //         }
    //       } else {
    //         $(timers[i]).text(" ");
    //       }
    //     }
    //   }, 1000);
    //   window.inplay_interval = interval;
    // }

    // function renderTable(data, ID) {
    //   //window.intervalCount = 0;
    //   //window.intervals = new Array();
    //   $(`[data-id="play-table"]`).empty();
    //   let promise = new Promise((resolve, reject) => {
    //     data.DATA.forEach(sport => {
    //       if (parseInt(sport.ID) == ID) {
    //         if (sport.ID == 1) {
    //           for (let i = 0; i < sport.CT.length; i++) {
    //             for (let j = 0; j < sport.CT[i].EV.length; j++) {
    //               if (sport.CT[i].EV[j].MA[0].PA === undefined) {
    //                 reject(new Error(ev.NA));
    //               }
    //               $(`[data-id="play-table"]`).append(`
    //                 <div class="row">
    //                 <div class="cell" data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" data-id="event">
    //                 <div data-sport-id="${sport.ID}" data-class="play-link" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link ]">
    //                   <div data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ]"> 
    //                     <p data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
    //                     <p data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
    //                   </div> 
    //                 <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ] text-right"> <div data-game-id="${sport.CT[i].EV[j].FI}" class="sport-icon play"></div> <p data-game-id="${sport.CT[i].EV[j].FI}" data-class="play-link" class="font m-white">${sport.CT[i].EV[j].SS}</p> 
    //                   <p data-find="timer" data-timer="${sport.CT[i].EV[j].FI}" data-game-id="${sport.CT[i].EV[j].FI}" data-tu="${sport.CT[i].EV[j].TU}" data-tm="${sport.CT[i].EV[j].TM}" data-ts="${sport.CT[i].EV[j].TS}" data-dc="${sport.CT[i].EV[j].DC}" class="font m-white timer-el"></p> </div> </div> </div> 
    //                   <div class="cell">
    //                     <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[0].OD.F}</button> </div> 
    //                   <div class="cell"> 
    //                     <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[1].OD.F}</button>
    //                   </div> 
    //                   <div class="cell">
    //                     <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[2].OD.F}</button> 
    //                   </div>
    //                 </div>`);
    //             }
    //             $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
    //             <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
    //             <div class="cell"> <p class="font">1</p> </div> 
    //             <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
    //           }
    //         }
    //         else {
    //           for (let i = 0; i < sport.CT.length; i++) {
    //             for (let j = 0; j < sport.CT[i].EV.length; j++) {
    //               $(`[data-id="play-table"]`).append(`
    //                 <div class="row">
    //                 <div class="cell" data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" data-id="event">
    //                 <div data-class="play-link" data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link ]">
    //                   <div data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ]"> 
    //                     <p data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[0]} vs</p>
    //                     <p data-sport-id="${sport.ID}" data-game-id="${sport.CT[i].EV[j].FI}" class="font m-white ellipsis">${sport.CT[i].EV[j].NA.split('vs')[1]}</p>
    //                   </div> 
    //                 <div data-game-id="${sport.CT[i].EV[j].FI}" class="[ play-link-block ] text-right"> <div data-game-id="${sport.CT[i].EV[j].FI}" class="sport-icon play"></div> <p data-game-id="${sport.CT[i].EV[j].FI}" data-class="play-link" class="font m-white">${sport.CT[i].EV[j].SS}</p> 
    //                 <p data-find="timer" data-timer="${sport.CT[i].EV[j].FI}" data-game-id="${sport.CT[i].EV[j].FI}" data-tu="${sport.CT[i].EV[j].TU}" data-tm="${sport.CT[i].EV[j].TM}" data-ts="${sport.CT[i].EV[j].TS}" data-dc="${sport.CT[i].EV[j].DC}" class="font m-white timer-el"></p> </div> </div> </div>
    //                   <div class="cell">
    //                     <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[0].OD.F}</button> 
    //                   </div>
    //                   <div class="cell">
    //                     <button class="button coefficient" data-class="play-link"></button> 
    //                   </div>
    //                   <div class="cell"> 
    //                     <button class="button coefficient" data-class="play-link">${sport.CT[i].EV[j].MA[0].PA[1].OD.F}</button>
    //                   </div> 
    //                 </div>`);
    //             }
    //             $(`[data-id="play-table"]`).append(`<div class="row [ info ]"> 
    //             <div class="cell"> <p class="font">${sport.CT[i].NA} </p> </div> 
    //             <div class="cell"> <p class="font">1</p> </div> 
    //             <div class="cell"> <p class="font">X</p> </div> <div class="cell"> <p class="font">2</p> </div></div>`);
    //           }
    //         }

    //       } else {
    //         return true;
    //       }
    //     });
    //     resolve();
    //   });
    //   promise
    //     .then(
    //       (response) => {
    //         // Handle opening of game section
    //         $(`[data-id=event]`).on('click', (event) => {
    //           let id = $(event.target).data('gameId');
    //           let sport = $(event.target).data('sportId');
    //           let curURL = window.location.href;
    //           //if filter is active - remove it from hash
    //           if (window.location.hash.split('/')[1] == 'filter') {
    //             window.location.hash = '';
    //             window.location.href += `/event/${sport}/${id}`;
    //           }
    //           else {
    //             if (curURL.includes('#')) {
    //               window.location.href += `/event/${sport}/${id}`;
    //             }
    //             else {
    //               window.location.href += `#/event/${sport}/${id}`;
    //             }
    //           }
    //         });
    //         // Preloader finishes
    //         const preloader = $('#page-preloader');
    //         if (preloader.data(`status`) != 'done') {
    //           preloader.addClass('done');
    //           preloader.data(`status`, 'done').attr('data-status', 'done');
    //         }
    //       },
    //       (error) => {
    //         console.log(`Event name: ${err}`);
    //       });
    //   startTimerInplay();
    // }
    done();
  });
});