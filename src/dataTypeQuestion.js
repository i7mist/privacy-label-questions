import React from "react";
import {dataCategoryTooltip, dataTypeCategoryMapping, dataTypeIconMapping} from "./data";

export class DataTypeQuestion extends React.Component {
    render() {
        let icon = dataTypeIconMapping[this.props.dataType]
        let categoryOptions = dataTypeCategoryMapping[this.props.dataType]
        let firstCategory = categoryOptions[0]
        let firstCategoryId = this.props.dataType + "_" + firstCategory
        return (
            <div>
                <div className="checkbox-header">
                    {categoryOptions.length === 1 && <div>
                        <input type="checkbox" id={firstCategoryId} name={firstCategoryId}
                               value={this.props.dataType}
                               checked={this.props.checkedDataCategories.includes(firstCategoryId)}
                               onChange={this.props.onChangeCheckedState(firstCategoryId)}
                        />
                        <img className="icon-style checkbox-option-header-icon" src={icon} alt={this.props.dataType}/>
                        <label className="checkbox-option-name" htmlFor={firstCategoryId}>
                            {this.props.dataType}</label>
                        <div className="checkbox-option-header-label">{dataCategoryTooltip[firstCategory]}</div>
                    </div>
                    }
                    {categoryOptions.length > 1 &&
                    <img className="icon-style checkbox-option-icon" src={icon} alt={this.props.dataType}/>}
                    {categoryOptions.length > 1 && <h6>{this.props.dataType}</h6>}
                </div>
                {categoryOptions.length > 1 && categoryOptions.map((category) => {
                    let categoryId = this.props.dataType + "_" + category;
                    return (
                        <div className="checkbox-option">
                            <input type="checkbox" id={categoryId} name={categoryId}
                                   value={category}
                                   checked={this.props.checkedDataCategories.includes(categoryId)}
                                   onChange={this.props.onChangeCheckedState(categoryId)}/>
                            <label className="checkbox-option-name" htmlFor={categoryId}>
                                {category}</label>
                            <div className="checkbox-option-label">{dataCategoryTooltip[category]}</div>
                        </div>
                    )
                })}
                <hr className="solid"/>
            </div>
        )
    }
}