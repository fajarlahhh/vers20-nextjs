import Link from "next/link";
import Image from "next/image";
import SignupForm from "./../components/form/SignupForm";

function Signin() {
    return (
        <>
            <div className="authincation">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center"> 
                                <Link href="/">
                                    <a>
                                        <Image src="/images/logo.png" height={86} width={200} alt="Logo"/>
                                    </a>
                                </Link>
                                <h4 className="card-title ">
                                    Sign Up
                                </h4>
                            </div>
                            <div className="auth-form card">
                                <div className="card-body">
                                    <SignupForm />
                                    <div className="text-center">
                                        <p className="mt-3 mb-0">
                                            <Link href="/signin">
                                                <a className="text-primary">
                                                    Sign in
                                                </a>
                                            </Link>
                                            to your account
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signin;
