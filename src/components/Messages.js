import React from 'react'

class Messages extends React.Component {
    state = {
        messages: []
    };


    async componentDidMount() {
        const messagesResponse = await fetch(`http://localhost:4000/messages/`);
        const messagsJson = await messagesResponse.json();
        this.setState({ messages: messagsJson }); 
    }
    
    render() {
        return (
        <div>
            {this.state.messages.length > 0 &&
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
            }

            {this.state.messages.length == 0 &&
                <h2>No such any message.</h2>
            }
        </div>
        )
        
      }

  }
  export default Messages;