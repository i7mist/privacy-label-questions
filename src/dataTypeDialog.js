import React from "react";
import {DataTypeText} from "./dataTypeText";
import {dataTypeOrderList} from "./data"
import {DataTypeQuestion} from "./dataTypeQuestion";

export class DataTypeDialog extends React.Component {
    render() {
        return (
            <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
                <div className="my-modal-heading">
                    <h3>Data Collection</h3>
                </div>
                <div className="my-modal-body" id={"data-type-dialog"}
                     onScroll={()=>this.props.logScroll("data-type-dialog")}>
                    <DataTypeText logData={this.props.logData}/>
                    <hr className="solid"/>
                    {dataTypeOrderList.map((dataType) =>
                        <DataTypeQuestion dataType={dataType}
                                          checkedDataCategories={this.props.checkedDataCategories}
                                          onChangeCheckedState={this.props.onChangeCheckedDataCategories}
                        />)}
                </div>
                <div className="my-modal-footer">
                    <div>
                        <button className={"mr-auto"} onClick={() => {
                            this.props.cancelTypeDialog()
                            this.props.openCollectionDialog()
                        }}>Back</button>
                        <button className="right-btn-group" onClick={this.props.clickSave}
                                disabled={this.props.checkedDataCategories.length === 0}>Save</button>
                        <button className="right-btn-group" onClick={this.props.cancelTypeDialog}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}