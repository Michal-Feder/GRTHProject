import React ,{useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './style.scss'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
    
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
  }
    
  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundray">
          <AlertDismissibleExample error={this.state.error.toString()} errorInfo={this.state.errorInfo.componentStack}/>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}
function AlertDismissibleExample({error,errorInfo}) {
  const [show, setShow] = useState(true);
  
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{error}</p>
        <p>{errorInfo}</p>
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Error</Button>;
}
export default ErrorBoundary;