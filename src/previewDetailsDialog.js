import React from "react";
import {dataTypeIconMapping} from "./data";
import dataLinkedIcon from "./images/data-linked.svg"
import dataNotLinkedIcon from "./images/data-not-linked.svg"
import dataUsedToTrackIcon from "./images/data-used-to-track.svg"
import dataNotCollectedIcon from "./images/data-not-collected.svg"
import {CategoryTooltip, DataCategoryOverview} from "./dataCategoryOverview";

{/*TODO Figure out how "data not collected" should show up*/}
export class PreviewDetailsDialog extends React.Component {
    render() {
        let i, j
        let dataLinkedList = []
        let dataNotLinkedList = []
        let dataForTrackingList = []
        let dataForTrackingList2 = []
        let dataForTrackingList3 = []
        let categoryTrackedList = []
        let dataNotCollected = (this.props.privacyAnswers.length > 0) && (this.props.privacyAnswers[0] === null)
        for (i = 0; i < this.props.privacyAnswers.length; ++i) {
            if (this.props.privacyAnswers[i] === null) {
                break
            }
            let dataType = Object.keys(this.props.privacyAnswers[i])[0]
            let dataCategoryInfoList = this.props.privacyAnswers[i][dataType]
            let is_dataType_linked = false
            let is_dataType_not_linked = false
            let is_dataType_tracked = false
            let is_dataCategory_tracked = false
            for (j = 0; j < dataCategoryInfoList.length; ++j) {
                let dataCategory = Object.keys(dataCategoryInfoList[j])[0]
                let is_linked = JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory]["is_linked"]))
                let is_tracked = JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory]["is_tracked"]))
                if (is_linked === "data_linked") {
                    is_dataType_linked = true
                }
                if (is_linked === "data_not_linked") {
                    is_dataType_not_linked = true
                }
                if (is_tracked === "data_for_tracking") {
                    is_dataType_tracked = true
                    is_dataCategory_tracked = true
                    categoryTrackedList.push(dataCategory)
                }
            }
            if (is_dataType_linked) {
                dataLinkedList.push(dataType)
            }
            if (is_dataType_not_linked) {
                dataNotLinkedList.push(dataType)
            }
            if (is_dataType_tracked) {
                dataForTrackingList.push(dataType)
                dataForTrackingList2.push({dataType: dataType, dataCategory: categoryTrackedList})
                dataForTrackingList3.push(this.props.privacyAnswers[i])
            }
        }
        let showPreveiwDetailsDialog = dataNotCollected || (dataForTrackingList.length > 0) ||
            (dataLinkedList.length > 0) || (dataNotLinkedList.length > 0)

        return <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
            <div className="my-modal-heading preview-details-area-title">
                <b>Product Page Preview Details</b>
            </div>
            <div className="my-modal-body description-text" id={"preview-details-dialog"}
                 onScroll={() => this.props.logScroll("preview-details-dialog")}>

                {/*tracking*/}
                {dataForTrackingList.length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataUsedToTrackIcon} alt="Data Used to Track You"/>
                    <div className="preview-details-area-header">
                        Data Used to Track You</div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be used to track you across apps and websites owned by other
                        companies:</div>
                    <div>
                        {dataForTrackingList.map((dataType) => <div>
                            <img className="icon-style" src={dataTypeIconMapping[dataType]}
                                 alt={dataType}/> {dataType}</div>)}
                    </div>
                    <div>
                        TESTING TRACKING ADJUSTMENTS
                        {console.log("list version 1",  dataForTrackingList)}
                        {console.log("Tracking list version 2", dataForTrackingList2)}
                        {console.log("Tracking list version 3", dataForTrackingList3)}
                    </div>
                </div>}
                <br/>
                {/*linked*/}
                {dataLinkedList.length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataLinkedIcon} alt="Data Linked to You"/>
                    <div className="preview-details-area-header">
                        Data Linked to You</div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be collected and linked to your identity:
                    </div>
                    <div>
                        {dataLinkedList.map((dataType) => <div>
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping[dataType]}
                                 alt={dataType}/> {dataType}</div>)}
                    </div>
                </div>}
                {/*NotLinked*/}
                {dataLinkedList.length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataNotLinkedIcon} alt="Data Not Linked to You"/>
                    <div className="preview-details-area-header">
                        Data Not Linked to You</div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be collected but is not linked to your identity:
                    </div>
                    <div>
                        {dataNotLinkedList.map((dataType) => <div>
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping[dataType]}
                                 alt={dataType}/> {dataType}</div>)}
                    </div>
                </div>}
            </div>
            <div className="my-modal-footer">
                <div>
                    <button className="right-btn-group" onClick={this.props.donePreviewDetailsDialog}>Done</button>
                </div>
            </div>
        </div>
    }
}

