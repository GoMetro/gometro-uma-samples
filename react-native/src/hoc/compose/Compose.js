import React, { Fragment } from "react";

const Compose = ({ providers, children }) => {

    return (
        <Fragment>
            { providers.reverse().reduce((acc, curr) => {
                const [ Provider, props ] = Array.isArray(curr) ? [ curr[0], curr[1] ] : [ curr, {} ];
                return <Provider { ...props }>{ acc }</Provider>;
            }, children) }
        </Fragment>
    );
};

export default Compose;
