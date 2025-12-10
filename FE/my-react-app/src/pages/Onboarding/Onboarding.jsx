// import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import arnOnboard from "../../assets/arn-onboard.png";
import Onboarding_Navbar from "../../components/Onboarding-Navbar/Onboarding_Navbar";
import { Link } from "react-router-dom";
import HandleCopy from "../../components/HandleCopy/HandleCopy";
// import { useState } from "react";

const Onboarding = ({ onNext }) => {
  // const [choosenPage, setChoosenPage] = useState("A");
  const jsondata = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`;

  const jsonDataToPass = JSON.stringify(JSON.parse(jsondata), null, 2);

  return (
    <div className="pl-8 bg-gray-200 w-full min-h-full pb-10">
      <Onboarding_Navbar currentPage={1} />
      <main className="">
        <div className="pt-7 pl-4">
          <h1 className="text-2xl">Create an IAM Role</h1>
          <p>Create an IAM Role by following these steps</p>
        </div>
        <main className="bg-white border-gray-100 rounded ">
          <div className="pl-8 pt-7 flex flex-col gap-4">
            <div>
              <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                1
              </span>
              <span className="pl-2">
                <span>Log into AWS account &</span>

                <span>
                  <a href="" className="text-sky-700 underline pl-1">
                    Create an IAM Role.
                  </a>
                </span>
              </span>
            </div>

            <div>
              <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white">
                2
              </span>
              <span className="pl-2">
                In theTrusted entity typesection, select{" "}
                <span className="font-bold">Custom trust policy</span> .Replace
                the prefilled policy with the policy provided below -
              </span>

              <div
                className="bg-sky-50 p-2 rounded cursor-pointer"
                onClick={() => HandleCopy(JSON.stringify(JSON.parse(jsondata)))}
              >
                <pre className="text-blue-800 font-bold overflow-auto h-60">
                  {jsonDataToPass}
                </pre>
              </div>
            </div>

            <div>
              <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white">
                3
              </span>
              <span className="pl-2">
                Click on Next to go to the Add permissions page. We would not be
                adding any permissions for now because the permission policy
                content will be dependent on the AWS Account ID retrieved from
                the IAM Role. Click on Next
              </span>
            </div>

            <div>
              <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white">
                4
              </span>

              <span className="pl-2">
                In the Role name field, enter the below-mentioned role name, and
                click on Create Role -
              </span>

              <div
                className="pl-2 p-1.5 bg-slate-100 rounded mt-2 w-80 flex gap-3 cursor-pointer"
                onClick={() => HandleCopy("CK-Tuner-Role-dev2")}
              >
                <ContentCopyIcon />
                <span>CK-Tuner-Role-dev2</span>
              </div>

              <div className="mt-3">
                <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white">
                  5
                </span>
                <span className="pl-2">
                  Go to the newly create IAM Role and copy the Role ARN -
                </span>
                <div className="pl-2 mt-2">
                  <img src={arnOnboard} alt="dsd" />
                </div>
              </div>

              <div className="mt-1">
                <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white">
                  6
                </span>

                <span className="pl-2 text-2xl">
                  Paste the copied Role ARN below -
                </span>

                <div className="flex">
                  <div className="pl-2 mt-2 mb-12">
                    <label htmlFor="iam-role-arn">
                      Enter the IAM Role ARN*
                    </label>
                    <p>
                      <input
                        type="text"
                        id="iam-role-arn"
                        required
                        className="border rounded border-red-500 p-2 w-110"
                        placeholder="Enter the IAM Role ARN"
                      />
                    </p>
                  </div>
                  <div className="pl-2 mt-2 mb-12">
                    <label htmlFor="iam-role-arn">Enter the Account ID*</label>
                    <p>
                      <input
                        type="text"
                        id="iam-account-id"
                        required
                        className="border rounded border-red-500 p-2 w-110"
                        placeholder="Enter the Account ID"
                      />
                    </p>
                  </div>
                  <div className="pl-2 mt-2 mb-12">
                    <label htmlFor="iam-role-arn">
                      Enter the Acoount Name*
                    </label>
                    <p>
                      <input
                        type="text"
                        id="iam-account-name"
                        required
                        className="border rounded border-red-500 p-2 w-110"
                        placeholder="Enter the Account Name"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-2 flex justify-between">
          <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold">
            Cancel
          </button>

          <div className="flex gap-1">
            <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold">
              Back
            </button>
            <button
              className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold"
              onClick={onNext}
            >
              {/* <Link to="/onboarding2">Next - Add Customer Managed Policies</Link> */}
              Add Customer Managed Policies
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Onboarding;
