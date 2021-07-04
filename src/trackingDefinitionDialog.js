import React from "react";
import {dataTypeIconMapping} from "./data";
import {CategoryTooltip} from "./dataCategoryOverview";
import {TrackingDefinitionText} from "./trackingDefinitionText";

export class TrackingDefinitionDialog extends React.Component {
    render() {
        return <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
            <div className="my-modal-heading">
                <img className="display-inline-block large-icon-style modal-header-icon"
                     src={dataTypeIconMapping[this.props.dataType]} alt={this.props.dataType}/>
                <h3 className={"display-inline-block"}>{this.props.dataCategory}</h3>
                <CategoryTooltip tooltipStyle={"question-mark-circle-large"} dataCategory={this.props.dataCategory}
                                 logData={this.props.logData}/>
            </div>
            <div className="my-modal-body description-text" id={"tracking-definition-dialog"}
                 onScroll={()=>this.props.logScroll("tracking-definition-dialog")}>
                <div>
                    Let's define two important terms before continuing.
                </div>
                <br/>
                <TrackingDefinitionText/>
            </div>
            <div className="my-modal-footer">
                <div>
                    <button className={"mr-auto"} onClick={() => {
                        this.props.cancelTrackingDefinitionDialog()
                        this.props.openSetUpDataLinkedDialog()
                    }}>Back</button>
                    <button className="right-btn-group" onClick={() => {
                        this.props.cancelTrackingDefinitionDialog()
                        this.props.openTrackingExampleDialog()
                    }}>Next</button>
                    <button className="right-btn-group" onClick={this.props.cancelTrackingDefinitionDialog}>Cancel</button>
                </div>
            </div>
        </div>
    }
}