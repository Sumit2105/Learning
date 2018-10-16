import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';
class Loginscreen extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            buttonLabel: 'Register',
            isLogin: true
        }
    }

    componentWillMount(){
        var loginscreen=[];
        loginscreen.push(<Login key="login" parentContext={this} appContext={this.props.parentContext}/>);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }

    handleClick(event){
        var loginmessage;
        if(this.state.isLogin){
            var loginscreen1=[];
            loginscreen1.push(<Register key="register" parentContext={this}/>);
            loginmessage = "Already registered.Go to Login";
            this.setState({
                loginscreen: loginscreen1,
                loginmessage: loginmessage,
                buttonLabel: "Login",
                isLogin: false
            })
        }
        else{
            var loginscreen2=[];
            loginscreen2.push(<Login key="login" parentContext={this}/>);
            loginmessage="Not Registered Yet.Go to registration";
            this.setState({
                loginscreen: loginscreen2,
                loginmessage: loginmessage,
                buttonLabel: "Register",
                isLogin: true
            })
        }
    }

    render(){
        return(
                <div className="loginscreen">
                    {this.state.loginscreen}
                    <div>
                        {this.state.loginmessage}
                        <MuiThemeProvider>
                            <div>
                                <RaisedButton label={this.state.buttonLabel} 
                                primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </div>
            );
        }
    }

const style = {
    margin: 15,
  };
export default Loginscreen;