import React from 'react'

class Servers extends React.Component {
    state = {
        servers: []
    };


    async componentDidMount() {
        const serversResponse = await fetch(`http://localhost:4000/servers/`);
        const serversJson = await serversResponse.json();
        this.setState({ servers: serversJson }); 
    }
    
    render() {
        return (
        <div>
            <select>
                {this.state.servers.map((server) => (
                    <option key={server.id}>{server.server}</option>
                ))}
            </select>
        </div>
        )
        
      }

  }
  export default Servers;