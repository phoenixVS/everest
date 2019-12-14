exports('coef_table', (params, done) => {
  insertHtmlModules({
    // ".coeficient-table": [
    //   "main/coeficient-table.html"
    // ]
  }, () => {
    let sportId = params.sportId;
    let gameId = params.gameId;

    let urlInplay = 'http://bestline.bet/inplay/',
      urlGames = 'http://212.8.249.162:81/inplay.php',
      urlBets = 'http://bestline.bet/event/?FI=';

    if (sportId === undefined && gameId === undefined) {
      httpGet(urlInplay, 'inplay');
    }
    else if (sportId != undefined) {
      httpGet(urlInplay, 'inplay');
    }
    else {
      httpGet((urlBets + gameId.toString()), 'bets');
    }

    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'inplay') {
            let small = true;
            if (sportId === undefined) {
              let ID = parseInt(data.DATA[0].ID);
            }
            else {
              let ID = sportId;
            }
            renderCoefTable(data, ID, small);
          }
          else if (name == 'games') {
            console.log(data);
          }
          else if (name == 'bets') {
            let small = false;
            let ID = gameId;
            renderCoefTable(data, ID, small);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function renderCoefTable(data, ID, small) {
      let promise = new Promise((resolve, reject) => {
        if (small) {
          $(`[data-id=coef_table]`).empty().append(`
              <div class="row">
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">1</span>
                  <span data-id="coef-one" class="font">9.50</span> 
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">x</span>
                  <span data-id="coef-two" class="font">6.00</span>
                </button>
              </div>
              <div class="cell w33">
                <button class="button coefficient">
                  <span class="font m-white">2</span>
                  <span data-id="coef-three" class="font">2.75</span>
                </button>
              </div>
            </div>
            `);
          resolve();
        }
        else {
          resolve();
        }
      });
      promise.then(() => {
        if (small) {
          if (data != undefined) {
            data.DATA.forEach(sport => {
              if (sport.ID == ID) {
                $(`[data-id=coef-one]`).text(sport.CT[0].EV[0].MA[0].PA[0].OD.D);
                $(`[data-id=coef-two]`).text(sport.CT[0].EV[0].MA[0].PA[2].OD.D);
                $(`[data-id=coef-three]`).text(sport.CT[0].EV[0].MA[0].PA[1].OD.D);
              }
            });
          } else {
            console.log("ERROR: Data is undefined")
          }

        }
        else {
          $(`[data-id=coef_table]`).empty();
          data.RESULT.EV[0].MA.forEach((ma, i) => {
            $(`[data-id=coef_table]`).append(`
            <div class="row info">
              <div class="cell">
                <p class="font">${ma.NA}</p>
              </div>
            </div>
            <div data-id="coef_row-${i}" class="row">
            </div>
            `);
            ma.PA.forEach((pa) => {
              $(`[data-id=coef_row-${i}]`).append(`
              <div class="cell w33">
                  <button class="button coefficient">
                    <span class="font m-white"></span>
                    <span class="font">${pa.OD.D}</span>
                  </button>
                </div>
            `);
            });
          });
        }
      });
    }
    done();
  });
});  