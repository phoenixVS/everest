exports('prematch_event', (params, done) => {
  const preloader = $('#page-preloader');
  preloader.children('img').remove();
  preloader.removeClass('done').addClass('opaci');
  let fromCoupon = false;
  if (performance.navigation.type == 1) {
    $('.prematch').empty();
    insertHtmlModules({
      '.prematch': [
        'prematch/prematch_event.html',
      ]
    }, afterViewLoad);
  }
  else {
    if ($('.prematch .play-table').length != 0) {
      $('.prematch').empty();
      fromCoupon = true;
    }
    if ($('.event-date').length == 0) {
      insertHtmlModules({
        '.prematch': [
          'prematch/prematch_event.html',
        ]
      }, afterViewLoad);
    }
    else {
      afterViewLoad();
    }
  }
  function afterViewLoad() {
    const PD = params.PD;
    const CT = params.CT;

    const leagueID = params.ligID;
    const eventID = params.matchID;

    /*function encodeURL(pd) {
      const url = encodeURIComponent(pd);
      return url
    }
    */
    let url = 'https://bestline.bet/api2/?key=league&leagueId=' + leagueID;

    httpGet(url, 'prematch');
    // Fetch API request
    function httpGet(url, name) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (name == 'prematch') {
            let event = [];
            data.events.forEach((item) => {
              if (item.id == eventID) {
                event = item.odds;
              }
            })
            console.log(event);
            //const tree = growTree(data);
            renderPrematch(event);
          }
          else {
            throw new Error('Uncorrect handler name.');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    /*  function growTree(data) {
        let curMA = '';
        let curMG = '';
        let tree = [];
        tree.MG = [];
        data.map((item, index) => {
          if (item.type === 'CL') {
            tree.push(item);
          }
          else {
            if (item.type === 'EV') {
              tree.push(item);
            }
            else {
              if (item.type === 'MG') {
                let skipStatus = 0;
                for (mg of window.blackList.sports.MG) {
                  if (mg == item.ID || (typeof item.PD !== 'undefined' ? item.PD.includes(mg) : false)) {
                    skipStatus = 1;
                    break;
                  }
                  else {
                  }
                }
                if (skipStatus == 1) {
                  curMG = '';
                }
                else {
                  tree.MG.push(item);
                  curMG = item;
                  curMG.MA = [];
                }
              }
              else {
                if (item.type === 'MA') {
                  if (curMG == '') {
  
                  }
                  else {
                    curMG.MA.push(item);
                    curMA = item;
                    curMA.PA = [];
                  }
                }
                else {
                  if (item.type === 'PA') {
                    if (curMG == '') {
  
                    }
                    else {
                      curMA.PA.push(item);
                    }
                  }
                }
              }
            }
          }
        });
        console.log('filtered: ', tree);
        return tree;
      }
  */
    // Convert fractial to decimal
    /*modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };*/

    /*  function transformDay(str) {
        if (str) {
          const year = str.substring(0, 4);
          let month = parseInt(str.substring(4, 6));
          month--;
          const day = str.substring(6, 8);
          let time = str.substring(8, 12);
          const ls2lt = time.substring(0, 2);
          time = time.replace(ls2lt, `${ls2lt}: `)
  
          
          const date = `${time}`;
          const dt = new Date(year, month, day).getTime();
  
          return [date, dt]
        } else {
          return ''
        }
      };
  */
    function renderPrematch(data) {
      let render = new Promise((resolve, reject) => {
        $('.prematch-title .sport-name').text(sessionStorage.getItem('prematchSport') + ' / ');
        $('.prematch-title .league').text(sessionStorage.getItem('prematchLeague'));
        $('.event-name').text(' / ' + sessionStorage.getItem('prematchEvent'));

        /*for (mg of data.MG) {
          if (mg.N2 == 'Start Time') {
            document.querySelector('.event-date').innerText = new Date(transformDay(mg.BC)[1]).toDateString();
            break;
          }
        }

        // coef-table
        $(`[data-id=coef_table]`).addClass('event');
        data.MG.forEach((mg, i) => {
          if (i > 1) {
            $('.prematch-table .coeficient-table').append(`
                  <div data-id="row_info" data-row-status="not_active" data-coef-id="${mg.IT}" data-pd="${mg.PD ? mg.PD : 'empty'}" class="row info det" style="height: 50px; border-bottom: 0.5px solid black;">
                    <div class="cell">
                      <p class="font">${mg.NA}</p>
                    </div>
                  </div>
              `);
          }
        });*/
        let ids = [];
        data.forEach((od) => {
          $('.coeficient-table').append(`
          <div class="row info det active" style="height: 50px; border-bottom: 0.5px solid black; position: relative;">
          <div class="cell" style="position: relative;">
            <p class="font">${od.name}</p>
          </div>
        </div>

        <div data-id="${od.outcomes[0].id}" data-bet="G40" class="row" style="height: auto;">
        </div>
          `);

          od.outcomes.forEach((item) => {
            let outcome = item.outcome;
            if (item.outcome.includes('$')) {
              if (item.outcome.includes('1')) {
                outcome = '1'
              } else if (item.outcome.includes('2')) {
                outcome = '2';
              } else if (item.outcome.includes('X')) {
                outcome = 'X';
              }
            } else if (item.outcome.includes('u')) {
              outcome = 'Under'
            } else if (item.outcome.includes('o')) {
              outcome = 'Over'
            }
            $(`[data-id="${od.outcomes[0].id}"]`).append(`
            <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
            <button style="padding-left: 10px;" class="button coefficient">
              <span data-id="bet_name_G40" class="font m-white">${outcome}</span>
              <span class="font coeff">${Math.round(parseFloat(item.oddValue) * 100) / 100}</span>
            </button>
          </div>
            `);
          })

        })

        resolve();
      });
      render
        .then(
          response => {
            return new Promise((resolve, reject) => {/*
              data.MG.forEach((mg, i) => {
                if (mg.DO == 1 && i > 1) {
                  const cur = $(`[data-coef-id="${mg.IT}"]`);
                  cur.addClass('active');
                  cur.removeClass('not-active');
                  cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  data.MG.forEach((mg) => {
                    if (mg.IT == cur.data('coefId') && mg.MA.length > 0) {
                      let new_item = $(`<div data-id="coef_row" data-bet="${mg.IT}" class="row" style="height: auto;">
                        </div>`).hide();
                      cur.after(new_item);
                      if ((mg.MA[0].PY !== 'cj' && mg.MA[0].PY !== 'CJ' && mg.MA[0].PY !== 'cm') || mg.MA[0].SY == 'A'/* && typeof mg.MA[0].PA[0].OD !== 'undefined' ) {
                        let counter = 0, cb_counter = 1;
                        if (mg.MA[0].PY == 'cb') {
                          for (item of mg.MA) {
                            if (item.PY == 'cb') {
                              if (cb_counter) {
                                cb_counter--;
                                counter++;
                              }
                              else {
                                break;
                              }
                            }
                            if (item.PY == 'cf') {
                              counter++;
                            }
                          }
                        }
                        if (mg.MA[0].PY == 'f') {
                          counter = 0;
                          for (item of mg.MA) {
                            if (item.PY == 'ck' || item.PY == 'f' || item.PY == 'dr') {
                              if (item.PY == 'dr') {
                                counter--;
                              }
                              if (counter > 1 && item.PY == 'f') {
                                counter--;
                                counter--;
                              }
                              counter++;
                            }
                          }
                        }
                        if (counter == 1) counter = 0;
                        mg.MA.map(ma => {
                          const div = document.createElement('div');
                          div.className = `bets_column`;
                          if (ma.SY == 'cy') {
                            div.classList.add('ma-title');
                          }
                          if (mg.MA.length > 1) {
                            div.appendChild(titleTemplateForBets(ma, ma.SY == 'cy' ? true : false));
                          }
                          ma.PA.map(pa => {
                            div.appendChild(forEventDataColumnTemplate(pa, mg.SY, data[0].NA, mg.NA, data[0].CL));
                          });
                          if (counter) {
                            div.style.flex = `1 1 ${(100 / counter).toFixed(2) - 1}%`
                          }
                          if (ma.NA == '') {
                            if (ma.SY.includes('f')) {
                              div.style.flex = `1 1 66%`;
                            }
                            else {
                              div.style.flex = `1 1 33%`;
                            }
                          }
                          new_item.append(div);
                        });
                      }
                      else {
                        if (typeof mg.MA[0].PA[0].OD !== 'undefined') {
                          if (mg.MA.length > 1) {
                            mg.MA.forEach((ma, i) => {
                              mg.MA[i].PA.forEach((pa) => {
                                $(`[data-bet=${mg.IT}]`).append(`
                                <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                                <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient">
                                  <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                  <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                                </button>
                                </div>`);
                              });
                              if (mg.MA[0].CN < mg.MA[0].PA.length || mg.MA[0].CN == '2') {
                                $(`[data-bet="${mg.IT}"]`).children('.cell').addClass('half-w');
                              }
                            });
                          }
                          else {
                            mg.MA[0].PA.forEach((pa) => {
                              $(`[data-bet=${mg.IT}]`).append(`
                              <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                              <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient" >
                                <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                              </button>
                              </div>`);
                            });
                            if ((mg.MA[0].CN < mg.MA[0].PA.length && mg.MA[0].SY != 'A') || mg.MA[0].CN == '2') {
                              $(`[data-bet="${mg.IT}"]`).children('.cell').addClass('half-w');
                            }
                          }
                        }
                      }
                      new_item.slideDown('fast');
                      //RenderRows(cur.data('coefId'), ma);
                    }
                  });

                }
              });*/
              resolve();
            });
          }
        )
        .then(
          response => {
            document.querySelectorAll('.prematch-table-title .item').forEach((item) => {
              item.addEventListener('click', (event) => {
                let cur = event.target;
                while (!matches(cur, '.item')) {
                  cur = cur.parentNode;
                }
                window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2] + '/' + window.location.hash.split('/')[3] + '/' + encodeURL(cur.dataset.pd);
              });
            });
            document.querySelector('.sport-name').addEventListener('click', (event) => {
              window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2];
            });
            document.querySelector('.league').addEventListener('click', (event) => {
              window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2] + '/' + window.location.hash.split('/')[3];
            });
            // Load pd for coef_row render
            $(`[data-id=row_info]:not([data-pd="empty"])`).on('click', (ev) => {
              const cur = $(ev.target);
              if (!cur.is('[data-id="row_info"]')) {
                cur = cur.parents(`[data-id="row_info"]`);
              }
              if (cur.data('rowStatus') == 'not_active') {
                let url = 'http://bestline.bet/sports/?PD=';
                url += encodeURL(cur.data(`pd`));
                fetch(url)
                  .then((response) => {
                    return response.json();
                  })
                  .then((json) => {
                    return growTree(json);
                  })
                  .then((data) => {
                    console.log(data);

                    cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                    cur.addClass('active');
                    cur.removeClass('not-active');


                  }
                  );
              }
              else {
                cur.removeClass('active');
                cur.addClass('not-active');
                coID = cur.data('coefId');
                $(`[data-bet=${coID}]`).slideUp(250, () => { $(`[data-bet=${coID}]`).remove(); });
                cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
              }
            });
            // coef_row render (from json)
            $(`[data-id="row_info"][data-pd="empty"]`).on('click', (ev) => {
              console.log(`clicked`);
              const waitForBS = new Promise((resolve, reject) => {
                let cur = $(ev.target);
                if (cur.is('p')) {
                  cur = cur.parent().parent();
                }
                if (cur.data('rowStatus') == 'not_active') {
                  cur.data('rowStatus', 'active').attr('data-row-status', 'active');
                  cur.addClass('active');
                  cur.removeClass('not-active');
                  data.MG.forEach((mg) => {
                    if (mg.IT == cur.data('coefId') && mg.MA.length > 0) {
                      let new_item = $(`<div data-id="coef_row" data-bet="${mg.IT}" class="row" style="height: auto;">
                        </div>`).hide();
                      cur.after(new_item);
                      if ((mg.MA[0].PY !== 'cj' && mg.MA[0].PY !== 'CJ' && mg.MA[0].PY !== 'cm') || mg.MA[0].SY == 'A'/* && typeof mg.MA[0].PA[0].OD !== 'undefined' */) {
                        console.log('type1\n', mg);
                        let counter = 0, cb_counter = 1;
                        if (mg.MA[0].PY == 'cb') {
                          for (item of mg.MA) {
                            if (item.PY == 'cb') {
                              if (cb_counter) {
                                cb_counter--;
                                counter++;
                              }
                              else {
                                break;
                              }
                            }
                            if (item.PY == 'cf') {
                              counter++;
                            }
                          }
                        }
                        // if (mg.MA[0].PY == 'f') {
                        //   counter = 0;
                        //   for (item of mg.MA) {
                        //     if (item.PY == 'ck' || item.PY == 'f' || item.PY == 'dr') {
                        //       if (item.PY == 'dr') {
                        //         counter--;
                        //       }
                        //       if (counter > 1 && item.PY == 'f') {
                        //         counter -= 2;
                        //       }
                        //       counter++;
                        //     }
                        //   }
                        // }
                        if (counter == 1) counter = 0;
                        mg.MA.map(ma => {
                          const div = document.createElement('div');
                          div.className = 'bets_column';
                          if (ma.SY == 'cy') {
                            div.classList.add('ma-title');
                          }
                          if (mg.MA.length > 1) {
                            div.appendChild(titleTemplateForBets(ma, ma.SY == 'cy' ? true : false));
                          }
                          ma.PA.map(pa => {
                            div.appendChild(forEventDataColumnTemplate(pa, mg.SY, data[0].NA, mg.NA, data[0].CL));
                          });
                          if (counter) {
                            div.style.flex = `1 1 ${(100 / counter).toFixed(2) - 1}%`
                          }
                          if (mg.MA.length % 2 !== 0 || mg.MA.length % 2 === 6) {
                            div.style.flex = `1 1 30%`;
                          }
                          if (ma.NA == '') {
                            if (ma.SY.includes('f')) {
                              div.style.flex = `1 1 63.5%`;
                            }
                            else {
                              div.style.flex = `1 1 30%`;
                            }
                          }
                          new_item.append(div);
                        });
                      }
                      else {
                        if (typeof mg.MA[0].PA[0].OD !== 'undefined') {
                          if (mg.MA.length > 1) {
                            mg.MA.forEach((ma, i) => {
                              mg.MA[i].PA.forEach((pa) => {
                                $(`[data-bet=${mg.IT}]`).append(`
                                <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                                <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient">
                                  <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                  <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                                </button>
                                </div>`);
                              });
                              if (mg.MA[0].CN < mg.MA[0].PA.length || mg.MA[0].CN == '2') {
                                $(`[data-bet="${mg.IT}"]`).children('.cell').addClass('half-w');
                              }
                            });
                          }
                          else {
                            mg.MA[0].PA.forEach((pa) => {
                              $(`[data-bet=${mg.IT}]`).append(`
                              <div style="margin: auto;flex: 1 1 auto;margin-left: 1px;" class="cell">
                              <button style="padding-left: 10px;" class="button coefficient" data-FI="${pa.FI ? pa.FI : ' '}" data-ID="${pa.ID}" data-OD="${pa.OD}"data-SU="${pa.SU}" class="button coefficient" >
                                <span data-id="bet_name_${cur.data('coefId')}" class="font m-white">${shortize(pa.NA ? pa.NA : pa.HD)}</span>
                                <span class="font coeff">${pa.OD == '0/0' ? '<span class="fa fa-lock lock"></span>' : modifyBets(pa.OD)}</span>
                              </button>
                              </div>`);
                            });
                            if ((mg.MA[0].CN < mg.MA[0].PA.length && mg.MA[0].SY != 'A') || mg.MA[0].CN == '2') {
                              $(`[data-bet="${mg.IT}"]`).children('.cell').addClass('half-w');
                            }
                          }
                        }
                      }
                      new_item.slideDown('fast');
                      //RenderRows(cur.data('coefId'), ma);
                    }
                  });
                }
                else {
                  cur.removeClass('active');
                  cur.addClass('not-active');
                  coID = cur.data('coefId');
                  $(`[data-bet=${coID}]`).slideUp(250, () => { $(`[data-bet=${coID}]`).remove(); });
                  cur.data('rowStatus', 'not_active').attr('data-row-status', 'not_active');
                }

                resolve();
              });
              waitForBS
                .then(response => {
                  // $('.betslip-link').empty();
                  loadJsModules({
                    betslip_link: { loadCSS: false, loadLanguage: false }
                  });
                });
            });
            // preloader done
            preloader.addClass('done').removeClass('opaci');
            preloader.children('img').remove();

            $('[data-id=row_info]').css('position', 'relative');
            $('[data-id=row_info]').children().css('position', 'relative');

            $('.prematch-table-title .item').on('click', (event) => {
              let cur = $(event.target);
              if (cur.is('.selected')) { }
              else {
                $('.prematch-table-title .item').removeClass('selected');
                cur.addClass('selected');
              }
            });
            // go back to league
            $('.round-b').on('click', (event) => {
              window.location.hash = '/' + window.location.hash.split('/')[1] + '/' + window.location.hash.split('/')[2] + '/' + window.location.hash.split('/')[3];
            });
            loadJsModules({
              betslip_link: { loadCSS: false, loadLanguage: false }
            });
            window.scrollTo(0, 0);
          }
        );
    }
    // Shortening club name
    function shortize(name) {
      let str = name;
      if (screen.width < 350) {
        str = str.slice(0, 12);
        if (name.length > 12) {
          str += '...';
        }
        return str;
      } else if (screen.width > 350 && screen.width < 450) {
        str = str.slice(0, 16);
        if (name.length > 16) {
          str += '...';
        }
        return str;
      } else {
        str = str.slice(0, 18);
        if (name.length > 18) {
          str += '...';
        }
        return str;
      }
    }
    // Convert fractial to decimal
    modifyBets = (od) => {
      const nums = od.split('/');
      return (nums[0] / nums[1] + 1).toFixed(2)
    };
    // Render title of the column
    titleTemplateForBets = (CO, shorti) => {
      const div = document.createElement('div');
      if (CO.NA == '') {
        return div;
      }
      div.className = 'bets_title';
      div.innerHTML = `
        ${shorti ? CO.NA ? ((CO.NA == ' ' ? '&nbsp;' : CO.NA)) : '&nbsp;' : shortize(CO.NA ? ((CO.NA == ' ' ? '&nbsp;' : CO.NA)) : '&nbsp;')}
      `
      //${CO.NA && !CO.NA.includes('Count') ? CO.NA : '&nbsp;'}
      return div
    };
    // Render column for bet coef_row
    forEventDataColumnTemplate = (pa, SY, eventNA, marketNA, sport) => {
      const { NA, SU, IT, OD } = pa;
      const SU2 = (SU == 1 || typeof pa.OD === 'undefined') ? 'disabled' : '';
      const div = document.createElement('div');

      let bet = () => {
        if (SU == 9) {
          return ' ';
        }
        else {
          if (SU == 1) {
            if (OD) {
              return `<span class="fa fa-lock lock"></span>`;
            }
            else {
              return ' ';
            }
          }
          else {
            if (typeof pa.OD !== 'undefined') {
              return `<p class="font down blick">${modifyBets(pa.OD)}</p>`;
            }
            else {
              return ' ';
            }
          }
        }
      };
      div.className = `maTable__cell`;
      div.innerHTML = `
      <button class="button coefficient ${SU2}" data-BS="${pa.BS}" data-FI="${pa.FI}" data-ID="${pa.ID}" data-OD="${pa.OD}" data-SU="${pa.SU}" ${(NA || pa.HD) && (typeof pa.BL === 'undefined') ? '' : `style="justify-content: center"`}>
        ${NA ? `<p class="font ellipsis mra"> ${NA}</p>` :
          (pa.HD ?
            (pa.BL == '' ? '' : `<p class="font ellipsis mra">${pa.HD}</p>`)
            : '')}
        ${bet()}
      </button >
        `
      return div
    };
    const matches = function (el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };
    done();
  }
});