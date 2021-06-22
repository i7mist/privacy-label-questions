import React from "react";

export class DataTypeText extends React.Component {
    render() {
        return (
            <div className={"description-text"}>
                Next, select all of the data that you or your third-party partners collect from this app.
                If your app is currently available on the App Store, make sure your responses reflect the data collected
                only from that app version.
                <p/>
                <div className={"description-title"}>Optional Disclosure</div>
                Data types that meet all of the following criteria are optional to disclose:
                <ul>
                    <li>
                        The data is not used for tracking purposes (meaning the data is not linked with other
                        third-party data about the user or device for advertising or advertising measurement,
                        or shared with a data broker). For more detail,
                        see <a href={"https://developer.apple.com/app-store/app-privacy-details/#user-tracking"}
                           target="_blank" rel="noopener noreferrer"
                               onClick={() => {
                                   this.props.logData("open link",
                                       "https://developer.apple.com/app-store/app-privacy-details/#user-tracking")}}>
                            App privacy details on the App Store</a>.
                    </li>
                    <li>
                        The data is not used for Third-Party Advertising, your Advertising or Marketing purposes,
                        or for Other Purposes, as those terms are defined
                        in <a href={"https://developer.apple.com/app-store/app-privacy-details/#data-type-usage"}
                              target="_blank" rel="noopener noreferrer"
                              onClick={() => {
                                  this.props.logData("open link",
                                      "https://developer.apple.com/app-store/app-privacy-details/#data-type-usage")}}>
                        App privacy details on the App Store</a>.
                    </li>
                    <li>
                        Collection of the data occurs only in infrequent cases that are not part of your app’s primary
                        functionality, and which are optional for the user.
                    </li>
                    <li>
                        As part of the interface in your app where the user provides the data to be collected, such data
                        must be transparent to the user at the time of collection, the user’s name or account name must
                        be prominently displayed in the submission form alongside the other data elements being
                        submitted, and the user must affirmatively choose each time to provide the data for collection.
                    </li>
                </ul>
                If a data type collected by your app meets some, but not all, of the above criteria, it must be
                disclosed in your privacy section.
                <p/>
                Examples of data that may not need to be disclosed include data collected in optional feedback forms or customer service requests that are unrelated to the primary purpose of the app and meet the other criteria above.
                <p/>
                For the purpose of clarity, data collected on an ongoing basis after an initial request for permission must be disclosed.
                <p/>
                <div className={"description-title"}>Regulated Financial Services Disclosure</div>
                Data types that are collected by an app that facilitates regulated financial services and where the data collected meets all of the following criteria are optional to disclose:
                <ul>
                    <li>
                        Collection of the regulated data is in accordance with a legally required privacy notice under applicable financial services or data protection laws or regulations (e.g., GDPR or GLBA).
                    </li>
                    <li>
                        Collection by the app of that data occurs only in cases that are not part of your app’s primary functionality, and which are optional for the user.
                    </li>
                    <li>
                        Such notice provides that data is not shared with unaffiliated third parties to market other products and services.
                    </li>
                    <li>
                        Such data is not linked with third-party data for advertising purposes or shared with a data broker except for purposes of fraud detection or prevention or security, or with a consumer reporting agency for credit reporting.
                    </li>
                </ul>
                If a data type collected by your app meets some, but not all, of the above criteria, it must be disclosed in your privacy section.
                <p/>
                <div className={"description-title"}>Health Research Disclosure</div>
                Data types that are collected as part of a health research study and where the data collected meets all of the following criteria are optional to disclose:
                <ul>
                    <li>
                        The data is collected by an entity whose collection of the data is subject to an informed consent form as part of a health research study that has been reviewed and approved by an institutional review board or ethics review board.
                    </li>
                    <li>
                        All such data collection must follow the relevant App Store Guidelines and the data may not be
                        used for tracking purposes as defined
                        in <a href={"https://developer.apple.com/app-store/app-privacy-details/#data-type-usage"}
                              target="_blank" rel="noopener noreferrer"
                              onClick={() => {
                                  this.props.logData("open link",
                                      "https://developer.apple.com/app-store/app-privacy-details/#data-type-usage")}}>
                        App privacy details on the App Store</a>.
                    </li>
                </ul>
                If the data type collected by your app meets some, but not all, of the above criteria, it must be disclosed in your privacy section.
            </div>
        );
    }
}