import React from 'react';
import { Api } from './Api';

export class Pokemon extends React.Component {
  mounted = true;

  state = {
    details: null,
  };

  async componentDidMount() {
    const details = await Api.getPokemon(this.props.name);
    if (this.mounted) {
      this.setState({ details });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    console.log('Render Pokemon');

    return (
      <div>
        <h2>
          {this.props.name} ({this.state.details && this.state.details.count})
        </h2>
        {this.state.details === null ? <p>No data</p> : <img src={this.state.details.sprites.front_default} alt="" />}
      </div>
    );
  }
}
