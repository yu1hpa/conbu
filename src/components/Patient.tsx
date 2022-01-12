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
          <div>
            <h1>
              Number of COVID Infected people prime factor decomposition
            </h1>
            <h1>
              (コロナ感染者数の素因数分解)
            </h1>
          </div>

          <div>最新({date}) : {adp}人</div>
          <div>
            素因数分解 :
            {Object.keys(factors).map(key => (
              <span key={key}>  {factors[Number(key)]}</span>
            ))}
            </div>
        </div>
      );
    }
  }
}

export default Patient;
