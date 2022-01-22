import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./SingleCampaign.module.scss";
import campaign from "../../campaign";

import { Button, Card, Icon, Table } from "semantic-ui-react";
import ParticipateForm from "../ParticipateForm";
import CreateRequest from "../CreateRequest";

const SingleCampaign = () => {
  const { address } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [fullCampaign, setFullCampaign] = useState({});
  const [requests, setRequests] = useState([]);
  const [isEntering, setIsEntering] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);

  useEffect(() => {
    (async () => {
      const fullCamp = await campaign(address).methods.getFullCampaign().call();
      setFullCampaign(fullCamp);

      const reqs = [];

      if (fullCamp.rqstNmbr > 0) {
        for (let i = 1; i <= fullCamp.rqstNmbr; i++) {
          const req = await campaign(address).methods.getShortRequest(i).call();
          const tempReq = {
            header: req.title,
            description: req.desc,
            recipient: req.recipient,
            reqId: i,
          };
          reqs.push(tempReq);
        }
      }
      setRequests(reqs);
    })();
    // eslint-disable-next-line
  }, []);

  const toggleIsEntering = async () => {
    setIsEntering((prevState) => {
      return !prevState;
    });
  };

  const renderRequests = () => {
    return (
      <>
        <h4>Requests</h4>
        <Card.Group>
          {requests?.map((req) => {
            return (
              <Card
                fluid
                key={req.reqId}
                onClick={() =>
                  navigate(`${location.pathname}/requests/${req.reqId}`)
                }
              >
                <Card.Content>
                  <Card.Content header={req.header} />
                  <Card.Content description={req.description} />
                  <Card.Content extra>
                    <Icon name="user" />
                    {req.recipient}
                  </Card.Content>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </>
    );
  };

  return (
    <>
      {isCreatingRequest ? <CreateRequest address={address} /> : null}
      <h3>{fullCampaign.campName}</h3>
      <div className={styles.singleCampaign}>
        {isEntering ? (
          <ParticipateForm address={address} toggle={toggleIsEntering} />
        ) : null}
        <Button.Group floated="right" vertical>
          <Button
            basic
            color="green"
            onClick={() => setIsCreatingRequest(true)}
          >
            Create Request
          </Button>
          <Button basic color="blue" onClick={() => setIsEntering(true)}>
            Become a Backer
          </Button>
        </Button.Group>
        <Table definition collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>Manager's Address</Table.Cell>
              <Table.Cell>{fullCampaign.mgr}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Minimum Contribution</Table.Cell>
              <Table.Cell>{fullCampaign.minContrib}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>{fullCampaign.campDesc}</Table.Cell>
            </Table.Row>{" "}
            <Table.Row>
              <Table.Cell>Requests</Table.Cell>
              <Table.Cell>{fullCampaign.rqstNmbr}</Table.Cell>
            </Table.Row>{" "}
            <Table.Row>
              <Table.Cell>Backers</Table.Cell>
              <Table.Cell>{fullCampaign.bckrsCnt}</Table.Cell>
            </Table.Row>{" "}
            <Table.Row>
              <Table.Cell>Goal</Table.Cell>
              <Table.Cell>{fullCampaign.campGoal}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <div>{fullCampaign.rqstNmbr > 0 ? renderRequests() : null}</div>
      </div>
    </>
  );
};

export default SingleCampaign;
