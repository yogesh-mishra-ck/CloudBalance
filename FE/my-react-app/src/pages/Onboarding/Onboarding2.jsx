import React from "react";
import Onboarding_Navbar from "../../components/Onboarding-Navbar/Onboarding_Navbar";
import arnOnboard from "../../assets/arn-onboard.png";
import onboardingImage2 from "../../assets/onboarding-img-2.png";
import ck_Tuner_Role from "../../assets/ck-tuner-role_.png";


const Onboarding2 = ({ onBack, onNext }) => {
  return (
    <div>
      <Onboarding_Navbar currentPage={2} />
      <div>
        <main className="">
          <div className="pt-7 pl-4">
            <h1 className="text-2xl font-bold">
              Add Customer Managed Policies
            </h1>
            <p>Create an Inline policy for the role by following these steps</p>
          </div>
          <main className="bg-white pl-2 border-gray-100 ml-5 mt-2 border rounded-xl pb-12">
            <div className=" pt-7 flex flex-col gap-4 pl-10">
              <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    1
                  </span>
                  <span className="pl-5">Go to the <span className="font-bold underline text-blue-700">CK-Tuner-Role</span> </span>
                </div>

                <img src={arnOnboard} alt="" className="mt-3 pl-5"/>
              </div>

               <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    2
                  </span>
                  <span className="pl-5">In Permission policies, click on <span className="font-bold"> Add permissions {">"} Attach Policy</span> </span>
                </div>

                <img src={onboardingImage2} alt="" className="mt-3 pl-5"/>
              </div>

               <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    3
                  </span>
                  <span className="pl-5">Filter by Type {">"} Customer managed then search for  <span className="font-bold">cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials.</span> and select them. </span>
                </div>

                <img src={ck_Tuner_Role} alt="" className="mt-3 pl-5"/>
              </div>

               <div>
                <div>
                  <span className="rounded-full px-1.5 py bg-gray-400 text-center text-white mb-2">
                    4
                  </span>
                  <span className="pl-5">Now , click on<span className="font-bold"> Add permissions</span> </span>
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
                Back - Create an IAM Role
                </button>
                <button className="text-sky-700 bg-white shadow-2xl border-blue-800 p-2 rounded border mb-2 font-bold" onClick={onNext}>
                Next - Create CUR
                </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Onboarding2;
