import React, { Component,Fragment } from 'react';
import Luggage from './Luggage'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      flight: "in",
      area: "A",
      type: "a",
      highestprice: "",
      count: "",
      list: [],
      cost: "",
      touristtype: "a"
    }
  this.handleChange=this.handleChange.bind(this);
  this.handleLuggChange=this.handleLuggChange.bind(this);
  this.handleClick=this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="App">
           <a
            className="App-link"
            href="http://www.csair.com/cn/tourguide/luggage_service/carryon_luggage/free_luggage/"
            target="_blank"
            rel="noopener noreferrer"
            >行李托运规则</a>
            <br />
          <label className="App-label">航班</label>
          <select className="App-input" name="flight" value={ this.state.flight } onChange={ this.handleChange }>
            <option value="in">国内航班</option>
            <option value="out">国际航班</option>
          </select>
          <br />
          <label className="App-label">舱位</label>
          <select className="App-input" name="type" value={ this.state.type } onChange={ this.handleChange }>
            <option value="a">头等舱</option>
            <option value="b">公务舱</option>
            <option value="c">经济舱</option>           
            <option value="d">不占座婴儿</option>
          </select>
          <br />
          <label className="App-label">游客类型</label>
          <select className="App-input" name="touristtype" value={ this.state.touristtype } onChange={ this.handleChange }>
            <option value="a">普通</option>
            <option value="b">南航明珠金卡会员、天合联盟超级精英</option>
            <option value="c">南航明珠银卡会员、天合联盟精英</option>           
            <option value="d">留学生、劳务、海员</option>
          </select>
          <br />
          {
            this.getflight()
          }
          <br />
          <label className="App-label">行李件数</label>
          <input 
            className="App-input"
            name="count" 
            type="text" 
            value={this.state.count}
            onChange={this.handleChange} 
            />
            <br />
            {
              this.getheight()
            }
          <button className="App-button" onClick={this.handleClick}>计算费用</button>
          <p style={{"whiteSpace":"pre","fontSize":"20px","color":"red"}}>{this.state.cost}</p>
      </div>
    );
  }

  handleClick(){
    let cos=0;
    let cost="";
    let flag=true;
    const type=this.state.type;
    const count=Number(this.state.count);
    const list=this.state.list;
    const area=this.state.area;
    const touristtype=this.state.touristtype;
    if(count===0){
      alert("未添加行李！");
      return;
    } 
    if(this.state.flight==="in"){
      let totalweight=0;
      for(let i in list){
        if(list[i].weight>50){
          cost+="第"+(Number(i)+1)+"件行李重量超过50kg，无法托运\r\n";
          flag=false;
          continue;
        }
        if(list[i].long>60){
          cost+="第"+(Number(i)+1)+"件行李长度超过60cm，无法托运\r\n";
          flag=false;
          continue;
        }
        if(list[i].width>40){
          cost+="第"+(Number(i)+1)+"件行李宽度超过40cm，无法托运\r\n";
          flag=false;
          continue;
        }
        if(list[i].height>100){
          cost+="第"+(Number(i)+1)+"件行李高度超过100cm，无法托运\r\n";
          flag=false;
          continue;
        }
        totalweight+=list[i].weight;
      }
      if(type==="a"&&totalweight>40){
        cos=this.caculincost(totalweight,40);
      }
      if(type==="b"&&totalweight>30){
        cos=this.caculincost(totalweight,30);
      }
      if(type==="c"&&totalweight>20){
        cos=this.caculincost(totalweight,20);
      }
      if(type==="d"&&totalweight>10){
        cos=this.caculincost(totalweight,10);
      }
      if(flag)  cost="总费用￥"+cos;
      else  cost=cost+"除无法托运的，其余总费用￥"+cos;
    }
    else{
      if(type==="d"){
        if(count>1){
          alert("不占座婴儿只能携带一件行李");
          return;
        }
        for(let i in list){
          let size=list[i].long+list[i].width+list[i].height;
          if(list[i].weight>10){
            alert("不占座婴儿行李重量不能超过10kg！");
            return;
          }
          if(size>115){
            alert("不占座婴儿行李尺寸（长宽高总和）不能超过115cm！")
          }
        }
      }
      if(area==="A"){
        if(type==="a"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,1000,2000,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,1000,2000,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,1000,2000,1000,3000);
          }
        }
        if(type==="b"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,1000,2000,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000);
          }
        }
        if(type==="c"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,1000,2000,1000,3000,1000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,1000,2000,1000,3000,1000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,1000,2000,1000,3000,1000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000,1000);
          }
        }
      }
      if(area==="B"){
        if(type==="a"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,450,1300,1000,3000);
          }
        }
        if(type==="b"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000);
          }
        }
        if(type==="c"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,1,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,2,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,2,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,2,158,450,1300,1000,3000);
          }
        }
      }
      if(area==="C"){
        if(type==="a"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,1000,2000,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,1000,2000,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,1000,2000,1000,3000);
          }
        }
        if(type==="b"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,1000,2000,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,1000,2000,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000);
          }
        }
        if(type==="c"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,1000,2000,1000,3000,2000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,1000,2000,1000,3000,2000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,1000,2000,1000,3000,2000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,1000,2000,1000,3000,2000);
          }
        }
      }
      if(area==="D"){
        if(type==="a"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,450,1300,1000,3000);
          }
        }
        if(type==="b"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,450,1300,1000,3000,1000);
          }
        }
        if(type==="c"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000,1000);
          }
        }
      }
      if(area==="E"){
        if(type==="a"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,4,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,4,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,4,158,450,1300,1000,3000);
          }
        }
        if(type==="b"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,450,1300,1000,3000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,450,1300,1000,3000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,450,1300,1000,3000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000);
          }
        }
        if(type==="c"){
          if(touristtype==="a"){
            cost=this.caculoutcost(0,2,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="b"){
            cost=this.caculoutcost(20,3,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="c"){
            cost=this.caculoutcost(10,3,158,450,1300,1000,3000,1000);
          }
          if(touristtype==="d"){
            cost=this.caculoutcost(0,3,158,450,1300,1000,3000,1000);
          }
        }
      }
    }
    this.setState(() => ({
      cost: cost
    }));
  }

  caculoutcost(freeweight,freecount,freesize,cost1,cost2,cost3,cost4,cost5){
    const ncost5=cost5 || 0;
    const count=Number(this.state.count);
    const list=[...this.state.list];
    let res={
      cost: "",
      cos: 0
    };
    let arr=[];
    for(let i in list){
      if(list[i].weight>45){
        res.cost+="第"+(Number(i)+1)+"件行李重量超过45kg，无法托运\r\n";
        arr[i]=1;
        continue;
      }
      let size=list[i].long+list[i].width+list[i].height;
      if(size>300){
        res.cost+="第"+(Number(i)+1)+"件行李长宽高总和超过300cm，无法托运\r\n";
        arr[i]=1;
        continue;
      }
    }
    let faildcount=0;
    // eslint-disable-next-line
    for(let i in arr){
      faildcount++;
    }
    const leftcount=count-faildcount;
    if(faildcount>0) res.cost+="除无法托运的行李，其他可托运行李"+leftcount+"件\r\n";
    if(leftcount>freecount){
      const exceedcount=leftcount-freecount;
      const newcost=cost1+(exceedcount-1)*cost2;
      res.cost+="超件"+exceedcount+"件，费用￥"+newcost+"\r\n";
      res.cos+=newcost;
    }
    for(let i in list){
      if(arr[i]!==1){
        let size=list[i].long+list[i].width+list[i].height;
        if(size>freesize){
          res.cost+="第"+(Number(i)+1)+"件行李长宽高总和在159-300cm之间，超尺寸费用￥"+cost3+"\r\n";
          res.cos+=cost3;
        }
        if(list[i].weight>32+freeweight){
          res.cost+="第"+(Number(i)+1)+"件行李超重，超重费用￥"+cost4+"\r\n";
          res.cos+=cost4;         
        }
        if(ncost5!==0){
          if(list[i].weight>23+freeweight&&list[i]<=32+freeweight){
            res.cost+="第"+(Number(i)+1)+"件行李超重，超重费用￥"+ncost5+"\r\n";
            res.cos+=ncost5;             
          }
        }
      }
    }
    const cost=res.cost+"总费用￥"+res.cos;
    return cost;
  }

  caculincost(totalweight,num){
    const highestprice=this.state.highestprice;
    const touristtype=this.state.touristtype;
    let res=0;
    if(touristtype==="a"||touristtype==="d"){
      res=(totalweight-num)*highestprice*0.015;
    }
    if(touristtype==="b"){
      res=(totalweight-num-20)*highestprice*0.015;
    }
    if(touristtype==="c"){
      res=(totalweight-num-10)*highestprice*0.015;
    }
    if(res<0) res=0;
    return res;
  }

  getheight(){
    return this.state.list.map((item,index) => {
      return (
        <Luggage 
          key={index}
          index={index} 
          item={item}  
          LugChange={this.handleLuggChange}
          />
      );
    })
  }

  handleLuggChange(index,name,value){
    const list=[...this.state.list];
    //const list = JSON.parse(JSON.stringify(this.state.list));
    //list[index][name]=value;
    list[index] = {
      ...list[index],
      [name]: value
    }
    this.setState( () => ({
      list: list
    } ));
    //console.log(this.state.list);
  }

  getflight(){
    if(this.state.flight==="in"){
      return(
        <Fragment>
          <label className="App-label">单日最高票价</label>
          <input 
            className="App-input"
            name="highestprice" 
            type="text" 
            value={this.state.highestprice}
            onChange={ this.handleChange }
            />
        </Fragment>
      );
    }
    else return(
      <Fragment>
          <label className="App-label">区域</label>        
            <select 
            className="App-input"
            name="area" 
            value={ this.state.area } 
            onChange={ this.handleChange }
            >
              <option value="A">
                涉及日本、美洲、澳新、俄罗斯、迪拜的航程，以及新加坡始发与中国大陆间的航程
              </option>
              <option value="B">
                涉及中西亚的航程
              </option>
              <option value="C">
                涉及内罗毕及土耳其的航程
              </option>
              <option value="D">
                除涉及日本、美洲、澳新、俄罗斯、迪拜、内罗毕、中西亚及土耳其以外的国际/地区航程
              </option>
              <option value="E">
                涉及韩国始发与中国间的航程
              </option>
          </select>
      </Fragment>
    );
  }

  handleChange(event){
    const value=event.target.value;
    const name=event.target.name;
    //console.log(Number(value));
    if(name==="count") {
      if(isNaN(Number(value)) || value[value.length-1]==="."){
        //alert("行李件数只能输入自然数！");
        return;
      }
      const list=[];
      list.length=value;
      list.fill({});
      this.setState({
        list: list
      });
    }
    if(name==="highestprice"){
      if(isNaN(Number(value))){
        //alert("票价只能输入非负数！");
        return;
      }
    }
    this.setState(() => ({
      [name]: value
    }));
  }
}

export default App;
