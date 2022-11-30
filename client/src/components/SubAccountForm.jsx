import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Paper, Card, CardContent } from '@material-ui/core'

const SubAccountForm = () => {
  const navigate = useNavigate()
  const [company, setCompany] = useState("")
  const [paysource, setPaySource] = useState("")
  const [frequency, setFrequency] = useState("")
  const [amount, setAmount] = useState("")
  const [active, setActive] = useState(true)
  const [recuroff, setRecurOff] = useState(true)
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // send form data into API, if success, redirect
    axios.post(`http://localhost:8000/api/subaccounts`, { company, paysource, frequency, amount, active, recuroff })
      .then(response => {
        console.log(response)
        navigate(`/subaccounts`)
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
    setPaySource("")
    setFrequency("")
    setAmount("")
    setActive(false)
    setRecurOff(false)
  }

  return (
    <div>
      <div>
        <h1> Add Subcription</h1>
        <Link to="/accounts"> Account Lists </Link>
        <Link to="/accounts/add"> Add Account </Link>
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
                  <label>Payment Source:</label>
                  <input type="text" name="paysource" value={paysource} onChange={(e) => setPaySource(e.target.value)} />
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
                  <label>Amount:</label>
                  <input type="text" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div >
                <div>
                  <input type="checkbox" className="form-check-input" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                  <label className="form-label">Not Active</label>
                </div>
                <div>
                  <input type="checkbox" className="form-check-input" name="recuroff" checked={recuroff} onChange={(e) => setRecurOff(e.target.checked)} />
                  <label className="form-label">Recurring</label>
                </div>
                <button className="btn btn-success" type="submit">Add a subscription</button>
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

export default SubAccountForm