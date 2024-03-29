import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const DashboardPage = () => {
  const [accountList, setAccountList] = useState([])
  const [subAccountList, setsubAccountList] = useState([])
  const [company, setCompany] = useState("")
  const [subcompany, setSubCompany] = useState("")
  const { id } = useParams()
  

  useEffect(() => {
    axios.get(`http://localhost:8000/api/accounts/`)
      .then(response => {
        console.log(response.data)
        setAccountList(response.data)
      })
      .catch(err => console.log(err))
    axios.get(`http://localhost:8000/api/subaccounts`)
      .then(response => {
        console.log(response.data)
        setsubAccountList(response.data)
      })
      .catch(err => console.log(err))
    axios.get(`http://localhost:8000/api/accounts/${id}`)
      .then(response => {
        const auth = response.data
        setCompany(auth.name)
      })
      .catch(err => console.log(err))
    axios.get(`http://localhost:8000/api/accounts/${id}`)
      .then(response => {
        const auth = response.data
        setSubCompany(auth.name)
      })
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/accounts/${deleteId}`)
      .then(response => {
        const filterList = accountList.filter((account) => account._id !== deleteId)
        setAccountList(filterList)
      })
      .catch(err => console.log(err))
  }

  const handleSubAcctDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/subaccounts/${deleteId}`)
      .then(response => {
        const filterList = subAccountList.filter((subaccount) => subaccount._id !== deleteId)
        setsubAccountList(filterList)
      })
      .catch(err => console.log(err))
  }

  // const handleUpdate = (e) => {
  //   e.preventDefault()
  //   axios.put(`http://localhost:8000/api/accounts/${id}`, { company })
  //     .then(response => {
  //       console.log(response.data)
  //       navigate(`/accounts`)
  //     })
  //     .catch(err => console.log(err))
  // }

  // const handleSubUpdate = (e) => {
  //   e.preventDefault()
  //   axios.put(`http://localhost:8000/api/subaccounts/${id}`, { subcompany })
  //     .then(response => {
  //       console.log(response.data)
  //       navigate(`/subaccounts`)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <div className="color">
      <div>
        <h2 className="header">Account Organizer</h2>
      </div>
      <div className="d-flex">
        <h5 className="subheader">Expense Accounts</h5>
        <Link className="links1" to="/accounts/add">Add Account</Link>
      </div>
      <table className="table-hover table-primary table">
        <thead>
          <tr className="col-form-label">
            <th>Company</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Due Date</th>
            <th>Method</th>
            <th>Payment</th>
            <th></th>
            <th>Credit Limit</th>
            <th>Owe(d)</th>
            <th>PaperLess</th>
            <th>Auto Pay</th>
            <th>Paid Off</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            accountList.map((eachAccount, i) => {
              return (
                <tr key={i} style={eachAccount.paidoff ? { color: 'rgb(181, 204, 255)' } : { textDecoration: "none" }}>
                  <th><Link to={`/accounts/edit/${eachAccount._id}`}>{eachAccount.company}</Link></th>
                  <th>{eachAccount.category}</th>
                  <th>{eachAccount.frequency}</th>
                  <th>{eachAccount.duedate}</th>
                  <th>{eachAccount.paymethod}</th>
                  <th>{eachAccount.payment}</th>
                  <th><a href={eachAccount.website}>Pay Bill</a></th>
                  <th>{eachAccount.limit}</th>
                  <th>{eachAccount.owe}</th>
                  <th>{eachAccount.statement ? "Yes" : ""}</th>
                  <th>{eachAccount.autopay ? "Yes" : ""}</th>
                  <th>{eachAccount.paidoff ? "Yes" : ""}</th>
                  <th><Link to={`/accounts/edit/${eachAccount._id}`} className="btn btn-primary">Update</Link></th>
                  <th><button onClick={() => handleDelete(eachAccount._id)} className="btn btn-danger">Delete</button></th>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="d-flex">
        <h5 className="subheader">Subscriptions & Auto Pay</h5>
        <Link className="links2" to="/subaccounts/add"> Add Subscription </Link>
      </div>
      <table className='table table-primary table-hover'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Amount</th>
            <th>Payment Source</th>
            <th>Frequency</th>
            <th>Active</th>
            <th>Recurring</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            subAccountList.map((eachSubAccount, i) => {
              return (
                <tr key={i} style={eachSubAccount.active ? { color: 'rgb(181, 204, 255)' } : { textDecoration: "none" }}>
                  <th><Link to={`/subaccounts/edit/${eachSubAccount._id}`}>{eachSubAccount.company}</Link></th>
                  <th>{eachSubAccount.amount}</th>
                  <th>{eachSubAccount.paysource}</th>
                  <th>{eachSubAccount.frequency}</th>
                  <th>{eachSubAccount.active ? "No" : "Yes"}</th>
                  <th>{eachSubAccount.recuroff ? "Yes" : "No"}</th>
                  <th><Link to={`/subaccounts/edit/${eachSubAccount._id}`} className="btn btn-primary">Update</Link></th>
                  <th><button onClick={() => handleSubAcctDelete(eachSubAccount._id)} className="btn btn-danger">Delete</button></th>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div >

  )
}

export default DashboardPage 