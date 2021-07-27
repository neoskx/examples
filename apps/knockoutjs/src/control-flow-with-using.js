import * as ko from 'knockout/build/output/knockout-latest.debug';

export default function init() {
  function ViewModel() {
    const initData = {
      city: 'London',
      coords: {
        latitude: 51.5001524,
        longitude: -0.1262362,
      },
    };
    this.cityName = ko.observable(initData.city);
    this.coordinateStr = ko.observable(JSON.stringify(initData.coords, null, 2));
    this.coordinateData = ko.observable(initData.coords);
    this.coordinateDataValid = ko.observable(true);
    this.coordinateInputClass = ko.pureComputed(()=>{
      return this.coordinateDataValid() ? "form-control" : "form-control border border-danger border-2";
    }, this);
    let timeoutHandler = null;
    this.coordinateStr.subscribe((newValue)=>{
      clearTimeout(timeoutHandler);
      timeoutHandler = setTimeout(()=>{
        this.updateView(newValue);
      }, 100);
    });

    this.updateView = function (value) {
      try {
        if (value) {
          const json = JSON.parse(value);
          this.coordinateData(json);
        } else {
          this.coordinateData(null);
        }
        this.coordinateDataValid(true);
      } catch (err) {
        console.error(err);
        this.coordinateDataValid(false);
      }
    };
  }

  ko.applyBindings(
    new ViewModel(),
    document.querySelector('#control-flow-with-using'),
  );
}
