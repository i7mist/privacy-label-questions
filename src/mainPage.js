import React from "react";
import {DataCollectionDialog} from "./dataCollectionDialog";
import {DataTypeEditSection} from "./dataTypeEditSection";
import {OnboardPage} from "./onboardPage";
import {PrivacyOverviewSection} from "./privacyOverviewSection";
import {DataTypeDialog} from "./dataTypeDialog";

const initPrivacyAnswers = [
    {
        "Contact Info":
            [{"Other User Contact Info": {"purposes": [], "is_linked": null, "is_tracked": null}},
                {"Name": {"purposes": [], "is_linked": null, "is_tracked": null}},
                {"Email Address": {"purposes": [], "is_linked": null, "is_tracked": null}}]
    },
    {"Health & Fitness": [{"Health": {"purposes": [], "is_linked": null, "is_tracked": null}}]}]

export class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            privacyAnswers: [],// initPrivacyAnswers, //[]
            collectionDialogDisplay: false,
            collectionTypeDisplay: false,
            checkedDataCategories: []
            //     initPrivacyAnswers.map((dataTypeDict) => {
            //     let dataType = Object.keys(dataTypeDict)[0]
            //     let categories = dataTypeDict[dataType]
            //     return categories.map((categoryDict) => {
            //         let category = Object.keys(categoryDict)[0]
            //         return dataType + "_" + category
            //     })
            // }).flat()
        }
    }

    render() {
        let openDataCollectionDialog = () => {
            this.setState({collectionDialogDisplay: true})
        }
        let cancelDataCollectionDialog = () => {
            this.setState({collectionDialogDisplay: false})
        }
        let openDataTypeDialog = () => {
            this.setState({collectionTypeDisplay: true})
        }
        let cancelDataTypeDialog = () => {
            this.setState({
                collectionTypeDisplay: false,
                checkedDataCategories: this.state.privacyAnswers.length > 0 && this.state.privacyAnswers[0] !== null ?
                    this.state.privacyAnswers.map((dataTypeDict) => {
                        let dataType = Object.keys(dataTypeDict)[0]
                        let categories = dataTypeDict[dataType]
                        return categories.map((categoryDict) => {
                            let category = Object.keys(categoryDict)[0]
                            return dataType + "_" + category
                        })
                    }).flat() : []
            })
        }
        let onChangeCheckedState= (categoryId) => {
            return () => {
                let checkedDataCategoriesState = this.state.checkedDataCategories
                let index = checkedDataCategoriesState.indexOf(categoryId);
                if (index > -1) {
                    checkedDataCategoriesState.splice(index, 1);
                } else {
                    checkedDataCategoriesState.push(categoryId)
                }
                this.setState({checkedDataCategories: checkedDataCategoriesState})
            }
        }
        return (
            <div className="main-page">
                <DataCollectionDialog
                    privacyAnswers={this.state.privacyAnswers}
                    dialogDisplay={this.state.collectionDialogDisplay}
                    cancelCollectionDialog={cancelDataCollectionDialog}
                    openTypeDialog={openDataTypeDialog}
                    clickSave={() => {
                        let rootDiv = document.getElementById("dataCollectionQuestion")
                        let choices = rootDiv.getElementsByTagName("input")
                        let i;
                        for (i = 0; i < choices.length; ++i) {
                            if (choices[i].checked) {
                                if (choices[i].value === "not_collecting_data") {
                                    this.setState({
                                        privacyAnswers: [null],
                                        checkedDataCategories: []
                                    })
                                    break;
                                }
                            }
                        }
                        this.setState({collectionDialogDisplay: false})
                    }}
                />
                <DataTypeDialog
                    privacyAnswers={this.state.privacyAnswers}
                    dialogDisplay={this.state.collectionTypeDisplay}
                    cancelTypeDialog={cancelDataTypeDialog}
                    openCollectionDialog={openDataCollectionDialog}
                    checkedDataCategories={this.state.checkedDataCategories}
                    onChangeCheckedState={onChangeCheckedState}
                    clickSave={() => {
                        this.setState({collectionTypeDisplay: false})
                    }}
                />
                {this.state.privacyAnswers.length ?
                    <DataTypeEditSection clickEdit={openDataCollectionDialog}
                                         privacyAnswers={this.state.privacyAnswers}/> :
                    <OnboardPage clickGetStarted={openDataCollectionDialog}/>}
                {this.state.privacyAnswers.length ?
                <PrivacyOverviewSection privacyAnswers={this.state.privacyAnswers}/> : null}
            </div>
        );
    }
}