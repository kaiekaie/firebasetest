var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var json = [];
var schedule = require('node-schedule');

let checkFunc = function (json, callback) {

  if (json.length > 0) {
    json.forEach((element, i) => {

      request(element.url, function (error, response, html) {
        if (html) {

          var $ = cheerio.load(html);
          element.abbosite = false;

          $("body a:contains(Mobilabonnement)").first().filter(function () {


            element.abbosite = $(this).attr("href");



          });

          if (!element.abbosite) {

            $("body a:contains(Abonnement)").first().filter(function () {

              element.abbosite = $(this).attr("href");

            });

          }
          if (!element.abbosite) {

            $("header a:contains(Abonnement)").first().filter(function () {

              element.abbosite = $(this).attr("href");

            });

          }

          if (!element.abbosite) {
            
                        $("body a:contains(abonnoment)").first().filter(function () {
            
                          element.abbosite = $(this).attr("href");
            
                        });
            
                      }

             if (!element.abbosite) {
                        
                          $("body a[title='Mobilabonnement']").first().filter(function () {
                        
                               element.abbosite = $(this).attr("href");
                      
                            });
                        
                  }

                  if (!element.abbosite) {
                      console.log(element);
                      $("body a:contains(Mobil)").first().filter(function () {
                    
                           element.abbosite = $(this).attr("href");
                  
                        });
                    
              }

        }else {
          console.log(element.name);
        }

      });


    });

  }
  setTimeout(function () {
    callback(json)

  }, 2000);

}

let checkForAbbofunc = function () {


  // Let's scrape Anchorman 2
  url = 'https://mobiltelefoni.no/mobiloperat%C3%B8rer';
  let url2 = 'https://mobilabonnement1.no/mobiloperatorer/';
  let srcurl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDgPgZfLWhbNtLNuOeDxUYXaxL4Uau_i14&cx=017576662512468239146:omuauf_lfve&q=chess+mobilabbonoment'

  request(url2, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var title, release, rating;

      $(".content-wp .main ul").first().filter(function () {
        var data = $(this);
        data.children().each(function (i, element) {
          let info = {};
          // let url = $(element).find("a").attr("href");

          info.name = $(element).first().text();
          let url = info.name.replace(" ", "");
          info.url = `http://www.${url.toLowerCase()}.no`;
          json.push(info);
        });
      })
      checkFunc(json, function (test) {

        fs.writeFile('output.json', JSON.stringify(test, null, 4), function (err) {
          console.log('File successfully written! - Check your project directory for the output.json file');
        })
      });


    }

  })
}


var j = schedule.scheduleJob('*/45 * * * *', function () {
  console.log("running function!");
  checkForAbbofunc();
});


app.get('/scrape', function (req, res) {
  checkForAbbofunc();
  
  fs.readFile('output.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    res.send(JSON.parse(data));
  });

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;