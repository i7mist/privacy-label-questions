import React from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {dataCategoryTooltip} from "./data";

export class CategoryTooltip extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.myRef = React.createRef();
        // const target = useRef(null);
    }

    render() {
        return (
            <span>
                <span className={this.props.tooltipStyle} ref={this.myRef}
                                      onClick={() => this.setState({show: !this.state.show})}>?</span>
                <Overlay target={this.myRef.current} show={this.state.show} placement="right">
                    {(props) => (
                        <Tooltip id={"overlay-example"} {...props}>
                            {dataCategoryTooltip[this.props.dataCategory]}
                        </Tooltip>
                    )}
                </Overlay>
            </span>
        )
    }
}

export class DataCategoryOverview extends React.Component {
    render() {
        let categoryName = Object.keys(this.props.category)[0]
        let categoryDetails = this.props.category[Object.keys(this.props.category)[0]]
        let hasInitialized;
        hasInitialized = categoryDetails["purposes"].length !== 0 ;
        return (
            <div className="review-category">
                <span>{categoryName}</span>
                <CategoryTooltip tooltipStyle="question-mark-circle" dataCategory={categoryName}/>
                {!hasInitialized && <div className="data-category-setup-box"
                     onClick={this.props.openSetUpPurposeDialog(this.props.dataType, categoryName)}>{"Set Up " + categoryName}</div>}
                {hasInitialized && <div className="data-category-display-box"
                                         onClick={this.props.openSetUpPurposeDialog(this.props.dataType, categoryName)}>
                    <ul>
                        <li>Used For {categoryDetails["purposes"].length === 1 ? categoryDetails["purposes"][0] :
                            categoryDetails["purposes"].slice(0, categoryDetails["purposes"].length-1).join(", ") + ", and " + categoryDetails["purposes"][categoryDetails["purposes"].length-1]}</li>
                        {categoryDetails["is_linked"] === "data_linked" && <li>Linked to the user's identity</li>}
                        {categoryDetails["is_tracked"] === "data_for_tracking" && <li>Used for tracking purposes</li> }
                    </ul>
                </div>}
            </div>
        )
    }
}