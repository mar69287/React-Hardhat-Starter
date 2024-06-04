import { createContext, useState, useContext } from "react";
import { ethers } from 'ethers';
import SampleAddress from '../contractsData/Sample-address.json'
import SampleAbi from '../contractsData/Sample.json'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        const [loading, setLoading] = useState(false)
        const [client, setClient] = useState(null);
        const [hasWeb3, setHasWeb3] = useState(false);
        const [sample, setSample] = useState({})

        const web3Handler = async () => {
            var account;
            var chainId;
            setLoading(true)
            await window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                account = accounts[0];
            });
        
            await window.ethereum.request({ method: 'eth_chainId' }).then((res) => {
                chainId = parseInt(res, 16);
            });
        
            const provider = new ethers.BrowserProvider(window.ethereum);
        
            const signer = await provider.getSigner();
        
            setClient({
                account: account,
                signer: signer,
                chainId: chainId,
                provider: provider,
            });
            loadContracts(signer);
            setLoading(false)
        };

        const loadContracts = async (signer) => {
            const sampleContract = new ethers.Contract(SampleAddress.address, SampleAbi.abi, signer);
            setSample(sampleContract);
        };

        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
              window.location.reload();
            });
            window.ethereum.on('accountsChanged', () => {
              window.location.reload();
            });
            if (!hasWeb3) {
              setHasWeb3(true);
            }
          }


        const contextData = {
            client,
            web3Handler,
            hasWeb3,
            sample
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;