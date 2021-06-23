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

class StudyInitPage extends React.Component {
    render() {
        return <div>
            <label htmlFor="participantID">Please enter your participant ID:</label>
            <input type="text" id="participantID" name="participantID"/>
            <br/>
            <input type="submit" value="Submit" onClick={this.props.onClickSubmitParticipantID}/>
        </div>
    }
}

class StudyHeader extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div className={"display-inline-block"}>Participant ID: {this.props.participantID}</div>
                    <button className="right-btn-group" onClick={this.props.onClickPrivacyLabelDone}>Done</button>
                    <button className="right-btn-group" onClick={this.props.clickShowLogs}>Show all logs</button>
                    <button className="right-btn-group" onClick={this.props.clickShowLabel}>Show privacy label</button>
                </div>
                <hr className={"solid"}/>
            </div>
        );
    }
}

class ShowLogs extends React.Component {
    render() {
        let eventListString
        if (localStorage.getItem("eventList") !== null) {
            eventListString = localStorage.getItem("eventList")
        } else {
            eventListString = "[]"
        }

        return (<div>
            {eventListString}
        </div>)
    }
}

export class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            participantID: null,
            privacyAnswers: localStorage.getItem("privacyAnswers") === null ? [] : JSON.parse(localStorage.getItem("privacyAnswers")),
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
            expandedDefinitionAndExample: false,
            isFirstBlockCompleted: false,
            showLogs: false,
            showLabel: false
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
        let logData = (event, data) => {
            let eventList
            if (localStorage.getItem("eventList") !== null) {
                eventList = JSON.parse(localStorage.getItem("eventList"))
            } else {
                eventList = []
            }
            let desc = {"time": Date.now(), "participantID": this.state.participantID, "event":  event, "data": data}
            console.log(eventList)
            eventList.push(desc)
            localStorage.setItem("eventList", JSON.stringify(eventList))
            localStorage.setItem("privacyAnswers", JSON.stringify(this.state.privacyAnswers))
        }
        let onClickSubmitParticipantID = () => {
            let inputTag = document.getElementById("participantID")
            this.setState({
                participantID: inputTag.value
            })
            logData("submitted participant ID", null)
        }
        let onClickPrivacyLabelDone = () => {
            logData("privacy label completed", this.state.privacyAnswers)
            alert("Your Answer has been recorded")
        }
        let clickShowLogs = () => {
            this.setState({
                showLogs: !this.state.showLogs
            })
        }
        let clickShowLabel = () => {
            this.setState({
                showLabel: !this.state.showLabel
            })
        }
        let openDataCollectionDialog = () => {
            this.setState({collectionDialogDisplay: true})
            logData("openDataCollectionDialog", null)
        }
        let cancelDataCollectionDialog = () => {
            this.setState({collectionDialogDisplay: false})
            logData("cancelDataCollectionDialog", null)
        }
        let openDataTypeDialog = () => {
            this.setState({
                collectionTypeDisplay: true,
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
            logData("openDataTypeDialog", this.state.checkedDataCategories)
        }
        let cancelDataTypeDialog = () => {
            this.setState({
                collectionTypeDisplay: false,
            })
            logData("cancelDataTypeDialog", null)
        }

        let openSetUpDataTrackingDialog = () => {
            this.setState({
                setUpDataTrackingDialogDisplay: true,
                selectedForTracking: getSelectedInfo(this.state.privacyAnswers,
                    this.state.currentDataType, this.state.currentDataCategory, "is_tracked")
            })
            logData("openSetUpDataTrackingDialog", {"currentDataType": this.state.currentDataType,
                "currentDataCategory": this.state.currentDataCategory,
                "selectedForTracking": this.state.selectedForTracking})
        }

        let openTrackingDefinitionDialog = () => {
            this.setState({
                trackingDefinitionDialogDisplay: true
            })
            logData("openTrackingDefinitionDialog", null)
        }

        let openTrackingExampleDialog = () => {
            this.setState({
                trackingExampleDialogDisplay: true
            })
            logData("openTrackingExampleDialog", null)
        }

        let openSetUpDataLinkedDialog = () => {
            this.setState({
                setDataCollectionLinkedDialogDisplay: true,
                selectedLinked: getSelectedInfo(this.state.privacyAnswers,
                    this.state.currentDataType, this.state.currentDataCategory, "is_linked")
            })
            logData("openSetUpDataLinkedDialog", {"currentDataType": this.state.currentDataType,
                "currentDataCategory": this.state.currentDataCategory,
                "selectedForTracking": this.state.selectedLinked})
        };

        let onChangeCheckedDataCategories = (categoryId) => {
            return () => {
                let checkedDataCategoriesState = this.state.checkedDataCategories
                let index = checkedDataCategoriesState.indexOf(categoryId);
                if (index > -1) {
                    checkedDataCategoriesState.splice(index, 1);
                    logData("onChangeCheckedDataCategories", {"categoryId": categoryId, "action": "remove"})
                } else {
                    checkedDataCategoriesState.push(categoryId)
                    logData("onChangeCheckedDataCategories", {"categoryId": categoryId, "action": "add"})
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
                    logData("onChangeSelectedPurpose", {"purpose": purpose, "action": "remove"})
                } else {
                    selectedPurposesState.push(purpose)
                    logData("onChangeSelectedPurpose", {"purpose": purpose, "action": "add"})
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
            logData("handleDataLinkedSelectionChange", {"currentDataType": this.state.currentDataType,
                "currentDataCategory": this.state.currentDataCategory,
                "selectedLinked": this.state.selectedLinked})
        }

        let handleDataForTrackingSelectionChange = (e) => {
            this.setState({
                selectedForTracking: e.target.value
            })
            logData("handleDataForTrackingSelectionChange", {"currentDataType": this.state.currentDataType,
                "currentDataCategory": this.state.currentDataCategory,
                "selectedForTracking": this.state.selectedForTracking})
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
                    logData={logData}
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
                        logData("save privacyAnswers", this.state.privacyAnswers)
                    }}
                />
                <DataTypeDialog
                    privacyAnswers={this.state.privacyAnswers}
                    dialogDisplay={this.state.collectionTypeDisplay}
                    cancelTypeDialog={cancelDataTypeDialog}
                    openCollectionDialog={openDataCollectionDialog}
                    checkedDataCategories={this.state.checkedDataCategories}
                    onChangeCheckedDataCategories={onChangeCheckedDataCategories}
                    logData={logData}
                    clickSave={() => {
                        let oldCategoryInfo = {}
                        let i, j;
                        for (i = 0; i < this.state.privacyAnswers.length ; ++i) {
                            let dataTypeDict = this.state.privacyAnswers[i];
                            if (dataTypeDict === null) {
                                break;
                            }
                            let dataType = Object.keys(dataTypeDict)[0]
                            let categories = dataTypeDict[dataType]
                            for (j = 0 ; j < categories.length ; ++j) {
                                let categoryDict = categories[j]
                                let category = Object.keys(categoryDict)[0]
                                let categoryId = dataType + "_" + category
                                oldCategoryInfo[categoryId] = JSON.parse(JSON.stringify(categoryDict[category]))
                            }
                        }

                        this.state.privacyAnswers.splice(0, this.state.privacyAnswers.length)

                        let resultDict = {}
                        let dataType;
                        for (i = 0; i < this.state.checkedDataCategories.length ; ++i) {
                            let categoryId = this.state.checkedDataCategories[i];
                            dataType = categoryId.split("_")[0];
                            if (dataType in resultDict) {
                                resultDict[dataType].push(categoryId)
                            } else {
                                resultDict[dataType] = [categoryId]
                            }
                        }
                        for (dataType in resultDict) {
                            let catDictList = resultDict[dataType].map((categoryId) => {
                                let category = categoryId.split("_")[1]
                                let catDict = {}
                                if (categoryId in oldCategoryInfo) {
                                    catDict[category] =
                                        JSON.parse(JSON.stringify(oldCategoryInfo[categoryId]))
                                } else {
                                    catDict[category] = {"purposes": [], "is_linked": null, "is_tracked": null}
                                }
                                return catDict
                            })
                            let dataTypeDict = {}
                            dataTypeDict[dataType] = catDictList
                            this.state.privacyAnswers.push(dataTypeDict)
                        }
                        this.setState({collectionTypeDisplay: false})
                        logData("save privacyAnswers", this.state.privacyAnswers)
                    }}
                />
                <SetUpDataPurposeDialog
                    logData={logData}
                    dialogDisplay={this.state.setDataCollectionPurposeDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedPurposes={this.state.selectedPurposes}
                    onChangeSelectedPurpose={onChangeSelectedPurpose}
                    cancelSetUpPurposeDialog={() => {
                        this.setState({
                            setDataCollectionPurposeDialogDisplay: false,
                        })
                        logData("cancelSetUpPurposeDialog", null)
                    }}
                    openSetUpDataLinkedDialog={openSetUpDataLinkedDialog}
                />
                <SetUpDataLinkedDialog
                    logData={logData}
                    dialogDisplay={this.state.setDataCollectionLinkedDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedLinked={this.state.selectedLinked}
                    handleDataLinkedSelectionChange={handleDataLinkedSelectionChange}
                    cancelSetUpDataLinkedDialog={() => {
                        this.setState({
                            setDataCollectionLinkedDialogDisplay: false,
                        })
                        logData("cancelSetUpDataLinkedDialog", null)
                    }}
                    openNextDialog={() => {
                        if (!this.state.isFirstBlockCompleted) {
                            openTrackingDefinitionDialog()
                        } else {
                            openSetUpDataTrackingDialog()
                        }

                    }}
                    openSetUpPurposeDialog={() => {
                        this.setState({
                            setDataCollectionPurposeDialogDisplay: true,
                        })
                        logData("openSetUpPurposeDialog", null)
                    }}
                />
                <TrackingDefinitionDialog
                    logData={logData}
                    dialogDisplay={this.state.trackingDefinitionDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    cancelTrackingDefinitionDialog={() => {
                        this.setState({
                            trackingDefinitionDialogDisplay: false
                        })
                        logData("cancelTrackingDefinitionDialog", null)
                    }}
                    openSetUpDataLinkedDialog={() => {
                        this.setState({
                            setDataCollectionLinkedDialogDisplay: true,
                            selectedLinked: getSelectedInfo(this.state.privacyAnswers,
                                this.state.currentDataType, this.state.currentDataCategory, "is_linked")
                        })
                        logData("openSetUpDataLinkedDialog", {"currentDataType": this.state.currentDataType,
                                "currentDataCategory": this.state.currentDataCategory,
                                "selectedLinked": this.state.selectedLinked})
                    }}
                    openTrackingExampleDialog={openTrackingExampleDialog}
                />
                <TrackingExampleDialog
                    logData={logData}
                    dialogDisplay={this.state.trackingExampleDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    cancelTrackingExampleDialog={() => {
                        this.setState({
                            trackingExampleDialogDisplay: false
                        })
                        logData("cancelTrackingExampleDialog", null)
                    }}
                    openTrackingDefinitionDialog={openTrackingDefinitionDialog}
                    openSetUpDataTrackingDialog={openSetUpDataTrackingDialog}
                />
                <SetUpDataTrackingDialog
                    logData={logData}
                    dialogDisplay={this.state.setUpDataTrackingDialogDisplay}
                    dataType={this.state.currentDataType}
                    dataCategory={this.state.currentDataCategory}
                    selectedForTracking={this.state.selectedForTracking}
                    handleDataForTrackingSelectionChange={handleDataForTrackingSelectionChange}
                    handleDefinitionExampleClick={() => {
                        this.setState({
                            expandedDefinitionAndExample: !this.state.expandedDefinitionAndExample
                        })
                        logData("handleDefinitionExampleClick",
                            {"expandedDefinitionAndExample": this.state.expandedDefinitionAndExample})
                    }}
                    expandedDefinitionAndExample={this.state.expandedDefinitionAndExample}
                    cancelSetUpDataTrackingDialog={() => {
                        this.setState({
                            setUpDataTrackingDialogDisplay: false
                        })
                        logData("cancelSetUpDataTrackingDialog",null)
                    }}
                    openPreviousDialog={() => {
                        if (!this.state.isFirstBlockCompleted) {
                            openTrackingExampleDialog()
                        } else {
                            openSetUpDataLinkedDialog()
                        }
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
                            privacyAnswers: privacyAnswers,
                            isFirstBlockCompleted: true
                        })
                        logData("save privacyAnswers ", privacyAnswers)
                    }}
                />
                {!this.state.participantID && <StudyInitPage onClickSubmitParticipantID={onClickSubmitParticipantID}/>}
                {this.state.participantID && <StudyHeader participantID={this.state.participantID}
                                                          onClickPrivacyLabelDone={onClickPrivacyLabelDone}
                                                          clickShowLabel={clickShowLabel}
                                                          clickShowLogs={clickShowLogs}/>}
                {this.state.showLogs && <ShowLogs/>}
                {this.state.showLabel && !this.state.showLogs && this.state.participantID && (this.state.privacyAnswers.length ?
                    <ProductPagePreview privacyAnswers={this.state.privacyAnswers}/> : null)}
                {!this.state.showLogs && this.state.participantID && (this.state.privacyAnswers.length ?
                    <DataTypeEditSection clickEdit={openDataCollectionDialog}
                                         privacyAnswers={this.state.privacyAnswers}
                                         logData={logData}/> :
                    <OnboardPage clickGetStarted={openDataCollectionDialog} logData={logData}/>)}
                {!this.state.showLogs && this.state.participantID && (this.state.privacyAnswers.length ?
                    <PrivacyOverviewSection privacyAnswers={this.state.privacyAnswers} logData={logData}
                                        openSetUpPurposeDialog={(dataType, dataCategory) => {
                                            return () => {
                                                this.setState({
                                                    setDataCollectionPurposeDialogDisplay: true,
                                                    currentDataType: dataType,
                                                    currentDataCategory: dataCategory,
                                                    selectedPurposes: getSelectedInfo(this.state.privacyAnswers,
                                                        dataType, dataCategory, "purposes")
                                                })
                                                logData("openSetUpPurposeDialog",
                                                    {"currentDataType": this.state.dataType,
                                                        "currentDataCategory": this.state.dataCategory,
                                                        "selectedPurposes": getSelectedInfo(this.state.privacyAnswers,
                                                            dataType, dataCategory, "purposes")})
                                            }
                                        }}
                    /> : null)}
            </div>
        );
    }
}