const Button = window.Reactstrap.Button;

const Collapse = window.Reactstrap.Collapse;

const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const ReactMarkdown = window.ReactMarkdown;

const Form = window.Reactstrap.Form;
const FormGroup = window.Reactstrap.FormGroup;
const Label = window.Reactstrap.Label;
const Input = window.Reactstrap.Input;

const axios = window.axios;

const Select = window.Select;

// Obtain the root 
const rootElement = document.getElementById('root');

// Create a ES6 class component
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            predictions: [],
            imageSelected: false,
            url: null,
            isLoading: false,
            selectedOption: null,
            heatmap: null,
        }
    }

    _onFileUpload = (event) => {
        this.setState({
            rawFile: event.target.files[0],
            file: URL.createObjectURL(event.target.files[0]),
            imageSelected: true,
            predictions: []
        });
    };

    _onUrlChange = (url) => {
        this.state.url = url;
        if ((url.length > 5) && (url.indexOf("http") === 0)) {
            this.setState({
                file: url,
                imageSelected: true,
                predictions: []
            })
        }
    };

    _clear = async (event) => {
        this.setState({
            file: null,
            imageSelected: false,
            predictions: [],
            rawFile: null,
            url: "",
            heatmap: null
        })
    };

    _predict = async (event) => {
        this.setState({ 
            isLoading: true, 
            imageSelected: false,
            predictions: [],
            heatmap: null,
        });

        let resPromise = null;
        if (this.state.rawFile) {
            const data = new FormData();
            data.append('file', this.state.rawFile);
            resPromise = axios.post('/api/classify', data);
        } else {
            resPromise = axios.get('/api/classify', {
                params: {
                    url: this.state.file
                }
            });
        }

        try {
            const res = await resPromise;
            const payload = res.data;

            this.setState({ predictions: payload.predictions,  isLoading: false , heatmap: "../static/outputs/gradcam.png"});
            console.log(payload)
        } catch (e) {
           alert(e)
        }
    };

    renderPrediction() {
        const predictions = this.state.predictions || [];

        if (predictions.length > 0) {
            const predictionItems = predictions.map((item) =>
                <table>
                    <tr>
                        <th>Результат</th>
                        <th>Вероятность</th>
                    </tr>
                    <tr>
                        <td>{item.class}</td>
                        <td>{item.prob * 100}%</td>
                    </tr>
                </table>
            );
            return (
                <p>
                    {predictionItems}
                </p>
            )
        } else {
            return null
        }
       
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        return (
            <div class="inner cover"> 
                <Form>
                    <div className="input-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                     <span class="input-group-text" id="basic-addon3">Введите URL</span>
                                </div>
                                <Input value={this.state.url} name="file" onChange={(e) => this._onUrlChange(e.target.value)}  type="url" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                            </div>
                    </div>
                    <label class="lb1">ИЛИ</label>
                    <div>
                        <FormGroup id={"upload_button"}>
                            <Label for="imageUpload">
                                <Input type="file" name="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref="file"
                                    onChange={this._onFileUpload}/>
                                <span class="my-but">Загрузите изображение</span>
                            </Label>
                        </FormGroup>
                    </div>

                    <img src={this.state.file} className={"img-preview"} hidden={!this.state.imageSelected} />
                    <img src={this.state.heatmap} className={"img-preview"} hidden={this.state.predictions.value=[]} />
    
                    <div>
                        <FormGroup>
                            <Button className="mr-1 ml-1 bg-primary border-0" onClick={this._predict} hidden={!this.state.imageSelected}
                                disabled={this.state.isLoading}>Анализировать</Button>
                            <Button className="mr-1 ml-1 bg-danger border-0" onClick={this._clear} >Очистить</Button>
                        </FormGroup>
                    </div>

                    <div>
                        {this.state.isLoading && (
                                <div class="loadingio-spinner-bars-ssyw4oxr4pc"><div class="ldio-qw1bbuuaxg">
                                <div></div><div></div><div></div><div></div>
                                </div></div>
                        )}
                    </div>
                </Form>

                <div class="text-center" hidden={this.state.imageSelected}>
                    {this.renderPrediction()}
                </div>
            </div>
        );
    }
}


// Create a function to wrap up your component
function App() {
    return (
        <Router>
            <div className="App">
                <div>
                    <main role="main" className="container">
                        <Route exact path="/" component={MainPage} />
                    </main>
                </div>
            </div>
        </Router>
    )
}

(async () => {
    const response = await fetch('/config');
    const body = await response.json();

    window.APP_CONFIG = body;

    // Use the ReactDOM.render to show your component on the browser
    ReactDOM.render(
        <App />,
        rootElement
    )
})();
