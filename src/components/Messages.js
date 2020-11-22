import React from 'react'

class Messages extends React.Component {
    state = {
        messages: [],
        servers: []
    };


    constructor(props) {
        super(props);

        this.handleSelectChangeServer = this.handleSelectChangeServer.bind(this);
        this.handleInputChangeMessage = this.handleInputChangeMessage.bind(this);
        

    }

    async handleSelectChangeServer(event) {
        const target = event.target;
        const value = target.value;
        console.log('value', value);

        const messagesResponse = await fetch(`http://localhost:4000/messagesByServer/${value}`);
        const messagsJson = await messagesResponse.json();
        this.setState({ messages: messagsJson }); 
    }

    async handleInputChangeMessage(event) {
        const target = event.target;
        const value = target.value;

        const messagesResponse = await fetch(`http://localhost:4000/messageByMessage`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: value
            }) 
        });
        const messagsJson = await messagesResponse.json();
        this.setState({ messages: messagsJson }); 
      }

    async handleSubmit(event) {
        console.log('on submit');
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
                    <select onChange={this.handleSelectChangeServer}>
                        {this.state.servers.map((server) => (
                            <option key={server.id} value={server.id}>{server.server}</option>
                        ))}
                    </select>
                </div>
            }  

            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search a menssage" onChange={this.handleInputChangeMessage}></input>
            </form>


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

            {this.state.messages.length === 0 &&
                <h2>No such any message.</h2>
            }
        </div>
        )
        
      }

  }
  export default Messages;