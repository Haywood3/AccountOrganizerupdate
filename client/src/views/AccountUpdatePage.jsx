import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import DashboardPage from './DashboardPage'

// 1. get id from params(useParams())
// 2. use the id to get info from api : axios
// 3. display info on load : useEffect
// 4. form input : onChange , useState
// 5. form submit : handleSubmit
// 6. send formData into apiu : axios
// logic after create : redirect to detail page

const AccountUpdatePage = () => {
  const navigate = useNavigate()
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState("")
  const [paymethod, setPayMethod] = useState("")
  const [frequency, setFrequency] = useState("")
  const [limit, setLimit] = useState("")
  const [duedate, setDueDate] = useState("")
  const [owe, setOwe] = useState("")
  const [payment, setPayment] = useState("")
  const [statement, setStatement] = useState(false)
  const [autopay, setAutopay] = useState(false)
  const [paidoff, setPaidOff] = useState(false)
  const [errors, setErrors] = useState([])
  const [website, setWebSite] = useState("")
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/accounts/${id}`)
      .then(response => {
        console.log(response.data)
        const acct = response.data
        setCompany(acct.company)
        setCategory(acct.category)
        setFrequency(acct.frequency)
        setDueDate(acct.duedate)
        setLimit(acct.limit)
        setOwe(acct.owe)
        setPayMethod(acct.paymethod)
        setPayment(acct.payment)
        setStatement(acct.statement)
        setAutopay(acct.autopay)
        setPaidOff(acct.paidoff)
        setWebSite(acct.website)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // send form data into API, if success, redirect
    axios.put(`http://localhost:8000/api/accounts/${id}`, {
      company, category, paymethod, frequency, limit, duedate,
      owe, payment, statement, autopay, paidoff, website
    })
      .then(response => {
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
    setPayMethod("")
    setFrequency("")
    setPayment("")
    setLimit("")
    setDueDate("")
    setOwe("")
    setStatement(false)
    setAutopay(false)
    setPaidOff(false)
    setWebSite("")
  }

  return (
    <div>
      <div>
        <h1> Update Account</h1>
        <Link to="/accounts"> Account Lists </Link> |
        <Link to="/subaccounts/add"> Add Subscription </Link>
      </div>
      <div className="update-form">
        <form className="form-control"onSubmit={handleSubmit}>
          <div>
            <label className="update_label">Company</label>
            <input type="text" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div>
            <label className="update_label">Category</label>
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
            <label className="update_label">Frequency</label>
            <select name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option hidden>Choose an Option</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semiannual">Semi Annual</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="update_label">Due Date (or Later Date)</label>
            <input type="text" name="duedate" value={duedate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div>
            <label className="update_label">Payment Method</label>
            <select name="paymethod" value={paymethod} onChange={(e) => setPayMethod(e.target.value)}>
              <option hidden>Choose an Option</option>
              <option value="mail">Mail</option>
              <option value="branch">Branch</option>
              <option value="App">App</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div>
            <label className="update_label">Credit Limit:</label>
            <input type="text" name="limit" value={limit} onChange={(e) => setLimit(e.target.value)} />
          </div>
          <div>
            <label className="update_label">Owe(d):</label>
            <input type="text" name="owe" value={owe} onChange={(e) => setOwe(e.target.value)} />
          </div>
          <div>
            <label className="update_label">Payment</label>
            <input type="text" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)} />
          </div>
          <div>
            <label className="update_label">Website</label>
            <input type="text" name="website" value={website} onChange={(e) => setWebSite(e.target.value)} />
          </div>
          <div>
            <input type="checkbox" className="form-check-input" name="statement" checked={statement} onChange={(e) => setStatement(e.target.checked)} />
            <label className="form-label">No Statement</label>
          </div>
          <div>
            <input type="checkbox" className="form-check-input" name="autopay" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} />
            <label className="form-label">Is Auto Pay</label>
          </div>
          <div>
            <input type="checkbox" className="form-check-input" name="paidoff" checked={paidoff} onChange={(e) => setPaidOff(e.target.checked)} />
            <label className="form-label">Is Paid Off</label>
          </div>
          <button className="btn btn-success update_label" type="submit">Update Account</button>
          <button type="submit" className="btn btn-secondary update_label" onClick={DashboardPage.jsx}>Cancel</button>
        </form >
        {errors.map((err, index) => <p key={index} style={{ color: "blue" }}>{err}</p>)}
      </div >
    </div >
  )
}

export default AccountUpdatePage