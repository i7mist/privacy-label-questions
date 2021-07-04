import React from "react";
import {DataCollectionQuestion} from "./dataCollectionQuestion";

export class DataCollectionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarted: props.privacyAnswers.length > 0,
            isNoCollection: props.privacyAnswers.length > 0 && props.privacyAnswers[0] === null,
            checked: !props.privacyAnswers.length ? null :
                props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
        }
    }

    render() {
        return (
            <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
                <div className="my-modal-heading">
                    <h3>Data Collection</h3>
                </div>
                <div className="my-modal-body description-text" id={"data-collection-dialog"}
                     onScroll={()=>this.props.logScroll("data-collection-dialog")}>
                    Thanks for helping users understand your app's privacy practices. Remember that you're responsible
                    for any third-party code that is added to your app, so if your third-party partners collect data
                    from your app, you must represent that in your responses.
                    <p/>
                    <ul>
                        <li>
                            “Collect” refers to transmitting data off the device in a way that allows you and/or your
                            third-party partners to access it for a period longer than necessary to service the
                            transmitted request in real time.
                        </li>
                        <li>
                            “Third-party partners” include analytics tools, advertising networks, third-party SDKs, or
                            other external vendors whose code you have added to the app.
                        </li>
                    </ul>
                    <p/>
                    You can <a href={"https://developer.apple.com/app-store/app-privacy-details/"} target="_blank"
                               rel="noopener noreferrer" onClick={() => {
                                   this.props.logData("open link", "https://developer.apple.com/app-store/app-privacy-details/")}}>
                    view the full list of questions</a> at any time.
                    <p/>
                    <hr className="solid"/>
                    <p/>
                    <DataCollectionQuestion
                        privacyAnswers={this.props.privacyAnswers}
                        checked={this.state.checked}
                        handleGlobalChange={(e) => {
                            this.setState({
                                isStarted: true,
                                isNoCollection: e.target.value === "not_collecting_data",
                                checked: e.target.value
                            })
                        }}
                    />
                </div>
                <div className="my-modal-footer">
                    <div className="right-btn-group">
                        <button onClick={()=>{
                            this.setState({
                                checked: !this.props.privacyAnswers.length ? null :
                                    this.props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
                            })
                            this.props.cancelCollectionDialog()
                        }}>Cancel</button>
                        {
                            this.state.isNoCollection ?
                                <button onClick={this.props.clickSave}>Save</button> :
                                <button onClick={() => {
                                    this.props.cancelCollectionDialog()
                                    this.props.openTypeDialog()
                                }} disabled={!this.state.isStarted}>Next</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}