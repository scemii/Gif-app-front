import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "./Card.js";
import "./App.css";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#424242"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#212121",
      main: "#212121",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      loading: true
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      message: this.state.message,
      imageUrl: this.state.imageUrl
    };

    fetch("http://localhost:5000/messages", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content.type": "appllication/json"
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
    console.log(data);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async componentDidMount() {
    await fetch("http://localhost:5000/messages")
      .then(res => res.json())
      .then(result =>
        this.setState({
          messages: result,
          loading: false
        })
      )
      .catch(error => {
        console.log("Error", error);
      });
    console.log(this.state.messages);
  }

  render() {
    return this.state.loading === true ? (
      <div>Loading...</div>
    ) : (
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Baby Gif App</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <div>
              <TextField
                id="username"
                name="username"
                type="text"
                style={{ margin: 2, paddingTop: "5em", width: "50%" }}
                placeholder="John Doe"
                helperText="Nickname"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                id="message"
                name="message"
                type="text"
                style={{ margin: 2, paddingTop: "1em", width: "50%" }}
                multiline
                rows="2"
                placeholder="Your message"
                variant="outlined"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                id="imageUrl"
                name="imageUrl"
                type="text"
                style={{ margin: 2, paddingTop: "1em", width: "50%" }}
                placeholder="http://..."
                helperText="Image URL"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
                onChange={this.handleChange}
              />
            </div>
            <Button
              type="submit"
              style={{ margin: 2, marginTop: "1em" }}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          <Grid container spacing={3} style={{ paddingTop: "5em" }}>
            {this.state.messages.map(message => (
              <Grid item xs={3} key={message._id}>
                <Card
                  username={message.username}
                  subject={message.subject}
                  message={message.message}
                  imageUrl={message.imageUrl}
                  date={message.created}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
