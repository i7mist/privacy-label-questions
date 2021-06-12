import React from "react";

export class TrackingDefinitionText extends React.Component {
    render() {
        return (
            <div>
                <div className={"description-sub-title"}>Tracking</div>
                <div>
                    Tracking is linking data collected from your app about a particular end-user or device such as a
                    user ID, device ID, or profile, with Third-Party Data for targeted advertising or advertising
                    measurement purposes. It also refers to sharing data collected from your app about a particular
                    end-user or device with a data broker.
                </div>
                <br/>
                <div>
                    Tracking does not apply in the following situations:
                </div>
                <ul>
                    <li>
                        When the data is linked solely on the end-user's device and is not sent off the device in a way
                        that can identify the end-user or device
                    </li>
                    <li>
                        When the data broker uses the data shared with them solely for fraud detection or prevention or
                        security purposes
                    </li>
                    <li>
                        When the data broker is a consumer reporting agency and the data is shared with them for
                        purposes of (1) reporting on a consumer’s creditworthiness, or (2) obtaining information on a
                        consumer’s creditworthiness for the specific purpose of making a credit determination.
                    </li>
                </ul>
                <div className={"description-sub-title"}>Third-Party Data</div>
                <div>
                    Third-Party Data is any data about a particular end-user or device collected from the apps,
                    websites, or offline properties not owned by the developer.
                </div>
            </div>
        );
    }
}