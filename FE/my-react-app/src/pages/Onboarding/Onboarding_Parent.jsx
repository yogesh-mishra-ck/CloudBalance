import React, { useState } from "react";
import Onboarding from "./Onboarding";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";

function Onboarding_Parent() {
  const [page, setPage] = useState(1);
  return (
    <div>
      {page === 1 && <Onboarding onNext={() => setPage(2)} />}
      {page === 2 && (
        <Onboarding2 onNext={() => setPage(3)} onBack={() => setPage(1)} />
      )}
      {page === 3 && <Onboarding3 onBack={() => setPage(2)} />}
    </div>
  );
}

export default Onboarding_Parent;
