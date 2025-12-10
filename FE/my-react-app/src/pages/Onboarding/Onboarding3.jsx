import React from "react";
import Onboarding_Navbar from "../../components/Onboarding-Navbar/Onboarding_Navbar";
// import arnOnboard from "../../assets/arn-onboard.png";
import onboarding4Image from "../../assets/onboarding-4.png";
import onboarding_Set_Delivery_Options from "../../assets/onboarding_set_delivery_options.png";
import report_Delivery_Options from "../../assets/report_delivery_options.png";
import Checkbox from '@mui/material/Checkbox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Paper, Tooltip } from '@mui/material';
import Radio from "@mui/material/Radio";
import { toast } from "sonner";
import handleCopy from "../../components/HandleCopy/HandleCopy";
import HandleCopy from "../../components/HandleCopy/HandleCopy";

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };


const Onboarding3 = ({ onBack }) => {

    const copyText = "ck-tuner-275595855473-hourly-cur";


  return (
    <div>
      <Onboarding_Navbar currentPage={3} />
      <div>
        <main className="">
          <div className="pt-7 pl-4">
            <h1 className="text-2xl font-bold">
              Create Cost & Usage Report
            </h1>
            <p className="mt-2">Create a Cost & Usage Report by following these steps</p>
          </div>
          <main className="bg-white pl-2 border-gray-100 ml-5 mt-3 border rounded-xl pb-12 ">
            <div className=" pt-7 flex flex-col gap-4 pl-10">
              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    1
                  </span>
                  <span className="pl-5">
                    Go to{" "}
                    <span className="font-bold underline text-blue-700">
                      Cost and Usage Reports
                    </span>{" "}
                    in the Billing Dashboard and click on <span className="font-bold">Create report</span> .
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    2
                  </span>
                  <span className="pl-5">
                    Name the report as shown below and select the{" "}
                    <span className="font-bold">
                      Include resource IDs
                    </span>{" "}
                    checkbox -
                  </span>

                  <div className="ml-4 mt-5 bg-gray-100 p-2 rounded w-110 cursor-pointer" onClick={()=>HandleCopy(copyText)}>
                    <span>
                        <ContentCopyIcon/>
                    </span>
                    <span className="pl-2">{copyText}</span>
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-400">Ensure that the following configuration is checked</p>
                    <span>
                        <span>
                            <Checkbox {...label} disabled checked />
                        </span>
                        <span className="font-bold">Include Resource IDs</span>
                    </span>

                    <p className="mt-3">Click on next</p>
                  </div>
                </div>

                <img src={onboarding4Image} alt="" className="mt-3 pl-5" />
              </div>

              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    3
                  </span>
                  <span className="pl-5">
                    In {" "}
                    <span className=" italic">
                      Configure S3 Bucket
                    </span>{" "}
                    provide the name of the S3 bucket that was created -{" "}
                  </span>

                  <div className="mt-5 pl-8">
                    <p className="text-gray-500">Ensure that the following configuration is checked</p>
                    <span className="pl-5">
                        <Checkbox {...label} disabled checked />
                        <span className="font-bold">The following default will be applied to your bucket.</span>
                    </span>

                    <p className="mt-4">Click on <span className="font-bold">Save</span></p>
                </div>
                </div>

                <img src={onboarding_Set_Delivery_Options} alt="" className="mt-3 pl-5" />
              </div>

              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    4
                  </span>
                  <span className="pl-5">
                    In the,{" "}
                    <span className="italic">
                      Delivery options
                    </span>{" "}
                    section, enter the below-mentioned Report path prefix -{" "}
                  </span>

                  <div className="mt-5 pl-8">
                    <div>
                        <p className="text-gray-400">Report path prefix:</p>
                        <div className="bg-gray-100 w-110 text-black p-2 border rounded mt-2">
                            <ContentCopyIcon/>
                            <span className="pl-3">275595855473</span>
                        </div>
                    </div>


                    <div className="mt-7 pl-4">
                        <p className="text-gray-400">Additionally, ensure that the following checks are in place</p>
                        <div >
                            <p className="mt-2 text-gray-400">Time granularity</p>
                            <span>
                                <Radio checked/>
                                <span className="font-bold">Hourly</span>
                            </span>
                        </div>

                        <div>
                            <p>Please make sure these checks are Enabled in Enable report data integration for:</p>
                            <span>
                                <Checkbox checked/>
                                <span className="font-bold">Amazon Athena</span>
                            </span>
                        </div>
                    </div>
                  </div>
                </div>

                <img src={report_Delivery_Options} alt="" className="mt-3 pl-5" />
              </div>

              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    5
                  </span>
                  <span className="pl-5">
                     Click on <span className="font-bold">Next</span>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <span className="font-bold">Create Report</span> .
                  </span>
                </div>
              </div>
            </div>
          </main>
          <footer className="mt-2 flex justify-between ml-5 mb-9">
            <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold">
              Cancel
            </button>

            <div className="flex gap-1">
              <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold" onClick={onBack}>
                Back - Add Customer Managed Policies
              </button>
              <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold">
                Submit
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Onboarding3;
