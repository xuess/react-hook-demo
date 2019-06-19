import React from "react";

export default class ClassStateDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount(){
        document.title = `You clicked ${this.state.count} times`;
        console.log('componentDidMount-->',this.state.count);
    }

    componentDidUpdate(){
        document.title = `You clicked ${this.state.count} times`;
        console.log('componentDidUpdate-->',this.state.count);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount-->',this.state.count);
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}
