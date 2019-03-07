import React from 'react';
import * as Sentry from '@sentry/browser';

Sentry.init({
 dsn: "https://0535e9e09d6f42149aee73227fbf7a8c@sentry.io/1409517"
});
// should have been called before using it here
// ideally before even rendering your react app
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }
    
    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         hasError: false,
    //         error: '',
    //         info: '',
    //     };
    // }
    //
    // componentDidCatch(error, info) {
    //     this.setState((hasError, error, info) => ({ hasError: true, error, info }));
    // }
    //
    // render() {
    //     const { hasError, error, info } = this.state;
    //
    //     if (hasError) {
    //         return (
    //             <>
    //                 <div>error: {error}</div>
    //                 <div>info: {info}</div>
    //             </>
    //         );
    //     }
    //
    //     return this.props.children;
    // }
}

export default ErrorBoundary;
