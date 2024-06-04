import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import { formatUnits } from 'ethers';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
        const navigate = useNavigate()
        const [loading, setLoading] = useState(false)
        const [client, setClient] = useState(null);
        const [hasWeb3, setHasWeb3] = useState(false);

        const web3Handler = async () => {
            var account;
            var chainId;
        
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
            hasWeb3
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