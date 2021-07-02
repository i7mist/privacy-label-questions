import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {dataCategoryTooltip} from "./data";
import { withStyles } from '@material-ui/core/styles';


export class CategoryTooltip extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.myRef = React.createRef();
    }

    render() {
        const handleTooltipClose = () => {
            this.setState({
                open: false
            })
        };

        const handleTooltipOpen = () => {
            this.setState({
                open: true
            })
            this.props.logData("useTooltip", {"dataCategory": this.props.dataCategory})
        };

        const LightTooltip = withStyles((theme) => ({
            tooltip: {
                backgroundColor: theme.palette.common.white,
                color: 'rgba(0, 0, 0, 0.65)',
                boxShadow: theme.shadows[4],
                fontSize: 13,
            },
        }))(Tooltip);

        return (
            <span>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <span>
                        <LightTooltip
                            PopperProps={{disablePortal: true,}} onClose={handleTooltipClose} open={this.state.open}
                            disableFocusListener disableHoverListener disableTouchListener
                            title={dataCategoryTooltip[this.props.dataCategory]}
                            placement="bottom">
                        <span className={this.props.tooltipStyle} onClick={handleTooltipOpen}>?</span>
                        </LightTooltip>
                    </span>
              </ClickAwayListener>
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
                <span className="category-overview-title">{categoryName}</span>
                <CategoryTooltip tooltipStyle="question-mark-circle" dataCategory={categoryName} logData={this.props.logData}/>
                {hasInitialized && <button className="display-inline-block button-link"
                        onClick={this.props.openSetUpPurposeDialog(this.props.dataType, categoryName)}>Edit</button>}
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