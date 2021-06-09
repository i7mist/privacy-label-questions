import React from "react";

export class DataCollectionQuestion extends React.Component {
    render() {
        return <form>
            <p>Do you or your third-party partners collect data from this app?</p>
            <div id="dataCollectionQuestion">
                <input type="radio" id="collecting_data" checked={this.props.checked === "collecting_data"}
                       name="dataCollection" value="collecting_data" onChange={this.props.handleGlobalChange}/>
                <label htmlFor="collecting_data"><b>Yes</b>, we collect data from this app</label> <br/>

                <input type="radio" id="not_collecting_data" checked={this.props.checked === "not_collecting_data"}
                       name="dataCollection" value="not_collecting_data" onChange={this.props.handleGlobalChange}/>
                <label htmlFor="not_collecting_data"><b>No</b>, we do not collect data from this app</label> <br/>
            </div>
        </form>
    }
}