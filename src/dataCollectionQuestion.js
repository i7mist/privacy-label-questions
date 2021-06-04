import React from "react";

export class DataCollectionQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: !props.privacyAnswers.length ? null :
                props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
        }
    }

    loadState() {
        this.setState({
            checked: !this.props.privacyAnswers.length ? null :
                this.props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
        })
    }

    render() {
        let handleLocalChange = (e) => {
            this.props.handleGlobalChange(e)
            this.setState({
                checked: e.target.value
            })
        }
        return <form>
            <p>Do you or your third-party partners collect data from this app?</p>
            <div id="dataCollectionQuestion">
                <input type="radio" id="collecting_data" checked={this.state.checked === "collecting_data"}
                       name="dataCollection" value="collecting_data" onChange={handleLocalChange}/>
                <label htmlFor="collecting_data"><b>Yes</b>, we collect data from this app</label> <br/>

                <input type="radio" id="not_collecting_data" checked={this.state.checked === "not_collecting_data"}
                       name="dataCollection" value="not_collecting_data" onChange={handleLocalChange}/>
                <label htmlFor="not_collecting_data"><b>No</b>, we do not collect data from this app</label> <br/>
            </div>
        </form>
    }
}