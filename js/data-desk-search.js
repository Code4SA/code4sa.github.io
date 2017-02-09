$(function() {
  var error = function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown, jqXHR);
  };

  var SocrataDataset = function(name, baseURL, apiId, moreId) {
    var self = this;

    self.name = name;
    self.htmlURL = baseURL + '/' + moreId;
    self.id = Math.random().toString(36).substring(7);

    self.parse = function(resp) {
      self.total_hits = resp.length;
      self.hits = [];

      resp = resp.slice(0, 5);

      for (var i = 0; i < resp.length; i++) {
        var hit = resp[i];
        var summary = "";

        $.each(hit, function(key, val) {
          summary += " " + Handlebars.escapeExpression(val);
        });
        // mark() turns these into br
        summary = summary.replace(/\n/, ' ');

        var tmp = document.createElement('div');
        tmp.innerText = summary;
        new Mark(tmp).mark(stemmer(self.q), {separateWordSearch: true});

        self.hits.push({
          summary: tmp.innerHTML,
        });
      }
    };

    self.reset = function() {
      self.hits = [];
      self.total_hits = 0;
      self.searching = true;
      self.searchMoreURL = "";
    };
    self.reset();

    self.search = function(query) {
      var result = $.Deferred();

      self.searchMoreURL = self.htmlURL + '/data?q=' + query;
      self.q = query;

      $.ajax(baseURL + "/resource/" + apiId + ".json?$q=" + query)
        .done(function(resp) {
          self.searching = false;
          self.parse(resp);
          result.resolve();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          self.searching = false;
          error(jqXHR, textStatus, errorThrown);
          result.fail();
        });

      return result;
    };
  };

  var datasets = [
    new SocrataDataset("CIPC", "https://data.code4sa.org", "x6jj-hasw", "Business/SA-CIPC-Company-Names-Registration-Numbers-and-Det/f9mi-hay7"),
    new SocrataDataset("UK Land Registry", "https://data.code4sa.org", "qxgb-avr5", "Business/UK-Land-Registry/n7gy-as2q"),
    new SocrataDataset("Tender Awards 2015-2016", "https://data.code4sa.org", "9vmn-5tnb", "Government/Tender-Awards-2015-2016/kvv2-xrvr")
  ];

  var resultsContainer = $('#corporate-data-search .search-results');
  var datasetTemplate = Handlebars.compile($('#search-dataset-template').html());

  $("#corporate-data-search form").on('submit', function(e) {
    e.preventDefault();
    resultsContainer.empty();
    var q = $(this).find('[name=q]').val();

    datasets.forEach(function(dataset) {
      dataset.reset();
      resultsContainer.append(datasetTemplate(dataset));

      dataset.search(q)
        .then(function() {
          resultsContainer.find("#" + dataset.id).replaceWith(datasetTemplate(dataset));
        });
    });
  });

});
