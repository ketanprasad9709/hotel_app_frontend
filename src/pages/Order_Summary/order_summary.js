import { Fragment } from "react";

import { Navbar, Summary } from "../../components";

export const OrderSummary = () => {

    return (
        <Fragment>
            <div>
                <Navbar />
            </div>
            <div>
                <Summary />
            </div>
        </Fragment>
    )
};