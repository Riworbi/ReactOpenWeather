import React, { Component } from "react";
import axios from "axios";


class GoodWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: []
        }
    }

    Miasta = [];

    getWeather() {
        axios.get('http://localhost:8080/cities?miasta=' + this.Miasta)
            .then(Response => {
                console.log(Response)
                this.setState({ weather: Response.data })
            })

            this.enableButtons()
    }

    addToArray(value) {
        if(this.Miasta.length>=4){
            this.disableButtons();
        }

        if (!this.Miasta.includes(value)) {
            this.Miasta.push(value)
        }
        else{
            delete this.Miasta[this.Miasta.indexOf(value)]
        }
        this.Miasta = this.Miasta.filter((a) => a);
        
    }

        disableButtons(){
            var cells = document.getElementsByClassName("checkboxes"); 
            for (var i = 0; i < cells.length; i++) { 
                cells[i].disabled = true;
            }
        }

        enableButtons(){
            var cells = document.getElementsByClassName("checkboxes"); 
            for (var i = 0; i < cells.length; i++) { 
                cells[i].disabled = false;
                this.Miasta=[]
                cells[i].checked = false;
            }
        }

    render() {
        const { weather } = this.state

        return (

            <div >
            <div>
                <input type="checkbox"  className="checkboxes" id="city1" name="city1" value="Warsaw" onClick={() => this.addToArray(document.getElementById("city1").value)}></input>
                <label htmlFor="city1"> Warsaw</label>
                <input type="checkbox"  className="checkboxes" id="city2" name="city2" value="London" onClick={() => this.addToArray(document.getElementById("city2").value)}></input>
                <label htmlFor="city2"> London</label>
                <input type="checkbox"  className="checkboxes" id="city3" name="city3" value="Berlin" onClick={() => this.addToArray(document.getElementById("city3").value)}></input>
                <label htmlFor="city3">Berlin</label>
                <input type="checkbox" className="checkboxes" id="city4" name="city4" value="New York" onClick={() => this.addToArray(document.getElementById("city4").value)}></input>
                <label htmlFor="city4">New York</label>
                <input type="checkbox" className="checkboxes" id="city5" name="city5" value="Prague" onClick={() => this.addToArray(document.getElementById("city5").value)}></input>
                <label htmlFor="city5">Prague</label>
                <input type="checkbox" className="checkboxes" id="city6" name="city6" value="Moscow" onClick={() => this.addToArray(document.getElementById("city6").value)}></input>
                <label htmlFor="city6">Moscow</label>
                <input type="checkbox" className="checkboxes" id="city7" name="city7" value="Madrid" onClick={() => this.addToArray(document.getElementById("city7").value)}></input>
                <label htmlFor="city7">Madrid</label>
                <input type="checkbox"className="checkboxes"  id="city8" name="city8" value="Zagreb" onClick={() => this.addToArray(document.getElementById("city8").value)}></input>
                <label htmlFor="city8">Zagreb</label>
                <input type="checkbox" className="checkboxes" id="city9" name="city9" value="Hong Kong" onClick={() => this.addToArray(document.getElementById("city9").value)}></input>
                <label htmlFor="city9">Hong Kong</label>
                <input type="checkbox" className="checkboxes" id="city10" name="city10" value="Tokyo" onClick={() => this.addToArray(document.getElementById("city10").value)}></input>
                <label htmlFor="city10">Tokyo</label>
                {
                    weather.length ?
                        weather.map(weather => <div key={weather.name}>{weather.name} {weather.feels_like} 
                        
         <img alt="" src={weather.icon}></img>
                       
                        </div>) : null
                }
            </div>
            <button className="SubmitButton" onClick={() => this.getWeather()}>Submit</button>
            </div>
        )
    }

}

export default GoodWeather;