import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import campaign from "../../campaign";
import web3 from "../../web3";

import RequestControl from "./RequestControl";

const SingleRequest = () => {
  const { urlRequestId, address } = useParams();
  const [fullRequest, setFullRequest] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [canApprove, setCanApprove] = useState(false);

  useEffect(() => {
    if (urlRequestId) {
      (async () => {
        const rqst = await campaign(address)
          .methods.getFullRequest(urlRequestId)
          .call();
        const accs = await web3.eth.getAccounts();
        const appr = await campaign(address)
          .methods.isApprovedAlready(urlRequestId, accs[0])
          .call();
        setFullRequest(rqst);
        setAccounts(accs);
        setCanApprove(appr);
      })();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <p>Value: {fullRequest.value} WEI</p>
      <p>Description: {fullRequest.desc}</p>
      <p>Recipient: {fullRequest.recipient}</p>
      <p>Approvals Count: {fullRequest.approvalsCount}</p>
      <p>Is Closed: {fullRequest.isClosed ? "True" : "False"}</p>
      <RequestControl
        controlType="approve"
        address={address}
        urlRequestId={urlRequestId}
        isClosed={fullRequest.isClosed}
        account={accounts[0]}
        canApprove={canApprove}
      />
      <RequestControl
        controlType="finalize"
        address={address}
        urlRequestId={urlRequestId}
        isClosed={fullRequest.isClosed}
        account={accounts[0]}
      />
    </div>
  );
};

export default SingleRequest;
