import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

export default class NetworkPriceCard extends React.Component {
  render = () => (
    <Card style={{ backgroundColor: "#ea80fc" }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          <span style={{ fontWeight: "bold" }}>{this.props.username}</span>{" "}
        </Typography>
        <Typography
          style={{ textAlign: "left", marginBottom:"10px" }}
          variant="h5"
          fcolor="textSecondary"
        >
          {this.props.message}
        </Typography>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={this.props.imageUrl}
          title="Paella dish"
        />
        <Typography
          style={{  marginTop: "1em" }}
          color="textSecondary"
        >
          {this.props.date}
        </Typography>
      </CardContent>
    </Card>
  );
}
