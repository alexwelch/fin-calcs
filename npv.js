(function(){
  window.NPV = function(energy, unitPrice, periodicExpenses, term, periodicPriceIncrease){
    var base = this;
    base.energy = energy;
    base.unitPrice = unitPrice;
    base.periodicExpenses = periodicExpenses;
    base.term = term;
    base.periodicPriceIncrease = 1 + periodicPriceIncrease,
    base.periodicProductionIncrease = 1 - 0.05,
    base.periodicExpenseIncrease = 1.015,
    base.discountRate = 1.07;

    // energy - KWH
    // unitPrice - PPA price - price per KWH
    // expenses - per period - dollars
    // term - years
    // energy production degrades by .5% / year
    // PPA price increases by x (default 3)% per year
    // expenses increase by 1.5% per year
    // grossRevenue = energy * price

    base.calculate = function() {
      var cashFlows = base.cashFlows(),
          npv = 0;
      base._forTerm(function(i) {
        var period = i + 1;
        npv += cashFlows[i] / Math.pow(base.discountRate, period);
      });
      return _round(npv, 2);
    };

    base.cashFlows = function(){
      var cashFlows = [],
      revenues = base.revenues(),
      expenses = base.expenses();

      base._forTerm(function(i) {
        cashFlows.push(revenues[i] + expenses[i]);
      });
      return cashFlows;
    };

    base.revenues = function() {
      var revenues = [],
          energy = base.energy,
          unitPrice = base.unitPrice;

      base._forTerm(function() {
        revenue = energy * unitPrice;
        revenues.push(revenue);
        energy = energy * base.periodicProductionIncrease,
        unitPrice = unitPrice * base.periodicPriceIncrease;
      });

      return revenues;
    };

    base.expenses = function() {
      var expenses = [];
      var expense = base.periodicExpenses;

      base._forTerm(function(i) {
        expenses.push(expense);
        expense = _round(expense * base.periodicExpenseIncrease, 2);
      });

      return expenses;
    };

    base._forTerm = function(func) {
      for (i = 0; i < base.term; i++) {
        func.call(base, i);
      }
    };

    function _round(value, decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
  };

  window.calculateNpv = function() {
    var energy = parseFloat(document.getElementById('energy').value),
    price = parseFloat(document.getElementById('price').value),
    expense = parseFloat(document.getElementById('expense').value),
    term = parseFloat(document.getElementById('term').value),
    priceIncrease = parseFloat(document.getElementById('price_increase').value),
    resultContainer = document.getElementById('result');

    // npv = new window.NPV(100, .10, -1, 3, 1);
    npv = new window.NPV(energy, price, expense, term, priceIncrease).calculate();
    resultContainer.innerHTML = npv;
    return false;
  };

})();

