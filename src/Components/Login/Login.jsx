/* eslint-disable import/no-cycle */
import GoogleSignup from '../GoogleSignup/GoogleSignup';
import OwnSignup from '../OwnSignup/OwnSignup';

const Login = () => (
    <div style={{ textAlign: 'center' }}>
        <GoogleSignup />
        <OwnSignup />
    </div>
);

export default Login;
