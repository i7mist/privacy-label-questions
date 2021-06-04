import React from "react";
import {DataCategoryOverview} from "./dataCategoryOverview";

export class DataTypeOverview extends React.Component {
    render() {
        let title = Object.keys(this.props.dataTypeAnswers)[0]
        let categories = this.props.dataTypeAnswers[title]
        return (
            <div>
                <hr className="solid"/>
                <h4>{title}</h4>
                {categories.map((category) =>
                    <DataCategoryOverview category={category}/>
                )}
            </div>
        );
    }
}