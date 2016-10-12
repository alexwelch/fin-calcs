(function(){
  window.NPV = function(){
    var base = this;

    // energy - KWH
    // price - PPA price - price per KWH
    // annualExpenses - dollars
    // term - years
    base.calculate = function(energy, price, annualExpenses, term, annualPriceIncrease){
      // energy production degrades by .5% / year
      // PPA price increases by x (default 3)% per year
      // expenses increase by 1.5% per year
      grossRevenue = energy * price
      debugger;
    };
  };

  (new NPV()).calculate(158000, .10, 75, 20, .03);
})();

