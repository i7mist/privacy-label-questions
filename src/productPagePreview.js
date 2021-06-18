import React from "react";
import {dataTypeIconMapping} from "./data";

export class ProductPagePreview extends React.Component {
        render() {
        return (
            <div>
                <h3 className={"display-inline-block"}>Product Page Preview</h3>
                <button className="display-inline-block button-link">See Details</button>
                <div classname = "product-page-preview-container">
                    <div className="product-page-preview-display-box1">
                        [insert icon here] <br></br><br></br>
                        <b>Data Used to Track You</b>
                        <br></br><br></br>
                        <p>The following data may be used to track you across apps and websites owned by other companies:</p>
                        <div className = "product-page-preview-data-display">
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping["Contact Info"]}
                                 alt={"Contact Info"}/> Contact Info
                        </div>
                    </div>
                    <div className="product-page-preview-display-box2">
                        [insert icon here] <br></br><br></br>
                        <b>Data Linked to You</b>
                        <br></br><br></br>
                        <p>The following data may be collected and linked to your identity:</p>
                        <div className = "product-page-preview-data-display">
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping["Contact Info"]}
                                 alt={"Contact Info"}/> Contact Info
                        </div>
                    </div>
                    <div className="product-page-preview-display-box3">
                        [insert icon here] <br></br><br></br>
                        <b>Data Not Linked to You</b>
                        <br></br> <br></br>
                        <p>The following data may be collected but is not linked to your identity:</p>
                        <div className = "product-page-preview-data-display">
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping["Contact Info"]}
                                 alt={"Contact Info"}/> Contact Info <br></br>
                            <img className="display-inline-block icon-style" src={dataTypeIconMapping["Health & Fitness"]}
                                 alt={"Health & Fitness"}/> Health & Fitness<br></br>
                        </div>
                    </div>
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <hr className="solid"/>

            </div>

        )
    }
}
