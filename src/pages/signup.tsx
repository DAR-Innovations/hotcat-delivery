import { PAGES_LINKS } from "common/pageLinks";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import Layout from "components/Layout/Layout";
import NotificationModal from "components/NotificationModal/NotificationModal";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import React, { MutableRefObject, useRef, useState } from "react";

const SignupPage: NextPage = () => {
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificatioMessage, setNotificatioMessage] = useState<string | null>(
    null
  );

  const handleSignupSubmit = () => {
    const usernameValue = usernameRef.current.value || null;
    const emailValue = emailRef.current.value || null;
    const nameValue = nameRef.current.value || null;
    const passwordValue = passwordRef.current.value || null;

    const formFieldsValues = [
      usernameValue,
      passwordValue,
      emailValue,
      nameValue,
    ];

    const isFormInputValid = formFieldsValues.every(value => value !== null);

    if (!isFormInputValid) {
      setNotificatioMessage("All fields must be filled");
      return setShowNotificationModal(true);
    }

    console.log("username: ", usernameValue);
    console.log("email: ", emailValue);
    console.log("name: ", nameValue);
    console.log("password: ", passwordValue);

    Router.push(PAGES_LINKS.HOME.path);
  };

  return (
    <Layout
      title={PAGES_LINKS.SIGNUP.name}
      navbarIncluded={false}
      className="w-full"
    >
      <div className="w-full h-screen  bg-[url('/assets/signupBackground.jpg')] bg-cover">
        <div className="w-full h-screen bg-gray-600 bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
          <div className="p-4 min-w-[330px] sm:min-w-[360px]">
            <h1 className="text-2xl font-semibold text-gray-200">
              Create new <br /> Hotcat account
            </h1>

            <div className="flex flex-col gap-y-3 mt-6">
              <input
                ref={usernameRef}
                type="text"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200 rounded-none"
                placeholder="Username"
              />

              <input
                ref={emailRef}
                type="email"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200 rounded-none"
                placeholder="Email"
              />

              <input
                ref={nameRef}
                type="text"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200 rounded-none"
                placeholder="Name"
              />

              <input
                ref={passwordRef}
                type="password"
                className="bg-transparent py-4 border-b-2 border-gray-200 text-gray-50 text-base placeholder-gray-200 rounded-none"
                placeholder="Password"
              />
            </div>

            <div className="w-full mt-10">
              <button
                onClick={handleSignupSubmit}
                className="border-2 border-black text-black hover:bg-black hover:text-gray-50 rounded-2xl w-full py-2 px-3 transition-all duration-300"
              >
                {PAGES_LINKS.SIGNUP.name}
              </button>
            </div>

            <div className="flex item-center gap-2 mt-20 sm:mt-24">
              <p className="text-gray-200 text-base font-normal">
                Already have an account?
              </p>
              <Link href={PAGES_LINKS.LOGIN.path}>
                <p className="text-gray-200 text-base font-normal underline cursor-pointer">
                  {PAGES_LINKS.LOGIN.name}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isActive={showNotificationModal}
        setShowNotificationModal={setShowNotificationModal}
        message={notificatioMessage}
        type={NOTIFICATION_TYPES.ERROR}
      />
    </Layout>
  );
};

export default SignupPage;