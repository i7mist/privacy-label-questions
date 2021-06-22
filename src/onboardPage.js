import React from "react";

export class OnboardPage extends React.Component {
    render() {
        return (
            <div>
                <p>The App Store is designed to be a safe and trusted place for people to discover apps from talented
                    developers just like you. Your app can influence culture and change lives, so that's why we're
                    counting on you to help us protect users' privacy.</p>
                <p>After clicking Get Started, you'll be asked to provide some information about your app's data
                    collection practices. This information will appear on your app's product page, where users can see
                    what data your app collects and how it's used.</p>
                <div className="get-started-btn">
                    <button onClick={() => {this.props.logData("finish onboarding page", null);this.props.clickGetStarted()}}>Get Started</button>
                </div>
            </div>
        )
    }
}