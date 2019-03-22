import React, { Component } from 'react';
import "./Luggage.css";

class Luggage extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    render(){
        return(
            <div className="Lug">
                <label>第{this.props.index+1}件行李</label>
                <br />
                <label className="Lug-label">重量</label>
                <input 
                    className="Lug-input"
                    type="text" 
                    name='weight' 
                    value={this.props.item.weight} 
                    onChange={this.handleChange}
                />   
                <br />
                <label className="Lug-label">长</label>
                <input 
                    className="Lug-input"
                    type="text" 
                    name='long' 
                    value={this.props.item.long} 
                    onChange={this.handleChange}
                />   
                <br />
                <label className="Lug-label">宽</label>
                <input 
                    className="Lug-input"
                    type="text" 
                    name='width' 
                    value={this.props.item.width} 
                    onChange={this.handleChange}
                />   
                <br />
                <label className="Lug-label">高</label>
                <input 
                    className="Lug-input"
                    type="text" 
                    name='height' 
                    value={this.props.item.height} 
                    onChange={this.handleChange}
                />   
                <br />
            </div>
        )
    }

    handleChange(e){
        const { LugChange }=this.props;
        const { index }=this.props;
        const name=e.target.name;
        const value=Number(e.target.value);
        //console.log(name);
        //console.log(value);
        if(isNaN(value)){
            //alert("行李信息请输入大于0的数值！");
            return;
        }
        //console.log(name+value);
        LugChange(index,name,value);
    }
}

export default Luggage; 