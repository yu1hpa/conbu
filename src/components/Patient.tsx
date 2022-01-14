import React from "react";
import axios from "axios";

type typePatientsState = {
  patients: typePatients;
  stat: boolean;
};

type typePatients = {
  date?: string;
  npatients?: number;
  adpatients?: number;
};


function fetchPatient() {
  let BASE_URI = "https://data.corona.go.jp/converted-json"
  let endpoint = `${BASE_URI}/covid19japan-npatients.json`

  return new Promise((resolve, reject) => {
    axios.get(endpoint)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

class Patient extends React.Component<{}, typePatientsState> {
  constructor(props: {}){
    super(props);
    this.state = {
      patients: {
        date: "",
        npatients: null,
        adpatients: null,
      },
      stat: false,
    };
  }

  // fetch `date` and `adpatients`
  fetchTodaysInfo(): [number, number]{
    let { patients, stat } = this.state;

    let out = Object.entries(patients).map(([key, value]) => ({key, value})).pop()['value'];
    let convToObj = Object.entries(out).map(([key, value]) => ({key, value}));

    let todaysInfo: [number, number];
    return todaysInfo = [
      convToObj[0]['value'], convToObj.pop()['value']
    ]
  };

  primeFactors(n: number) {
    const factors = [];
    let divisor = 2;

    while (n >= 2) {
      if (n % divisor == 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

  componentDidMount() {
    fetchPatient()
    .then((res) => {
      this.setState({
        patients: res,
        stat: true
      });
    })
    .catch(() => {
      console.log("Fetch error");
    });
  }


  render() {
    if (!this.state.stat){
      return(
        <div>...loading</div>
      );
    } else {
      let [date, adp] = this.fetchTodaysInfo();
      let factors = this.primeFactors(adp);
      return(
        <div>
          <div className="flex justify-center">
            <h1 className="text-5xl font-mono text-pink-800">
              CONBU
            </h1>
          </div>
          <div className="flex justify-center">
            <span className="underline decoration-green-600 text-pink-800">CO</span>
              VID-19 INFECTED PEOPLE SOI
            <span className="underline decoration-green-600 text-pink-800">N</span>
              SUU
            <span className="underline decoration-green-600 text-pink-800">BU</span>NKAI
            (素因数分解)
          </div>

          <br />
          <br />
          <br />

          <div className="flex justify-center">
            <h2 className="text-2xl">
              <span className="text-base">新規感染者(全国)</span>
              <br />
              <strong className="underline decoration-red-600">+ {adp}</strong>
              <span className="text-base">人</span>
            </h2>
          </div>

          <br />
          <br />

          <div className="flex justify-center">
            <h2 className="text-2xl">
              <span className="text-base">素因数分解</span>
              <br />
              <strong>
                {Object.keys(factors).map(key => (
                  <span key={key} className="underline decoration-green-600 px-2">{factors[Number(key)]}</span>
                ))}
              </strong>
            </h2>
          </div>

          <div className="flex justify-center item-center absolute inset-x-0 bottom-20 h-8 bg-gray-700">
            <span className="flex items-center text-slate-200">最終更新日 : {date}</span>
          </div>
        </div>
      );
    }
  }
}

export default Patient;
