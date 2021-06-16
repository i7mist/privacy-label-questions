import React from "react";
import {DataCollectionDialog} from "./dataCollectionDialog";
import {DataTypeEditSection} from "./dataTypeEditSection";
import {OnboardPage} from "./onboardPage";
import {PrivacyOverviewSection} from "./privacyOverviewSection";
import {DataTypeDialog} from "./dataTypeDialog";
import {SetUpDataPurposeDialog} from "./setUpDataPurposeDialog"
import {SetUpDataLinkedDialog} from "./setUpDataLinkedDialog";
import {TrackingDefinitionDialog} from "./trackingDefinitionDialog";
import {TrackingExampleDialog} from "./trackingExampleDialog";
import {SetUpDataTrackingDialog} from "./setUpDataTrackingDialog";
import {ProductPagePreview} from "./productPagePreview";

const initPrivacyAnswers = [
    {
        "Contact Info":
            [{"Other User Contact Info": {"purposes": ["Third-Party Advertising", "Developer's Advertising or Marketing", "App Functionality"], "is_linked": "data_linked", "is_tracked": "data_for_tracking"}},
                {"Name": {"purposes": ["Product Personalization"], "is_linked": "data_linked", "is_tracked": "data_not_for_tracking"}},
                {"Email Address": {"purposes": ["App Functionality"], "is_linked": "data_not_linked", "is_tracked": "data_not_for_tracking"}}]
    },
    {"Health & Fitness": [{"Health": {"purposes": ["App Functionality", "Other Purposes"], "is_linked": "data_not_linked", "is_tracked": "data_not_for_tracking"}}]}]

export class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            privacyAnswers: initPrivacyAnswers, //[]
            collectionDialogDisplay: false,
            collectionTypeDisplay: false,
            setDataCollectionPurposeDialogDisplay: false,
            trackingDefinitionDialogDisplay: false,
            trackingExampleDialogDisplay: false,
            setUpDataTrackingDialogDisplay: false,
            checkedDataCategories: [],
            currentDataType: null,
            currentDataCategory: null,
            selectedPurposes: [],
            selectedLinked: null,
            selectedForTracking: null,
            expandedDefinitionAndExample: false
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
        let onChangeCheckedState = (categoryId) => {
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

        let onChangeSelectedPurpose = (purpose) => {
            return () => {
                let selectedPurposesState = this.state.selectedPurposes
                let index = selectedPurposesState.indexOf(purpose)
                if (index > -1) {
                    selectedPurposesState.splice(index, 1);
                } else {
                    selectedPurposesState.push(purpose)
                }
                this.setState({
                    selectedPurposes: selectedPurposesState
                })
            }
        }

        let handleDataLinkedSelectionChange = (e) => {
            this.setState({
                selectedLinked: e.target.value
            })
        }

        let handleDataForTrackingSelectionChange = (e) => {
            this.setState({
                selectedForTracking: e.target.value
            })
        }

        function getSelectedInfo(privacyAnswers, dataType, dataCategory, fieldName) {
            if (privacyAnswers.length === 0 || privacyAnswers[0] === null) {
                return []
            }
            let i, j
            for (i = 0 ; i < privacyAnswers.length ; ++i) {
                if (dataType !== Object.keys(privacyAnswers[i])[0]) {
                    continue;
                }
                let dataCategoryInfoList = privacyAnswers[i][dataType]
                for (j = 0 ; j < dataCategoryInfoList.length ; ++j) {
                    if (dataCategory !== Object.keys(dataCategoryInfoList[j])[0]) {
                        continue;
                    }
                    return JSON.parse(JSON.stringify(dataCategoryInfoList[j][dataCategory][fieldName]))
                    // return dataCategoryInfoList[j][dataCategory][fieldName]
                }
            }
            return []
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
                <SetUpDataPurposeDialog
                    dialogDisplay={this.state.setDataCollectionPurposeDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedPurposes={this.state.selectedPurposes}
                    onChangeSelectedPurpose={onChangeSelectedPurpose}
                    cancelSetUpPurposeDialog={() => {
                        this.setState({
                            setDataCollectionPurposeDialogDisplay: false,
                        })
                    }}
                    openSetUpDataLinkedDialog={() => {
                        this.setState({
                            setDataCollectionLinkedDialogDisplay: true,
                            selectedLinked: getSelectedInfo(this.state.privacyAnswers,
                                this.state.currentDataType, this.state.currentDataCategory, "is_linked")
                        })
                    }}
                />
                <SetUpDataLinkedDialog
                    dialogDisplay={this.state.setDataCollectionLinkedDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedLinked={this.state.selectedLinked}
                    handleDataLinkedSelectionChange={handleDataLinkedSelectionChange}
                    cancelSetUpDataLinkedDialog={() => {
                        this.setState({
                            setDataCollectionLinkedDialogDisplay: false,
                        })
                    }}
                    openTrackingDefinitionDialog={() => {
                        this.setState({
                            trackingDefinitionDialogDisplay: true
                        })
                    }}
                    openSetUpPurposeDialog={() => {
                        this.setState({
                            setDataCollectionPurposeDialogDisplay: true,
                        })
                    }}
                />
                <TrackingDefinitionDialog
                    dialogDisplay={this.state.trackingDefinitionDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    cancelTrackingDefinitionDialog={() => {
                        this.setState({
                            trackingDefinitionDialogDisplay: false
                        })
                    }}
                    openSetUpDataLinkedDialog={() => {
                        this.setState({
                            setDataCollectionLinkedDialogDisplay: true,
                            selectedLinked: getSelectedInfo(this.state.privacyAnswers,
                                this.state.currentDataType, this.state.currentDataCategory, "is_linked")
                        })
                    }}
                    openTrackingExampleDialog={() => {
                        this.setState({
                            trackingExampleDialogDisplay: true
                        })
                    }}
                />
                <TrackingExampleDialog
                    dialogDisplay={this.state.trackingExampleDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    cancelTrackingExampleDialog={() => {
                        this.setState({
                            trackingExampleDialogDisplay: false
                        })
                    }}
                    openTrackingDefinitionDialog={() => {
                        this.setState({
                            trackingDefinitionDialogDisplay: true
                        })
                    }}
                    openSetUpDataTrackingDialog={() => {
                        this.setState({
                            setUpDataTrackingDialogDisplay: true,
                            selectedForTracking: getSelectedInfo(this.state.privacyAnswers,
                                this.state.currentDataType, this.state.currentDataCategory, "is_tracked")
                        })
                    }}
                />
                <SetUpDataTrackingDialog
                    dialogDisplay={this.state.setUpDataTrackingDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedForTracking={this.state.selectedForTracking}
                    handleDataForTrackingSelectionChange={handleDataForTrackingSelectionChange}
                    handleDefinitionExampleClick={() => {
                        this.setState({
                            expandedDefinitionAndExample: !this.state.expandedDefinitionAndExample
                        })
                    }}
                    expandedDefinitionAndExample={this.state.expandedDefinitionAndExample}
                    cancelSetUpDataTrackingDialog={() => {
                        this.setState({
                            setUpDataTrackingDialogDisplay: false
                        })
                    }}
                    openTrackingExampleDialog={() => {
                        this.setState({
                            trackingExampleDialogDisplay: true
                        })
                    }}
                    saveAnswers={() => {
                        let i, j
                        let privacyAnswers = this.state.privacyAnswers;
                        for (i = 0 ; i < privacyAnswers.length ; ++i) {
                            if (this.state.currentDataType !== Object.keys(privacyAnswers[i])[0]) {
                                continue;
                            }
                            let dataCategoryInfoList = privacyAnswers[i][this.state.currentDataType]
                            for (j = 0 ; j < dataCategoryInfoList.length ; ++j) {
                                if (this.state.currentDataCategory !== Object.keys(dataCategoryInfoList[j])[0]) {
                                    continue;
                                }
                                dataCategoryInfoList[j][this.state.currentDataCategory]["purposes"] =
                                    this.state.selectedPurposes
                                dataCategoryInfoList[j][this.state.currentDataCategory]["is_linked"] =
                                    this.state.selectedLinked
                                dataCategoryInfoList[j][this.state.currentDataCategory]["is_tracked"] =
                                    this.state.selectedForTracking
                                break;
                            }
                        }
                        this.setState({
                            privacyAnswers: privacyAnswers
                        })
                        console.log(this.state.privacyAnswers)
                    }}
                />
                {this.state.privacyAnswers.length ? <ProductPagePreview privacyAnswers={this.state.privacyAnswers}/> : null}
                {this.state.privacyAnswers.length ?
                    <DataTypeEditSection clickEdit={openDataCollectionDialog}
                                         privacyAnswers={this.state.privacyAnswers}/> :
                    <OnboardPage clickGetStarted={openDataCollectionDialog}/>}
                {this.state.privacyAnswers.length ?
                <PrivacyOverviewSection privacyAnswers={this.state.privacyAnswers}
                                        openSetUpPurposeDialog={(dataType, dataCategory) => {
                                            return () => {
                                                this.setState({
                                                    setDataCollectionPurposeDialogDisplay: true,
                                                    currentDataType: dataType,
                                                    currentDataCategory: dataCategory,
                                                    selectedPurposes: getSelectedInfo(this.state.privacyAnswers,
                                                        dataType, dataCategory, "purposes")
                                                })
                                            }
                                        }}
                /> : null}
            </div>
        );
    }
}