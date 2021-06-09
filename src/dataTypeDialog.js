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
                <div className="my-modal-body">
                    <DataTypeText/>
                    <hr className="solid"/>
                    {dataTypeOrderList.map((dataType) =>
                        <DataTypeQuestion dataType={dataType}
                                          checkedDataCategories={this.props.checkedDataCategories}
                                          onChangeCheckedState={this.props.onChangeCheckedState}
                        />)}
                </div>
                <div className="my-modal-footer">
                    <div>
                        <button className={"mr-auto"} onClick={() => {
                            this.props.cancelTypeDialog()
                            this.props.openCollectionDialog()
                        }}>Back</button>
                        <button className="right-btn-group" onClick={()=>{
                            let oldCategoryInfo = {}
                            let i, j;
                            for (i = 0; i < this.props.privacyAnswers.length ; ++i) {
                                let dataTypeDict = this.props.privacyAnswers[i];
                                if (dataTypeDict === null) {
                                    break;
                                }
                                let dataType = Object.keys(dataTypeDict)[0]
                                let categories = dataTypeDict[dataType]
                                for (j = 0 ; j < categories ; ++j) {
                                    let categoryDict = categories[j]
                                    let category = Object.keys(categoryDict)[0]
                                    let categoryId = dataType + "_" + category
                                    oldCategoryInfo[categoryId] = categoryDict[category]
                                }
                            }

                            this.props.privacyAnswers.splice(0, this.props.privacyAnswers.length)

                            let remainingCategoryInfo = {}

                            let resultDict = {}
                            var dataType;
                            for (i = 0; i < this.props.checkedDataCategories.length ; ++i) {
                                let categoryId = this.props.checkedDataCategories[i];
                                if (categoryId in oldCategoryInfo) {
                                    remainingCategoryInfo[categoryId] = oldCategoryInfo[categoryId];
                                }
                                dataType = categoryId.split("_")[0];
                                if (dataType in resultDict) {
                                    resultDict[dataType].push(categoryId)
                                } else {
                                    resultDict[dataType] = [categoryId]
                                }
                            }
                            for (dataType in resultDict) {
                                let catDictList = resultDict[dataType].map((categoryId) => {
                                    let category = categoryId.split("_")[1]
                                    let catDict = {}
                                    catDict[category] = {"purposes": [], "is_linked": null, "is_tracked": null};
                                    return catDict
                                })
                                let dataTypeDict = {}
                                dataTypeDict[dataType] = catDictList
                                this.props.privacyAnswers.push(dataTypeDict)
                            }
                            this.props.clickSave()
                        }}
                                disabled={this.props.checkedDataCategories.length === 0}>Save</button>
                        <button className="right-btn-group" onClick={this.props.cancelTypeDialog}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}