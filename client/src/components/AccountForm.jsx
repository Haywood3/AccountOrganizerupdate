import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Paper, Card, CardContent } from '@material-ui/core'

const AccountForm = () => {
  const navigate = useNavigate()
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState("")
  const [frequency, setFrequency] = useState("")
  const [duedate, setDueDate] = useState("")
  const [paymethod, setPayMethod] = useState("")
  const [payment, setPayment] = useState("")
  const [limit, setLimit] = useState("")
  const [owe, setOwe] = useState("")
  const [statement, setStatement] = useState(false)
  const [autopay, setAutopay] = useState(false)
  const [paidoff, setPaidOff] = useState(false)
  const [website, setWebSite] = useState("")
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // send form data into API, if success, redirect
    axios.post(`http://localhost:8000/api/accounts`, {
      company, category, frequency, duedate, paymethod, 
      payment, limit, owe, statement, autopay, paidoff, website
    })
      .then(response => {
        console.log(response)
        navigate(`/accounts`)
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      })
  }

  const clearForm = () => {
    setCompany("")
    setCategory("")
    setFrequency("")
    setDueDate("")
    setPayMethod("")
    setPayment("")
    setLimit("")
    setOwe("")
    setStatement(false)
    setAutopay(false)
    setPaidOff(false)
    setWebSite("")
  }

  

  return (
    <div>
      <div>
        <h1> Add Account</h1>
        <Link to="/accounts"> Account Lists </Link> |
        <Link to="/subaccounts/add"> Add Subscription </Link>
      </div>
      <div>
        <Paper elevation={6}>
          <Card>
            <CardContent>
              <form className="align-items-lg-center justify-content-xxl-between" onSubmit={handleSubmit}>
                <div>
                  <label>Company:</label>
                  <input type="text" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                  <label>Category:</label>
                  <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option hidden>Choose an Option</option>
                    <option value="home">Home</option>
                    <option value="auto">Auto</option>
                    <option value="personal">Personal</option>
                    <option value="credit">Credit</option>
                    <option value="utilities">Utilities</option>
                  </select>
                </div>
                <div>
                  <label>Frequency</label>
                  <select name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option hidden>Choose an Option</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semiannual">Semi Annual</option>
                    <option value="annual">Annual</option>
                  </select>
                </div>
                <div>
                  <label>Due Date (or Due Week):</label>
                  <input type="text" name="duedate" value={duedate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div>
                  <label>Payment Method</label>
                  <select name="paymethod" value={paymethod} onChange={(e) => setPayMethod(e.target.value)}>
                    <option hidden>Choose an Option</option>
                    <option value="mail">Mail</option>
                    <option value="branch">Branch</option>
                    <option value="App">App</option>
                    <option value="website">Website</option>
                  </select>
                </div>
                <div>
                  <label>Payment:</label>
                  <input type="text" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)} />
                </div>
                <div>
                  <label>Website:</label>
                  <input type="text" name="website" value={website} onChange={(e) => setWebSite(e.target.value)} />
                </div>
                <div>
                  <label>Credit Limit:</label>
                  <input type="text" name="limit" value={limit} onChange={(e) => setLimit(e.target.value)} />
                </div>
                <div>
                  <label>Owe(d):</label>
                  <input type="text" name="owe" value={owe} onChange={(e) => setOwe(e.target.value)} />
                </div>
                <div>
                  <input type="checkbox" className="form-check-input" name="statement" checked={statement} onChange={(e) => setStatement(e.target.checked)} />
                  <label className="form-label">No Mailed Statement</label>
                </div>
                <div>
                  <input type="checkbox" className="form-check-input" name="autopay" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} />
                  <label className="form-label">Is Auto Pay</label>
                </div>
                <div>
                  <input type="checkbox" className="form-check-input" name="paidoff" checked={paidoff} onChange={(e) => setPaidOff(e.target.checked)} />
                  <label className="form-label">Is Paid Off</label>
                </div>
                <button className="btn btn-success" type="submit">Add an Account</button>
                <button type="submit" className="btn btn-secondary" onClick={clearForm}>Cancel</button>
              </form >
              {errors.map((err, index) => <p key={index} style={{ color: "blue" }}>{err}</p>)}
            </CardContent>
          </Card>
        </Paper>
      </div >
    </div>
  )
}

export default AccountForm