import React from 'react'

class Messages extends React.Component {
    state = {
        messages: [],
        servers: []
    };

    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    async handleSelectChange(event) {
        const target = event.target;
        const value = target.value;
        console.log('value', value);

        const messagesResponse = await fetch(`http://localhost:4000/messagesByServer/${value}`);
        const messagsJson = await messagesResponse.json();
        this.setState({ messages: messagsJson }); 
    }


    async componentDidMount() {
        const messagesResponse = await fetch(`http://localhost:4000/messages/`);
        const messagsJson = await messagesResponse.json();
        this.setState({ messages: messagsJson }); 

        const serversResponse = await fetch(`http://localhost:4000/servers/`);
        const serversJson = await serversResponse.json();
        this.setState({ servers: serversJson }); 
    }
    
    render() {
        return (
        <div>
            {this.state.servers.length > 0 &&
                <div>
                    <select onChange={this.handleSelectChange}>
                        {this.state.servers.map((server) => (
                            <option key={server.id} value={server.id}>{server.server}</option>
                        ))}
                    </select>
                </div>
            }  

            {this.state.messages.length > 0 &&
                <div>
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Server</th>
                        <th scope="col">Message</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.messages.map((message) => (
                            <tr key={message.id}>
                                <td>{message.server.server}</td>
                                <td>{message.message}</td>
                            </tr>
                        ))}
                    </tbody>

                    </table>
                </div>
            }

            {this.state.messages.length == 0 &&
                <h2>No such any message.</h2>
            }
        </div>
        )
        
      }

  }
  export default Messages;