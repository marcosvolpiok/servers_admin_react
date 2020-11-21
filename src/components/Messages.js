import React from 'react'

class Messages extends React.Component {
    state = {
        messages: [],
        servers: []
    };


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
            {this.state.messages.length > 0 &&
                <div>
                    <div>
                        {this.state.servers.length > 0 &&
                            <select>
                                {this.state.servers.map((server) => (
                                    <option key={server.id}>{server.server}</option>
                                ))}
                            </select>
                        }
                    </div>

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