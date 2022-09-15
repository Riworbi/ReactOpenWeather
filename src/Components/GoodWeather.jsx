import React, { Component } from "react";
import axios from "axios";
import { Cities } from "./Cities";

class GoodWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: [],
            miasta: [],
        }
    }

    miastaZaznaczone = []

    miasta = Cities;
    getWeather() {
        axios.get('http://localhost:8080/cities?miasta=' + this.miastaZaznaczone)
            .then(Response => {
                console.log(Response)
                this.setState({ weather: Response.data })
            })

    }

    DisableIfMoreThan5(value){
        if(this.miastaZaznaczone.length<5){
            this.checkIfChecked(value)
        }
        else{
            document.getElementById(value).checked = false
            delete this.miastaZaznaczone[this.miastaZaznaczone.indexOf(value)]
          
        }
        this.miastaZaznaczone = this.miastaZaznaczone.filter((a) => a);
        console.log(this.miastaZaznaczone)
    }

    checkIfChecked(value) {
        if (document.getElementById(value).checked) {
            this.miastaZaznaczone.push(value)
        }
        else {
            delete this.miastaZaznaczone[this.miastaZaznaczone.indexOf(value)]
        }
        this.miastaZaznaczone = this.miastaZaznaczone.filter((a) => a);
    }

    render() {
        const { weather } = this.state
        return (

            <div >
                    {
                        Cities.map((miasto) =>
                            <div key={miasto.name}>
                                <input type="checkbox" className="checkboxes" id={miasto.name} onClick={() => this.DisableIfMoreThan5(miasto.name)}></input>
                                <label htmlFor={miasto.name} >{miasto.name}</label>
                            </div>)
                    }

                    <div className="Weather">
                        {
                            weather.length ?
                                weather.map(weather => <div  key={weather.name}>{weather.name} {weather.feels_like}

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