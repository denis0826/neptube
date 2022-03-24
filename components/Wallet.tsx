import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { formatEther } from '@ethersproject/units'
import { FaWallet } from 'react-icons/fa'

import { injected } from '../components/wallet/connector'

const Wallet = (props: any) => {
  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React()
  const [balance, setBalance] = useState()

  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library.eth
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(undefined)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  const connect = async () => {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', 'true')
    } catch (ex) {
      console.log(ex)
    }
  }

  const disconnect = async () => {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', 'false')
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', 'true')
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <div
      className="animated fadeIn pin bg-smoke-dark fixed inset-0 z-10 flex flex-wrap justify-around overflow-auto overflow-y-auto"
      aria-labelledby="modal-wallet"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-72 flex-col">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  <span className="mx-auto flex inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaWallet />
                  </span>
                  <span className="mx-5">Wallet details</span>
                </h3>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                {!active ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Wallet not connected. <br /> Please click the Connect
                      button below
                    </p>
                  </div>
                ) : (
                  <div>
                    <div>
                      <p className="mt-4 flex justify-between text-sm font-light text-gray-700">
                        <span className="text-sm font-bold text-gray-900">
                          Chain Id
                        </span>
                        <span>{chainId ?? ''}</span>
                      </p>
                      <p className="mt-4 flex justify-between text-sm font-light text-gray-700">
                        <span className="text-sm font-bold text-gray-900">
                          Account
                        </span>
                        <span>
                          {account === null
                            ? '-'
                            : account
                            ? `${account.substring(0, 6)}...${account.substring(
                                account.length - 4
                              )}`
                            : ''}
                        </span>
                      </p>
                      <p className="mt-4 flex justify-between text-sm font-light text-gray-700">
                        <span className="text-sm font-bold text-gray-900">
                          Balance
                        </span>
                        <span>
                          {balance === null
                            ? 'Error'
                            : balance
                            ? `Ξ${formatEther(balance)}`
                            : ''}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
            {!active ? (
              <>
                <button
                  type="button"
                  onClick={connect}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Connect
                </button>
                <button
                  onClick={() => props.showModal(false)}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    props.showModal(false)
                    disconnect()
                  }}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Disconnect
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
