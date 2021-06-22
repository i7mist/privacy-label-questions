import React from "react";
import {DataCategoryOverview} from "./dataCategoryOverview";
import {dataTypeIconMapping} from "./data";

export class DataTypeOverview extends React.Component {
    render() {
        let title = Object.keys(this.props.dataTypeAnswers)[0]
        let categories = this.props.dataTypeAnswers[title]
        return (
            <div>
                <img className="medium-icon-style overview-header-icon display-inline-block" src={dataTypeIconMapping[title]} alt={title}/>
                <h6 className={"display-inline-block"}>{title}</h6>
                <div>
                {categories.map((category) =>
                    <DataCategoryOverview
                        dataType = {title}
                        category={category} openSetUpPurposeDialog={this.props.openSetUpPurposeDialog}
                        logData={this.props.logData}/>
                )}
                </div>
                <hr className="solid"/>
            </div>
        );
    }
}