import React from "react";
import {dataCategoryPluralFormMapping, dataTypeIconMapping} from "./data";
import {CategoryTooltip} from "./dataCategoryOverview";
import chevronDownIcon from "./images/chevron-down.svg"
import chevronRightIcon from "./images/chevron-right.svg"
import {TrackingDefinitionText} from "./trackingDefinitionText";
import warningIcon from "./images/warning.svg"

export class SetUpDataTrackingDialog extends React.Component {
    render() {
        return <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
            <div className="my-modal-heading">
                <img className="display-inline-block large-icon-style modal-header-icon"
                     src={dataTypeIconMapping[this.props.dataType]} alt={this.props.dataType}/>
                <h3 className={"display-inline-block"}>{this.props.dataCategory}</h3>
                <CategoryTooltip tooltipStyle={"question-mark-circle-large"} dataCategory={this.props.dataCategory}
                                 logData={this.props.logData}/>
            </div>
            <div className="my-modal-body description-text" id={"setup-data-tracking-dialog"}
                 onScroll={()=>this.props.logScroll("setup-data-tracking-dialog")}>
                <div>
                    Finally, indicate if {dataCategoryPluralFormMapping[this.props.dataCategory]} will be used for tracking purposes.
                </div>
                <br/>
                <div className="description-bold-text">
                    Do you or your third-party partners use {dataCategoryPluralFormMapping[this.props.dataCategory]} for tracking purposes?
                </div>
                <br/>
                <div>
                    <input type="radio" id="data_for_tracking" checked={this.props.selectedForTracking === "data_for_tracking"}
                           className="radioStyle"
                           name="data_for_tracking" value="data_for_tracking" onChange={this.props.handleDataForTrackingSelectionChange}/>
                    <label htmlFor="data_for_tracking">
                        <b>Yes</b>, we use {dataCategoryPluralFormMapping[this.props.dataCategory]} for tracking purposes
                    </label> <br/>

                    <input type="radio" id="data_not_for_tracking" checked={this.props.selectedForTracking === "data_not_for_tracking"}
                           className="radioStyle"
                           name="data_not_for_tracking" value="data_not_for_tracking" onChange={this.props.handleDataForTrackingSelectionChange}/>
                    <label htmlFor="data_not_for_tracking">
                        <b>No</b>, we do not use {dataCategoryPluralFormMapping[this.props.dataCategory]} for tracking purposes
                    </label> <br/>
                </div>
                {(this.props.dataCategory === "Health") && (this.props.selectedForTracking === "data_for_tracking")
                && <div className={"warning-box"}>
                    <img className={"display-inline-block"} src={warningIcon} alt={"Warning"}/>
                    Based on your response, your app may be in violation of guidelines 5.1.2 and 5.1.3 of the <a className={"display-inline-block"}
                       href={"https://developer.apple.com/app-store/review/guidelines/#legal"} target="_blank"
                        rel="noopener noreferrer" onClick={
                            () => {this.props.logData("open link", "https://developer.apple.com/app-store/review/guidelines/#legal")}
                }>App Store Guidelines</a>.
                </div>}
                <br/>
                <div id="expand-tracking-definition-example-icon" onClick={this.props.handleDefinitionExampleClick}>
                    {!this.props.expandedDefinitionAndExample && <img className={"expand-icon-style display-inline-block"}
                                                                      src={chevronRightIcon} alt={"Expand"}/>}
                    {this.props.expandedDefinitionAndExample && <img className={"expand-icon-style display-inline-block"}
                                                                     src={chevronDownIcon} alt={"Collapse"}/>}
                    <div className="display-inline-block description-bold-text">Definitions and Examples</div>
                </div>
                <div className={this.props.expandedDefinitionAndExample ? "second-time-definition" : "second-time-definition-hidden"}>
                    <br/>
                    <TrackingDefinitionText/>
                    <br/>
                    <div className={"description-sub-title"}>Examples</div>
                    <div>
                        To help put tracking into context, here are a few examples:
                    </div>
                    <br/>
                    <ul>
                        <li>
                            Displaying targeted advertisements in your app based on user data collected from apps and websites owned by other companies                        </li>
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
                </div>
            </div>
            <div className="my-modal-footer">
                <div>
                    <button className={"mr-auto"} onClick={() => {
                        this.props.cancelSetUpDataTrackingDialog()
                        this.props.openPreviousDialog()
                    }}>Back</button>
                    <button className="right-btn-group" disabled={this.props.selectedForTracking===null} onClick={() => {
                        this.props.saveAnswers()
                        this.props.cancelSetUpDataTrackingDialog()
                    }}>Save</button>
                    <button className="right-btn-group" onClick={this.props.cancelSetUpDataTrackingDialog}>Cancel</button>
                </div>
            </div>
        </div>
    }
}