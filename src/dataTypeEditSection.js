import React from "react";

export class DataTypeEditSection extends React.Component {
    render() {
        let dataCategoryList = []
        if (this.props.privacyAnswers.length > 0 && this.props.privacyAnswers[0]) {
            for (let i = 0; i < this.props.privacyAnswers.length; i++) {
                const dataTypeDict = this.props.privacyAnswers[i]
                const dataTypeKey = Object.keys(dataTypeDict)[0]
                const dataTypeValue = dataTypeDict[dataTypeKey]
                const newDataCategoryList = dataTypeValue.map((d) => {
                    return Object.keys(d)[0]
                })
                dataCategoryList = dataCategoryList.concat(newDataCategoryList)
            }
        }
        const dataTypeSummary = dataCategoryList.length > 0 ?
            `${dataCategoryList.length} data types collected from this app: ` + dataCategoryList.join(", ") :
            "Data is not collected from this app.";
        return (
            <div>
                <h3 className={"display-inline-block"}>Data Types</h3>
                <button className="display-inline-block button-link" onClick={this.props.clickEdit}>Edit</button>
                <div>{dataTypeSummary}</div>
                <hr className="solid"/>
            </div>
        );
    }
}