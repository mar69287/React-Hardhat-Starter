import { useAuth } from '../../context/AuthContext'

const LoginButton = () => {
  const { web3Handler, hasWeb3 } = useAuth()

  return (
    <>
      {
        !hasWeb3 ? (
          <a 
            href="https://metamask.io/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary cursor-pointer rounded text-white bg-purple-600 py-3 px-4 text-sm md:text-base font-semibold md:py-4 md:px-6 transition duration-250 ease-in-out hover:bg-purple-700"
          >
            Download Metamask
          </a> 
        ) : (
          <div 
            onClick={web3Handler} 
            className="btn cursor-pointer btn-primary rounded text-white bg-purple-600 py-3 px-4 text-sm md:text-base font-semibold md:py-4 md:px-6 transition duration-250 ease-in-out hover:bg-purple-700"
          >
            Connect Wallet
          </div>
        )
      }
    </>
  )
}

export default LoginButton
