import * as React from 'react';
import * as ReactDom from 'react-dom';

class Main extends React.Component<{}, {}> {
    render() {
        return (
            <div id="mainRoot">

            </div>
        );
    }
}

ReactDom.render(
    <Main/>,
    document.getElementById("content"),
);
