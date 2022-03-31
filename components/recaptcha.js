import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

const RecaptchaComponent = (Component) => {
   
  const Recaptcha = ({ children }) => {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
        {children}
      </GoogleReCaptchaProvider>
    );
  };
  return class Higher extends React.Component{
    render() {
      return (
        <Recaptcha>
          <Component {...this.props} />
        </Recaptcha>
      );
    }
  };
};
export { RecaptchaComponent };