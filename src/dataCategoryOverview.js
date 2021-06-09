import React from "react";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import {dataCategoryTooltip} from "./data";

export class DataCategoryOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.myRef = React.createRef();
        // const target = useRef(null);
    }

    render() {
        let categoryName = Object.keys(this.props.category)[0]
        let categoryDetails = this.props.category[Object.keys(this.props.category)[0]]
        return (
            <div>
                <span>{categoryName}</span>
                <span className={"question-mark-circle"} ref={this.myRef}
                      onClick={() => this.setState({show: !this.state.show})}>?</span>
                <Overlay target={this.myRef.current} show={this.state.show} placement="right">
                    {(props) => (
                        <Tooltip id={"overlay-example"} {...props}>
                            {dataCategoryTooltip[categoryName]}
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        )
    }
}