import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

//import components
import FetchButton from './components/pure_components/fetchButton';
import AssetList from './components/pure_components/assetList';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      objectList: [],
      filterParam: ``,
      queryOpts: [`animals`, `architecture`, `art`, `food`, `nature`, `objects`, `people`, `scenes`, `technology`, `transport`],
    };
    
    this.fetchObjects = this.fetchObjects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fetchObjects(filterParam) {
    //log the execution of the fetch
    console.log(`fetching (with POST) objects from server @ route "retrieveObjects"`)

    Axios.post(`retrieveObjects`, {filter: filterParam})
      .then(({data}) => {

        // console.log(`successful get request! recieved these models: ${JSON.stringify(data)}`);
        
        this.setState({
          objectList: data,
          filterParam: data[0].category
        });

        // console.log(`objectList in state: ${JSON.stringify(this.state.objectList)}`);
      })
      .catch((err) => {
        console.error(`fetch is broken with error: ${err}`);
      })
  }

  handleClick({ target }) {

    console.log(`querying POLY for ${target.id} models`);

    Axios.post(`storeObjects`, { topic: target.id })
      .then((data) => {
        // console.log(`has the post succeeded? ${JSON.stringify(data)}`);
        this.fetchObjects(target.id);
      })
      .catch((err) => {
        console.error(`fetch is broken with error: ${err}`);
      });

  }

  componentDidMount() {
    //initialize application state with objects from DB
    this.fetchObjects(this.state.filterParam);

    //log the results of first fetch from server
    console.log(`Application component mounted!`);
  }

  render() {
    //log each time it renders
    console.log(`rendering`);

    return (
      <article>
        <section className="hero is-primary">

          <div className="hero-head" style={{ paddingTop: `24px` }}>
            <div className="container has-text-centered">
              <h1 className="title is-1">
                POLY<span style={{ fontStyle: `italic` }}>got</span>
              </h1>
              <h2 className="subtitle">
                For all your 3D assetGrabbing needs.
              </h2>
            </div>
          </div>

          <div className="hero-body">
            <div className="container has-text-centered">
              <h2 className="subtitle is-2">
                What kind of assets do you need?
              </h2>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container ">
                <ul>
                  {this.state.queryOpts.map((topic, idx) => (
                    <FetchButton key={idx} currentFilter={this.state.filterParam} value={topic} clickHandler={this.handleClick} />
                  ))}
                </ul>
              </div>
            </nav>
          </div>

        </section>

        <AssetList objectList={this.state.objectList}/>
      </article>
    );
  }

}

ReactDOM.render(<App />, document.getElementById(`app`));