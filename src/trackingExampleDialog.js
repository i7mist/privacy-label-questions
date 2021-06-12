import React from "react";
import {dataTypeIconMapping} from "./data";
import {CategoryTooltip} from "./dataCategoryOverview";

export class TrackingExampleDialog extends React.Component {
    render() {
        return <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
            <div className="my-modal-heading">
                <img className="display-inline-block large-icon-style modal-header-icon"
                     src={dataTypeIconMapping[this.props.dataType]} alt={this.props.dataType}/>
                <h3 className={"display-inline-block"}>{this.props.dataCategory}</h3>
                <CategoryTooltip tooltipStyle={"question-mark-circle-large"} dataCategory={this.props.dataCategory}/>
            </div>
            <div className="my-modal-body description-text">
                <div>
                    To help put tracking into context, here are a few examples:
                </div>
                <br/>
                <ul>
                    <li>
                        Displaying targeted advertisements in your app based on user data collected from apps and websites owned by other companies
                    </li>
                    <li>
                        Sharing device location data or email lists with a data broker
                    </li>
                    <li>
                        Sharing a list of emails, advertising IDs, or other IDs with a third-party advertising network that uses that information to retarget those users in other developers' apps or to find similar users
                    </li>
                    <li>
                        Placing a third-party SDK in your app that combines user data from your app with user data from other developers' apps to target advertising or measure advertising efficiency, even if you don't use the SDK for these purposes. For example, using a login SDK that repurposes the data it collects from your app to enable targeted advertising in other developers' apps.
                    </li>
                </ul>
                <br/>
                <div>
                    If you plan to request access to the advertising identifier (IDFA), you must indicate on your App Store privacy label that you collect Device IDs and use them for tracking purposes.
                </div>
            </div>
            <div className="my-modal-footer">
                <div>
                    <button className={"mr-auto"} onClick={() => {
                        this.props.cancelTrackingExampleDialog()
                        this.props.openTrackingDefinitionDialog()
                    }}>Back</button>
                    <button className="right-btn-group" onClick={() => {
                        this.props.cancelTrackingExampleDialog()
                        this.props.openSetUpDataTrackingDialog()
                    }}>Next</button>
                    <button className="right-btn-group" onClick={this.props.cancelTrackingExampleDialog}>Cancel</button>
                </div>
            </div>
        </div>
    }
}