import React from "react";
import {DataTypeOverview} from "./dataTypeOverview";

export class PrivacyOverviewSection extends React.Component {
    render() {
        return (
            <div>
                {this.props.privacyAnswers[0] && this.props.privacyAnswers.map((dataType) => <DataTypeOverview
                    dataTypeAnswers={dataType}/>)}
            </div>
        );
    }
}