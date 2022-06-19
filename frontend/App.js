import 'regenerator-runtime/runtime'
import React from 'react'

import './assets/css/global.css'

import { login, logout, deposit, withdraw } from './assets/js/near/utils'
import getConfig from './assets/js/near/config'


export default function App() {

  // when the user has not yet interacted with the form, disable the button
  const [note, setNote] = React.useState("");
  const [near, setNear] = React.useState("");
  const [state, setState] = React.useState("deposit");
  const onChangeNote = (event) => {
    setNote(event.currentTarget.value);
  }

  const onChangeNear = (event) => {
    setNear(event.currentTarget.value)
  }

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <button onClick={login}>Sign in</button>
      </main>
    )
  }

  const depositNear = async () => {
    try {
      const commitment = [20, 7, 195, 103, 55, 128, 130, 95, 92, 219, 104, 211, 150, 156, 99, 248, 159, 236, 128, 185, 109, 251, 148, 187, 92, 182, 52, 253, 240, 132, 200, 14];
      await deposit(commitment);

    } catch (error) {
      alert("something was wrong!!");
    }



  }

  const withdraw = () => {

  }

  React.useEffect(() => {
    if (window.location.search.search("transactionHashes") > -1) {
      const note = "7e0f4bfa263d8b93854772c94851c04b3a9aba38ab808a8d081f6f5be9758110b7147c395ee9bf495734e4703b1f622009c81712520de0bbd5e7a10237c7d829bf6bd6d0729cca778ed9b6fb172bbb12b01927258aca7e0a66fd5691548f8717";
      alert(
        `Your note: ${note}`
      )
    }
  }, [])

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main style={{ backgroundColor: "#aaa", padding: 10 }}>
        <h1>Private Near Cash</h1>
        <div style={{
          display: 'flex',
          justifyContent: "space-between",
          marginBottom: 40
        }}>
          <button
            style={{ backgroundColor: `${state === "deposit" ? 'rgb(163 165 232)' : "#fff"}`, color: "#000" }}
            onClick={() => setState("deposit")}
          >Deposit</button>
          <button
            style={{ backgroundColor: `${state === "withdraw" ? 'rgb(163 165 232)' : "#fff"}`, color: "#000" }}
            onClick={() => setState("withdraw")}
          >Withdraw</button>
        </div>
        {
          state === "deposit" &&
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: "column",
            alignItems: "center",
            color: "#fff"
          }}>
            1 near
            <button onClick={() => depositNear()} style={{ marginTop: 10 }}>Deposit</button>
          </div>
        }

        {
          state === "withdraw" &&
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: "column",
            alignItems: "center"
          }}>
            <input name="nearCoin" onChange={onChangeNote} />
            <button onClick={() => withdraw()} style={{ marginTop: 10 }}>Withdraw</button>
          </div>
        }
      </main>
    </>
  )
}