import { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import factory from "../../factory";
import campaign from "../../campaign";
import { Card, Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import Spinner from "../Spinner";

const Main = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const campAddresses = await factory.methods.getDeployedCampaigns().call();

      if (campAddresses.length) {
        const camps = [];
        for (let i = 0; i < campAddresses.length; i++) {
          const tempCamp = await campaign(campAddresses[i])
            .methods.getShortCampaign()
            .call();

          camps.push({ ...tempCamp, address: campAddresses[i] });
        }
        setCampaigns(camps);
      }
      setIsLoading(false);
    })();
  }, []);

  const renderCards = () => {
    return (
      <Card.Group>
        {campaigns.map((campaign, id) => {
          return (
            <Card
              key={id}
              onClick={() => navigate(`/campaign/${campaign.address}`)}
            >
              <Card.Content header={campaign.name} />
              <Card.Content description={campaign.desc} />
              <Card.Content extra>
                <Icon name="money" />
                {campaign.goal} WEI
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  };

  const contentToRender = isLoading ? (
    <Spinner message="Fetching Data..." size="large" />
  ) : (
    <div className={styles.main}>
      <h3>Created Campaigns</h3>
      <Button
        content="Create Campaign"
        primary
        icon="circle add"
        floated="right"
        onClick={() => navigate("/campaigns/new")}
      />
      {renderCards()}
    </div>
  );

  return contentToRender;
};

export default Main;
