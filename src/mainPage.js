import React from "react";
import {DataCollectionDialog} from "./dataCollectionDialog";
import {DataTypeEditSection} from "./dataTypeEditSection";
import {OnboardPage} from "./onboardPage";
import {PrivacyOverviewSection} from "./privacyOverviewSection";

export class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            privacyAnswers: [
                {
                    "Contact Info":
                        [{"Other User Contact Info": {"purposes": [], "is_linked": null, "is_tracked": null}},
                            {"Name": {"purposes": [], "is_linked": null, "is_tracked": null}},
                            {"Email Address": {"purposes": [], "is_linked": null, "is_tracked": null}}]
                },
                {"Health & Fitness": [{"Health": {"purposes": [], "is_linked": null, "is_tracked": null}}]}], //[]
            collectionDialogDisplay: false,
        }
        this.dataCollectionDialogRef = React.createRef();
    }

    render() {
        let openDataCollectionDialog = () => {
            this.setState({collectionDialogDisplay: true})
            this.dataCollectionDialogRef.current.loadState()
        }
        return (
            <div className="main-page">
                <DataCollectionDialog
                    ref={this.dataCollectionDialogRef}
                    privacyAnswers={this.state.privacyAnswers}
                    dialogDisplay={this.state.collectionDialogDisplay}
                    clickCancelCollectionDialog={() => this.setState({collectionDialogDisplay: false})}
                    clickCancelTypeDialog={() => this.setState({collectionDialogDisplay: false})}
                    clickSave={() => {
                        let rootDiv = document.getElementById("dataCollectionQuestion")
                        let choices = rootDiv.getElementsByTagName("input")
                        let i;
                        for (i = 0; i < choices.length; ++i) {
                            if (choices[i].checked) {
                                if (choices[i].value === "not_collecting_data") {
                                    this.setState({privacyAnswers: [null]})
                                }
                            }
                        }
                        this.setState({collectionDialogDisplay: false})
                    }}
                />
                {this.state.privacyAnswers.length ?
                    <DataTypeEditSection clickEdit={openDataCollectionDialog}
                                         privacyAnswers={this.state.privacyAnswers}/> :
                    <OnboardPage clickGetStarted={openDataCollectionDialog}/>}
                {this.state.privacyAnswers.length &&
                <PrivacyOverviewSection privacyAnswers={this.state.privacyAnswers}/>}
            </div>
        );
    }
}