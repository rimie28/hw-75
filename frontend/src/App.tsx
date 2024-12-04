import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./app/store.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import {setDecodingMessage, setEncodingMessage, setPassword} from "./features/vigenere/vigenereSlice.ts";
import axiosAPI from "./axiosAPI.ts";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { password, encodingMessage, decodingMessage} = useSelector(
        (state: RootState) => state.vigenere
    );

    const handleSubmit = async (action: "encode" | "decode") => {
        if (!password) {
            alert("Please enter a password");
            return;
        }

        try {
            const whichAction = `/${action}`;
            const message = action === "encode" ? encodingMessage : decodingMessage;

            const { data } = await axiosAPI.post(whichAction, {
                password,
                message,
            });

            if (action === "encode") {
                dispatch(setDecodingMessage(data.encoded));
            } else {
                dispatch(setEncodingMessage(data.decoded));
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container p-3">
            <form className="form-horizontal d-flex flex-column gap-3">
                <div className="form-group d-flex gap-3">
                    <label htmlFor="encode">Encoding message:</label>
                    <textarea
                        className="form-control"
                        id="encode"
                        name="encode"
                        value={encodingMessage}
                        onChange={(e) => dispatch(setEncodingMessage(e.target.value))}
                    />
                </div>
                <div className="form-group d-flex gap-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                    />
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleSubmit("encode")}
                    >Encode</button>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleSubmit("decode")}
                    >Decode</button>
                </div>

                <div className="form-group d-flex gap-3">
                    <label htmlFor="decode">Decoding message:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="decode"
                        name="decode"
                        value={decodingMessage}
                        onChange={(e) => dispatch(setDecodingMessage(e.target.value))}
                    />
                </div>
            </form>
        </div>
    )
}

export default App
