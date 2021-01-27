import React from "react";

// Sub Components
import PageNumbersTab from "./subs/PageNumbersTab/PageNumbersTab";
import HeaderModalTabs from "./subs/HeaderModalTabs/HeaderModalTabs";
import TitlesList from "./subs/TitlesList/TitlesList";
// import TitlesList2 from "./subs/TitlesList2/TitlesList2";
import HeaderPositioning from "./subs/HeaderPositioning/HeaderPositioning";

function HeaderModal({ headers }) {
  return (
    <div id="headerModal">
      <HeaderModalTabs headers={headers} />
      {headers.tab === 0 && <PageNumbersTab headers={headers} />}
      {headers.tab === 1 && <TitlesList headers={headers} />}
      {headers.tab === 2 && <HeaderPositioning headers={headers} />}
    </div>
  );
}

export default HeaderModal;
