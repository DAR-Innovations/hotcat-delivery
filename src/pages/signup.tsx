import { RegistrationDTO } from "common/dto/RegistrationDTO";
import { PAGES_LINKS } from "common/pageLinks";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import Layout from "components/Layout/Layout";
import BackSolid from "components/UI/Icons/BackSolid";
import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { registerUser } from "proxy/fetches/authApi";
import React, { MutableRefObject, useRef, useState } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

const SignupPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [isNotifiedChecked, setIsNotifiedChecked] = useState(false);

  const handleOnChangeNotificationChecked = () => {
    setIsNotifiedChecked(prev => !prev);
  };

  const handleSignupSubmit = async () => {
    const usernameValue = usernameRef.current.value;
    const emailValue = emailRef.current.value;
    const nameValue = nameRef.current.value;
    const passwordValue = passwordRef.current.value;

    const formFieldsValues = [
      usernameValue,
      passwordValue,
      emailValue,
      nameValue,
    ];

    const isFormInputValid = formFieldsValues.every(value => value !== null);

    if (!isFormInputValid) {
      return dispatch(
        showNotificationModal({
          message: "All fields must be filled",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const registrationDTO: RegistrationDTO = {
      username: usernameValue,
      email: emailValue,
      name: nameValue,
      password: passwordValue,
      isSubscribed: isNotifiedChecked,
    };

    const isSignedUp = await registerUser(dispatch, registrationDTO);

    if (isSignedUp) {
      return Router.push(PAGES_LINKS.HOME.path);
    } else {
      return dispatch(
        showNotificationModal({
          message: "Error! Try again",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }
  };

  return (
    <Layout
      title={PAGES_LINKS.SIGNUP.name}
      navbarIncluded={false}
      className="w-full h-screen bg-[url('/assets/signupBackground.jpg')] bg-cover"
    >
      <div className="w-full h-screen bg-gray-600 bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center">
        <div className="max-w-[370px] relative">
          {/* Back link */}
          <div className="absolute -top-10 -left-1">
            <Link href={PAGES_LINKS.HOME.path}>
              <div className="flex items-center gap-1 cursor-pointer">
                <BackSolid className="w-4 h-4" filledColor="rgb(209 213 219)" />
                <p className="text-sm sm:stext-base text-gray-300 font-normal">
                  {PAGES_LINKS.HOME.name}
                </p>
              </div>
            </Link>
          </div>

          {/* Form */}
          <div className="min-w-[330px] sm:min-w-[360px]">
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

            <div className="mt-10">
              <input
                type="checkbox"
                id="notification"
                checked={isNotifiedChecked}
                onChange={handleOnChangeNotificationChecked}
              />
              <label htmlFor="notification" className="text-gray-200 ml-2">
                Get notifications on your email about new products and services
              </label>
            </div>

            <div className="w-full mt-10">
              <button
                onClick={handleSignupSubmit}
                className="border-2 border-black text-black hover:bg-black hover:text-gray-50 rounded-2xl w-full py-2 px-3 transition-all duration-300"
              >
                {PAGES_LINKS.SIGNUP.name}
              </button>
            </div>

            <div className="flex item-center gap-2 mt-12 sm:mt-16">
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
    </Layout>
  );
};

export default SignupPage;
