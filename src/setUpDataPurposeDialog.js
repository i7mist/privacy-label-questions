import React from "react";
import {dataCategoryPluralFormMapping, dataTypeIconMapping, purposeOrderList, purposeLabelMapping} from "./data"
import {CategoryTooltip} from "./dataCategoryOverview";

export class SetUpDataPurposeDialog extends React.Component {
    render() {
        return (
            <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
                <div className="my-modal-heading">
                    <img className="display-inline-block large-icon-style modal-header-icon"
                         src={dataTypeIconMapping[this.props.dataType]} alt={this.props.dataType}/>
                    <h3 className={"display-inline-block"}>{this.props.dataCategory}</h3>
                    <CategoryTooltip tooltipStyle={"question-mark-circle-large"} dataCategory={this.props.dataCategory}
                                     logData={this.props.logData}/>
                </div>
                <div className="my-modal-body description-text">
                    <div>
                        Indicate how {dataCategoryPluralFormMapping[this.props.dataCategory]} collected from this app are being used by you or your third-party partners (select all that apply):
                    </div>
                    {purposeOrderList.map((purpose)=>{
                        return <div>
                            <br/>
                            <input type="checkbox" id={purpose} name={purpose}
                                   value={this.props.dataType}
                                   checked={this.props.selectedPurposes.includes(purpose)}
                                   onChange={this.props.onChangeSelectedPurpose(purpose)}
                            />
                            <label className="checkbox-purpose-option-name" htmlFor={purpose}>
                                {purpose}</label>
                            <div className="checkbox-purpose-option-label">{
                                purposeLabelMapping[purpose]}</div>
                        </div>
                    })}
                    <hr className="solid"/>
                </div>
                <div className="my-modal-footer">
                    <div>
                        <button className="right-btn-group"
                                disabled={this.props.selectedPurposes.length === 0}
                                onClick={() => {
                                    this.props.cancelSetUpPurposeDialog()
                                    this.props.openSetUpDataLinkedDialog()
                                }}>Next</button>
                        <button className="right-btn-group" onClick={this.props.cancelSetUpPurposeDialog}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}