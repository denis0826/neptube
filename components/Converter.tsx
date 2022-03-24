import type { NextPage } from 'next'
import { useState, ChangeEvent } from 'react'
import { ImLoop } from 'react-icons/im'
import { FaWallet } from 'react-icons/fa'
import Wallet from './Wallet'

interface convertCurrencyProp {
  from: number
  to: number
}

export const Converter: NextPage = () => {

  //@NOTE in real project we are pulling this data in API, so much better if we put this in state
  const [rate, setRate] = useState({
    nep: {
      result: {
        busd: 3,
        php: 150,
        eth: 0.0010365,
      },
    },
  })
  const [convertValue, setConvertValue] = useState<convertCurrencyProp>({
    from: 0,
    to: 0,
  })
  const [toggleView, setToggleView] = useState<boolean>(true)
  const [modal, showModal] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9]*(\.[0-9]{0,2})?$/
    const currencyValue = rate['nep']
    const { name, value } = event.target
    let result = 0
    let toUpdateName = 'to'

    //Filter Numbers only
    if (value === '' || re.test(value)) {
      if (name === 'from') {
        result = Number(value) * currencyValue.result.busd
        toUpdateName = 'to'
      } else {
        result = Number(value) / currencyValue.result.busd
        toUpdateName = 'from'
      }
      setConvertValue({
        ...convertValue,
        [name]: Number(value),
        [toUpdateName]: result.toFixed(2),
      })
    }
  }

  const FromComponent = () => (
    <div className="mb-2">
      <label>NEP</label>
      <input
        type="text"
        value={convertValue.from}
        name="from"
        onChange={(e) => handleInputChange(e)}
        className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="0.00"
      />
    </div>
  )

  const ToComponent = () => (
    <div className="mb-2">
      <label>BUSD</label>
      <input
        value={convertValue.to}
        name="to"
        type="text"
        onChange={(e) => handleInputChange(e)}
        className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="0.00"
      />
    </div>
  )

  return (
    <div className="mt-6 w-80 rounded-2xl border py-12 px-8 shadow  delay-75 duration-100 hover:shadow-2xl">
      <p className="mb-5 text-3xl font-semibold text-gray-700">
        Crypto Converter
      </p>
      <div className="-space-y-px rounded-md shadow-sm">
        {toggleView ? FromComponent() : ToComponent()}
        <button
          className="mx-auto block h-8 w-auto"
          onClick={() => setToggleView(!toggleView)}
        >
          <ImLoop />
        </button>
        {toggleView ? ToComponent() : FromComponent()}
      </div>
      <button
        className="mx-auto block h-8 w-auto"
        onClick={() => showModal(!modal)}
      >
        <div className="mx-auto mt-8 rounded-full text-blue-800 ">
          <FaWallet title="Check Wallet Details" className="inline" /> Check
          Wallet Details
        </div>
      </button>

      {modal && <Wallet showModal={showModal} />}
    </div>
  )
}
