import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OverviewPage extends React.Component {
    render() {
        return (
            <div>
                <h3>Data Types</h3>
                <button className="button-link" onClick={this.props.clickEdit}>Edit</button>
            </div>
        );
    }
}

class OnboardPage extends React.Component {
    render() {
        return (
            <div>
                <p>The App Store is designed to be a safe and trusted place for people to discover apps from talented developers just like you. Your app can influence culture and change lives, so that's why we're counting on you to help us protect users' privacy.</p>
                <p>After clicking Get Started, you'll be asked to provide some information about your app's data collection practices. This information will appear on your app's product page, where users can see what data your app collects and how it's used.</p>
                <div className="get-started-btn">
                    <button onClick={this.props.clickGetStarted}>Get Started</button>
                </div>
            </div>
        )
    }
}

class DataCollectionQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: !props.privacyAnswers.length ? null :
                props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
        }
    }

    loadState() {
        this.setState({
            checked: !this.props.privacyAnswers.length ? null :
                this.props.privacyAnswers[0] ? "collecting_data" : "not_collecting_data"
        })
    }

    render() {
        let handleLocalChange = (e) => {
            this.props.handleGlobalChange(e)
            this.setState({
                checked: e.target.value
            })
        }
        return <form>
            <p>Do you or your third-party partners collect data from this app?</p>
            <div id="dataCollectionQuestion">
                <input type="radio" id="collecting_data" checked={this.state.checked === "collecting_data"}
                       name="dataCollection" value="collecting_data" onChange={handleLocalChange}/>
                <label htmlFor="collecting_data"><b>Yes</b>, we collect data from this app</label> <br/>

                <input type="radio" id="not_collecting_data" checked={this.state.checked === "not_collecting_data"}
                       name="dataCollection" value="not_collecting_data" onChange={handleLocalChange}/>
                <label htmlFor="not_collecting_data"><b>No</b>, we do not collect data from this app</label> <br/>
            </div>
        </form>
    }
}

class DataCollectionDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            isStarted: false,
            isComplete: false,
        }
        this.dataCollectionQuestionRef = React.createRef()
    }

    loadState() {
        this.dataCollectionQuestionRef.current.loadState()
    }

    render() {
        return (
            <div className={"modal " + (this.props.dialogDisplay === true ? "display-block" : "display-hidden")}>
                <div className="modal-heading">
                    <h3>Data Collection</h3>
                </div>
                <div className="modal-body">
                    Thanks for helping users understand your app's privacy practices. Remember that you're responsible for any third-party code that is added to your app, so if your third-party partners collect data from your app, you must represent that in your responses.
                    <p/>
                    <ul>
                        <li>
                            “Collect” refers to transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than necessary to service the transmitted request in real time.
                        </li>
                        <li>
                            “Third-party partners” include analytics tools, advertising networks, third-party SDKs, or other external vendors whose code you have added to the app.
                        </li>
                    </ul>
                    <p/>
                    You can <a href={"https://developer.apple.com/app-store/app-privacy-details/"} target="_blank" rel="noopener noreferrer">view the full list of questions</a> at any time.
                    <p/>
                    <hr className="solid"/>
                    <p/>
                    <DataCollectionQuestion
                        ref = {this.dataCollectionQuestionRef}
                        privacyAnswers = {this.props.privacyAnswers}
                        handleGlobalChange={(e)=>{
                            this.setState({
                                isStarted: true,
                                isComplete: e.target.value === "not_collecting_data"
                            })
                        }}
                    />
                </div>
                <div className="modal-footer">
                    <div className="right-btn-group">
                        <button onClick={this.props.clickCancel}>Cancel</button>
                        {
                            this.state.isComplete?
                            <button onClick={this.props.clickSave}>Save</button>:
                            <button onClick={() => {}} disabled={!this.state.isStarted}>Next</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            privacyAnswers: [], // [{"Contact Info": [{"name": {"purposes": [], "is_linked": null, "is_tracked": null}}]}],
            collectionDialogDisplay: false
        }
        this.dataCollectionDialogRef = React.createRef();
    }
    render() {
        let openDataCollectionDialog = ()=> {
            this.setState({collectionDialogDisplay: true})
            this.dataCollectionDialogRef.current.loadState()
        }
        return (
            <div className="main-page">
                <DataCollectionDialog
                    ref = {this.dataCollectionDialogRef}
                    privacyAnswers={this.state.privacyAnswers}
                    dialogDisplay={this.state.collectionDialogDisplay}
                    clickCancel={() => this.setState({collectionDialogDisplay: false})}
                    clickSave={() => {
                        let rootDiv = document.getElementById("dataCollectionQuestion")
                        let choices = rootDiv.getElementsByTagName("input")
                        let i;
                        for (i = 0 ; i < choices.length ; ++i) {
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
                    <OverviewPage clickEdit={openDataCollectionDialog} privacyAnswers={this.state.privacyAnswers}/> :
                    <OnboardPage clickGetStarted={openDataCollectionDialog}/>}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <MainPage />,
    document.getElementById('root')
);

