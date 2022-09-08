import React, { useState, useEffect } from "react";
import axios from "axios";

function Bank() {

    const [banksData, getbanksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bankvalues, getBankValues] = useState("select bank");
    const [names, getNames] = useState("");

    useEffect(() => {
        axios.get("http://gemini.yesmfbank.com/yesmobile/NIP.svc/api/financialinst")
            .then(bankResponse => { getbanksData(bankResponse.data.Banks) })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) })
    }, []);

    function handleBankChange(e) {
        var value = e.target.value;
        getBankValues(value);
    }

    function handleNameChange(e) {
        var value = e.target.value;
        getNames(value);
    }

    function handleSubmit() {
        alert(names.concat(" ", "is using ", bankvalues));
    }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error!</h1>;

    return (

        <div className="container-fluid">
            <div className="container">
                <h1>Banks</h1>

                <select onChange={handleBankChange} value={bankvalues}>
                    <option value="Select bank">
                        -- Select a bank --
                    </option>

                    {banksData.map((bank) => <option key={bank.InstitutionCode} value={bank.InstitutionName}>{bank.InstitutionName}

                    </option>)}
                </select>
                <br />
                <input onChange={handleNameChange} value={names} />
                <br />
                <input type="button" value="Submit" onClick={handleSubmit} />

            </div>
        </div>

    );
}

export default Bank;