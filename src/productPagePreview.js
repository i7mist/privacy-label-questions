import React from "react";
import {dataTypeIconMapping} from "./data";
import dataLinkedIcon from "./images/data-linked.svg"
import dataNotLinkedIcon from "./images/data-not-linked.svg"
import dataUsedToTrackIcon from "./images/data-used-to-track.svg"
import dataNotCollectedIcon from "./images/data-not-collected.svg"

export class ProductPagePreview extends React.Component {
    render() {
        let i, j
        let dataLinkedList = []
        let dataNotLinkedList = []
        let dataForTrackingList = []
        let dataNotCollected = (this.props.privacyAnswers.length>0) && (this.props.privacyAnswers[0] === null)
        for (i = 0 ; i < this.props.privacyAnswers.length ; ++i) {
            if (this.props.privacyAnswers[i] === null) {
                break
            }
            let dataType = Object.keys(this.props.privacyAnswers[i])[0]
            let dataCategoryInfoList = this.props.privacyAnswers[i][dataType]
            let is_dataType_linked = false
            let is_dataType_not_linked = false
            let is_dataType_tracked = false
            for (j = 0 ; j < dataCategoryInfoList.length ; ++j) {
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
            }
        }
        let showProductPagePreview = dataNotCollected || (dataForTrackingList.length > 0) ||
            (dataLinkedList.length > 0) || (dataNotLinkedList.length > 0)

        return (
            <div>
                {showProductPagePreview && <div>
                    <div>
                        <h5 className={"display-inline-block"}>{this.props.isPreview ? "Product Page Preview" : "Privacy Label"}</h5>
                        {<button className="display-inline-block button-link" onClick={() => {
                            this.props.openDetailsDialog()}}>See Details</button>}
                    </div>
                    <div className={"row"}>
                        {dataNotCollected && <div className="col product-page-preview-display-box">
                            <img className="x-large-icon-style" src={dataNotCollectedIcon} alt="Data Not Collected"/>
                            <div className="product-page-preview-display-box-title">
                                Data Not Collected</div>
                            <div className="product-page-preview-display-box-description">
                                The developer does not collect any data from this app.
                            </div>
                        </div>}
                        {dataForTrackingList.length > 0 && <div className="col product-page-preview-display-box">
                            <img className="x-large-icon-style" src={dataUsedToTrackIcon} alt="Data Used to Track You"/>
                            <div className="product-page-preview-display-box-title">
                                Data Used to Track You</div>
                            <div className="product-page-preview-display-box-description">
                                The following data may be used to track you across apps and websites owned by other
                                companies:</div>
                            <div className="product-page-preview-display-box-content">
                                {dataForTrackingList.map((dataType) => <div>
                                    <img className="display-inline-block icon-style" src={dataTypeIconMapping[dataType]}
                                         alt={dataType}/> {dataType}</div>)}
                            </div>
                        </div>}
                        {dataLinkedList.length > 0 && <div className="col product-page-preview-display-box">
                            <img className="x-large-icon-style" src={dataLinkedIcon} alt="Data Linked to You"/>
                            <div className="product-page-preview-display-box-title">Data Linked to You</div>
                            <div className="product-page-preview-display-box-description">
                                The following data may be collected and linked to your identity:</div>
                            <div className="product-page-preview-display-box-content">
                                {dataLinkedList.map((dataType) => <div>
                                    <img className="display-inline-block icon-style" src={dataTypeIconMapping[dataType]}
                                         alt={dataType}/> {dataType}</div>)}
                            </div>
                        </div>}
                        {dataNotLinkedList.length > 0 && <div className="col product-page-preview-display-box">
                            <img className="x-large-icon-style" src={dataNotLinkedIcon} alt="Data Not Linked to You"/>
                            <div className="product-page-preview-display-box-title">Data Not Linked to You</div>
                            <div className="product-page-preview-display-box-description">
                                The following data may be collected but is not linked to your identity:</div>
                            <div className="product-page-preview-display-box-content">
                                {dataNotLinkedList.map((dataType) => <div>
                                    <img className="display-inline-block icon-style" src={dataTypeIconMapping[dataType]}
                                         alt={dataType}/> {dataType}</div>)}
                            </div>
                        </div>}
                    </div>
                    <hr className="solid"/>
                </div>}
            </div>
        )
    }
}