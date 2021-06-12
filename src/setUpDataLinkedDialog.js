import React from "react";
import {dataCategoryPluralFormMapping, dataTypeIconMapping} from "./data";
import {CategoryTooltip} from "./dataCategoryOverview";


export class DataLinkedQuestion extends React.Component {
    render() {
        return <form>
            <p>Are the {dataCategoryPluralFormMapping[this.props.dataCategory]} collected from this app linked to the user’s identity?</p>
            <div>
                <input type="radio" id="data_linked" checked={this.props.selectedLinked === "data_linked"}
                       className="radioStyle"
                       name="data_linked" value="data_linked" onChange={this.props.handleDataLinkedSelectionChange}/>
                <label htmlFor="data_linked">
                    <b>Yes</b>, {dataCategoryPluralFormMapping[this.props.dataCategory]} collected from this app are linked to the user’s identity
                </label> <br/>

                <input type="radio" id="data_not_linked" checked={this.props.selectedLinked === "data_not_linked"}
                       className="radioStyle"
                       name="data_not_linked" value="data_not_linked" onChange={this.props.handleDataLinkedSelectionChange}/>
                <label htmlFor="data_not_linked">
                    <b>No</b>, {dataCategoryPluralFormMapping[this.props.dataCategory]} collected from this app are not linked to the user’s identity</label> <br/>
            </div>
        </form>
    }
}

export class SetUpDataLinkedDialog extends React.Component {
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
                    Next, indicate if the data collected from this app is linked to the user’s identity (via their account, device, or details).
                </div>
                <br/>
                <div>
                    Data collected from an app is usually linked to the user’s identity via these means, unless specific privacy protections are put in place before collection to de-identify or anonymize it, such as:
                </div>
                <ul>
                    <li>
                        Stripping data of any direct identifiers, such as e-mail address or name, before collection.
                    </li>
                    <li>
                        Manipulating data to break the linkage and prevent re-linkage to real-world identities.
                    </li>
                    <li>
                        Additionally, in order for data not to be linked to a particular user’s identity, you must avoid certain activities after collection:
                        <ul>
                            <li>
                                You must not attempt to link the data back to the user’s identity.
                            </li>
                            <li>
                                You must not tie the data to other datasets that enable it to be linked to the user’s identity.
                            </li>
                        </ul>
                    </li>
                </ul>
                <hr className="solid"/>
                <DataLinkedQuestion dataCategory={this.props.dataCategory}
                                    selectedLinked={this.props.selectedLinked}
                                    handleDataLinkedSelectionChange={this.props.handleDataLinkedSelectionChange}/>
            </div>
            <div className="my-modal-footer">
                <div>
                    <button className={"mr-auto"} onClick={() => {
                        this.props.cancelSetUpDataLinkedDialog()
                        this.props.openSetUpPurposeDialog()
                    }}>Back</button>
                    <button className="right-btn-group"
                            disabled={this.props.selectedLinked === null}
                            onClick={()=>{
                                this.props.cancelSetUpDataLinkedDialog()
                                this.props.openTrackingDefinitionDialog()
                            }}>Next</button>
                    <button className="right-btn-group" onClick={this.props.cancelSetUpDataLinkedDialog}>Cancel</button>
                </div>
            </div>
        </div>
    }

}