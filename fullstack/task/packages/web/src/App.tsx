import { ApolloConsumer, gql } from '@apollo/client';

function App() {
    // TODO: Add the FE for exchange rates here.

    return (
        <div>
            <ApolloConsumer>
                {(client) => (
                    <>
                        <p>Add the exchange rates here</p>

                        {(() => {
                            client
                                .query({
                                    query: gql`
                                        {
                                            exchangeRates {
                                                country
                                                currncy
                                            }
                                        }
                                    `,
                                })
                                .then((result) => console.log(result));

                            return null;
                        })()}
                    </>
                )}
            </ApolloConsumer>
        </div>
    );
}

export default App;
