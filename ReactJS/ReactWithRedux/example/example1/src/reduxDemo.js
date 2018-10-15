import React, {Component} from 'react';
import { createStore } from 'redux';

class ReduxDemo extends Component{
    render(){
        //Step2 Reducer: state and action
        const reducer = function(state, action){
            if(action.type==="ATTACK"){
                return action.payload;
            }
            if(action.type==="GREENATTACK"){
                return action.payload;
            }
            return state;
        };

        //Step1 Store: reducer and state
        const store = createStore(reducer, "peace");

        //Step3: Subscribe
        store.subscribe(()=>{
            console.log("Store now is: "+store.getState());
        });

        //Step4: Dispatch action
        store.dispatch({type:"ATTACK", payload:"Iron Man"});
        store.dispatch({type:"GREENATTACK", payload:"Hulk"});


        return (
            <div>
                React With Redux
            </div>
        );
    }
}
export default ReduxDemo;