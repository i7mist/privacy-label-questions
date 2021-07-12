import React from "react";
import dataUsedToTrackIcon from "./images/data-used-to-track.svg";
import {dataTypeIconMapping} from "./data";
import dataLinkedIcon from "./images/data-linked.svg";
import dataNotLinkedIcon from "./images/data-not-linked.svg";
import dataNotCollectedIcon from "./images/data-not-collected.svg";

export class LabelDetailsDialog extends React.Component {
    render() {
        let i, j
        let dataLinkedDict = {}
        let dataNotLinkedDict = {}
        let dataForTrackingList = []
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
            let categoryLinkedDict = {}
            let categoryNotLinkedDict = []
            let categoryTrackedList = []
            for (j = 0; j < dataCategoryInfoList.length; ++j) {
                let dataCategory = Object.keys(dataCategoryInfoList[j])[0]
                let purposes = JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory]["purposes"]))
                let is_linked = JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory]["is_linked"]))
                let is_tracked = JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory]["is_tracked"]))
                if (is_linked === "data_linked") {
                    is_dataType_linked = true
                    for (let k = 0 ; k < purposes.length ; ++k) {
                        if (!(purposes[k] in categoryLinkedDict)) {
                            categoryLinkedDict[purposes[k]] = []
                        }
                        categoryLinkedDict[purposes[k]].push(dataCategory)
                    }
                }
                if (is_linked === "data_not_linked") {
                    is_dataType_not_linked = true
                    for (let k = 0 ; k < purposes.length ; ++k) {
                        if (!(purposes[k] in categoryNotLinkedDict)) {
                            categoryNotLinkedDict[purposes[k]] = []
                        }
                        categoryNotLinkedDict[purposes[k]].push(dataCategory)
                    }
                }
                if (is_tracked === "data_for_tracking") {
                    is_dataType_tracked = true
                    categoryTrackedList.push(dataCategory)
                }
            }
            if (is_dataType_linked) {
                let purposes = Object.keys(categoryLinkedDict)
                for (let k = 0 ; k < purposes.length ; ++k) {
                    if (!(purposes[k] in dataLinkedDict)) {
                        dataLinkedDict[purposes[k]] = []
                    }
                    dataLinkedDict[purposes[k]].push({dataType: dataType, dataCategory: categoryLinkedDict[purposes[k]]})
                }
            }
            if (is_dataType_not_linked) {
                let purposes = Object.keys(categoryNotLinkedDict)
                for (let k = 0 ; k < purposes.length ; ++k) {
                    if (!(purposes[k] in dataNotLinkedDict)) {
                        dataNotLinkedDict[purposes[k]] = []
                    }
                    dataNotLinkedDict[purposes[k]].push({dataType: dataType, dataCategory: categoryNotLinkedDict[purposes[k]]})
                }
            }
            if (is_dataType_tracked) {
                dataForTrackingList.push({dataType: dataType, dataCategory: categoryTrackedList})
            }
        }

        return <div className={"my-modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
            <div className="my-modal-heading preview-details-area-title">
                <b>Product Page Preview Details</b>
            </div>
            <div className="my-modal-body description-text" id={"preview-details-dialog"}
                 onScroll={() => this.props.logScroll("preview-details-dialog")}>
                {/*1. tracking*/}
                {dataForTrackingList.length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataUsedToTrackIcon} alt="Data Used to Track You"/>
                    <div className="preview-details-area-header">
                        Data Used to Track You</div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be used to track you across apps and websites owned by other
                        companies:</div>
                    <div>
                        {dataForTrackingList.map((item, index) => (
                            <div key={index} className = "preview-details-area-datatypes">
                                <img className="icon-style" src={dataTypeIconMapping[item.dataType]} alt={item.dataType}/> {item.dataType}
                                {item.dataCategory.map((c, i) => (
                                    <div key={i} className = "preview-details-area-datacategories">
                                        {c}
                                    </div>
                                )) }
                            </div>
                        ))}
                    </div>
                </div>}
                <br/>
                {/*2. linked*/}
                {Object.keys(dataLinkedDict).length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataLinkedIcon} alt="Data Linked to You"/>
                    <div className="preview-details-area-header">
                        Data Linked to You</div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be collected and linked to your identity:
                    </div>
                    <div>
                        {Object.keys(dataLinkedDict).map((purpose, purpose_index) => (
                            <div>
                                {(purpose_index > 0) ? <hr className={"solid"}/> : <br/>}
                                <div>{purpose}</div>
                                {dataLinkedDict[purpose].map((item, index) =>
                                    <div key={index} className="preview-details-area-datatypes">
                                        <img className="icon-style" src={dataTypeIconMapping[item.dataType]}
                                             alt={item.dataType}/> {item.dataType}
                                        {item.dataCategory.map((c, i) => (
                                            <div key={i} className="preview-details-area-datacategories">
                                                {c}
                                            </div>
                                        ))}
                                    </div>)
                                }
                            </div>
                        ))}
                    </div>
                </div>}
                {/*3. NotLinked*/}
                {Object.keys(dataNotLinkedDict).length > 0 && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataNotLinkedIcon} alt="Data Not Linked to You"/>
                    <div className="preview-details-area-header">
                        Data Not Linked to You  </div>
                    <div className="product-page-preview-display-box-description">
                        The following data may be collected but is not linked to your identity:
                    </div>
                    <div>
                        {Object.keys(dataNotLinkedDict).map((purpose, purpose_index) => (<div>
                            {(purpose_index > 0) ? <hr className={"solid"}/> : <br/>}
                            <div>{purpose}</div>
                            {dataNotLinkedDict[purpose].map((item, index) => (
                                <div key={index} className = "preview-details-area-datatypes">
                                    <img className="icon-style" src={dataTypeIconMapping[item.dataType]} alt={item.dataType}/> {item.dataType}
                                    {item.dataCategory.map((c, i) => (
                                        <div key={i} className = "preview-details-area-datacategories">
                                            {c}
                                        </div>
                                    )) }
                                </div>))
                            }
                        </div>))}
                    </div>
                </div>}
                {/*Not Collected*/}
                {dataNotCollected && <div className="preview-details-area">
                    <img className="x-large-icon-style" src={dataNotCollectedIcon} alt="Data Not Collected"/>
                    <div className="preview-details-area-header">
                        Data Not Collected  </div>
                    <div className="product-page-preview-display-box-description">
                        The developer does not collect any data from this app.
                    </div>
                </div>}

            </div>
            <div className="my-modal-footer">
                <div>
                    <button className="right-btn-group" onClick={this.props.doneLabelDetailsDialog}>Done</button>
                </div>
            </div>
        </div>
    }
}