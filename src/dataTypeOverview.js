import React from "react";
import {DataCategoryOverview} from "./dataCategoryOverview";

export class DataTypeOverview extends React.Component {
    render() {
        let title = Object.keys(this.props.dataTypeAnswers)[0]
        let categories = this.props.dataTypeAnswers[title]
        return (
            <div>
                <h4>{title}</h4>
                <div>
                {categories.map((category) =>
                    <DataCategoryOverview
                        dataType = {title}
                        category={category} openSetUpPurposeDialog={this.props.openSetUpPurposeDialog}/>
                )}
                </div>
            </div>
        );
    }
}