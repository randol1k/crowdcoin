import { useState } from "react";
import campaign from "../../../campaign";
import { Button } from "semantic-ui-react";

const RequestControl = ({
  urlRequestId,
  address,
  controlType,
  isClosed,
  account,
  canApprove,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async () => {
    setIsLoading(true);

    try {
      controlType === "approve"
        ? await campaign(address)
            .methods.approveRequest(urlRequestId)
            .send({ from: account })
        : await campaign(address)
            .methods.finalizeRequest(urlRequestId)
            .send({ from: account });
    } catch (error) {
      alert(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Button
      content={
        controlType === "approve" ? "Approve Request!" : "FinalizeRequest"
      }
      loading={isLoading}
      onClick={clickHandler}
      disabled={isClosed || (controlType === "approve" && canApprove)}
    />
  );
};

export default RequestControl;
